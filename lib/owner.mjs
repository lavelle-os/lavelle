// owner.mjs reads and writes the two files an install produces:
//   owner.md      the one file every agent reads first: who it works for, what it may never
//                 touch, how the owner is doing today.
//   lavelle.json  every answered question, by the field name the bank says it writes.
// A veteran would call this a pair of serializers and find it ordinary. The owner's choice in
// it: the check-in in owner.md is one word, never a note, because that file will be read by
// every agent and a note about a person does not belong in front of every agent.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

// Where an install lives: LAVELLE_HOME, or a folder named lavelle in the current directory.
export function homeDir() {
  return resolve(process.env.LAVELLE_HOME || join(process.cwd(), "lavelle"));
}

export function ownerPath() {
  return join(homeDir(), "owner.md");
}

export function answersPath() {
  return join(homeDir(), "lavelle.json");
}

export function ensureHome() {
  mkdirSync(homeDir(), { recursive: true });
}

// null when there is no file; an object with "unreadable" set when the file exists but is not JSON.
// A report that cannot read its input says so; it does not throw a stack trace at the owner.
export function readAnswers() {
  if (!existsSync(answersPath())) return null;
  try {
    return JSON.parse(readFileSync(answersPath(), "utf8"));
  } catch (e) {
    return { unreadable: e.message };
  }
}

export function writeAnswers(data) {
  ensureHome();
  writeFileSync(answersPath(), JSON.stringify(data, null, 2) + "\n");
}

// The three things, in the order the README says them.
export function writeOwnerFile({ worksFor, trade, neverTouch, checkIn }) {
  ensureHome();
  const lines = [
    "# Owner",
    "",
    "*The file every agent reads before anything else. Three things, kept short on purpose.*",
    "",
    "## Who the agents work for",
    "",
    `${worksFor}, ${trade}.`,
    "",
    "## What they may never touch",
    "",
    ...neverTouch.map((item) => `- ${item}`),
    "",
    "## How the owner is doing today",
    "",
    `${checkIn}`,
    "",
    "One word: level, elevated, low, or unknown. Level means full authority. Elevated or after dark",
    "means capture only. Low means no verdicts asked of the owner. Unknown is treated as elevated.",
    "",
  ];
  writeFileSync(ownerPath(), lines.join("\n"));
}

export function readOwnerFile() {
  if (!existsSync(ownerPath())) return null;
  return readFileSync(ownerPath(), "utf8");
}
