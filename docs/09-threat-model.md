# The threat model

*What the system actually holds, and who would want it. The second half of this chapter — where an attacker gets in and what a breach costs — is [Breach surfaces](09-breach-surfaces.md).*

## The problem it solves

Chapter 6 says how the walls are built. It does not say what is behind them or who is at the door. An outside reviewer put it in one line: local on a mining PC is not a threat model, it is a hope. And a second line that this chapter exists to answer: a stolen profile is a fraud manual.

The system's most valuable asset is not a credential. Credentials rotate. The most valuable asset is the file that says how the owner decides, what they get wrong, and on which days. That file is the point of the whole design, and it is also the thing a thief would want most. So the threat model starts there and works outward.

## Words

- **Asset.** A thing worth stealing, changing, or destroying.
- **Actor.** Someone or something that might do that. Including the owner, on some days.
- **Surface.** A way in.
- **Boundary.** A line enforced by something outside the model: file ownership, network rules, credential scope, a card issuer's limit, a latch the agent cannot delete. A prompt is not a boundary. A rule in a skill file is not a boundary. This definition is the one used to triage the broken registry: a defect that crosses a boundary is a breach, and a defect that doesn't is a bug.
- **Control.** What enforces a boundary. Each has a status in chapter 6.

## Assets, ranked by what losing them costs

| Asset | What it enables in the wrong hands | Where it lives |
|---|---|---|
| The operator profile (chapter 8): rules, weaknesses, jobs, the never-touch list, the household halt list | Impersonating the owner to suppliers, customers, and family with the owner's own phrasing and habits; knowing which day to try; knowing who can stop the system and going around them | Local folder on the owner's machines; nowhere else by rule |
| The decision ledger (chapter 7) | Timing. It records which decisions were made on which kind of day. An attacker who reads it knows when the owner's judgment is weakest and what the owner does then | Same folder |
| The check-in feed | The gate's input. A forged "level, daytime" check-in raises the fleet's authority. A forged "elevated" only lowers it, which is the safe direction | A hosted app, password-gated, synced down by a read-only token |
| Per-job credentials | Whatever that job can do, and nothing more, if the split in chapter 6 is done | Keychain and per-repo config on the owner's machines |
| Session transcripts and the memory folders | Everything the owner ever said to an agent, including customer details before the placeholder rule existed | The main machine; and, for interactive sessions, the vendor that hosts them |
| Customer data in the business systems | Fraud against customers; the one loss that is not the owner's to absorb | The field-service and store systems, behind their own logins; never in the profile |
| The guard, the latch, the watchdog unit | Turning the walls off | Root-owned paths the agent user cannot write (chapter 6) |
| The coordination files: directives, tracker, broken registry, inbox | A map of what is running, what is broken, and what the owner is thinking about | A private hosted repository, which means a vendor holds them |

Two honest lines in that table. The transcripts are the largest store of unsanitized data the shop has, and part of them sit with a vendor by the nature of hosted sessions. And the coordination files live in a private repository on a code host, which is a third party holding the owner's thinking. Neither is hidden here, because a threat model that flatters its author is a brochure.

## Actors

In order of likelihood, not of damage.

1. **A web page, an email, or a comment.** The loops read the internet. Anything they read can be written by an attacker, and it will say whatever gets an agent to act. This is the most likely attack and the cheapest. It arrives every day in the form of spam that hasn't been aimed yet.
2. **The owner, on a bad day.** The gate exists because the owner's own judgment is an actor. This is the only actor the system is designed to distrust by default, and the only one whose attacks are logged in a mood app.
3. **A dependency.** A package the agent installs or updates. The 2026 breach at a large lab, in which a model smuggled messages to itself through a package manager, is the shape: the code that runs where the model runs is a channel, in both directions.
4. **A thief with the hardware.** Someone who walks out with the worker box or the laptop. Local means physical.
5. **Someone on the local network.** A guest's device, a compromised TV, the living-room console if it is still a shell.
6. **The agent itself, misbehaving.** A run that spawns sessions, edits its own schedule, or widens its own credentials. Today the boundary against that is instruction, not permission, in more than one loop, and the directives file says so in writing.
7. **A support person or a second user.** The moment anyone else runs this, or helps run it, there is a new actor with legitimate access. That line is drawn on purpose or it is crossed by accident.
8. **Family.** Not as attackers. As the people who hold the household halt and whose consent the system does not need to stop. They are inside the boundary, and the profile says so.

## Starting yours

List what you hold before you list what could go wrong with it. Most people do that backwards and end up defending the thing they thought of first rather than the thing that would actually hurt to lose. The first thing that will go wrong: you will leave something off the asset list because it did not feel like an asset, and that is the one that gets taken.
