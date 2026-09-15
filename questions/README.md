# The question bank

*The shop questions, one file per topic. Chapter 11 says what these are for and how to tell whether the list is any good.*

**Status: design, not built. Extracted 2026-09-14 from one working appliance repair shop. Not yet answered by a second shop.**

## The format

Every entry is four lines, and the second one is the one that matters.

```
**N. The question, in words an owner would use.**
Writes `field.name`. Default: what happens if they say nothing. Holds: code or prompt.
If you answer differently: what changes downstream.
Incident: the thing that went wrong and made this a rule. Only where there is one.
```

## The rules

- **A question that cannot name what it writes is not in the bank.** It goes in `unanswered.md` until somebody can say what it changes.
- **`[BLOCKING]` means no default exists and nothing runs until it is answered.** Seventeen of them, listed in chapter 11. A question with a written default is not blocking, however important it feels.
- **Field names are a proposal.** Nothing reads them yet.
- **No answers from the worked example are printed here.** The shop's fees, its excluded brands, its covered streets and its call scripts are customer-facing facts that join back to real people. Chapter 11 and `PUBLIC-IDENTITY.md` cover why. The questions are the transferable part; the answers never were.
- **`Holds: code` means the answer must not live in a prompt.** Either a guard that refuses, or a
  fact generated into the prompt from the same place the code reads it, so the two cannot drift.
  `Holds: prompt` is tone and judgment. The split is 96 to 16. Chapter 11 says why, and what went
  wrong on 2026-09-14 that made it a rule.
- **Incidents are kept.** A rule with no incident under it is suspect, and most of these have one.

## The files

| File | What it configures |
| --- | --- |
| `phone-and-booking.md` | what the phone does with a call |
| `scheduling-and-capacity.md` | what a day holds and what can be promised |
| `pricing-and-money.md` | every number an agent may say out loud |
| `service-area.md` | who gets served and who gets turned down |
| `parts-and-suppliers.md` | what gets ordered, from whom, and who pays |
| `customer-communication.md` | what goes out after the call |
| `trade-knowledge.md` | the judgment calls that are the trade itself |
| `brand-and-voice.md` | how it sounds |
| `accounts-and-tools.md` | the systems underneath, and the guardrails on them |
| `unanswered.md` | questions this shop never had to answer |
