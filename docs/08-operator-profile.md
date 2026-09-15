# The operator profile

*The file that tells the agents who they work for: the business, the life, the rules, the jobs, and the lines that never move. What goes in, what never does, and who owns it.*

**Status: design, not built. Drafted 2026-09-06 at level, daytime. The field classes and the required fields are proposals for the sitting; the "never enters" list is not, because it is data minimization and needs no ruling to be right.**

## The problem it solves

Every session and every loop today learns the owner the slow way: a memory folder written by hand, a project file that grew by accretion, a voice prompt that reached forty thousand characters because nobody could say what in it still mattered. Three files describe the same shop three ways, and the agent that reads all three has to guess which is current.

The profile is one place, in small files with plain names, that says what the agents need to know about the owner and nothing else. It is built by conversation, on level days, and it is the owner's property. It is also the file a thief would want most, which is why what it leaves out is designed as carefully as what it holds.

## Words

- **Profile.** The folder. One owner, one profile.
- **Field.** One named fact in it, with a class.
- **Class.** What kind of fact it is, which decides whether it enters, how it's written, and who may change it.
- **Placeholder.** A made-up name standing in for a real person or place. The mapping back to the real one lives in the business system the owner already uses, never in the profile.
- **Jurisdiction.** County, state, country. Kept because law attaches to place.
- **The never list.** Facts that do not enter the profile in any form.
- **Job, tier, protection.** As in chapter 7.
- **Household halt.** The people who may stop everything without the owner's say-so.

## Field classes

| Class | Rule | Example |
|---|---|---|
| Owner identity | First name, trade, business name if the owner chose to be public (as in the identity policy). Nothing else. | "Marc, appliance repair, Alabama." |
| Other people | Placeholders only: customers, suppliers' reps, family, employees, leads. A placeholder is a made-up first name plus a role. | "a customer, placeholder name, repeat, pays on time" |
| Place | Jurisdiction kept. No street, no coordinates, no neighborhood finer than the service area the business already publishes. | "Jefferson County, Alabama" |
| Time about a person | Age band, never a date of birth. Years in business, never a founding date finer than the year. | "owner, forties" |
| Preferences and rules | The owner's words, dated, with the gate state the day they were written. Rules only take force once ratified at a sitting. | "No outbound messages to leads. Answer, give the tool, never chase. Ratified on a date." |
| Jobs | One file per job: the important list, the current tier, where its ledger lives. | see chapter 7 |
| Protections | The three that never move, as required fields. | below |
| Household halt | Who may stop everything, and how. | below |
| Ownership | Where the profile lives, who may export it, what happens to it after the owner. | below |

Three classes are missing from that table on purpose. They are the never list.

## The never list

These do not enter the profile, the ledger, the memory folder, a prompt, or a transcript that gets kept. If the setup conversation is offered one, it declines and says why.

- **Credential answers.** Anything a bank, a carrier, or a government office would accept as proof of identity: social security number, date of birth, mother's maiden name, a street address used as verification, account numbers, card numbers, the answers to security questions. A model that has these is a fraud kit with a chat interface.
- **Passwords.** Keys, never passwords. The agent asks for access; the owner approves on their own device; the credential is scoped as narrowly as the machine allows and never passes through the model. Chapter 6 closed the account-wide token. One credential per job is still the rule, not the current machine. The profile only records that it is so, not what the key is.
- **Medical detail.** Beyond the one paragraph in chapter 1. The check-in number reaches the gate through a sync script. The notes behind the number do not reach the profile.

The test for a new field: if a stranger read this line, could they call someone and pretend to be the owner? If yes, it's on the never list, no matter how useful it would be.

## The protections, as fields

Chapter 7 names three protections no tier can earn past. In the profile they are required fields, and a profile missing any of them is invalid: no loop starts, no job runs above good.

```
money_cap:        amount, where it is enforced (the issuer, never a prompt), who may raise it (a named human, at the issuer)
one_way_doors:    the list (launch, publish, spend above the cap, client commitments, changes to these fields), and the rule: a named sitting, always
gate:             where the check-in comes from (the sync), the daytime window, the after-dark rule, the tier table
```

The agent reads these fields and cannot write them. They live in a file owned by a user the agent is not, the same arrangement as the guard and the stop latch in chapter 6. A change to any of them is itself a one-way door, so it goes to a sitting, and the script that writes it runs as the owner, after the ruling, not as the agent.

## Household halt

The gate assumes the owner is the one who might be compromised, and then puts the mast in the owner's own hands. That is the gap an outside reviewer named: a text file the owner can edit is not a mast. The household halt is the answer that doesn't require a clinician or a co-founder.

A short list of people who live with, or near, the owner, by placeholder, each with a way to stop the whole system that does not need the owner's consent and cannot be reversed by the owner the same day. In the shop, that means write access to the stop latch the wrapper checks, from their own phone, and the rule that a halt set by a household member is lifted at a sitting, not by the owner in the moment.

The field is required for any profile that runs unattended loops. It may be empty only when the owner is the only person who could be harmed, and the profile says so in words.

## Ownership

Four fields, all required:

- **Lives:** local, on hardware the owner owns. The profile is a folder of small files, so "local" means what it says.
- **Exportable:** the folder is the export format. Copying it out is copying it out. No vendor step.
- **Deletable:** deleting the folder and the ledger deletes the profile. Nothing is retained anywhere the owner can't see.
- **After the owner:** one of two values. `delete`, the default, or `named-heir` with a placeholder and a note that a will says so. In either case, nothing is ever sent, signed, or spent under the owner's name after they are gone. An heir gets a file, not a voice.

Anything cross-user, an aggregated learning layer, a shared improvement, anything at all that would read more than one owner's profile, is opt-in, documented on the first screen of whatever asks, and off by default. The profile has a field for it, and the field's default is `no`.

## Layout

One folder, plain names, small files. A script can read the front of each file; a person can read the rest.

```
profile/
  owner.md          identity, trade, jurisdiction, age band
  business.md       what the business is, what it sells, what it will not do
  life.md           the routines and rules that aren't business, in the same shape
  rules.md          every ratified rule, dated, in the owner's words
  never.md          the never-touch list: what the agents do not do, ever, in this shop
  jobs/             one file per job: important list, tier, ledger path
  protections.md    the three required fields; agent read-only
  household.md      the halt list
  ownership.md      the four fields above
ledger/             from chapter 7, one file per job
```

Each file opens with a few `key: value` lines a script reads, then prose a person reads. The same word for the same thing throughout, because the script reads the words. Fields the agent may not write are in files the agent may not write.

## Building it

The profile is filled by conversation, not by a form. The setup asks what the owner uses now and copies the shape of it, so a repair shop's profile reads like a job board and a creator's reads like a content calendar. The full question list is its own file, later. The rules for the conversation are already fixed:

- Only on level days, in daytime. The profile carries the gate stamp of the day each field was written, the same as a ledger record.
- The never list is enforced during the conversation, not after. Offered a date of birth, the setup says it keeps an age band instead, and does.
- Every person named gets a placeholder on the spot. The real name is not written down, so there's nothing to redact later.
- Rules are captured in the owner's words and marked unratified until a sitting.
- The protections are filled first. The rest of the conversation does not start until they are.

## Known failure modes

- **Placeholders leak through joins.** A placeholder customer plus a date plus a neighborhood is a real person to anyone who knows the area. The jurisdiction floor and the "no finer than the published service area" rule limit it; they don't remove it. The identity policy's warning applies: a scanner does not know a join key.
- **The profile becomes the new sprawl.** It is meant to replace the memory folder and the project file, not join them. The rule: when a fact enters the profile, it leaves the other two. A weekly check that the three still agree, until the other two are gone.
- **A stolen profile is a map of the owner's weaknesses.** The rules file and the ledger say exactly what the owner does wrong and when. That is why they exist. It is also why the threat model and [Breach surfaces](09-breach-surfaces.md) — which spells out exactly what a stolen profile enables — are both required reading before any second person runs this. The never list lowers the damage from a theft; it does not make a theft harmless.
- **Age band plus jurisdiction plus trade is close to a name.** In a small town it is one. Owners in that position widen the band or drop the jurisdiction to the state, and accept that some rules will be less exact.
- **Ratified rules go stale.** A rule written for a one-truck shop may be wrong at five. Every sitting re-reads the rules file, and a rule not re-affirmed in a quarter is marked stale and stops binding.
- **The owner fills it on a bad day.** The gate stamp on each field is the record of that. A sitting can strike any field whose stamp says elevated or after dark, and the setup refuses to run at those times in the first place.

## Starting yours

1. Make the folder and the files above, empty except headers.
2. On a level day, fill protections first. Nothing runs until they're filled.
3. Write the never list, in your own words, before any person is named.
4. Give every person who isn't you a placeholder, and put the real names nowhere.
5. Answer the setup questions in one conversation. Stop when the gate says stop.
6. Expect the first leak to be a join, not a name.
