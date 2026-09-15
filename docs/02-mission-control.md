# Mission Control

*A filing cabinet with a map on the wall. It coordinates every project and runs nothing.*

## The one design decision

Mission Control holds no scheduled agents, no fleets, and no budget of its own. Every project lives in its own repository with its own loop. Mission Control files, ranks, and routes. It never acts.

This is the opposite of the obvious design, which is one master agent that runs everything. The obvious design has one process with every credential and every project in its context, which is the largest possible blast radius and the hardest thing to reason about at 3 AM. A filing cabinet can't push to a repo.

## The files

Five files, all Markdown, all in one repository, read by every session at start.

**DIRECTIVES.md, the pigeonhole rack.** The owner gives an order once, in any session, and it's filed here under the right project. That project's loop reads its own section at the start of its next run, before anything else, including its usage check. Three states per directive: open, acknowledged (with a reason and an expected slot), or needs-owner (with the exact question). Rules: a loop may never silently skip a directive; a loop may never delete one; directives never override the state gate, the approval rules, the safety rules, or the usage caps. Mission Control stays passive; the sovereign project acts.

**ACTION-TRACKER.md, who is waiting on whom.** Sections for "waiting on the owner," "waiting on other humans," "waiting on the system (gated or scheduled)," dated captures, and rulings. When the owner says "remind me," it goes here and it stays until done.

**BROKEN.md, the remind-until-fixed registry.** Anything broken anywhere in the federation is added here, dated, and surfaced by every session that opens until it's fixed. Closed items move to an archive, verbatim. The rule the owner set: "he needs to be reminded until it's fixed." Loops file their own defects here, including defects in the guardrails.

**PORTFOLIO.md, the ranked list and the proposal inbox.** Every project with its status, budget posture, and rank. New ideas enter the proposal inbox first, with a steelman attached, and never launch from a chat. Ranking is the owner's act, on a level day; the system recommends.

**RATIFICATION-AGENDA.md, the pending signatures.** Anything that needs the owner's word at a level sitting: rules, rankings, one-way doors, charter changes. Each sitting gets a dated entry with what was ratified and what stayed open.

Plus a weekly review, one short entry per week, and a wake-up file that tells any new session where to start.

## Sittings

Decisions that can't be walked back happen at a named sitting, not mid-momentum. A sitting is a level-day check-in, a timestamp, and one ruling per item, in the owner's words, written into the agenda. Ours have run about ten minutes. The rule that made this stick: even when the momentum is real and the idea is good, a one-way door gets a named sitting. A public release, a new organization, a shutdown, a spend.

## Proposals

A new idea, from anyone including the system, is captured in the portfolio inbox with three parts: what it is in the owner's words, what already exists toward it, and the steelman against it. Adversarial rigor is a standing rule: steelman against every idea, no unsourced superlatives, extra skepticism on elevated-state input, and flag-and-stop on any legal or security uncertainty. The proposal is ranked at a sitting or it isn't, and ranked means it gets a slot, not a launch.

## Session routing

Each project has its own session or loop. A note meant for one project goes to that project's directive section, not to whatever session happens to be open. Autonomous work runs locally, on machines the owner owns, and never as cloud sessions or remote-control sessions. Only the owner's interactive sessions belong on the owner's phone.

## What it is not: a safety mechanism

Separating coordination from execution is discipline, not safety. It keeps the system legible. It does not shrink the blast radius; it moves it into the loops, each of which still has credentials, a shell, a network, and a budget. Nothing in this chapter can stop a loop mid-act. The things that can, credential scope, an outbound allowlist, a stop file the agent can't delete, and a wrapper that can kill a running process, live in the security chapter.

The failure mode to watch, found by an outside reviewer: **split brain and stale authority.** The directives file says one thing, a loop's own skill file says another, the last interactive session said a third, and the only reconciliation is "read Mission Control first," which is an instruction in a prompt. A killed project's cron line survives the killing. An idea that was supposed to stay in the inbox gets a skill file because a different session was open. And the first helper script that "just syncs the cabinet to the loops" is the master agent you refused to build, under a quieter name. The defenses are boring: one place where the running fleet is listed and compared to the ranked list, a wrapper every loop runs through, and a weekly check that the two agree.

## What it looks like after three weeks

Fourteen projects, one owner, about 600 commits to the cabinet itself. No project ever launched from a chat. Every breakage that's still open is on one page. Every order the owner gave is findable by project and by date, with what happened to it. When the owner asked "tell me everything since the founding," the answer was assembled from the files, not from memory, and it was right.

## Starting yours

1. One repository. The five files above, empty except for headers and the charter.
2. A charter that names the state gate, the proposal rule, and the "runs nothing" rule.
3. A one-line pointer in every other project's instructions: read Mission Control first.
4. Your first sitting: ratify the charter and your pre-commitment rules, dated, in your words.

Everything else accumulates.
