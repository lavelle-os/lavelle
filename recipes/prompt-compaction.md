# Recipe: prompt compaction

*How to shrink a prompt or a project file without losing a rule. Cut the HOW, keep the WHAT and the NEVER, measure before and after, and let someone else check that nothing fell out.*

**Status: in use. Two passes on the shop's phone prompt, 2026-09-02 and 2026-09-06 (the second a draft awaiting the owner's ear).**

## Why

Over-prescriptive humans damage output. The people who build the agent harnesses measured it: one harness's own system prompt shrank by about eighty percent because telling the model how to do each step made it worse at doing them (Lex Fridman #501, 56:02). A long prompt is also a cost: the shop's phone agent fell from about ninety cents a call to under thirty after its first compaction, because the prompt is re-read on every turn.

The same applies to the files a session reads at start. Every rule that says how, every incident that explains why, every parenthesis that reassures the author, is a token the model reads before the first real word.

## The three kinds of line

Sort every line into one of three, and the cut sorts itself:

- **WHAT.** A fact, a script line, a field to collect, a tool to call. Keep.
- **NEVER.** A boundary: never say booked before the tool succeeds, never name a company, never read the curly braces aloud. Keep, and keep the emphasis; a NEVER in lower case is a suggestion.
- **HOW.** Why the rule exists, what went wrong once, the reasoning the model should follow, the same rule restated in a second section, a parenthesis that hedges. Cut. The why goes in the notes next to the rule, in the repository, where a human reads it; it does not go in the prompt.

Two exceptions to cutting HOW. A scripted line the owner's ear approved is a WHAT even if it looks like a HOW, and stays verbatim. And a rule that failed in production because the model needed the reason (ours: an exception the model kept hinting at until the prompt spelled out three things not to say) keeps its examples of what not to say, because those examples are NEVERs wearing a HOW's clothes.

## The pass

1. **Snapshot the live object** before touching anything, with the six numbers that go missing silently: prompt length, model settings, tool count, keyword count, transcriber, voice (chapter 3, guardrail 2).
2. **Sort every line** into WHAT, NEVER, HOW. Do it in a copy. Mark, don't delete yet.
3. **Cut the HOW.** Then find every rule stated twice and keep the one in the section where it acts.
4. **List what was cut**, by rule, in a file next to the draft, so a reviewer can check the list against the original instead of reading both end to end.
5. **Independent review.** A different model, or a different person, reads the original and the draft with the cut list and answers one question: is any WHAT or NEVER gone? The first pass on the shop's prompt was checked this way and the checker's verdict is in the commit message.
6. **The owner's ear.** For a voice prompt, the systems-check call and at least three test calls before it goes live; the 8/28 tuning took five. A prompt that reads well can sound wrong.
7. **Deploy through the snapshot script**, never by pasting into a dashboard, so the after-snapshot exists and the diff is printed.
8. **Watch the next week's reviews** for a rule that used to hold and doesn't. Restore that rule in one line, and write next to it that it needed the reason.

## What the numbers looked like

| Pass | Before | After | Cut |
|---|---|---|---|
| Phone prompt, 2026-09-02 | 67,854 chars | 38,893 chars | 43% |
| Phone prompt, 2026-09-06 (draft, not live) | 41,360 chars | 30,152 chars | 27% |

Across both passes, 67,854 to 30,152, a 56% cut with every scripted line intact. The second pass found less to cut than the first because the first had already taken the explanations; what remained was mostly rules stated twice.

The eighty percent figure is a harness's system prompt, which carried explanations of its own tools. A phone script whose value is the exact words the owner approved will not shrink that far, and shouldn't. Our honest target for a script is half, over two passes, with every NEVER intact.

## The files a session reads at start

The same sort applies to project files, and the numbers are worse there. Measured 2026-09-06, characters read before the first real instruction in one session:

| File | Size | Kind |
|---|---|---|
| Coordination charter | 5,000 | rules, fine |
| Wake-up file | 2,600 | rules, fine |
| Usage file | 65,000 | one reading plus weeks of history |
| Directives file | 232,000 | orders, most of them done |
| Project session rules | 3,700 | rules, fine |
| Handoff | 19,000 | context, superseded when the next is written |
| Memory index | 10,600 | pointers, fine |

Two files are the problem, and they are the same shape: an append-only log that every session is told to read from the top. The fix is not to delete history, which the rules forbid, but to move it: a directives archive that holds every closed item verbatim, and a usage file that holds the current reading and the rules with the readings log one hop away. The rule for both, from the loops chapter: two separate defects were caused by rules living too far down a file to be read. A file nobody can read to the end has that defect built in.

## Starting yours

1. Measure the prompt and every file your session reads at start. Write the numbers down.
2. Sort one prompt into WHAT, NEVER, HOW. Cut the HOW in a copy.
3. Write the cut list. Have something that isn't you check it.
4. Test it with your ears before your eyes decide.
5. Expect one rule to come back within a week, and let it, with a note.
