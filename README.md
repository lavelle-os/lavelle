# Lavelle

**Field notes from one small business that runs on AI agents. Unsupported. Chapters last verified end to end 2026-09-05; anything dated later in a chapter was added since and has not had that pass.**

**Status: actively maintained by one person, as of 2026-09-15.** These notes track a system that is
still being built, by the person running it, between service calls. Chapters carry their own status
lines — "in use", "design only, not built", "design, partly practiced" — and those are load-bearing,
not decoration. If the last commit here is more than six months old, assume it went unmaintained and
check anything security-shaped against a current source before you rely on it.

**Read this first:** unattended agents with live credentials can spend money, leak data, and break production. These notes describe how one shop keeps that from happening. They are not a product, not advice, and not a promise that it will work for you. Nobody runs your fleet but you.

**What these notes are NOT, said plainly because a disclaimer nobody can find is decoration:**

- **Not a security product.** The chapter called "Security posture" is one shop's account of holes it found and what it did about them, with the still-open ones marked open. It is not a control set, not an audit, and not a thing you can adopt and call yourself covered.
- **Not legal, tax, or professional advice.** Where these notes touch law, licensing, employment or money, the rule in them is to stop and get a second model and a human professional. Do the same.
- **Do not connect production credentials to anything here until you have done Layer 4.5 of the deploy guide in the linked phone repository, or its equivalent for whatever you are wiring up.** An unprotected endpoint is harmless the day it returns an example and expensive the day it reaches your calendar.
- **Written for one owner with one set of hands.** Every gate in here assumes a single person whose judgement is the last word. A second human with push access or a shared subscription walks around most of it, and nothing here tells you how to handle that.
- **AS IS, with no duty to update.** See the licence. Nobody here is obliged to fix, maintain, or warn you when something in these notes stops being true.

## What this is

The rules, the guardrails, the file structure, and the hardware recipe one person uses to run a trade business, a parts store, and a video channel on agents that work while they don't. Written by an appliance repairman who is not a programmer. Every rule is tied to the incident that caused it, and the incident is written next to the rule.

The shape of it comes from one observation: everyone uses a different five percent of the software they're given, so build your own five percent (DHH, Lex Fridman #501, about 25:21). These notes are one shop's five percent, learned by conversation and written down.

The worked example throughout is a real repair shop in Alabama and its public parts store, TheMrFixedIt, by choice. See [the public-identity policy](PUBLIC-IDENTITY.md) for what is in these notes on purpose and what will never be.

## What's in the box

| Chapter | What it is |
|---|---|
| [The owner-state gate](docs/01-owner-state-gate.md) | Decisions tiered by how the owner is doing today. Level: full authority. Elevated or after dark: capture only. Low: nothing asked. Where it came from, and where it fails. |
| [Mission Control](docs/02-mission-control.md) | Five files that coordinate every project and run nothing. A record-keeping discipline, not a safety mechanism. |
| [Guardrails](docs/03-guardrails.md) | Eleven rules, each with the thing that went wrong. |
| [Loops and usage](docs/04-loops-and-usage.md) | How a few scheduled agents share one subscription and one owner. |
| [The rig](docs/05-rig-recipe.md) | An old PC as an always-on worker with a local model: what it's good for, and where its quality falls off a cliff. |
| [Security posture](docs/06-security-posture.md) | The four walls, kill switches, detection, and an outside review of this exact setup, with each hole it found marked open or closed. |
| [The decision ledger](docs/07-decision-ledger.md) | Design only, not built. What the system writes down every time the owner decides something: the words, the fields, endorsed versus observed, the disagreement ritual, and where the file lives. |
| [Earning trust](docs/07-earning-trust.md) | Design only, not built. What the record is used for: three tiers, the score a job has to meet, promotion only at a sitting, demotion on a trigger, and the endorsed-policy model. |
| [The operator profile](docs/08-operator-profile.md) | Design only, not built. The folder that tells the agents who they work for: field classes, the never list, the three protections as required fields, the household halt, and who owns it. |
| [The threat model](docs/09-threat-model.md) | Design, partly practiced. What the system actually holds and who would want it: the words, the assets ranked by what losing them costs, and the actors. |
| [Breach surfaces](docs/09-breach-surfaces.md) | Design, partly practiced. Where an attacker gets in and what it costs: the boundary on each surface, what a stolen profile enables in detail, the second-user line, and how this fails. |
| [The setup conversation](docs/10-setup-conversation.md) | Design only, not built. Thirty questions, in order, that build the operator profile as a conversation, with the never list enforced while they're asked. |
| [The shop questions](docs/11-shop-questions.md) | Design only, not built. The second setup conversation: 112 questions that configure what the business promises a customer, sixteen of them blocking, and each tagged for whether it holds in code or in a prompt (96 to 16), with the bank in [questions/](questions/) and the ones this trade never had to answer in [questions/unanswered.md](questions/unanswered.md). |
| [Dictionary](docs/dictionary.md) | In use. The names and terms dictation gets wrong, with the right spelling, for any transcript-cleaning step. |

## Related, and public

- [vapi-voice-tuneup](https://github.com/morriss-group/vapi-voice-tuneup), the phone: the
  settings, the failures, and what a real line taught that no dashboard shows.

## What this is not

- Not an operating system. That word was used in early drafts and it's a promise these notes can't keep.
- Not an installer. Recipes you can read, in the order they were done, with the failure points marked. If an installer ever exists it will come after strangers have cooked from the recipes.
- Not private-by-architecture. The local model keeps one workload in the house. The business itself talks to a phone service, a video platform, a store, suppliers, and a git host.
- Not maintained on a schedule. Budget for it is a few hours a month when quiet and more when not; if the last-verified date above is old, assume drift.

## What this is, and is not

Notes, not software. There is no installer and nothing here to run except one shell script
that checks a commit for identifiers before it leaves your machine. Everything else is meant
to be read, argued with, and adapted by hand. A recipe you can read beats a script you can't.

## License

MIT. Copyright The Morriss Group LLC. Provided as is, without warranty of any kind. No support relationship is created by cloning, forking, or following these notes.
