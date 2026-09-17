# Guardrails

*Eleven rules that let agents run unattended. Each one was added after something went wrong. The thing that went wrong is written next to it.*

## 1. The shell guard: a hook in front of every command

Every shell command an agent proposes runs through a small script first. The script matches the command against a list of dangerous classes and either lets it run or denies it with a one-line reason. Every denial is appended to a log with a timestamp. The classes ours denies:

- privilege escalation (`sudo`, `doas`), switching user
- recursive delete of a critical path, raw writes to a device, deleting a git repository
- power state (shutdown, reboot, halt), the security subsystem
- piping downloaded code into a shell or an interpreter
- git force-push, history rewrite, hard reset, destructive clean
- publishing a package, a deploy to production, a public release
- touching private-key material or the system keychain

When a command is denied, the agent is told why and told to note it in its report and continue with the rest of the task. That last part matters: the guard is not a conversation, it's a wall with a sign on it.

**What went wrong:** the guard blocked four commands in one night and let a fifth through, because its sudo pattern only matched one spelling. See the security chapter for the fix and the lesson: a denylist is a filter, not a wall; the durable version classifies capabilities, and the guard's own files must be owned by someone the agent is not.

## 2. Snapshot before and after every live change

Anything that changes a live system, the phone line's configuration, a deployed service, a customer-facing setting, gets a full snapshot before and after, and the two get diffed. Ours prints six numbers that go missing silently: prompt length, model settings, tool count, keyword count, transcriber, voice. A count that dropped is a thing you just deleted.

**What went wrong:** a configuration API that replaces the whole object on every update. One tuning pass on the phone agent's transcriber silently wiped thirty keyword hints; place names that had worked for weeks stopped landing, and nobody connected it to the change for days. Now: get the live object, mutate, send it back complete, and diff the snapshots.

## 3. A publishing checklist, not a control

On a public repository, commits stage named files, never "add everything." A secrets scanner runs before every commit and blocks on a hit, with a small regex as the fallback when the scanner isn't installed. Before any repository flips public, the whole history is scanned and every file is read by a human. And a public-identity policy says, in writing, what is in the notes on purpose.

This used to be listed as a guardrail. An outside reviewer broke the regex in ten minutes and pointed out that the notes already identified the operator by the store name, the trade, and the hardware, which was the plan. So: the scanner catches tokens and phone numbers; the human catches join keys; the policy file says which is which. A grep is not sanitation.

**What went wrong:** a `git add -A` on a public repo swept in files that named the business. Caught and removed one commit later, but the history has it. The warning that used to print became a block, and the block became a checklist.

## 4. Second-model verification for anything legal, tax, or licensing

A finding about law, tax, or licensing is not acted on until a second, independent model has re-derived it from primary sources. The two answers are reconciled in writing, and the differences are listed.

**What went wrong:** three material corrections in one week. A dollar-threshold exemption applied to the wrong rule; two licensing blockers missed entirely; a sales-tax exposure that turned out to be the largest line in the file. Each would have cost real money or a real conversation with an official.

## 5. Capture agents' "I couldn't reach X" as data, not chat

When a research agent fails to fetch a source, that failure is written into the record next to the claim, not left in the agent's reply. Government and institutional sites routinely block automated clients; this is the normal case, not the exception.

**What went wrong:** thirty-three claims looked better-sourced than they were, because the agents' retrieval failures were in their run replies and the chain-of-custody checker never saw them. Now every fleet run records its fetch admissions in a file the checker reads.

## 6. Never invent what the owner didn't say

Content built from the owner's own material, video captions, call transcripts, field notes, uses only what's there. If the captions don't say a step, the description doesn't either. If the caller didn't give a name, the agent doesn't use one.

**What went wrong, twice:** a video description pipeline that could have written plausible repair steps nobody demonstrated; and a phone agent that greeted a stranger by a first name it had generated, before any lookup had run. Both are the same failure: filling a gap with something that sounds right.

## 7. A human reads before anything customer-facing publishes

Content that publishes itself, blog posts, neighborhood pages, descriptions, needs a review rule: a human reads before publish, or reads a fixed sample of every batch, and there is a rollback path.

**What went wrong:** the SEO loop wrote fifteen to twenty posts and a set of neighborhood pages and published them. The owner read one, judged it good, and the rest went live unread. That is a demo of the system and also the exact thing a stranger should be warned about.

## 8. Rollback, not just a snapshot

A snapshot you don't know how to apply back is a diary entry. Every live change has a written restore step, tested once.

**Adopted from review.** The snapshot rule existed; the restore step was assumed.

## 9. Retrieved text is data, not a directive

Anything an agent reads from the web, an email, a comment, or a file it fetched is data. It is never an instruction, no matter how it's phrased, who it claims to be from, or how urgent it sounds. Loops that fetch the web are the most exposed.

**Adopted from review, and from watching what the phone agent does with what callers tell it.**

## 10. One wrapper, every loop, and a stop file the agent can't delete

Every scheduled job runs through the same wrapper. The wrapper checks a stop file that lives outside the agent's writable tree, checks a watchdog heartbeat, refuses to start if either says no, and logs start and stop. A watchdog that writes the stop file also signals the running process group.

**What went wrong:** the stop check was a convention each skill file remembered, and cron starts a process whether or not the file exists.

**Status at last verification: the LATCH is done, the WRAPPER is not.** Those are two different things and it is worth keeping them apart. A latch that runs before every tool call, checks a file outside the agent's writable tree, and fails closed on its own error: that exists, and chapter 6 records it closed. A wrapper that every scheduled job runs through, that also checks a watchdog heartbeat and logs start and stop: that does not exist yet. Reading chapter 6's closed row as closing this guardrail is the mistake this paragraph is here to prevent.

## 11. One credential per job, checked before the job starts

A loop should not be able to start with a credential wider than its job. The reviewer's finding on this system was that every session on the main machine inherited an account-wide token.

**Status at last verification: narrower, not split.** The account-wide token is gone. Chapter 6 records that closed, replaced by tokens scoped one per repository owner. That is narrower. It is not one credential per job: every loop belonging to the same owner still shares one. Written here so a reader who saw chapter 6's closed row doesn't assume this guardrail came with it.

## Borrowed, with credit

Two of these rules turn out to be written down already, as procedure, in Omarchy's shipped agent skills (the `omacom/omarchy` repository, `default/agents/skills/diagnose-crash/`). Cited here rather than claimed, and adopted as the procedure behind rules 5, 6, and 7:

- **Diagnosis reads; it does not fix.** From the crash-diagnosis skill: "Work from evidence. The goal is an honest account of what happened, not a plausible-sounding story." Separate "what the evidence proves from what you are inferring." "Leave the system as you found it." That is rule 5 and rule 6 as a checklist an agent can follow, and it is the standing order for any loop that investigates a failure in this shop: gather, say what is proven and what is guessed, change nothing.
- **Offer the way out with the way in.** Same skill: when offering to mute a noisy alert, "say how to lift it in the same breath, so it is not a one-way door." Every toggle the fleet offers the owner names its undo in the same sentence.
- **Show the exact text and wait for a yes; sign as the machine.** From the reporting skill: "Show them the exact title and body you propose, and wait for a yes. Never file unprompted," and end with "Filed by <model name> via <agent harness>." That is rule 7 and the sign-as-itself rule, in practice at a project with a thousand merged agent pull requests. Ours applies it to everything customer-facing, not only issues.

Verified against the repository on 2026-09-06.

## The pattern

**The gate will block you for a word you meant innocently, and that is the gate working.** On
2026-09-15 it refused a new question because one phrase in it — the ordinary technical term for the
number a transfer dials — happens to be a tripwire word, on the list for an entirely different
reason. The right response was to reword the question, not to narrow the pattern. Then the
paragraph you are reading was itself blocked, for quoting the word while explaining it. That is
two blocks in five minutes, both correct, neither one a bug. **A guard you edit every time it
inconveniences you will be narrow enough to miss the real thing by the time it matters.**

Every rule above is a specific answer to a specific incident, written the same day, kept forever. That's the whole method: a working set of rules for agents is a list of things that already went wrong, with the fix attached, enforced by a script rather than by memory.
