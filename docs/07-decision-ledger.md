# The decision ledger

*What the system writes down every time the owner decides something: the words, the fields, what counts as endorsed, what happens when the agent and the owner disagree, and where the file lives. Earning trust is what the record is then used for.*

**Status: design, not built. Drafted 2026-09-06 at level, daytime. Split by topic 2026-09-14 at 19,564 characters, against STYLE's five to twelve thousand. Nothing here is ratified; the numbers are proposals for the sitting.**

## The problem it solves

Every agent in this system starts in the same posture: it drafts, the owner sends. That rule is why the fleet can be trusted at all. It is also a ceiling. An owner who answers forty small questions a day has not delegated anything; they have hired a very fast clerk who cannot act. The tempting fix is a switch: "act like me." The switch deletes the approval line and the state gate in one motion, and a model trained on everything the owner ever chose has learned the 3 AM choices too.

The ledger is the alternative to the switch. It records every decision the owner makes through the system, marks which of those decisions were made on a day the owner would stand behind, scores each job on how often the agent's recommendation matched the owner's choice, and lets a job move up in autonomy only by evidence, only by a ruling at a sitting, and only until it slips. There is no global toggle. Nothing earns its way past the three protections that exist because the owner might be the one who is wrong.

The shop already ran this once without naming it. Shipment tracking went draft, then verified by hand for a stretch, then automatic, with a log, revocable in one line. The ledger makes that path the rule for every job.

## Words

Used the same way throughout, so a script can read them:

- **Job.** One recurring kind of decision with one owner-facing surface. "Which supplier for this part." "Reply to this review." "Reschedule this appointment." Not a project; a decision type inside one.
- **Ask.** The agent puts a situation and two or three options to the owner, with its own recommendation marked. Three options, never more; twenty-two is paralysis (DHH, Lex Fridman #501, 59:21).
- **Answer.** The owner picks one, with one line of why, in their words.
- **Act.** The agent does something at a tier that did not require an ask.
- **Record.** One ask-and-answer, or one act, written to the ledger.
- **Endorsed corpus.** Records made on a level day, in daytime. **Observed corpus.** Everything else. The flag is derived from the synced check-in file, never set by hand and never inferred from the chat.
- **Agreement.** The owner chose what the agent recommended.
- **Tier.** Good, better, best. Per job. Described below.
- **Sitting.** A named level-day ruling, as in chapter 2.

## The record

One line of JSON per record, appended, never edited, one file per job. The fields:

| Field | What it holds | Who writes it |
|---|---|---|
| `id`, `ts_utc`, `ts_local` | identity and both clocks; local decides "daytime" | script |
| `job` | the job name, from a fixed list | script |
| `kind` | `ask`, `act`, `review`, `promotion-proposal`, `demotion`, `ruling` | script |
| `situation` | the facts, in one paragraph, only what the source material says (guardrail 6) | agent |
| `options` | two or three, each one line; the agent's recommendation marked | agent |
| `chosen` | the owner's pick, or the agent's own at better and best | owner or agent |
| `why` | one line, the owner's words; the agent's reason for its recommendation kept separately | owner and agent |
| `importance` | `routine` or `important`, from the job's written list of what counts as important | script, from the list |
| `gate` | the check-in the record was made under: state, number, its timestamp, daytime yes or no, tier level, elevated, or low | script, from the synced check-in file |
| `corpus` | `endorsed` or `observed`, derived from `gate` | script |
| `agreement` | chosen equals recommended | script |
| `precedent` | for an act: the endorsed records it resembles; empty means it should have been an ask | agent, checked by script |
| `outcome` | filled later: `worked`, `wrong`, `unknown`, with a date and a line | owner or a loop with evidence |
| `review` | the weekly review that looked at it, if any | script |

The agent writes the parts only it knows. A script stamps the rest, and the stamp comes from files the model does not author: the check-in sync, the job list, the importance list. A record whose gate field was typed by the model is not a record.

## Endorsed and observed

Only endorsed records train anything, count toward a score, or support a promotion. Observed records are kept in full and used one way: as a warning. If the disagreement rate on observed days runs well above the endorsed rate, that is a signal about the owner, not the agent, and it goes to the weekly review, not into the policy.

The rule for the flag, proposed:

- The most recent check-in before the record was `normal` at 6 or under.
- That check-in was made in daytime, and the record was made in daytime. Daytime is a fixed local window, proposed 7 AM to 8 PM. The window is a rule written on a level day, not a sunrise lookup.
- The check-in is from the same local day as the record. A morning 5 does not endorse an evening decision at 11 PM; the after-dark rule already says so (chapter 1), and a later "5" after dark does not reopen it.

Everything that fails any of these is observed. There is no third state.

This is the gate turned into a training rule. The information wall says you cannot extract from data what was never in it; the shadow wall says a model trained on behavior learns the bad nights too. The endorsed flag is the only labeling source this system has for "the owner would stand behind this." It stays above any model forever.

## Asks: daytime only

An ask is delivered only inside the daytime window. Outside it, the ask is queued to the morning page with the agent's recommendation and the safe default it took meanwhile: draft, hold, or skip. The job does not stall; it does the reversible thing and waits.

If the owner answers an ask after dark anyway, the answer is recorded as observed, changes nothing about the job's tier, and the ask is put back on the morning page if the decision is still live. The owner is not refused, and the owner is not obeyed on the record either. Chapter 1's test applies: an owner who tests this with a 10 PM "5" should find the ask still waiting at 7 AM.

## The disagreement ritual

When the owner's answer differs from the agent's recommendation, both are on the record with both reasons. That much is automatic. The ritual is what happens next.

Once a week, inside the existing fifteen-minute loop review (chapter 4), every disagreement from the week is read with its outcome, and each gets one of three rulings:

- **Owner was right.** The agent's reasoning was wrong or missing something. The line of why becomes a note on the job. If the same correction has shown up three times, it becomes a rule candidate for the agenda.
- **Agent was right.** The owner's choice turned out wrong and the agent's would not have. The record is promoted: the owner writes, on that level day, in their own words, the rule they would want applied next time. That rule goes to the agenda. This is how the dissenting agent gets a voice on the record, and it is the answer to the outside review's sharpest point: sometimes the tired owner is right and the clear-day policy is pride, and a ledger that can only demote the agent becomes a yes-machine for the well mood.
- **Unknown.** Outcome not knowable yet. Stays open, re-read next week, dropped after four.

Note what "agent was right" does not do. It does not change the job's tier, and it does not let the agent override the owner next time. It writes a rule, ratified by the owner, that the agent then follows. Rules generalize; behavior models don't. The ledger's job is to surface the rule, not to become it.

The same review reads the observed corpus once, as a warning: disagreement rate on observed days against endorsed days, and anything the owner answered after dark that the morning owner then reversed. That comparison is for the owner and for nobody else.

## Rules versus records

A record is one decision. A rule is a sentence the owner ratified on a level day. The ledger proposes rules; it never makes them. Three paths from record to rule, all through the agenda:

- The same answer to the same kind of ask, five times, endorsed: a rule candidate.
- The disagreement ritual's "owner was right," three times on one point: a rule candidate.
- The disagreement ritual's "agent was right," once: a rule candidate, in the owner's words.

A job that has a rule for a situation does not ask about that situation. It cites the rule. This is where most of the "stops asking" actually comes from in a shop like this one: not from a model that predicts the owner, but from a short list of rules the owner wrote when the same question kept coming back.

## Where it lives

- One append-only file per job, local, in the owner's own tree, alongside the operator profile (chapter 8).
- The score file, regenerated, next to them.
- The check-in sync the flag reads from, which is the same one every session reads at start.
- Proposals in the ratification agenda; demotions and rule candidates in the action tracker; job defects in the broken registry. Nothing new to read. Mission Control stays five files.
- The ledger is the owner's property, exportable, deletable, and part of the profile that dies with the owner unless a will says otherwise.

## Known failure modes

- **It inherits the gate's failure.** A confident daytime "5" on an elevated day endorses records that should have been observed. The per-day cap, the span requirement, and the second-sensor flag on the record (pace, superlatives, the hour) limit the damage. They do not remove it. Chapter 1 says lean on the rules that do not depend on the number being honest; here those are the cap, the span, and the sitting.
- **The ledger is a file the owner can edit.** So is the gate. An append-only file owned by a user the agent is not, written through one tool, is the intended fix and is open in chapter 6 until it is done.
- **Built for one owner.** A second person's answers in the same ledger have no gate to endorse them. Chapter 1's warning applies unchanged, and it applies to earning trust too.
- **A record with no outcome is half a record.** The outcome column is the only field written after the fact, which makes it the only one nobody is prompted to fill. A ledger of decisions with no outcomes can score agreement and knows nothing about whether the agreement was any good.
- **The disagreements are the valuable rows and the easiest to stop writing.** They are written on the days the agent was wrong, which are the days nobody wants to stop and file anything.

## Starting yours

1. Name three jobs. Not projects, decision types. Write each one's important list on a level day.
2. Answer asks with one line of why. The why is the part that is worth anything later.
3. Let the script stamp the gate and the corpus from your own check-in file.
4. Put the ledger where the agent can append and not rewrite, before there is anything in it worth rewriting.
5. Read the disagreements once a week and write rules from them.
6. The first thing that will go wrong: you will let the agent fill the gate field itself because it is faster, and from that day the ledger is a record of what the agent thought your day was like.
