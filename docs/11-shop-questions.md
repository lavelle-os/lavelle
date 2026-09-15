# The shop questions

*The second setup conversation. Chapter 10 asks who the owner is. This one asks what the business promises a customer, because that is the layer an agent gets wrong in public.*

**Status: design, not built. Drafted 2026-09-14 at level, daytime. The question bank in `questions/` is extracted from one working shop and has not yet been answered by a second one, which is the only test that matters. See "How you know the list is good."**

## Why this is a separate chapter

Chapter 10 builds the operator profile: the money cap, the one-way doors, the three jobs, the rule the owner breaks when tired. Every answer there configures the agent's relationship with the owner.

This chapter configures what the business says to somebody who is not the owner. The consequence is different, and the difference is the whole reason for the split:

| Layer | A wrong answer means |
| --- | --- |
| Chapter 10, the operator profile | the agent asks the owner too much, or too little |
| Chapter 11, the shop | a customer is told something that is not true |

An agent that asks too often is annoying. An agent that promises a Saturday visit to a shop that does not work Saturdays has cost a booking, a phone call, and the customer.

## Where the questions came from

One shop, in one trade, that has been running agents on a live phone line, a live calendar and a live parts store. The bank in `questions/` was mined from what that shop actually built: the booking rules, the pricing rules, the coverage lists, the supplier routing, the message scripts. Every entry is a place where somebody made a choice and the software now behaves that way.

That provenance is the bank's strength and its defect, and the defect is written here rather than discovered later. A list mined from one shop is a portrait of that shop. The questions its owner never had to ask, because his answer was obvious to him, are invisible in the source. Those are the ones a second shop trips on.

## The rule that keeps this from becoming a form

**Every question names the thing it writes.** Chapter 10 does this and it is not decoration: `Writes money_cap`, `Writes one_way_doors`. A question that cannot name a field, a rule or a line in a script is not configuration. It is an intake form with a promise attached to it.

A question with no wired effect goes in `questions/unanswered.md` and stays there until somebody can say what it changes. Forty wired questions beat a hundred and ten unwired ones, and the hundred and ten are what makes an onboarding nobody finishes.

## What a prompt may hold, and what must be code

**What went wrong, 2026-09-14 evening.** The worked example's phone agent has a rule against
transferring a caller to the owner except under narrow conditions. That rule was rewritten three
times, across two different prompts forty five thousand characters apart, and a caller saying one
word beat it every single time. A prompt of fifty three thousand characters and a prompt of seven
thousand nine hundred failed identically. Length was not the variable and careful wording was not
the fix.

In the same system, on the same evening: an interlock refused to boot a rehearsal app that could
have reached the live calendar, a budget check refused an oversized deploy, and a deploy script
refused to patch a live agent whose character count did not match what had been inspected. **The
structural guards have never failed. The prose guards fail weekly.**

**So every answer in the bank carries a second tag, and it is the more important one.**

- **`Holds: code`.** The answer is a fact that must hold. It lives in one place that the software
  reads, and it holds one of two ways: a guard that refuses, so the agent cannot do the thing at
  all, or a fact generated into the prompt from the same rules object the code reads, so the two
  cannot drift apart. A transfer rule is not a paragraph asking the agent not to transfer. It is a
  transfer tool that is not attached until the caller qualifies.
- **`Holds: prompt`.** Tone, pacing, warmth, and the hundred judgment calls nobody will ever encode.
  Written by hand, and allowed to be imperfect, because nothing a customer relies on depends on it.

**The split came out 96 to 16, and the lopsidedness is the finding.** Almost everything that shapes
a business is a fact that must hold. What a prompt is actually for is a small set: what to call the
owner, how fast to speak, whether to mirror a chatty caller, how to decline gracefully. That is a
much smaller job than most people give a prompt, and it is the job prompts are good at.

**Where a prompt answer matters, look for the structural thing standing next to it.** Question 4
asks whether the agent ever claims to be a person. There is no way to write code that means "do not
lie," so question 4 is prompt. Question 1, the recording disclosure, is code: a fixed line that
always plays. The disclosure is what makes the lie pointless, and it is the enforceable half of the
pair. Most prompt answers have a partner like that, and finding it is worth more than rewording the
prompt a fourth time.

### Known failure mode for this section

Tagging an answer `code` does not make it code. Nothing in the bank is built, and a tag is a claim
about where the answer belongs, not a report that it is there. The tag earns its keep only when
somebody checks whether the guard exists, which is a question for the ledger in chapter 7 and not
for this chapter. Status: design, 2026-09-14.

## The seventeen that block

Most questions have a defensible default. These do not, and nothing runs until they are answered.
Fifteen are a sentence an agent says out loud to a stranger. The last two are not, and are listed
last for that reason: one is who may spend money, one is the telephone wiring under all of it.

| # | The question |
| --- | --- |
| 1 | Is the call recorded, and is the caller told? |
| 5 | When a caller asks to speak to a human, what happens? |
| 16 | What days do you work? |
| 17 | What arrival windows do you offer, and how wide is each? |
| 18 | What is the earliest day you can be booked? |
| 32 | How is the service area defined? |
| 43 | Do you charge to come out? |
| 44 | What does that fee cover? |
| 45 | Does the fee apply toward the repair? |
| 46 | When is money collected? |
| 48 | Is a price ever quoted before somebody has seen the appliance? |
| 63 | What do you fix? |
| 64 | What do you refuse, by brand? |
| 66 | Residential, commercial, or both? |
| 75 | What does the agent do when a caller describes something dangerous? |
| 101 | Who may hold payment credentials and click pay? |
| 113 | What number does a transfer or a callback actually ring, and is it forwarded to this agent? |

Three of these have a rule of their own.

**Question 1 is a legal question in most places** and gets the second-check rule: an independent
verification before anybody relies on the answer. Recording law differs by state and by who is on
the line.

**Question 75 is a safety interrupt** that overrides every other script in the system, including the
ones trying to book a job. It books nothing and it does not hand the call back.

**Question 101 blocks for a different reason than the other fifteen.** Nothing about it is said to a
customer. It is here because it is the boundary most likely to be quietly eroded by convenience, one
small exception at a time, and because the cost of getting it wrong is not a lost booking.

## What makes a question blocking

A tag that means two things means nothing, so the rule is narrow and checkable:
**`[BLOCKING]` means no default exists.** A question with a written default is not blocking, however
important it feels. Four questions in the first draft carried the tag and a default at once, which is
the contradiction this rule catches.

## Defaults, and the one that is worse than a blank

Everything outside the seventeen ships with a default so the conversation finishes in one sitting. Two rules on defaults:

- **The default is spoken in the read-back, in the owner's words, as a thing that was decided.** Not shown in a settings page nobody opens.
- **A silent wrong default is worse than a blank.** A blank cannot tell a customer anything. A default can, confidently, and the owner finds out when somebody complains.

Where the worked example had no policy at all, the bank says so rather than inventing one. Those live in `questions/unanswered.md` and they are the most interesting file in the set, because a gap in one shop's built system is usually a question that shop answers off the top of its head, differently every time.

## How you know the list is good

Run it at somebody who did not build it, and count three answers separately. This is the test, and until it has been run the status line at the top of this chapter stands.

- **"That is not how we do it."** The question is good. It found a real difference.
- **"I never thought about that."** The question is better. It found a decision the shop has been making by accident.
- **"Why are you asking me that?"** The question belongs to the shop it was mined from, not to the trade. Cut it or demote it to a default.

A bank that scores high on the third number is a portrait, and a portrait configures exactly one business.

## Staleness, which is not solved

An answer given at install is a fact about the day it was given. A shop that changes its fee in March has an instance quoting January, and the agent will keep saying the old number with total confidence because nothing ever told it otherwise.

The design, not built: every answer carries the date it was given and the check-in state of that day, the same stamp chapter 10 puts on the profile. Any answer that a customer-facing script quotes out loud is marked as such, and those are re-asked on a schedule rather than waiting for a complaint. The schedule, the mechanism and who gets asked are open. Status: open, 2026-09-14.

## Known failure modes

- **The owner answers the way he wishes the shop worked.** This is the most common one and the most expensive, because it produces an agent that promises what nobody delivers. The read-back is where it gets caught, and only if the questions are read back as promises: "so the phone can tell somebody you will be there tomorrow," not "earliest day: 1."
- **The bank grows every time somebody asks a question.** A hundred entries is already past what one sitting can hold. New entries earn their place by naming what they write, or they go in the unanswered file.
- **A question gets answered for the business the owner is building instead of the one running.** A single-technician shop answering the scheduling questions as though there were three is configuring a business that does not exist yet. The questions ask about today. The growth questions are their own set and they are not written.
- **The list is treated as complete because it is long.** It was mined from one trade. Nothing in it knows what a plumber, an electrician or a creator has to answer, and the topic files are named for this trade's shape.
- **Pricing answers drift out of the conversation and into somebody's head.** Every money answer is one an agent may say out loud, which is why they block rather than sit in a settings file.

## Starting yours

1. Answer the seventeen before anything runs. A blank is configuration. A guess is a wrong system.
2. Answer the rest in one sitting. Take the default where you have no real policy, and mark it as a default, not a decision.
3. Read every answer back as the sentence an agent would say to a customer. Fix the ones that make you wince.
4. Date every answer and record the check-in state of the day you gave it.
5. Hand the bank to somebody in your trade who did not build your system, and keep their three counts.
6. The first thing that will go wrong: you will answer a question about the shop you are building rather than the shop you are running, and an agent will promise a stranger something nobody there does.
