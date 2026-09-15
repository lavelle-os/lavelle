# Security posture

*How to run agents unattended without handing them the building. Written from an outside review of this exact setup, including what it caught.*

## The question a friend will ask

"Can it hack into computers it doesn't have access to?"

Not "no." The honest answer is "only as far as you let it." An agent reaches exactly what its credentials reach and what its host can connect to, and no further. That is a boundary you build, not a promise the model makes. Anyone who tells you a model is safe because of how it behaves is selling you its manners. So the whole job is to make sure those two things are as small as the work requires, and that a human can cut both in under a minute. Everything below is that job.

## Four walls, in order of how much they matter

### 1. Credentials are the blast radius

An agent inherits whatever the login it runs under can do. The outside review of this system found its biggest hole in one line: the git login on the main machine carried a classic, account-wide token. Every session on that machine, including the one writing the review's reply, could push to every repository the account owned. The research bot, by contrast, had a separate machine account limited to one repository. Two doors, one narrow, one the whole building.

Rules:
- One token per job, scoped to the one repository or service that job touches. Fine-grained tokens or an app installation, never a classic account-wide token on a machine that runs agents. That is the rule. On this machine today it is one token per repository owner, which is narrower than account-wide and wider than the rule.
- A separate machine account for any bot that writes to a repository. The bot cannot see what the account cannot see.
- Nothing an agent can read may hold a credential for something the business doesn't own. No customer logins, no supplier passwords, no shared-secret files in the working tree.
- Do not rotate a credential from inside the session that holds the old one. Rotate from a terminal a human types into, then confirm the old scope is gone.

### 2. The shell guard is a filter, not a wall

A hook that inspects every shell command before it runs, denies a list of dangerous classes, and logs every denial with a timestamp. Ours blocks: privilege escalation, force-pushes, hard resets, deleting whole trees, piping downloaded code into an interpreter, edits to the hook's own folder, and network scanners.

What the review taught, and it's in the log to prove it: the guard stopped four dangerous commands in one night and let a fifth through, because the sudo pattern only matched one spelling. A denylist has gaps by nature. So:
- Match every spelling: `sudo`, `sudoedit`, `sudo -n`, `ssh host sudo`, `env X=1 sudo`, and any argv that contains `sudo` at all.
- Protect the guard from the agent it guards: deny writes under the agent's own config folder, including the hook file and settings.
- Deny the offensive toolset by name: port scanners, credential crackers, packet injectors, anything whose only use is reaching systems you don't own. The honest answer to the friend's question is that these are refused before they run.
- Read the log weekly. Four denials in a night is the guard working. It is also four attempts, and the agent made them.

### 3. The host can only reach what you let it

- The always-on box gets an outbound firewall with an allowlist: the model API, the package mirror, the services the loops actually call, the git host. Everything else outbound is dropped and logged. An agent that cannot connect cannot exfiltrate, scan, or phone anywhere unplanned.
- No inbound ports forwarded from the internet. Remote access, if you want it, goes through a private mesh network with device identity, not an open port.
- Passwordless sudo for a key that lives on another machine is root for whoever holds that key. Require a password, or scope sudo to the one command that genuinely needs it.
- The status screen in the living room is a keyboard attached to a shell. A dedicated display user with no sudo, no keys, and no repository access is the version that belongs on a TV.

### 4. Kill switches in both places, written down before you need them

One page, on paper and in the repo, with the exact commands:
- **Local:** stop the scheduler that runs the loops; stop the always-on box's cron and model server; pull the plug. Each line is a command you can type without thinking.
- **Cloud:** revoke the bot's machine account; disable the bot; revoke the token the main machine uses.
- **Automatic:** a stop file, checked by a hook that runs before every tool call, so a running job stops at its next action rather than at its next scheduled run. Any watchdog can create it. Deleting it is a human act. The wrapper that would also check a heartbeat and log start and stop is guardrail 10 and is not built.

## Detection: what trips the stop file

A small watchdog, on its own schedule, that creates the stop file and pushes a phone alert when it sees:
- A spike in guard denials (more than N in an hour).
- A push to any repository not on the allowlist, or any force-push anywhere.
- New outbound destinations in the firewall log.
- Spend past the daily cap on any metered service.
- A loop running past its slot's time or token budget.

None of these is a security breach on its own. Each is the shape of one starting. The watchdog's job is to stop the machines and wake the human, not to decide.

## What "safe enough" means here

Compared with running agents on your daily laptop: an old PC as the worker is the right call. Compared with a supervised session: an unattended loop is a small company with no manager on the floor. The walls above are the manager. The review's closing line, kept on purpose: subscriptions don't make autonomy safer; they make the loops more expensive when something goes wrong.

## Status of each hole, at last verification

**What these closed rows do NOT close.** Each row above closes the specific hole it names,
not the guardrail it resembles. The latch is closed; guardrail 10's wrapper-with-heartbeat is
not. The account-wide token is closed; guardrail 11's one-credential-per-job is not. A closed
row and an open guardrail can describe the same corner of the system truthfully, and reading
one as the other is how a reader ends up trusting a wall that was never built.

An outside reviewer's second point about this chapter: publishing a known-gap case study is useful after the gap is closed and a map before. So each item below carries a status, and the public version of these notes waits for the first three to read CLOSED.

| Hole | Status |
|---|---|
| Account-wide token on the main machine's git login | CLOSED 2026-09-05. Three fine-grained tokens, one per owner, each limited to its repos; stored per exact repo path; the CLI login logged out and its OAuth grant revoked; a leftover classic token found in the keychain and erased. |
| Passwordless sudo on the worker for the main machine's key | CLOSED 2026-09-05. |
| Guard's sudo pattern matched one spelling; guard config writable by the agent | CLOSED 2026-09-05 (guard side): every spelling and position of sudo/doas, offensive tooling by name and by capability inside inline interpreter code, brute-force loops, writes to guard config and the latch denied for shell AND editor tools, fails closed on error; 44-case test battery. CLOSED (host side) 2026-09-05: hook files and folder owned by root, not writable by the agent user; verified. |
| Stop file is a convention, not a wrapper; lives in the agent's tree | CLOSED 2026-09-05 (mechanism): a latch hook runs before EVERY tool call in every session and loop, so a running loop stops at its next action; the three launch agents and the worker's cron check the same latch; creation allowed to anyone, deletion denied to agents in any language. CLOSED (path) 2026-09-05: a root-owned latch directory exists; a human sets the root latch, agents and watchdogs set the home-folder latch, both stop everything, only a human can clear either. |
| No outbound allowlist on the worker | OPEN. |
| Living-room console was a logged-in shell | PARTLY. Display-only user pending. |
| Kill-switch page not rehearsed | PARTLY 2026-09-05: the automatic latch was rehearsed live (set by an agent, cleared by the owner, under four minutes); the full page (launch agents, worker, cloud revocations) not yet run end to end. |

## The case study

The outside review that produced this page was pasted into the very agent it reviewed. The agent's first reply corrected the reviewer's map (the brain was on the main machine, not the worker; the research bot was one-repo). Its second reply verified the reviewer's biggest finding against the machines and confirmed it. Its third admitted a sudo slipped the guard during that verification. The reviewer's own summary: "the agent is finally describing the same shop you have; it is still the process that holds the wide token." That is the right posture for anyone running this: let the agent write the notes, and do the credential and sudo work in a terminal that is yours.

## What the second review tightened (kept, because it was right)

The reviewer read the first draft of this page and closed six holes. They're recorded here rather than silently patched in, for the same reason the sudo miss is above.

1. **The denylist does not answer the friend's question.** Walls 1, 3, and 4 do. A denylist is how you fail closed on the obvious toolkit, and there is always `python -c`, a renamed binary, or a wrapper it never heard of. The durable version classifies capabilities, not filenames: raw sockets, packet injection, hash-guessing at scale, port probes, privilege escalation, writes outside the job's tree, writes to the guard's own folder, refused before exec, including through interpreters.
2. **The guard's own files must be owned by someone the agent is not.** Root-owned config, denylist, sudoers, firewall rules, and watchdog unit. A guard that asks itself not to edit its settings can be talked out of it by a prompt injection.
3. **The stop file must live outside the agent's writable tree**, owned by a user the agent isn't, so "only a human deletes it" is a permission, not a norm.
4. **Top-of-loop is too late.** A hung download or a twenty-minute job will not see the file until next time. When the watchdog writes the file it also signals the process group: terminate, then kill. The file is the latch that stops restarts; the signal stops what's running.
5. **The watchdog is a single point of failure.** Give it a supervisor that restarts it, a heartbeat file it touches every minute, jobs that refuse to start when the heartbeat is stale, and a second, dumb checker whose only job is "heartbeat missing → write the stop file."
6. **"Every job checks the file" only works as a wrapper**, not a convention. One wrapper, every call site, no exceptions. And the allowlist needs its own tightening: lock DNS, prefer specific hosts and paths over a whole code-hosting site, pin package versions and checksums, and never let an agent choose new packages unattended.

And one line worth keeping whole: a kill-switch page nobody has run once is not a kill switch. Rehearse it.
