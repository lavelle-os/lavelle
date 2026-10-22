# Lavelle

Lavelle is an operating system for a business, not for a computer. A CRM gives you the screens its company decided you get. This is the other way: the rules, files and habits that let one owner have AI agents build the tools his business needs. I run a one-truck appliance repair shop in Alabama, I'm not a programmer, and in four months this method built my phone receptionist, my parts store's order tracking, a truck inventory app, and a bike shop's register and customer list.

## If you have never used GitHub, start here

GitHub is a website that stores files. The text you are reading is one of them, called README. You don't need an account to read anything here, and clicking can't break anything. You can ignore every button I don't name below.

My work is in two places:

- **Here (lavelle):** the field notes, which are chapters on how my shop runs AI agents safely.
- **[lavelle-skills](https://github.com/lavelle-os/lavelle-skills):** pages you copy into ChatGPT, Claude or another chat app. If that's what you came for, go there. Its page starts with the same kind of help.

### Read the field notes (no account)

1. Scroll down to [The chapters](#the-chapters) and click the first one, **The owner-state gate**. It opens as a normal page.
2. Above the chapter is a switch with three words: **Preview**, **Code**, **Blame**. Leave it on **Preview**. The other two show the raw text and its history.
3. To come back, use your browser's back button, or click **lavelle** at the top left of the page (not **lavelle-os**).

The same chapters are in the folder named **docs**, numbered in reading order. You can skip the other folders.

### Skip the setup command unless you use a terminal

The part called "Try the setup command" below needs a terminal (the text window programmers type commands into) and a program called Node. You don't need either one to read the chapters or use the skills.

### Get everything onto your computer (optional, not for phones)

1. Go to the first page of this repository: https://github.com/lavelle-os/lavelle
2. Above the list of folders, on the right, click the green **Code** button. Not the **Code** tab at the top left.
3. A box headed **Clone** opens. Ignore everything in it except the last line, **Download ZIP**, and click that.
4. A file named `lavelle-main.zip` goes into your Downloads folder. On a Mac, double-click it. On Windows, right-click it, then click **Extract All**.
5. The chapters are in the `docs` folder. They open in Notepad or TextEdit as plain text with # and * marks, and they read better here on GitHub.

### Tell me what broke (needs a free GitHub account)

1. Click **Issues** at the top of the page, next to **Code**.
2. The page will say "No results matched your search." That only means nobody has written one yet.
3. Click the green **New issue** button on the right.
4. If you aren't signed in, GitHub shows "Sign in to GitHub" instead of a form. Click **Create an account** (under "New to GitHub?") and follow GitHub's steps. Then come back to **Issues** and click **New issue** again.
5. Type a short title, write what you did and what happened in the big box, and click the green button to post it.

Everything you post there is public, with your GitHub name on it. Leave out customer names, phone numbers and addresses.

The idea is DHH's: we all use a different five percent of the software we're given, so build your own five percent (Lex Fridman #501, 25:21). These notes are my shop's five percent, with every rule next to the thing that went wrong before it.

## Read this before you connect anything

AI agents with real passwords can spend money, leak customer data and break things that were working. These notes are how my shop keeps that from happening. They are not a product, not advice, and not a promise it works for you. Don't connect a live account to anything here until the server it talks to is locked down (Layer 4.5 in the phone kit's deploy guide). Anything about law, tax or licenses goes to a second AI and then a real professional before you act. It's written for one owner; a second person with access walks around most of these gates. I keep it up between service calls, chapters were last checked end to end on 2026-09-05, and it comes as is.

## Start with one file

Before any agent touches a live account, give it one file to read first that says three things: who it works for, what it may never touch, and how the owner is doing today. Mine is a `CLAUDE.md` at the top of every project. The chapters below are what I wrote into it.

## Try the setup command

You need Node 18 or newer and a terminal.

1. `bin/lavelle init` asks your shop's questions and writes two files, `owner.md` and `lavelle.json`.
2. `bin/lavelle add phone --dry-run` shows what it would send and changes nothing.
3. `bin/lavelle add phone` stands up a receptionist through the [phone kit](https://github.com/morriss-group/vapi-voice-tuneup) (on my company's other GitHub account), and refuses until every required answer is in. Make a test call before a real caller does.

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

- [lavelle-skills](https://github.com/lavelle-os/lavelle-skills): the rules as eighteen skill files any coding agent can read. The first eight were tested under Claude Code and OpenCode, the newer ten under Claude only.
- [vapi-voice-tuneup](https://github.com/morriss-group/vapi-voice-tuneup) (on my company's other GitHub account): the phone's settings and what a live line taught.

The truck app and the bike shop are private.

## What's in here and what never is

My shop and its public parts store, TheMrFixedIt, are the worked example on purpose. Customer names, numbers and addresses never are. [PUBLIC-IDENTITY.md](PUBLIC-IDENTITY.md) has the full line.

MIT licensed. Copyright The Morriss Group LLC.
