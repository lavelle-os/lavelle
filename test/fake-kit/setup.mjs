// A stand-in for the voice kit's installer, used by test/run.sh and nothing else. It creates nothing
// and calls nothing. It names the kit's eight questions in order, so lavelle's drift check passes on
// it, and it writes what it was given to received.json beside itself: every line that arrived on its
// input, and the NAMES of the variables in its environment, never their values.
// A veteran would call it a recording stub and find it ordinary. The owner's choice in it: the test
// proves what reached the installer by asking the installer, not by reading what lavelle printed.
import { writeFileSync } from "node:fs";

const QUESTIONS = [
  "Business name?",
  "What kind of business?",
  "Service area / city?",
  "What should the agent do?",
  "Words callers will say",
  "Attach the assistant to which number?",
  "Paste a Make.com/Zapier webhook URL",
  "Press Enter when you've made your test call",
];

let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  const received = { lines: input.split("\n"), env: Object.keys(process.env).sort() };
  writeFileSync(new URL("./received.json", import.meta.url), JSON.stringify(received, null, 2));
  console.log(`fake kit: received ${received.lines.length - 1} lines for ${QUESTIONS.length} questions; wrote received.json`);
});
