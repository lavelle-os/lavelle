# Install

*The first thing in these notes that runs. One command asks four questions for the owner file and then the shop questions from chapter 11, writes two files, and stands up the phone from the answers. Chapter 10's thirty questions are not in it yet. Everything before this chapter was a method. This is the method with a hand on it.*

**Status: built 2026-09-26, run end to end with an invented shop and no network on the machine it was written on and on a second machine the same day (an Ubuntu server, node 18, a fresh folder), not yet run by a second person.** The command lives in `bin/lavelle` with its parts in `lib/`. The test in `test/run.sh` is the proof that exists: twenty checks, passing on both machines. The half of the stranger test that matters is the person, not the machine: someone who did not build it, typing the two commands and writing down what broke. Until that has happened, "built" means "runs for the person who built it, in two places," which is only a little stronger than the weakest thing that word can mean.

## What it is

One command, three verbs, no dependencies beyond node. The verbs are named for what they do and there is no default verb; run it bare and it prints the list and stops.

| Verb | What it does |
| --- | --- |
| `lavelle init` | asks the questions, writes `owner.md` and `lavelle.json` |
| `lavelle add phone` | stands up the receptionist from those answers |
| `lavelle doctor` | says what exists, what is missing, what could not be reached |

The files go in a folder named `lavelle` in the current directory, or wherever `LAVELLE_HOME` points. For `init` and `doctor` that is the whole story: nothing is written anywhere else, no account is touched, and nothing leaves the machine. `add phone` is different and the chapter says so plainly: on a live run it hands the key from the environment to the voice kit's installer, which creates an assistant on the owner's account with the phone vendor and writes a build brief into the kit's own folder. No file here ever stores the key. The command holds none of the owner's data because it never has any; the answers sit in a folder the owner can read with any text editor.

## What init asks, and in what order

Three parts, in the order chapter 1 says the owner file goes.

**The owner file first.** Three things in four questions: who the agents work for and what the business is, what the agents may never touch, and how the owner is doing today. That last one is a single word, level, elevated, low or unknown, and anything else is recorded as unknown, which is treated as elevated. It is a word and not a note on purpose: this file will be read by every agent, and a note about a person does not belong in front of every agent. This is the one-page front of what chapter 8 calls the operator profile; the rest of that profile is not asked here.

**The blocking questions second.** Chapter 11 names seventeen questions with no default. The command reads them straight from the files in `questions/`; there is no second copy of the bank in code, because two copies drift. A blocking question with no answer stops the install and nothing is written, with the list of what was left blank. That is the rule from chapter 11 made mechanical: a blank is configuration, a guess is a wrong system, and a blocking blank is neither, it is a stop.

**The rest, topic by topic.** Nine topics, each offered once. Skip a topic and every question in it takes the bank's default, marked as a default and not a decision. Answer a topic and each question shows its default in brackets, so a blank keeps it.

At the end it prints what it wrote, how many answers were given, how many defaults were taken, and one more line. The last line is the first thing that will go wrong, which is how every chapter here ends, and it is the same one chapter 11 names: you answered a question the way you wish the shop worked.

## What add phone does, and what it refuses

The receptionist is built by the voice kit's own installer, the one in the linked phone repository. `add phone` does not reimplement it. It reads `lavelle.json`, asks the three things the kit needs that the bank does not hold (the number the agent answers, the number a transfer rings, whether the agent books or only takes messages), and then runs the kit's installer with those answers piped in, in the order the kit asks. The owner answers each question once, in one place.

Six refusals, in the order they are checked. Nothing is written to `lavelle.json` until all six have passed.

- **Any of the seventeen blocking answers missing: refused.** The same count `doctor` prints. Nothing else is allowed to run without it.
- **The recording answer is not a yes: refused.** This is question 1, and it holds in code. The kit's greeting tells every caller the call is recorded, so the only answer this command can honor is "yes, and the caller is told." Any other answer is a legal question this command must not decide for the owner.
- **No transfer number, no install.** A transfer that rings nowhere is a caller on hold.
- **The transfer number is the agent's own number: refused, not warned.** This is question 113. A business line forwarded to the agent, with the agent told to transfer to the business line, forwards straight back into the agent, and it does that forever. The two numbers are compared as digits with a leading US country code dropped, so the same line spelled two ways is still the same line. The minimum working setup is two numbers: the forwarded one the agent answers, and an unforwarded one a human answers.
- **No key in the environment, or no kit on disk: refused.** The key is read from `VAPI_API_KEY` and nowhere else, and is never written to a file by anything here. The kit is looked for in `modules/vapi-voice-tuneup` or wherever `LAVELLE_VOICE_KIT` points, and the command prints the clone line if it is absent.
- **The kit's questions have moved: refused.** The command reads the kit's installer before running it and checks that the eight questions it answers are still there, in order. A kit that adds or reorders a question would otherwise take every later answer for the wrong question, and this command would never know.

**What went wrong, 2026-09-15.** The operator's own transfer had gone to an entirely separate phone for months, and nobody writing the bank had known that was load-bearing until he pointed it out. The rule was written that day, and the deploy was told to refuse rather than warn, because a warning about a loop is read after the loop has started.

Two things it will not do. It never attaches the assistant to a live number; the kit prints the numbers on the account and this command answers "skip," because the kit's own rule is overflow first, never the real line on day one, and that is a click the owner makes in the dashboard with the receptionist already tested. And it never sets up call reports; that is the owner's next click too.

`add phone --dry-run` prints the exact answers it would send, says whether the kit and the key are present, and creates nothing. A stranger with no account can run it and see what would happen. A wizard that cannot be run by a stranger is a demo.

## What doctor does

Nothing. It reads and reports. Every line is one of three words: ok, missing, or unreachable. It shows the install folder, the two files, the one-word check-in, the bank's count, how many of the seventeen are answered, each topic's answered-versus-default count, whether the phone module has been run, whether the kit is where the command expects it, and whether the key is set, without showing the key. The number that matters is the seventeen, because that one decides whether anything else is allowed to run.

## Piped input

Every question can be answered from a file: one line per answer, in the order asked. That is how the test runs and how the install can be repeated on a second machine without a person at the keyboard. The order is the bank's order, blocking questions first and topics after, so a change to the bank that adds or removes a blocking question moves every line after it. The test fixture in `test/answers-init.txt` is written for the bank as it stands on the date above. No incident under this one yet; a rule with no incident under it is suspect, and this is one.

## Known failure modes

- **The stranger test is half done.** Everything above was run by its author, on the machine it was written on and on a second one. The status line says so and stays that way until a second person has typed the two commands and written down what broke. A second machine proves the code is portable. Only a second person proves the questions are answerable.
- **The bank and the code drift.** The code reads the prose, so a question written without its "Writes" line is skipped and reported, not guessed at. But a renamed field or a reordered file changes what `lavelle.json` holds, and `add phone` reads three fields by name. A bank edit is a code edit now, and chapter 11's rule that every question names what it writes is the only thing holding the two together.
- **The owner answers for the shop he is building.** Same as chapter 11, and worse here, because the answer now runs. The read-back after `init` is where it gets caught, if it gets caught.
- **Piped answers shift.** Add a blocking question to the bank and every fixture written before it answers the wrong questions from that line down, quietly. The test will fail, which is the point of the test, and the fixture will need one line inserted in the right place.
- **The kit is not there.** `add phone` looks in `modules/vapi-voice-tuneup` or where `LAVELLE_VOICE_KIT` points, and stops with the clone command if it finds nothing. It does not fetch anything on its own.
- **node is older than 18.** The command uses the promise form of readline, which arrived in node 17. `doctor` prints the version first for that reason.

## Starting yours

1. Install node, version 18 or newer, from nodejs.org. Everything below is typed into the Terminal app on a Mac, or PowerShell on Windows, from inside the cloned folder.
2. Type `bin/lavelle` with nothing after it. On Windows type `node bin\lavelle` instead, here and in every step below, because Windows does not read the first line of the file the way a Mac does. Read the list. Nobody has run this on Windows yet; if you are the first, what breaks is the finding.
3. Type `bin/lavelle init`. It writes into a folder named `lavelle` inside the clone. Answer the seventeen honestly, including the ones where the honest answer is "we don't do that."
4. Open `lavelle/owner.md` and `lavelle/lavelle.json` and read your answers as a caller would hear them.
5. Type `bin/lavelle doctor`. Everything it can see should say ok except the kit and the key, and it will exit with a 1 because of those two.
6. Type `bin/lavelle add phone --dry-run` and read what it would send before it sends anything.
7. Get the kit with the clone line the dry run printed, set the key in the environment for one terminal session, type `bin/lavelle add phone`, and make the test call from the kit's protocol before any real caller does.
8. The first thing that will go wrong: the number you give as the transfer number is the one you just forwarded to the agent, and the command will refuse you. That refusal is the chapter working.
