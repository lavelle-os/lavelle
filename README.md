# Lavelle

Lavelle is an operating system for a business, not for a computer. A CRM gives you the screens its company decided you get. This is the other way: the rules, files and habits that let one owner have AI agents build the tools his business needs. I run a one-truck appliance repair shop in Alabama, I'm not a programmer, and in four months this method built my phone receptionist, my parts store's order tracking, a truck inventory app, and a bike shop's register and customer list.

The idea is DHH's: we all use a different five percent of the software we're given, so build your own five percent (Lex Fridman #501, 25:21). These notes are my shop's five percent, with every rule next to the thing that went wrong before it.

## Read this before you connect anything

AI agents with real passwords can spend money, leak customer data and break things that were working. These notes are how my shop keeps that from happening. They are not a product, not advice, and not a promise it works for you. Don't connect a live account to anything here until the server it talks to is locked down (Layer 4.5 in the phone kit's deploy guide). Anything about law, tax or licenses goes to a second AI and then a real professional before you act. It's written for one owner; a second person with access walks around most of these gates. I keep it up between service calls, chapters were last checked end to end on 2026-09-05, and it comes as is.

## Start with one file

Before any agent touches a live account, give it one file to read first that says three things: who it works for, what it may never touch, and how the owner is doing today. Mine is a `CLAUDE.md` at the top of every project. The chapters below are what I wrote into it.

## Try the setup command

You need Node 18 or newer and a terminal.

1. `bin/lavelle init` asks your shop's questions and writes two files, `owner.md` and `lavelle.json`.
2. `bin/lavelle add phone --dry-run` shows what it would send and changes nothing.
3. `bin/lavelle add phone` stands up a receptionist through the [phone kit](https://github.com/morriss-group/vapi-voice-tuneup), and refuses until every required answer is in. Make a test call before a real caller does.

I've run it on two machines. Nobody else has yet. On Windows, type `node bin\lavelle`; nobody has tried that on a real Windows machine.

## The chapters

- [The owner-state gate](docs/01-owner-state-gate.md): what the agents may decide depending on how I'm doing today. In use.
- [Mission Control](docs/02-mission-control.md): five files that keep every project straight. In use.
- [Guardrails](docs/03-guardrails.md): eleven rules, each with what went wrong. In use.
- [Loops and usage](docs/04-loops-and-usage.md): scheduled agents sharing one subscription. In use.
- [The rig](docs/05-rig-recipe.md): an old PC as an always-on worker with a local model. In use.
- [Security posture](docs/06-security-posture.md): the walls, the kill switches, and an outside review's holes, open and closed.
- [Decision ledger](docs/07-decision-ledger.md), [earning trust](docs/07-earning-trust.md), [operator profile](docs/08-operator-profile.md), [setup conversation](docs/10-setup-conversation.md): designed, not built.
- [Threat model](docs/09-threat-model.md) and [breach surfaces](docs/09-breach-surfaces.md): designed, partly practiced.
- [The shop questions](docs/11-shop-questions.md): 113 questions that set what the business promises a customer; the setup command reads them.
- [Install](docs/12-install.md): the setup command above, step by step.
- [Dictionary](docs/dictionary.md): the words voice dictation gets wrong.

## Also public

- [lavelle-skills](https://github.com/lavelle-os/lavelle-skills): the rules as seventeen skill files any coding agent can read. The first eight were tested under Claude Code and OpenCode, the newer nine under Claude only.
- [vapi-voice-tuneup](https://github.com/morriss-group/vapi-voice-tuneup): the phone's settings and what a live line taught.

The truck app and the bike shop are private.

## What's in here and what never is

My shop and its public parts store, TheMrFixedIt, are the worked example on purpose. Customer names, numbers and addresses never are. [PUBLIC-IDENTITY.md](PUBLIC-IDENTITY.md) has the full line.

MIT licensed. Copyright The Morriss Group LLC.
