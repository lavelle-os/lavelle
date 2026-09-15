# The owner-state gate

*The rule that makes the rest of Lavelle safe to run: what the system is allowed to do today depends on how the owner is doing today.*

## The problem it solves

Every small-business owner has days they shouldn't be signing anything. Tired, angry, elated, three drinks in, awake at 3 AM with a great idea. The ideas that arrive on those days are not worse on average. The decisions are. And an agent fleet makes bad decisions cheap to execute: the idea becomes a repo, a purchase, a public post, or a live change to the phone line before the owner has slept on it.

Most systems solve this with a manager. A one-person business doesn't have one. The owner-state gate is the manager.

## How it works

The owner checks in with a number, on a fixed scale, at least once a day and whenever something changes. The number is ground truth. Every session and every loop reads it before doing anything that can't be undone, and applies one of three tiers:

| Tier | The number says | What the system may do |
|---|---|---|
| **Level** | calm, rested, in the middle of the scale | Everything. Ratify rules, re-rank the portfolio, approve new projects, open one-way doors. |
| **Elevated** | high, racing, or after dark regardless of number | Capture and file only. New ideas go to an inbox, never to launch. Mirrors get held up, meaning the system reflects the idea back with its steelman and files it. Nothing ships. |
| **Low** | low, flat, unwell | Nothing is asked of the owner. No self-assessments, no project verdicts, no questions. The fleet keeps running on standing orders; that is what it's for. Comfort over throughput. |

The tier is decided by the owner's own check-in, not by the system's opinion of the owner. The system's opinion counts as a second sensor with error bars: pace, cut-off sentences, superlatives, switching between ideas, the hour. It can raise a flag. It cannot lower the tier.

## Pre-commitment rules

The gate's power comes from rules written on a level day and enforced on the others. The owner drafts them, or the system drafts them, but they only take force when the owner ratifies them, in their own words, with a date, on a level day. Ours, generalized:

1. **Money doors.** No real dollars move on an elevated-day decision. Anything that trades, borrows, subscribes above a small threshold, or buys outside business-as-usual gets a 48-hour delay when the day's check-in was elevated. Delayed, not banned. The cart stays full overnight.
2. **After dark, ideas go in Notes, not in motion.** New projects conceived at night get captured, in any session, in any format, and gated to a level-day review before anything is built. This rule exists because four consecutive nights once produced four new projects, and the builds migrated to wherever the gate wasn't.
3. **Sleep is how I stay level.** In the owner's words. The bargain that defeats it is "if I stay up two more hours, it's only three hours until I get up anyway, so I'll just stay up." The rule: when that bargain shows up, it is the signal to lie down, not a reason to stay up.
4. **Lower the friction on eating, don't force the appetite.** A rule about the body, because the numbers showed irritability tracked missed meals.

Yours will differ. The shape is what matters: a short list, in the owner's words, ratified while clear, applied while not.

## What "capture only" looks like in practice

The owner says, at 10 PM at an elevated number, "we should build our own agents from scratch on the rig." The system does not build. It writes the idea down in full, in the owner's words, adds what already exists toward it, adds the questions a level-day review would need answered, files it in the portfolio inbox, and says so. Nothing is lost. Nothing is launched. The next morning the owner ranks it or drops it.

The same night, the owner checks in fifteen minutes later with a level number and no note. The system records it, and still doesn't build, because the after-dark rule doesn't look at the number. The owner later says that check-in was a test. This is the test the gate has to pass.

## Charter clause

The gate replaced an earlier rule, "one project per sitting." The owner's own amendment: "when I'm level I should be able to work on twenty projects at once." So the gate moves the limit from project count to state, which is what the limit was always protecting.

## Where it came from

This gate began as a way to keep a diagnosed condition from writing checks the business would have to cash. The generalized form is owner state. If that origin doesn't apply to you, the after-dark rule and the money-door rule still do; every owner has days they shouldn't sign things. That is the whole of the medical detail in these notes, and it's here because a reader can't judge the failure modes below without knowing the rule was built for the days when self-report is least reliable.

**This is a business rule adapted from personal health and energy management, and it is not medical advice.** It decides what agents may do on a given day. It is not a treatment plan, not a coping tool, and not a substitute for one. If what you need is a clinical safety plan, get one from a clinician and use the clinical instruments built for it; the shape here is borrowed from those and is not equal to them. An outside reviewer's warning, kept because it is the real risk: a stranger can read a chapter like this as a self-management system and end up using it as shadow therapy. Do not.

The idea is not new. It's a Ulysses contract, the sailor tied to the mast, applied to agent authority. The same shape exists as psychiatric advance directives and self-binding directives in clinical practice, as crisis and safety plans written while well and used while not, as casino self-exclusion lists, and as the broker lockouts that freeze an account after a pattern of bad trades. What's uncommon is wiring it into what a fleet of agents may do, making self-report the ground truth while the system's own read can only raise a flag, and writing the after-dark rule so that a later "level" number can't undo it the same night.

## Known failure modes

Written next to the rule, because a rule that hides its failure modes gets cargo-culted.

- **Self-report fails in exactly the state the gate is for.** An elevated day can produce a confident "level" check-in. A low day can produce no check-in at all. Clinical versions of this idea require a third party to enforce the mast; this one has none, and the mast is a text file the owner can edit. The after-dark rule and the money-door delay are the two mechanisms that don't depend on the number being honest. Lean on those.
- **The owner can game it, and will, at least once.** Ours did, as a test. The gate held because the after-dark rule doesn't read the number. If your rules can all be unlocked by typing a 5, they aren't rules.
- **It's built for one owner.** With a co-founder, whose number wins? With an employee, you cannot make someone's work depend on your unpublished state score. Use it as a solo operator's tool or redesign it before adding a second person.
- **The system's second sensor has error bars.** Pace, cut-off sentences, superlatives, the hour: useful as a flag, never as a verdict. It can hold a door; it must not open one.

## Why it belongs in these notes

Because every other guardrail in Lavelle is about what the agents may do. This one is about what the owner may do, through the agents, on a given day. It is the only control that assumes the human is the one who might be compromised, and it is the reason a one-person shop can run unattended loops without waking up to a repo, a purchase, or a post they don't remember approving.
