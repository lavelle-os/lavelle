// doctor.mjs is `lavelle doctor`: it says what exists, what is missing, and what it could not
// reach, and changes nothing. Every line is one of three words: ok, missing, or unreachable.
// A veteran would call it a health check with no side effects and find it ordinary. The owner's
// choice in it: it prints the count of blocking questions answered out of the total, because
// that one number is what decides whether anything else is allowed to run.
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadBank } from "./bank.mjs";
import { readAnswers, readOwnerFile, homeDir, ownerPath, answersPath } from "./owner.mjs";

export function doctor({ questionsDir }) {
  console.log("\nlavelle doctor\n");
  const rows = [];
  const say = (label, state, detail = "") => rows.push([label, state, detail]);

  say("node", "ok", process.version);
  say("install folder", existsSync(homeDir()) ? "ok" : "missing", homeDir());

  const ownerText = readOwnerFile();
  say("owner.md", ownerText ? "ok" : "missing", ownerPath());
  if (ownerText) {
    const line = ownerText.split("\n").find((l) => /^(level|elevated|low|unknown)$/.test(l.trim()));
    say("owner check-in", line ? "ok" : "missing", line ? line.trim() : "no one-word check-in found");
  }

  let data = readAnswers();
  if (data && data.unreadable) {
    say("lavelle.json", "unreachable", `${answersPath()} exists but is not readable JSON: ${data.unreadable}`);
    data = null;
  } else {
    say("lavelle.json", data ? "ok" : "missing", answersPath());
  }

  let bank;
  try {
    bank = loadBank(questionsDir);
    say("question bank", "ok", `${bank.questions.length} questions, ${bank.skipped.length} skipped`);
  } catch (e) {
    say("question bank", "unreachable", e.message);
  }

  if (data && bank) {
    const blocking = bank.questions.filter((q) => q.blocking);
    const answered = blocking.filter((q) => q.fields.every((n) => (data.fields || {})[n] && (data.fields || {})[n].answer));
    say("blocking answered", answered.length === blocking.length ? "ok" : "missing", `${answered.length} of ${blocking.length}`);
    const byTopic = {};
    for (const q of bank.questions) {
      const t = (byTopic[q.topic] ||= { answered: 0, total: 0 });
      t.total += 1;
      if (q.fields.some((n) => ((data.fields || {})[n] || {}).how === "answered")) t.answered += 1;
    }
    for (const [topic, t] of Object.entries(byTopic)) say(`  ${topic}`, "ok", `${t.answered} of ${t.total} answered, rest on defaults`);
    say("phone module", data.phone_module ? "ok" : "missing", data.phone_module ? "agent and transfer numbers recorded" : "run lavelle add phone");
  }

  const kitDir = resolve(process.env.LAVELLE_VOICE_KIT || join(process.cwd(), "modules/vapi-voice-tuneup"));
  say("voice kit", existsSync(join(kitDir, "setup.mjs")) ? "ok" : "missing", kitDir);
  say("VAPI_API_KEY", process.env.VAPI_API_KEY ? "ok" : "missing", process.env.VAPI_API_KEY ? "set (value not shown)" : "not set");

  const width = Math.max(...rows.map((r) => r[0].length));
  for (const [label, state, detail] of rows) {
    console.log(`${label.padEnd(width)}  ${state.padEnd(11)} ${detail}`);
  }
  const missing = rows.filter((r) => r[1] === "missing" || r[1] === "unreachable").length;
  console.log(`\n${missing === 0 ? "Everything this command can see is in place." : `${missing} item(s) missing or unreachable. Nothing was changed.`}`);
  // Exit 1 when anything is missing, so a script can ask doctor a yes-or-no question. It still changes nothing.
  return missing === 0 ? 0 : 1;
}
