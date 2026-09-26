// init.mjs is `lavelle init`: the setup conversation, run in the terminal, one question at a time.
// It asks the three owner-file things, then every blocking question in the bank, then offers each
// topic in turn. It writes owner.md and lavelle.json and nothing else. It creates no accounts,
// touches no phone line, and needs no key. A veteran would call it a questionnaire that writes JSON
// and find it ordinary. The owner's choices in it: a blank is an answer (the bank's default), a
// blocking question with no answer stops the install instead of guessing, and the last line it
// prints is the first thing that will go wrong, which is how every chapter in docs/ ends too.
import { ask, done } from "./ask.mjs";
import { loadBank } from "./bank.mjs";
import { readAnswers, writeAnswers, writeOwnerFile, homeDir, answersPath, ownerPath } from "./owner.mjs";

const CHECK_IN_WORDS = ["level", "elevated", "low", "unknown"];

export async function init({ questionsDir, again = false }) {
  console.log("\nlavelle init\n");
  console.log(`Install folder: ${homeDir()}`);

  const existing = readAnswers();
  if (existing && !again) {
    console.log(`Stopped: ${answersPath()} already exists. Run again with --again to start over.`);
    console.log("Nothing was changed.");
    done();
    return 1;
  }

  const bank = loadBank(questionsDir);
  for (const line of bank.skipped) console.log(`bank: skipped ${line}`);
  const blocking = bank.questions.filter((q) => q.blocking);
  console.log(`Question bank: ${bank.questions.length} questions in ${bank.topics.length} topics, ${blocking.length} of them blocking.\n`);

  // The owner file: three things.
  console.log("Part 1 of 3: the owner file. Three things every agent reads first.\n");
  const worksFor = await ask("Who do the agents work for? The business name, as a caller would say it.");
  const trade = await ask("What is the business, in a few words? (for example: an appliance repair shop in Alabama)");
  const neverRaw = await ask("What may the agents never touch? Comma-separated. (for example: the bank account, the tax filings, any customer's record outside a booked job)");
  const neverTouch = neverRaw.split(",").map((s) => s.trim()).filter(Boolean);
  let checkIn = (await ask("How is the owner doing today? One word: level, elevated, low, or unknown.", "unknown")).toLowerCase();
  if (!CHECK_IN_WORDS.includes(checkIn)) {
    console.log(`"${checkIn}" is not one of the four words; recorded as unknown, which is treated as elevated.`);
    checkIn = "unknown";
  }
  if (!worksFor || !trade) {
    console.log("Stopped: the business name and what it does are required. Nothing was written.");
    done();
    return 1;
  }

  // Blocking questions: no default exists, so a blank is not an answer.
  console.log(`\nPart 2 of 3: the ${blocking.length} blocking questions. These have no default; nothing runs until each has an answer.\n`);
  const fields = {};
  const unanswered = [];
  for (const q of blocking) {
    const answer = await ask(`[${q.topic} ${q.number}] ${q.text}`);
    if (!answer) {
      unanswered.push(`${q.topic} ${q.number}: ${q.text}`);
      continue;
    }
    record(fields, q, answer, "answered");
  }
  if (unanswered.length) {
    console.log(`\nStopped: ${unanswered.length} blocking question(s) have no answer. Nothing was written.`);
    for (const u of unanswered) console.log(`  - ${u}`);
    done();
    return 1;
  }

  // The rest, topic by topic. Skipping a topic means every question in it takes its default.
  console.log("\nPart 3 of 3: the topics. Say yes to answer a topic now, or skip to take the defaults.\n");
  const counts = { answered: blocking.length, defaulted: 0, skippedTopics: 0 };
  for (const topic of bank.topics) {
    const list = bank.questions.filter((q) => q.topic === topic && !q.blocking);
    if (!list.length) continue;
    const go = (await ask(`${topic}: ${list.length} questions. Answer them now? (yes/skip)`, "skip")).toLowerCase();
    if (go !== "yes" && go !== "y") {
      for (const q of list) record(fields, q, q.fallback, "default");
      counts.defaulted += list.length;
      counts.skippedTopics += 1;
      continue;
    }
    for (const q of list) {
      const answer = await ask(`[${q.topic} ${q.number}] ${q.text}`, q.fallback);
      const how = answer === q.fallback ? "default" : "answered";
      record(fields, q, answer, how);
      counts[how === "answered" ? "answered" : "defaulted"] += 1;
    }
  }

  writeOwnerFile({ worksFor, trade, neverTouch, checkIn });
  writeAnswers({
    version: 1,
    written_at: new Date().toISOString(),
    owner: { works_for: worksFor, trade, never_touch: neverTouch, check_in: checkIn },
    fields,
  });

  console.log(`\nWrote ${ownerPath()}`);
  console.log(`Wrote ${answersPath()}`);
  console.log(`Answered ${counts.answered}, took the default on ${counts.defaulted}, skipped ${counts.skippedTopics} topic(s) whole.`);
  console.log("Next: lavelle doctor, then lavelle add phone.");
  console.log("\nThe first thing that will go wrong: you answered a question the way you wish the shop worked rather than the way it works. Open lavelle.json and read your answers as a caller would.");
  done();
  return 0;
}

function record(fields, q, answer, how) {
  for (const name of q.fields) {
    fields[name] = {
      answer,
      how,
      holds: q.holds,
      blocking: q.blocking,
      from: `${q.topic} ${q.number}`,
    };
  }
}
