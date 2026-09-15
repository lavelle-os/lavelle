# Breach surfaces

*Where an attacker actually gets in, what a stolen profile lets them do, and how this fails. The first half — what the system holds and who wants it — is [The threat model](09-threat-model.md).*

## Surfaces, and the boundary on each

| Surface | Boundary | Control (status in chapter 6) |
|---|---|---|
| Outbound from the worker | Deny by default; allow the model API, the package mirror, the code host's specific paths, the check-in sync; log anything new | Outbound allowlist (open) |
| Inbound to any machine | None forwarded from the internet; a private mesh with device identity for remote access | Network rules (practice, not yet a written control) |
| Shell commands an agent proposes | Classes denied before they run, in every spelling and through interpreters; guard files owned by root | Guard (closed) |
| The stop latch | Anyone can set it, only a human can clear it, lives outside the agent's tree | Latch (closed) |
| Retrieved text | Data, never instruction; the model that decides does not run where retrieved code executes | Rule 9 in chapter 3 (rule); the brains-and-hands split (design, open) |
| Credentials | One token per owner today. One credential per job is guardrail 11 and is not built | Token split closed; per-job open |
| Money | A cap at the issuer, raised only by a human at the issuer | Issuer cap (design, chapter 7) |
| The check-in feed | Read-only token downward; the app's own login upward; daytime window and sittings limit what a forged check-in can unlock | App login plus the gate's own rules (practice) |
| The profile and ledger files | Append-only, owned by a user the agent isn't, written through one tool | File ownership (open, chapter 6) |
| The living-room console | A display user with no shell, no keys, no repository access | Display-only user (open) |
| Long-running jobs | Signal the process group when the latch is set; heartbeat the jobs refuse to start without | Watchdog (open) |

The rule for reading this table: a row whose control says "rule" or "design" has no boundary yet. It has an intention. Chapter 6 keeps the honest list of which is which.

## What a stolen profile enables, in detail

Because this is the asset the design is built around, the attack is worth walking through.

An attacker with the profile folder and the ledger has: the owner's first name, trade, and jurisdiction; every ratified rule in the owner's own words; the list of jobs and which ones the agent runs without asking; the important list for each; the household halt list, by placeholder; the record of which decisions were made on level days and which were not; and the never-touch list, which is a list of things the owner is afraid of.

What they do not have, if the never list held: any credential answer, any password, any real customer name, any street, any date of birth, any medical note beyond a number. So they cannot log in as the owner anywhere, and they cannot prove the owner's identity to a bank or a carrier.

What they can do: write to a supplier in the owner's voice, and know which supplier; call a customer and sound like the shop; know which day of the week the owner is likely to answer without thinking; know the names of the people who can halt the system and approach them first. That is the fraud manual. The never list makes it a manual without keys. The placeholders make it a manual without a customer list. Neither makes it harmless.

The controls that matter for this asset, in order: it never leaves the owner's hardware; the folder is encrypted at rest with the machine's own disk encryption, which is a setting the owner checks and this chapter does not assume; exports are logged in the ledger as a record of their own; and the ownership fields in chapter 8 mean the owner can delete it in one act.

## The second-user line

The moment anyone other than the owner runs any of this, everything above changes shape. Their profile is a stranger's profile. Their household is not the owner's. Their jurisdiction has its own law about what a business may automate. And the person helping them run it is a new actor with legitimate access to the most sensitive asset in the system.

So the rule: no module ships to a second user until this chapter has been rewritten for that user's situation, the insurance and licensing questions have been asked in writing, and the second user has read the never list and the ownership fields and agreed to them in their own words. The line is crossed on purpose at a sitting, or it is not crossed.

## Known failure modes

- **This is a document.** It enforces nothing. Every boundary in it is only as real as the control in chapter 6 that says closed. A threat model with open controls is a to-do list with a scary title.
- **The owner is inside the boundary.** The gate treats the owner as an actor and then puts the latch in the owner's hands. The household halt is the answer, and it is unbuilt. Until it exists, the honest statement is that the system's most important control depends on the person it is designed to doubt.
- **The allowlist will block a loop that needs a new source, and someone will widen it "for now."** The rule: a new outbound host is a directive, filed and ruled on, never a one-line edit at midnight. The log of new hosts is the watchdog's business.
- **The check-in is the gate's input, and the phone is the weakest device.** A forged level check-in raises authority. The daytime window, the per-day cap in the ledger, and the sitting rule for one-way doors limit what a single forged check-in can unlock to reversible work. That is the design. It has not been attacked on purpose yet.
- **Transcripts are the leak nobody lists.** They hold customer names from before the placeholder rule, and they are the one asset partly held by a vendor. Rotating old transcripts out, and running the never-list scan over what is kept, is on the work list and not done.
- **The agent can widen its own reach in some loops.** Where the tool grant includes spawning sessions or editing its schedule, the boundary is a sentence in a skill file. Narrowing the grant is owner-and-terminal work. Written here so nobody reads "the guard is closed" as "the agent is contained."
- **"Local" ends at the first sync.** The check-in app is hosted. The coordination files are hosted. The interactive sessions are hosted. Each is a chosen trade, and each is a place the threat model has to follow the data to.
## Starting yours

1. List your assets by what losing them costs, not by what they are. Put the file that describes you at the top.
2. List your actors, and put yourself on a bad day second.
3. For each surface, write the boundary, then name the control that enforces it outside the model. If you can't name one, write "none" and don't dress it up.
4. Deny outbound by default on the machine that runs unattended. Allow what the loops need, by host and path, and log the rest.
5. Rehearse the kill switch end to end with a stopwatch. Write the time down.
6. Expect the first breach to come through a loop reading the web, not through the front door.
