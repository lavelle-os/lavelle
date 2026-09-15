# Loops and usage

*How fifteen scheduled agents share one subscription, one machine, and one owner without stepping on each other.*

## What a loop is

A loop is a scheduled task with a written skill file: what it owns, what it may do, what it must file, and when it stops. It wakes at its slot, reads Mission Control's directives for its project first, checks the usage gate, does its work, writes a run report, files anything broken, and exits. It never asks the owner a question in real time. Questions go into the "needs owner" section of the directives file for the owner to find.

Ours, at the time of writing: a phone-call reviewer every hour, a local-SEO autopilot, a CEO planning loop for the expansion, an economics research loop, a trading-signal loop that is paper-only by rule, a mood-research trickle, a parts-price watcher, a nightly digest on the worker machine, and a handful of one-shot reminders. Each in its own repository, each with its own skill file.

**Don't copy the count.** Fifteen is what one owner accumulated over a month, not an architecture. An outside reviewer's test is the right one: run three to five unattended jobs until you can kill one and notice. On a killed-loop test today, the phone reviewer is the only loop with an obvious revenue story; video packaging saves half an hour per upload; the research loops are hobbies with a cron line. The weekly question, "would you miss it if you killed it," is the product. The number isn't.

**Price the phone separately.** The voice line does not run on the text subscription; it's metered per minute by the voice platform and its speech vendors. Ours fell from about ninety cents to under thirty cents a call after the prompt was compacted, and it replaces a missed-call service or a lost job, so it can still win. But it's a different bill, and it's the one that grows with success.

## Slots

The day is divided into slots, and each loop owns one. A heavy slot may spend up to its budget; a light slot is a fraction of that. Loops that fire in another loop's slot run as light slices, and they say so in their report. The rotation is written down in one shared file that every loop reads at the top, because two separate defects were caused by rules living too far down a file to be read.

The owner's meter readings are ground truth. The loop's own token count is an estimate that runs two to three times under the real drain for web-heavy work, so web-heavy loops plan at a fraction of their nominal budget.

## The gate

Before working, a loop reads the shared usage file and the current meter. Green: work. Yellow: half budgets. Red: read directives, acknowledge them with a reason and an expected slot, file the report, exit. A hard ceiling near the top of the meter applies to everyone, no exceptions, because the interactive session, the one the owner types into, must never be starved by the fleet.

## Directives first, always

Step zero of every run, before the usage gate, even on a red week: read your project's section of the directives file. Act if the budget allows. Otherwise move the item to acknowledged, with the reason and the slot you expect to do it, or to needs-owner with the exact question. Never skip one silently. Never delete one.

## After dark

The owner-state gate applies to loops too. A loop may capture and file at any hour. It launches nothing new, opens no one-way door, and spends no money on its own authority. If the owner's last check-in was elevated, or it's night, the loop's report says what it filed and what it held.

## Reports that admit things

A run report says what ran, what it produced, what it skipped or guessed at, and what it couldn't reach. Retrieval failures go in the record next to the claim. A loop that refutes a claim in its report also edits the file that made the claim, because otherwise the next reader hits the original, which still reads as current. That last rule came from a week where a report falsified two published claims and the files sat unedited for four days until a later run appended a new sentence restating one of them.

## The wrapper, coming

The latch is done. A hook runs before every tool call in every session and loop, and checks a stop file outside the agent's writable tree, so a running job stops at its next action rather than at its next scheduled run. That closed the hole the security review found, which was that a convention each skill file remembers is not a control, because cron starts the process anyway.

The wrapper is not done. One wrapper that every loop runs through, checking the stop file and a watchdog heartbeat, refusing to start if either says no, and logging start and stop. One wrapper, every call site, no exceptions. Guardrail 10 in chapter 3 carries it.

## Weekly

Fifteen minutes. For each loop: did it run, was the output actually right, would you miss it if you killed it. Ask the loops for the list; they keep the reports. Then spot-check one output per loop by hand, because a loop reporting on its own work has the same blind spot you do.
