# Style

*What a reader should notice in the first minute: a person with opinions built this. Two rules from the owner, then the marks that make Lavelle look like itself and not like every other agent repository.*

## Rule 1: the owner is not a programmer

After every meaningful action, the agent gives the owner one plain-words line: what happened and why. Jargon is glossed the first time it appears, in the same sentence. When the agent writes code, it adds one sentence on how the code would read to someone who has programmed for thirty years, and one on what in it is the owner's choice rather than the generic way.

Example of the shape: "I added a check to the commit gate. It refuses any chapter that talks about where the project is going, because the public repo is a snapshot of practice. A veteran would call it a grep in a pre-commit hook and find it ordinary. Your choice in it is the word list."

## Rule 2: fingerprints

Code and prose carry marks of a person. "Looks like every other AI repo" is a defect, filed like any other.

- The same word for the same thing, every time. A glossary where a chapter introduces terms.
- Plain names. A file is named for what it holds. A script is named for what it does.
- Small files. A CHAPTER runs five to twelve thousand characters. Reference tables are exempt: a dictionary or a lookup is as long as the thing it describes and no longer.
  When a chapter outgrows the ceiling it splits by topic, never into part one and part two. Check the FLOOR on both halves before you cut. Twice now the obvious seam would have left a half under five thousand, which is a fix that breaks the rule it was fixing, and the seam had to move.
- No clever tricks. No early-exit ladders, no one-line conditionals doing three things, no abstraction that exists for a future that hasn't arrived.
- Comments that read like a friend explaining, only where a human needs them. The code says what; the comment says why, and only when why isn't obvious.
- One deliberate, subtle signature detail per surface. Something most readers never see and that changes how the thing feels to the ones who do. Never announced, never in a feature list, never animated for anyone who asked for reduced motion.

The worked example for a signature detail is the memento mori bar in Omarchy's clock panel: hidden behind a double-tap, off until the owner gives a birth year, a birth year rather than an age so it keeps counting on its own, a default lifespan because the point is the reminder and not the arithmetic. Four rules fall out of it and they are the rules here: opt-in, discoverable, self-maintaining, one per surface.

## Lavelle's marks

These are the ones already on the page. A new chapter or script that lacks them isn't finished.

**In the prose:**

1. Every chapter opens with one italic sentence that says what the chapter is for, in the voice of someone who has done it.
2. The incident sits next to the rule. "What went wrong," in bold, dated when the date is known. A rule with no incident under it is suspect, and the chapter says so if that's the case.
3. Failure modes are written inside the chapter that makes the claim, under "Known failure modes," never in an appendix.
4. Every chapter ends with "Starting yours," a short numbered list. The last item is always the first thing that will go wrong. That is the docs' signature detail.
5. Status is a word, and the word is honest: open, closed, design only, not built, status at last verification, verified on a date. A claim without a date is a claim, not a finding.
6. No em-dashes. Commas and full stops. No superlative without a source. A citation carries a page, a timestamp, or a DOI.
7. Tables have three columns or fewer. A table that needs four is two tables or a list.
8. One repairman's sentence per chapter, earned by the material, not decorated onto it. "A snapshot you don't know how to apply back is a diary entry." "Fifteen is what one owner accumulated over a month, not an architecture."
9. The owner is "the owner." The file about the owner is "the operator profile." A recurring decision is "a job." The daily number is "the check-in" and the rule it feeds is "the gate." A named level-day ruling is "a sitting." Loops run in slots. These words don't get synonyms.

**In the code:**

1. One script, one job, named for the job. `gate.sh` gates. `sync-logs` syncs logs.
2. Every script prints what it did and what it couldn't reach. Silence is a bug.
3. Fail closed. A guard that can't decide says no. A wrapper that can't read its stop-check refuses to start.
4. Numbers that could go missing silently get printed before and after any live change, and diffed.
5. Nothing personal in the tree. Placeholders for people, jurisdictions kept, credentials never. The gate script is the last line, not the first.
6. Proposed signature detail for the shop's own surfaces, not yet ratified: the morning page and the board show, in small type in a corner, the count of consecutive level days. It's the number the whole system is built on, shown to the one person it's about, and to nobody else.

## What the style is for

The style rules aren't taste. Same-word discipline is what lets a script read the prose. Small files are what let a non-programmer find the line that made a decision. The incident-next-to-rule habit is what keeps a rule from being cargo-culted after the person who wrote it forgets why. And the signature detail is what tells a reader the author was paying attention all the way to the end, which is the only real evidence that the rest of the file was written with care.

## Applying it

When a chapter is drafted, one pass against this file before it's committed: subtitle, incidents, failure modes, the closing list and its last item, the words, the dashes, the tables, the length. When code is written, the two sentences from rule 1 go in the chat and, if the file has a header comment, in the header.
