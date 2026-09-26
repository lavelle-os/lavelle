// ask.mjs asks one question and returns one answer.
// Interactive in a terminal. When input is piped, it reads one answer per line, so every
// installer here can be driven by a text file and tested without a person at the keyboard.
// A veteran would call this a readline wrapper with a piped-input fallback and find it ordinary.
// The owner's choice in it: a blank answer is returned as the default, never as an error,
// because the question bank says a blank is configuration and a guess is a wrong system.
import { createInterface } from "node:readline/promises";

const tty = process.stdin.isTTY;
const rl = tty ? createInterface({ input: process.stdin, output: process.stdout }) : null;

let piped = null;
let pipedIndex = 0;

async function readPiped() {
  if (piped !== null) return;
  piped = await new Promise((resolve) => {
    let buffer = "";
    process.stdin.on("data", (chunk) => (buffer += chunk));
    process.stdin.on("end", () => resolve(buffer.split("\n")));
  });
}

// ask(question, fallback) -> the typed answer, or the fallback when the answer is blank.
export async function ask(question, fallback = "") {
  const shown = fallback ? `${question} [${fallback}] ` : `${question} `;
  let answer;
  if (tty) {
    answer = (await rl.question(shown)).trim();
  } else {
    await readPiped();
    answer = (piped[pipedIndex++] ?? "").trim();
    console.log(shown + answer);
  }
  return answer || fallback;
}

export function done() {
  if (rl) rl.close();
}
