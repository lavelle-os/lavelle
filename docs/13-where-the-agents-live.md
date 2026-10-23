# Where the agents live

**What this is:** how the two programs that run my shop are hosted, what reaches them, what they reach, and what I did the week the host was breached. **Who it is for:** anyone about to put an agent on a server for a real business. **What to do first:** read the rotation order near the bottom before you need it.

## Two small programs on one server

The phone agent and the parts store are each a small Node program. They run on Railway, a hosting service, in one project with two services. Nothing else is on that server.

- **The store agent.** WooCommerce sends it a signed webhook when an order is paid. It orders the part from the supplier, watches the shop mailbox for the supplier's shipping email, sends the customer the tracking number, marks the order complete, and sends one alert to my phone. Its order list lives on a mounted volume so a redeploy does not erase it. The parts catalog is baked into the program itself, on purpose, so the volume can never hide it.
- **The phone tool server.** The phone agent cannot touch my scheduling system directly. Mid-call it asks this server: find this customer, what is open Tuesday, book this. The server reads and writes Housecall Pro and answers in a shape the agent can speak. A shared secret proves the request came from the phone agent and not from the open internet.

Deploys come from GitHub: a push to the main branch builds and deploys the service. Secrets are not in the code. They sit in the service's variables: the store's keys, the mailbox app password, the Housecall Pro key, the shared secret, the alert channel.

## Rules that were written next to a breakage

- **Orders vanished on every redeploy** until the order list moved to a mounted volume. The disk a container starts with is thrown away when the container is replaced.
- **"Deploy Crashed" emails for weeks were not crashes.** The program was started by npm, so npm was process 1 and never passed the shutdown signal down to the program. Every container replacement looked like a crash. The fix was one line: start the program directly. Anything that has to react to a shutdown signal must be process 1.
- **Not every push deploys.** Ten pushes in two days once triggered zero builds. The deploy count is read from the dashboard, never inferred from the git log. Watch paths keep documentation commits from triggering builds at all.
- **Config files for the host were retired by the host.** A new service ignores them silently. Start command, health check and watch paths are set in the dashboard.

## The week the host was breached

On Wednesday night, October 21, 2026, Railway posted a security notice: an unauthorized party may have read environment variables, some decrypted. Builds were paused platform-wide while they investigated, which meant a new secret could not be deployed right away. By Thursday evening builds were back, Railway's own advice was to revoke every variable, and they had published guides for checking unexpected usage on several providers, which told me stolen values were being used, not only read.

What I did, in order:

1. **Thursday morning.** Treated every secret stored in a Railway variable as exposed. Listed what each service held, by category, and wrote the rotation order down, highest harm first. Generated replacement values for the random secrets into a local file that is never committed.
2. **Master keys first.** A mailbox app password is full access to the mailbox over IMAP, and it bypasses two-step verification, and a mailbox is where every other password gets reset. So the two mailbox passwords went first, Thursday night, revoked at the Google account before the replacement existed. For that gap the agent could not read mail; orders still arrived by webhook. That trade is right every time.
3. **Replace, deploy, prove.** The new app password went into the variable, the service rebuilt, and within a minute the service's own status page showed it connected to both inboxes and a mail search returned the week's supplier emails with no errors. A deploy is not done until the thing it was for is proven from outside.
4. **Then the rest, in daylight.** The Housecall Pro key, the store's keys and webhook secret, the mood app's passwords and sync token, the small random secrets, the host's own tokens and the GitHub app, and then the logs: the scheduling system, the store, the host and the phone platform, read for anything that was not me.

The rule that came out of it, now written next to this breakage: **revoke the master key first, before you wait on a redeploy.** The exposure is worse than the downtime.

What I do not know, and say so: whether my project was among the ones actually read. Railway's preliminary report was still pending when this was written. Rotation does not depend on the answer.

## What is deliberately not on this page

The variable names, the service addresses and the project identifiers. A public map of where the secrets sit is a gift to the next unauthorized party. The categories above are enough to copy the method.
