// bank.mjs reads the question bank in questions/ and turns it into a list the installer can ask.
// Every entry in the bank has the same four-line shape (see questions/README.md), so this is a
// line-by-line read, not a markdown parser. A veteran would call it two regular expressions over
// a text file and find it ordinary. The owner's choice in it: the prose is the source of truth.
// There is no second copy of the questions in code, because two copies drift, and the bank's own
// README says a question that cannot name what it writes is not in the bank, so an entry without
// a "Writes" line is skipped and reported, never guessed at.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const TOPIC_FILES = [
  "phone-and-booking.md",
  "scheduling-and-capacity.md",
  "pricing-and-money.md",
  "service-area.md",
  "parts-and-suppliers.md",
  "customer-communication.md",
  "trade-knowledge.md",
  "brand-and-voice.md",
  "accounts-and-tools.md",
];

const QUESTION_LINE = /^\*\*(\d+)\.\s+(.+?)\*\*\s*$/;
const WRITES_LINE = /^Writes\s+(.+?)\.\s+Default:\s+(.+?)\s+Holds:\s+(code|prompt)\./;

// loadBank(dir) -> { questions: [...], skipped: [...] }
// Each question: { file, topic, number, text, fields, fallback, holds, blocking }
export function loadBank(questionsDir) {
  const questions = [];
  const skipped = [];
  for (const file of TOPIC_FILES) {
    const path = join(questionsDir, file);
    let lines;
    try {
      lines = readFileSync(path, "utf8").split("\n");
    } catch {
      skipped.push(`${file}: could not read`);
      continue;
    }
    const topic = file.replace(".md", "");
    for (let i = 0; i < lines.length; i++) {
      const head = lines[i].match(QUESTION_LINE);
      if (!head) continue;
      const number = Number(head[1]);
      const rawText = head[2];
      const blocking = /\[BLOCKING\]/.test(rawText);
      const text = rawText.replace(/\s*\[BLOCKING(?:-adjacent)?\]/g, "").trim();
      const writes = (lines[i + 1] || "").match(WRITES_LINE);
      if (!writes) {
        skipped.push(`${file} question ${number}: no "Writes ... Default ... Holds" line`);
        continue;
      }
      const fields = [...writes[1].matchAll(/`([^`]+)`/g)].map((m) => m[1]);
      const fallbackText = writes[2].trim();
      const fallback = /^none\b/i.test(fallbackText) ? "" : fallbackText;
      questions.push({ file, topic, number, text, fields, fallback, holds: writes[3], blocking });
    }
  }
  return { questions, skipped, topics: TOPIC_FILES.map((f) => f.replace(".md", "")) };
}
