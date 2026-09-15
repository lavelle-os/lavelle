# The rig

*An old PC turned into an always-on worker with its own model. What was done, in order, with the parts that broke.*

## What it was and what it is

A bitcoin-mining box: a six-core desktop CPU, 8 GB of RAM, an RTX 3060 Ti with 8 GB of video memory, a 120 GB SATA drive, an 850-watt power supply, a mining motherboard with no Wi-Fi. It became a headless Ubuntu Server that runs a local language model, a nightly digest, and whatever jobs the main machine hands it. It has no monitor of its own; a TV in the living room shows a status board.

Why bother: the main machine is a small iMac that gets slow with more than two agent sessions open, and a local model means one workload, bulk summarization of public feeds, that stays on this box instead of a vendor's disk.

**What local does not mean.** The business does not stay in the house. The phone runs on a voice platform, the captions come from a video platform, the store talks to a payment processor and suppliers, the code lives on a git host, and the digest itself falls back to a cloud model if the local one fails. "Nothing leaves the house" was a sentence in an early draft of these notes and it was wrong. Local wins on two things only: it doesn't burn the interactive subscription's cap, and one corpus stays off a vendor's disk. On dollars it loses; a 300-post digest costs a fraction of a cent on a cheap cloud model and about eight dollars a month of electricity here.

**Where the quality falls off, in the same type size as the speed.** An 8-billion-parameter model at 70 tokens a second paraphrased a complaint as praise, summarized one post twice under two headings, and mis-read a sensitive thread, on its first night. That is the signature of the size, not a bad night. It's fine for single-pass summarize-and-rewrite of public text where the owner reads the result. It's not enough for customer-facing copy, tone-sensitive threads, legal or tax questions, or anything that ships unread.

## Install, in order

1. **Ubuntu Server 24.04** from a USB stick. Keep the stick; it's the recovery disk. Give the whole drive to the root volume when the installer asks; the default leaves most of it unused.
2. **Ethernet to the router.** No Wi-Fi on the board, and the TV box's Ethernet port is a dead end.
3. **OpenSSH** with a key from the main machine. Install `avahi-daemon` so the box answers by name (`<yourbox>.local`) no matter what address the router gives it. That one package saved every later session from hunting for an IP.
4. **The NVIDIA driver, headless.** The install script refuses to run if the package plan would touch the kernel or remove anything, installs the headless driver and utilities, verifies the module was built for the running kernel, loads it without rebooting, and only then reboots. Every one of those checks exists because a first attempt without them broke the box and it had to be rebuilt.
5. **The model server** as a user-space install from its release tarball, started by a `@reboot` cron line, listening on the local address only. One 8-billion-parameter general model fits the 8 GB card and runs at about 70 tokens per second. The 8 GB of system RAM is the first upgrade: a matching stick costs about $20.
6. **`ffmpeg`** and a standalone video-downloader binary, for captions and audio work the main machine can't do.

## The nightly digest

A cron line at a fixed evening hour runs one script: fetch new posts from a handful of public feeds (the syndication path those sites intend), summarize them on the local model in a map-reduce (chunks that fit the model's context, then a merge), write a one-page report, and append a line to the job log. If the local model is down or fails, fall back to the cloud model with a note in the log. First run: 321 posts, 14 batches, 158 seconds, no cloud involved.

What the local model gets wrong, honestly: it paraphrased a complaint as praise, summarized one post twice under two headings, and mis-read a sensitive thread. An 8-billion-parameter model summarizing hundreds of posts will do that. The fixes are cheap: carry each post's original title through untouched, and drop duplicate links before ranking.

## Cron and clocks

The box keeps its clock in UTC. Cron ignores a timezone set on its own line for scheduling, so an evening job written as "7:15 PM local" fires at 2:15 PM until you convert it to UTC. Convert once, write the local time in a comment, move on.

## The board on the TV

A shell script that redraws every few seconds: time and uptime, the graphics card's load, memory, temperature, and power draw, which model is loaded, what's running, and the last lines of the job log. Big console font at login. The console runs at 1280x720 so the 32-pixel font is readable from a couch on a large TV; at the TV's native 4K the same font is unreadable. That resolution is a kernel boot option, not a setting the display driver gets to change.

Two rules learned the same night: the console font can only be set from the console's own keyboard, not over the network, because the login session owns the screen; and a status board on a living-room keyboard is a shell with your login on it, so the finished version runs as a separate display-only user with no sudo and no keys.

## Headless jobs

The pattern that works: write a brief on the main machine, copy it and the source files to the rig, run the model against them, copy the result back, review and commit from the main machine. No credentials for anything live ever sit on the rig. Its first real job drafted four documentation sections in three minutes, and it caught an error in the way the files had been copied over and adapted instead of guessing.

## Power

Two hard power cuts in one day, one of them during a full GPU load. The filesystem survived both. What it taught: a consumer UPS holds minutes, not days; 48 hours for two machines is a 12 kWh problem, which is a battery station with expansion or a generator, not a $200 box; measure the real draw with a $25 plug-in meter for a week before buying anything; and if the fuse on the pole blew, that's the utility's, not yours, because a 190-watt step can't trip it.

## What it costs to run

At idle, about 9 watts on the card and 50 on the box. Under full load, 200 on the card. Most of the day it's idle, like a good employee waiting for the phone to ring.
