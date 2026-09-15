# Public-identity policy

These notes are written by a real person about a real business, on purpose. This file says what is in them by choice and what will never be, so that nobody, including the author, confuses a scanner for anonymity.

## In, by choice

- The author's first name, and that the business is an appliance repair shop in Alabama.
- The Morriss Group LLC, the copyright holder.
- TheMrFixedIt, the public parts store, as the worked example, with its public results.
- The repair shop's trading name, where a chapter needs it to make an example concrete.
  The transcriber dictionary is the main place, because an agent that mishears the shop's
  own name is the first thing a reader will hit.
- The public repositories under morriss-group, and this one.
- The hardware in the rig, the tools and vendors used, and measured numbers about the system itself: token counts, latencies, costs per call, rank counts, watts.
- Incidents that happened to the system, including the ones that embarrass the author.

## Out, always

- Customer names, addresses, phone numbers, job numbers, invoices, or anything that identifies a customer.
- Street addresses of the author or family. Phone numbers. Email addresses beyond a public support address.
- Dollar figures about the author's personal finances, debts, or family money.
- Medical detail beyond the one paragraph in the gate chapter that names the origin of the rule.
- Live credentials, tokens, keys, shared secrets, internal hostnames, private repository names, and the names list the scanner uses.
- The live kill-switch runbook and the live allowlist. Principles are public; the shop's exact commands are not.
- The system prompts of the customer-facing agents.

## Where it is going: out, always

Ruled by the owner on 2026-09-06. The public repository is a snapshot of practice, not a roadmap. It holds everything a reader needs to run the system today: the files, the rules, the guardrails, the recipes, the worked example, the setup questions. It holds nothing about where the project is headed: no end goals, no design directions beyond what is built or drafted as a design, no captured ideas, no outside reviews of the vision, no long-horizon plans. A chapter may say "design only, not built." It may not say what the design is for beyond the job in front of it.

This is a hard boundary, the same as customer data. It applies to the chapters, the README, replies to issues, and what is said to anyone asking about the project. The commit gate blocks a short list of roadmap words in chapters and the README; the list is a tripwire, not the rule. The rule is this paragraph.

## How it's enforced

1. A secrets scanner runs before every commit (`scripts/gate.sh` runs gitleaks when installed, and a regex fallback when not). It blocks on a hit. The same script blocks roadmap language in chapters and the README.
2. Named files only. Never "add everything" on a public repository.
3. Before any repository flips public: a scan of the entire history, and a read of every file by the author.
4. Anything in the "Out" list found after publication is removed from history, not just from the tip, and the incident is added to the guardrails chapter.

## What a scanner can't do

A scanner catches tokens and phone numbers. It does not know that a hardware list plus a store name plus a neighborhood name is a join key. That judgment is the author's, and this file is where it's written down.

