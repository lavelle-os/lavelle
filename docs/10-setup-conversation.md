# The setup conversation

*The ordered questions that build the operator profile, asked as a conversation and not a form. What each answer writes, and the rules the questions enforce while they're asked.*

**Status: design, not built. Drafted 2026-09-06 at level, daytime. The questions are proposals; the rules under them are chapter 8's and are not.**

## The problem it solves

Nobody knows what they want until they use it. A form asks for everything on day one and gets guesses. A conversation asks what the person does now, copies the shape of it, and fills in the rest as it comes up. That is the whole method (Lex Fridman #501, 57:25 to 58:51: be vague, manifest, then interact), and it's how the owner already works.

The conversation also has a second job: it is where the never list is enforced. A form can be filled in with a date of birth. A conversation can say "I keep an age band instead," and mean it.

## Before the first question

- **A level, daytime check-in today.** The conversation does not start otherwise. It says so plainly and offers the morning.
- **The three protections are filled first.** Money cap at the issuer, the one-way-door list, the check-in source and the daytime window. Chapter 8: nothing runs until they're filled, so nothing else is asked until they are.
- **Every answer is read back** at the end, and nothing in it is ratified until a sitting. The conversation writes drafts.

## Question zero, for anyone who isn't the owner

Asked once, before anything else, of any person who arrives asking about the system. Three answers, and the answer sets what they get:

- **"I want to learn it and build my own."** They get these notes and this conversation.
- **"I want one built and kept running for me."** Answer this one before anybody asks it. Writing the notes and running somebody else's system are different jobs, and the second is a business with support hours and a phone that rings on a Sunday. If that is not the business you are in, say so plainly and point them at someone who is. Ours is not: the notes are open, the building is another trade.
- **"I want to understand how it works."** They get the one-page handout and a demonstration.

Nothing else is offered to anyone. The answer is written down with the date.

## Part 1: the protections

Writes `profile/protections.md`. The agent never writes this file; the conversation produces the values and a human writes them.

1. "What's the most the system may spend without you, and where is that limit enforced?" The answer must name an issuer or a bank. "In the prompt" is not an answer, and the conversation says so. Writes `money_cap`.
2. "Who can raise that limit, and where do they do it?" A named human, at the issuer. Writes the second half of `money_cap`.
3. "What can't be undone in your business?" Launching, publishing, spending above the cap, promising a customer, hiring, signing. The list is theirs; the conversation offers the shop's as a starting point. Writes `one_way_doors`, with the rule: a named sitting, always.
4. "How will the system know how you're doing today?" Where the check-in comes from, what the scale is, what daytime means in their hours. Writes `gate`. If they have no check-in habit, the conversation stops here and helps them start one; the gate has no input otherwise.

## Part 2: who you are

Writes `profile/owner.md`.

5. "What should the agents call you?" First name. Writes `name`.
6. "What's the trade, in the words a customer would use?" Writes `trade`.
7. "Where does the law that applies to you attach?" County, state, country. Never a street. Writes `jurisdiction`.
8. "Roughly how old are you?" An age band. If offered a birth date: "I keep the band, not the date, on purpose." Writes `age_band`.

The never list is enforced here, out loud. The conversation states it once, in three sentences: no credential answers, no passwords, no medical detail. Then it holds to it without repeating itself.

## Part 3: what you use now

Writes `profile/business.md`, section "systems." This is the part the interface copies from.

9. "Walk me through yesterday, from the first thing you looked at to the last." Not "what software do you use." The story names the systems in the order they matter.
10. "Which of those would you keep if you could keep one?" That is the shape the morning page copies.
11. "Which one do you fight with?" That is the first job.
12. "Who else touches those systems?" Every person named gets a placeholder on the spot: a made-up first name and a role. The real name is not written anywhere.

## Part 4: the business

Writes the rest of `profile/business.md`.

13. "What do you sell, and what do you refuse to do?" The refusals matter more. Writes `sells`, `refuses`.
14. "Who are the people the business depends on that you don't employ?" Suppliers, a bookkeeper, a landlord. Placeholders, roles, and what each one is for.
15. "What would embarrass you if an agent got it wrong in public?" This is the seed of the never-touch list, in their words. Writes to `profile/never.md`, marked draft.

## Part 5: the first three jobs

Writes `profile/jobs/<job>.md`, one file each. Three jobs, not more, chosen from the fight in question 11 and the answers to 13.

For each job, the same four questions:

16. "What's the decision, in one sentence?" The job's name, plain.
17. "What would make you want to be asked, every time, no matter what?" The important list: money above a figure, anything sent to a customer or supplier, anything that can't be undone, anything touching a named person. Writes `important`.
18. "What's the safe thing to do when you're not available?" Draft, hold, or skip. Writes `default`.
19. "How will you know it got it wrong?" Writes `outcome_signal`, which the ledger's outcome column reads.

Every job starts at the good tier. The conversation says so and doesn't offer another.

## Part 6: the rules

Writes `profile/rules.md`, every line marked unratified with today's date and gate state.

20. "What are the rules you already follow that nobody wrote down?" Five at most. In their words, one sentence each.
21. "Which of those did you learn the hard way?" The incident goes next to the rule, as chapter 3 does.
22. "What's the rule you break when you're tired?" This is the one the gate is for. It goes in with a note that says so.

## Part 7: the household

Writes `profile/household.md`.

23. "Who lives with you, or near you, that you'd trust to pull the plug?" Placeholders. If nobody: the file says so in words, and the conversation says what that means (chapter 8: the owner is the only person who could be harmed, and unattended loops run on that basis).
24. "How would they do it, from their own phone, without asking you?" The mechanism is chapter 6's latch; the conversation records who has it.

## Part 8: life, only where a rule needs it

Writes `profile/life.md`. Asked last and kept short. The rule from the podcast (#501, 5:01:02): a number you can't act on is anxiety. So:

25. "Is there anything about your day that should change what the system does?" Sleep, meals, a check-in habit, a standing appointment. Each answer is written only if a rule consumes it. A step count with no rule attached is not written.

## Part 9: ownership

Writes `profile/ownership.md`. Four questions, four fields, chapter 8's defaults offered first.

26. "This lives on your hardware. Where?" Writes `lives`.
27. "If you leave, you take the folder. Agreed?" Writes `exportable`.
28. "If you want it gone, you delete the folder. Agreed?" Writes `deletable`.
29. "After you: delete, or a named person with a will that says so?" Writes `after_owner`. Default `delete`.
30. "May anything you teach it ever be combined with what other owners teach theirs?" Default `no`. The conversation explains what yes would mean, in two sentences, and does not argue for it.

## The read-back

The conversation reads the whole profile back, file by file, in the owner's own words. The owner corrects. Then:

- Everything written today carries the gate stamp of today's check-in.
- The protections file is handed to a human to write; the agent does not.
- The rules file is marked unratified. The next sitting ratifies it or strikes lines.
- The first job starts at good, tomorrow, in daytime.

## Known failure modes

- **It's still a form, with more words.** If the questions are asked in order regardless of the answers, nothing was gained. The conversation follows the story in question 9 and asks what that story raised. The numbering here is for the writer, not the owner.
- **The owner answers the protections vaguely to get to the interesting part.** "I'll set the card limit later" means the conversation ends there, politely, and resumes when it's set. The interesting part doesn't run without it.
- **Placeholders get explained.** "Call him Dan, the guy at the parts counter on Third" is a real name with extra steps. Role and a made-up first name, nothing more.
- **Question 22 gets a joke instead of an answer.** It's the most useful question in the list and the easiest to dodge. Ask it once, write down whatever came back, and let the ledger answer it over the next month.
- **Three jobs becomes eight.** Three. The rest go in a list for after the first promotion.

## Starting yours

1. Check in. If it isn't a level day, come back tomorrow.
2. Set the card limit at the issuer before you sit down.
3. Answer question 9 as a story, not a list.
4. Name three jobs and start them all at good.
5. Read the whole thing back and fix what's wrong today; ratify nothing until a sitting.
6. Expect question 22 to be the one you got wrong.
