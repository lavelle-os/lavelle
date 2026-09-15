# Earning trust

*How a job earns the right to stop asking, and how it loses it. Three tiers, a score that has to be met, promotion only at a sitting, demotion on a trigger. It reads the record kept in the decision ledger and adds nothing to it.*

**Status: design, not built. Drafted 2026-09-06 at level, daytime. Split by topic 2026-09-14 at 19,564 characters, against STYLE's five to twelve thousand. Nothing here is ratified; the numbers are proposals for the sitting.**

## Tiers

Three, per job, earned in order, never skipped.

| Tier | What the agent does | What still asks |
|---|---|---|
| **Good** | Recommends. Every action is an ask. | Everything |
| **Better** | Acts on routine decisions; asks on important ones. | Everything on the job's written important list |
| **Best** | Acts on routine and important decisions inside precedent. | Anything with no precedent, and the three protections |

**The important list** is a short written list per job of what counts as important: money above a stated figure, anything sent to a customer or a supplier, anything that cannot be undone, anything that touches a named person. Written on a level day, kept with the job, changed only at a sitting.

**Precedent** is the best tier's leash. An act at best cites the endorsed records it resembles. If it can cite none, it is an ask, not an act, no matter the tier. This is the answer to the information wall: the novel decision is not in the ledger, so the ledger does not decide it. The similarity check is deliberately dumb in version one: same job, same importance class, at least three endorsed records with the same chosen option in situations the agent can name as alike.

**The three protections** hold at every tier and are never on any promotion proposal:

1. Money: a cap enforced at the card issuer or the bank, not in a prompt. The agent never sees a real card number. The cap is raised only by a human, at the issuer.
2. One-way doors: launch, publish, spend above the cap, client commitments, anything that changes the gate or these rules. A named sitting, always (chapter 2).
3. The owner-state gate itself. No tier reads past it. A job at best still does nothing new on an elevated day or after dark that it would not do at good.

These are owner-protection guardrails. They exist because the owner might be wrong, so a more capable agent makes them more important, not less. Everything else in the tier table is a competence guardrail, there because the agent might be wrong, and those are the ones that come down with evidence.

One more rule that is not a tier: the agent signs as itself at every tier. An act at best goes out under the agent's name, never the owner's. DHH does the same, and for the reason that matters: posting as him felt disingenuous (#501, 3:24:28).

## The score

Per job, over the endorsed corpus only, over a rolling window of the last fifty endorsed records:

- **Agreement rate:** the share where the owner chose the agent's recommendation.
- **Important-class agreement:** the same, counting only records marked important.
- **Wrong outcomes:** the count of records whose outcome was later marked `wrong`.
- **Span:** calendar days from the oldest to the newest record in the window.
- **Endorsed per day:** counted, and capped. Proposed: at most five endorsed records per job per day count toward the window. The rest are kept and marked `overflow`. Fifty answers in one sitting is rubber-stamping, and a score built on rubber stamps promotes a job the owner never actually watched. The rule stands on that reasoning alone. An earlier draft cited Elish, ESTS 5 (2019) here. That paper is about blame landing on the nearest human when an automated system fails, which is a different claim, so the citation is withdrawn and the rule is unchanged. Corrected 2026-09-14.

The score is a file the script regenerates. The agent reads the file. It does not compute its own score, for the same reason a loop does not grade its own output (chapter 4).

## Promotion

Promotion is proposed by the script and ruled on by the owner at a sitting. It is never a live prompt. "I have enough information to do this without you, want to try?" is exactly the sentence a tired owner says yes to, so the system does not say it in chat. It writes a proposal to the ratification agenda and waits for the next sitting.

Proposed thresholds for good to better, and again for better to best:

| Condition | Proposed figure |
|---|---|
| Endorsed records in the window | 50 |
| Agreement rate | 90% or better |
| Important-class agreement | 95% or better, on at least 10 important records |
| Wrong outcomes in the window | zero |
| Span | at least 14 calendar days |
| Open items in the broken registry naming this job | none |

The proposal that goes on the agenda lists the numbers, the five most recent disagreements with their outcomes, and the job's important list, so the owner is ruling on evidence and not on a summary. The ruling is one line, dated, in the owner's words, like every other ruling in chapter 2.

The figures are placeholders until the sitting ratifies them. What is not a placeholder: the sitting, the agenda, and the rule that promotion is a one-way door for the job and so cannot be taken mid-momentum.

## Demotion

Demotion is automatic and immediate. No sitting, no proposal, no waiting for the weekly. Any of these drops the job to good, not one step down:

- An act whose outcome is marked `wrong`.
- The owner reverses or overrides an act.
- An act at best with an empty precedent field, meaning it should have asked.
- A shell-guard denial logged against the job.
- The job named in a new entry in the broken registry.
- The agreement rate over the last ten endorsed records falling under 80%.

Demotion writes a record of kind `demotion` with the trigger, and the job's next report says so in its first line. Re-promotion needs the full evidence window again and a sitting. A job that has been demoted twice gets a line in the weekly review asking whether it should be a job at all.

The asymmetry is the design: up slowly, by ruling; down instantly, by trigger. Prior art for this shape: Weber and Taneja, "The Digital Apprentice: A Framework for Human-Directed Agentic AI Development" (arXiv 2606.04321, June 2026), which specifies per-skill autonomy as a state machine, promotion only on an explicit human authorization event, and automatic rollback when quality degrades. Verified against the paper 2026-09-06.

## The endorsed-policy model

What it is: the ledger, the score, the tiers, the rules, and the precedent check, with the owner-state gate as the thing that decides which records count as endorsed. Nothing in it is trained. It earns a job the right to stop asking, one tier at a time, and it never earns past the three protections.

What it is not: a copy of the owner, a thing that acts under the owner's name, or a thing that can be switched on to act without the owner.

Prior art, second-checked on 2026-09-06, so a reader knows what this borrows and what it doesn't. Graduated, per-skill autonomy with human authorization and automatic demotion is published (Weber and Taneja, above). Models built to answer as a specific person from their own data are a commercial category, and the measured result for the ones built from behavior alone is weak: an average correlation of about 0.20 with the real person's choices across nineteen experiments (Peng et al., "Digital twins are funhouse mirrors: Five systematic distortions," Science Advances 12(36), 2026). The distinction between what a person does and what they would endorse is older than either: revealed versus normative preference (Beshears, Choi, Laibson, and Madrian, "How are preferences revealed?", Journal of Public Economics 92, 2008). The ledger's contribution is small and specific: the gate as the labeling source for "endorsed," and the rule that nothing earns past the three protections.

## Known failure modes

- **Agreement rewards flattery.** An agent that learns to recommend what the owner will pick scores perfectly and decides nothing. The outcome column, the important-class rate, and a hand spot-check of one act per job per week (the same discipline as the loop review) are the defenses. If the agent's recommendation and the owner's choice never differ across fifty records, that is a finding for the review, not a promotion.
- **Easy asks pad the score.** A job can be flooded with routine questions to reach fifty. Important-class agreement on at least ten important records is the floor, and the per-day cap slows the flood.
- **Precedent similarity is a judgment the agent makes about itself.** The version-one check is crude on purpose so a human can audit it in a minute. The trigger for an empty precedent field is a demotion, so the cost of getting it wrong falls on the agent, not the owner.
- **A tier is easier to grant than to take back.** Promotion happens at a sitting, where the evidence is laid out and the mood is good. Demotion happens on a trigger, on an ordinary day, usually while something else is going wrong. Whichever of those two is easier to skip is the one that decides what this system actually is.

## Starting yours

1. Start every job at good, and do not offer another tier on day one.
2. Write the demotion triggers down before the first promotion, while nothing is at stake.
3. When the score file says a job qualifies, put it on the agenda for your next sitting and rule on it there. Not in chat.
4. Rule on one job at a time. A sitting that promotes three has not read three.
5. The first thing that will go wrong: a job will hit a demotion trigger on a busy afternoon and you will decide it was an exception. Expect the first real demotion within a month. That is the system working.
