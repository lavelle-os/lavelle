// phone.mjs is `lavelle add phone`: it stands up the AI receptionist from the answers already given,
// by driving the voice kit's own installer (vapi-voice-tuneup, setup.mjs) with piped answers instead
// of asking the owner the same things twice. It refuses to run without a key, without the kit, or
// when the answers describe a phone that would loop into itself. A veteran would call it a thin
// adapter that spawns a child process with a stdin script, and find it ordinary. The owner's choices
// in it: the transfer-loop check refuses instead of warning (question 113 in the bank, holds: code),
// no live number is ever attached by this command (the kit's own rule: overflow first, never the
// real line on day one), and --dry-run prints exactly what would be sent so a stranger can test it
// with no account at all.
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { ask, done } from "./ask.mjs";
import { readAnswers, writeAnswers } from "./owner.mjs";

const KIT_DEFAULT = "modules/vapi-voice-tuneup";
const KIT_CLONE = "git clone https://github.com/morriss-group/vapi-voice-tuneup modules/vapi-voice-tuneup";

function digits(s) {
  return String(s || "").replace(/\D/g, "");
}

export async function addPhone({ dryRun = false }) {
  console.log("\nlavelle add phone\n");
  const data = readAnswers();
  if (!data) {
    console.log("Stopped: no lavelle.json found. Run lavelle init first.");
    done();
    return 1;
  }
  const f = data.fields || {};
  const owner = data.owner || {};
  const area = (f["area.definition"] || {}).answer || "";
  if (!owner.works_for || !owner.trade || !area) {
    console.log("Stopped: the business name, what it does, and the service area (service-area 32) are required.");
    done();
    return 1;
  }

  // The module's own three questions, kept in lavelle.json under phone.module.*
  const mod = data.phone_module || {};
  const agentNumber = mod.agent_number || (await ask("What number will the agent answer? The forwarded one, digits only."));
  const transferAnswer = (f["phone.transfer_number"] || {}).answer || "";
  const transferNumber = mod.transfer_number || transferAnswer || (await ask("What number does a transfer or callback ring? Must be a number a human answers and that is NOT forwarded to the agent."));
  const goal = mod.goal || (await ask("Should the agent (1) answer and take messages, or (2) also collect booking details?", "1"));
  const pronunciations = (f["voice.pronunciations"] || {}).answer || "";

  // Question 113, holds: code. A transfer that rings the agent's own number forwards straight back
  // into the agent, forever. The deploy refuses rather than warns.
  if (!digits(transferNumber)) {
    console.log("Stopped: no transfer number. A transfer that rings nowhere is a caller left on hold.");
    done();
    return 1;
  }
  if (digits(transferNumber) === digits(agentNumber)) {
    console.log("Stopped: the transfer number is the agent's own number. That call would forward back into the agent forever.");
    console.log("The minimum working setup is two numbers: the forwarded one the agent answers, and an unforwarded one a human answers.");
    done();
    return 1;
  }

  data.phone_module = { agent_number: digits(agentNumber), transfer_number: digits(transferNumber), goal: String(goal) };
  writeAnswers(data);
  console.log("Recorded the phone module answers in lavelle.json.");

  // The lines the kit's installer will read, in the order it asks. 'skip' on the number and the
  // webhook are deliberate: attaching a line and routing reports are the owner's next two clicks.
  const keyterms = [pronunciations].filter(Boolean).join(", ");
  const lines = [
    owner.works_for,
    owner.trade,
    area,
    String(goal),
    keyterms,
    "skip",
    "skip",
    "",
  ];

  const kitDir = resolve(process.env.LAVELLE_VOICE_KIT || join(process.cwd(), KIT_DEFAULT));
  const setup = join(kitDir, "setup.mjs");

  if (dryRun) {
    console.log("\nDry run. The kit's installer would be given these answers, in this order:");
    lines.forEach((l, i) => console.log(`  ${i + 1}. ${l === "" ? "(Enter)" : l}`));
    console.log(`Kit: ${existsSync(setup) ? "found at " + kitDir : "not found; to get it: " + KIT_CLONE}`);
    console.log(`Key: ${process.env.VAPI_API_KEY ? "VAPI_API_KEY is set" : "VAPI_API_KEY is not set"}`);
    console.log("Nothing was created.");
    done();
    return 0;
  }

  if (!process.env.VAPI_API_KEY) {
    console.log("Stopped: VAPI_API_KEY is not set. The kit's README says where to create one. Nothing was created.");
    done();
    return 1;
  }
  if (!existsSync(setup)) {
    console.log(`Stopped: the voice kit is not at ${kitDir}.`);
    console.log(`Get it with:  ${KIT_CLONE}`);
    console.log("Or point LAVELLE_VOICE_KIT at where it lives. Nothing was created.");
    done();
    return 1;
  }

  console.log(`Running the kit's installer at ${setup} with your answers.\n`);
  const code = await new Promise((resolveExit) => {
    const child = spawn(process.execPath, [setup], { cwd: kitDir, env: process.env, stdio: ["pipe", "inherit", "inherit"] });
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
