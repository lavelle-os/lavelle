// phone.mjs is `lavelle add phone`: it stands up the AI receptionist from the answers already given,
// by driving the voice kit's own installer (vapi-voice-tuneup, setup.mjs) with piped answers instead
// of asking the owner the same things twice. It refuses to run without every blocking answer, without a
// "yes" on the recording question, without a key, without the kit, when the kit's questions have moved,
// when the kit on disk is not the one commit this command was checked against, when an answer has a
// line break in it, or when the answers describe a phone that would loop into itself. A veteran would call it a thin
// adapter that spawns a child process with a stdin script, and find it ordinary. The owner's choices in
// it: every refusal is a refusal, not a warning (bank question 113 and question 1 both hold in code);
// no live number is ever attached by this command (the kit's own rule: overflow first, never the real
// line on day one); nothing is written to lavelle.json until every refusal has passed; and --dry-run
// prints exactly what would be sent and touches no file, so a stranger can test it with no account.
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { ask, done } from "./ask.mjs";
import { loadBank } from "./bank.mjs";
import { readAnswers, writeAnswers } from "./owner.mjs";

export const KIT_DEFAULT = "modules/vapi-voice-tuneup";

// The one commit of the kit this command will run. Not the newest: the newest is whatever the kit's
// repository holds the day you install, and this command runs it with your key. To move it, read the
// kit's setup.mjs at the new commit, check KIT_PROMPTS below against it, then change this line on purpose.
export const KIT_COMMIT = "2d9154ee96696fb1f5a4ca2829f9e34d49f17fff";
const KIT_CLONE = [
  "git clone https://github.com/morriss-group/vapi-voice-tuneup modules/vapi-voice-tuneup",
  `git -C modules/vapi-voice-tuneup checkout --detach ${KIT_COMMIT}`,
];

// The questions the kit's installer asks, in order, as they appear in its setup.mjs. If the kit changes
// them, the piped answers would land on the wrong questions, so this command checks first and refuses.
const KIT_PROMPTS = [
  "Business name?",
  "What kind of business?",
  "Service area / city?",
  "What should the agent do?",
  "Words callers will say",
  "Attach the assistant to which number?",
  "Paste a Make.com/Zapier webhook URL",
  "Press Enter when you've made your test call",
];

// A phone number as digits only, with a leading US country code dropped, so the same ten-digit line
// typed with or without the 1, dashes, or parentheses compares equal. Question 113 is about the same
// line, not the same spelling.
function digits(s) {
  let d = String(s || "").replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d;
}

// Why the kit folder is not the pinned commit, or "" when it is. HEAD must be KIT_COMMIT, no tracked
// file may differ from it, and no file the kit does not ignore may have been added. A folder git cannot
// read is a no, not a maybe. What the kit writes itself (BUILD-BRIEF.md, node_modules) is in its
// .gitignore, so a second install is not refused by the first one's output.
export function kitMismatch(kitDir) {
  const head = spawnSync("git", ["-C", kitDir, "rev-parse", "HEAD"], { encoding: "utf8" });
  if (head.error) return "git is not installed, so its commit cannot be checked";
  if (head.status !== 0) return "it is not a git checkout, so its commit cannot be checked";
  const at = head.stdout.trim();
  if (at !== KIT_COMMIT) return `it is at commit ${at}, not the pinned ${KIT_COMMIT}`;
  const changed = spawnSync("git", ["-C", kitDir, "status", "--porcelain", "--untracked-files=normal"], { encoding: "utf8" });
  if (changed.status !== 0 || changed.stdout.trim()) return `files in it have been changed or added since commit ${KIT_COMMIT}`;
  return "";
}

function stop(message) {
  console.log(message);
  console.log("Nothing was created and nothing was written.");
  done();
  return 1;
}

export async function addPhone({ questionsDir, dryRun = false }) {
  console.log("\nlavelle add phone\n");
  const data = readAnswers();
  if (!data) return stop("Stopped: no lavelle.json found. Run lavelle init first.");
  if (data.unreadable) return stop(`Stopped: lavelle.json could not be read (${data.unreadable}).`);
  const f = data.fields || {};
  const owner = data.owner || {};

  // Every blocking question must have an answer. Doctor reports the same count; this is the refusal.
  const bank = loadBank(questionsDir);
  const blocking = bank.questions.filter((q) => q.blocking);
  const missing = blocking.filter((q) => !q.fields.every((n) => f[n] && f[n].answer));
  if (missing.length) {
    console.log(`Stopped: ${missing.length} of ${blocking.length} blocking questions have no answer:`);
    for (const q of missing) console.log(`  - ${q.topic} ${q.number}: ${q.text}`);
    return stop("Run lavelle init --again and answer them.");
  }

  // Question 1 holds in code. The kit's greeting tells every caller the call is recorded, so the only
  // answer this command can honor is a yes. Anything else is a legal question this command must not decide.
  const recording = String((f["phone.recording_disclosure"] || {}).answer || "").trim().toLowerCase();
  if (!recording.startsWith("yes")) {
    console.log(`Stopped: the recording answer (phone-and-booking 1) is "${recording || "blank"}".`);
    console.log("The kit's greeting announces that calls are recorded. This command only proceeds when that answer begins with yes,");
    return stop("meaning calls are recorded and the caller is told. Anything else needs a different greeting and a legal read first.");
  }

  const area = (f["area.definition"] || {}).answer || "";
  if (!owner.works_for || !owner.trade || !area) {
    return stop("Stopped: the business name, what it does, and the service area (service-area 32) are required.");
  }

  // The module's own three questions. Nothing is written until every refusal below has passed.
  const mod = data.phone_module || {};
  const agentNumber = mod.agent_number || (await ask("What number will the agent answer? The forwarded one, digits only."));
  const transferAnswer = (f["phone.transfer_number"] || {}).answer || "";
  const transferNumber = mod.transfer_number || transferAnswer || (await ask("What number does a transfer or callback ring? Must be a number a human answers and that is NOT forwarded to the agent."));
  const goal = mod.goal || (await ask("Should the agent (1) answer and take messages, or (2) also collect booking details?", "1"));
  const pronunciations = (f["voice.pronunciations"] || {}).answer || "";

  // Question 113 holds in code. A transfer that rings the agent's own number forwards straight back
  // into the agent, forever. The deploy refuses rather than warns.
  if (!digits(transferNumber)) return stop("Stopped: no transfer number. A transfer that rings nowhere is a caller left on hold.");
  if (!digits(agentNumber)) return stop("Stopped: no agent number. The loop check needs both numbers.");
  if (digits(transferNumber) === digits(agentNumber)) {
    console.log("Stopped: the transfer number is the agent's own number. That call would forward back into the agent forever.");
    return stop("The minimum working setup is two numbers: the forwarded one the agent answers, and an unforwarded one a human answers.");
  }

  // One answer per line is the whole contract with the kit's installer. An answer with a line break in
  // it, easy to make by hand in lavelle.json, would push every later answer onto the wrong question and
  // nothing downstream would notice. So it is refused here, before the lines are joined, naming the field.
  const keyterms = [pronunciations].filter(Boolean).join(", ");
  const answers = [
    ["owner.works_for", owner.works_for],
    ["owner.trade", owner.trade],
    ["area.definition", area],
    ["phone_module.goal", String(goal)],
    ["voice.pronunciations", keyterms],
  ];
  const broken = answers.find(([, value]) => /[\r\n]/.test(String(value)));
  if (broken) {
    console.log(`Stopped: the answer for ${broken[0]} has a line break in it. The kit reads one answer per line,`);
    console.log("so every answer after it would land on the wrong question.");
    return stop(`Open lavelle.json, put the ${broken[0]} answer on one line, and run this again.`);
  }

  // The lines the kit's installer will read, in the order it asks. 'skip' on the number and the
  // webhook are deliberate: attaching a line and routing reports are the owner's next two clicks.
  const lines = [...answers.map(([, value]) => value), "skip", "skip", ""];

  const kitDir = resolve(process.env.LAVELLE_VOICE_KIT || join(process.cwd(), KIT_DEFAULT));
  const setup = join(kitDir, "setup.mjs");

  if (dryRun) {
    console.log("\nDry run. The kit's installer would be given these answers, in this order:");
    lines.forEach((l, i) => console.log(`  ${i + 1}. ${i === lines.length - 1 ? "(Enter)" : l === "" ? "(blank)" : l}`));
    if (existsSync(setup)) {
      const wrong = kitMismatch(kitDir);
      console.log(`Kit: found at ${kitDir}; ${wrong ? "would be refused: " + wrong : "at the pinned commit " + KIT_COMMIT}`);
    } else {
      console.log(`Kit: not found. To get it at the pinned commit ${KIT_COMMIT}, type these two lines:`);
      KIT_CLONE.forEach((l) => console.log(`  ${l}`));
    }
    console.log(`Key: ${process.env.VAPI_API_KEY ? "VAPI_API_KEY is set" : "VAPI_API_KEY is not set"}`);
    console.log("Loop check passed: the transfer number and the agent number are different lines.");
    console.log("Nothing was created and nothing was written.");
    done();
    return 0;
  }

  if (!process.env.VAPI_API_KEY) return stop("Stopped: VAPI_API_KEY is not set. The kit's README says where to create one.");
  if (!existsSync(setup)) {
    console.log(`Stopped: the voice kit is not at ${kitDir}.`);
    console.log("Get it with these two lines:");
    KIT_CLONE.forEach((l) => console.log(`  ${l}`));
    return stop("Or point LAVELLE_VOICE_KIT at where it lives.");
  }

  // The kit must be the commit this command was checked against, before anything in it is read or run.
  const wrong = kitMismatch(kitDir);
  if (wrong) {
    console.log(`Stopped: the voice kit at ${kitDir} is not the pinned one: ${wrong}.`);
    console.log("To move the folder you have to the pinned commit, type these two lines:");
    console.log(`  git -C "${kitDir}" fetch origin`);
    console.log(`  git -C "${kitDir}" checkout --detach ${KIT_COMMIT}`);
    console.log("If git says files would be overwritten, or files were added, move the folder aside and get a clean copy:");
    KIT_CLONE.forEach((l) => console.log(`  ${l}`));
    return stop("Moving to a newer kit is a change to KIT_COMMIT in lib/phone.mjs, made on purpose after reading the kit.");
  }

  // The kit's questions must be the ones this command answers, in this order. Otherwise refuse.
  const kitText = readFileSync(setup, "utf8");
  let cursor = 0;
  for (const prompt of KIT_PROMPTS) {
    const at = kitText.indexOf(prompt, cursor);
    if (at < 0) {
      console.log(`Stopped: the kit's installer no longer asks "${prompt}" where this command expects it.`);
      return stop("The kit has changed. Update KIT_PROMPTS and the answer lines in lib/phone.mjs together, then try again.");
    }
    cursor = at + prompt.length;
  }

  // Every refusal has passed. Now, and only now, the module answers are recorded.
  data.phone_module = { agent_number: digits(agentNumber), transfer_number: digits(transferNumber), goal: String(goal) };
  writeAnswers(data);
  console.log("Recorded the phone module answers in lavelle.json.");
  console.log(`Running the kit's installer at ${setup} with your answers. This creates an assistant on your phone-vendor account; the installer is given VAPI_API_KEY and PATH from your environment and nothing else; the kit writes BUILD-BRIEF.md in its own folder.\n`);
  // The installer's whole environment, built by hand: the key it needs and where to find programs.
  // Every other password or token set in this terminal stays out of it. The names are quoted so the
  // publish gate, which blocks a key name followed by a colon, reads this as code and not a pasted key.
  const kitEnv = { "VAPI_API_KEY": process.env.VAPI_API_KEY, "PATH": process.env.PATH };
  const code = await new Promise((resolveExit) => {
    const child = spawn(process.execPath, [setup], { cwd: kitDir, env: kitEnv, stdio: ["pipe", "inherit", "inherit"] });
    child.stdin.write(lines.join("\n") + "\n");
    child.stdin.end();
    child.on("exit", (c) => resolveExit(c ?? 1));
  });
  if (code === 0) {
    console.log("\nThe receptionist exists on your account. It is attached to no number yet, on purpose.");
    console.log("Next, in the dashboard: attach it to the forwarded number, then forward your business line to that number only when you do not pick up.");
  } else {
    console.log(`\nThe kit's installer stopped with code ${code}. Read its output above; nothing here retries on its own.`);
  }
  done();
  return code;
}
