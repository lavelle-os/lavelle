# Dictionary

*The names and terms a dictation step gets wrong, with the spelling that's right. For any transcript-cleaning pass, in any module, before the text reaches an agent that will act on it.*

**Status: in use. Started 2026-09-06 from mishearings seen in real transcripts; entries marked "seen" were observed, entries marked "likely" are predictions from how the word sounds.**

## Why it exists

The owner dictates. Raw speech-to-text spells a product name three ways in one paragraph, turns a company into a common noun, and turns the project's own name into a French town. An agent that acts on the raw transcript will search for the wrong thing, file under the wrong name, or write the wrong word into a customer-facing sentence. The fix is a short list, read before any other cleaning step, that says what the word is.

The idea is borrowed from a dictation pipeline described on a podcast (Lex Fridman #501, 2:16:23 to 2:20:22): a wearable recorder, a model that cleans the transcript, and a dictionary of the speaker's terms and code names.

## The rules for using it

1. Match whole words only, case-insensitive. "Cloud" in "cloud storage" stays. "Cloud" in "ask Cloud to do it" becomes Claude.
2. Correct only what is on the list. A proper noun that isn't here is left as heard and marked with a question mark in brackets for the owner. The cleaning step never guesses a name (chapter 3, rule 6).
3. Keep the owner's phrasing. The dictionary fixes spelling, not sentences.
4. An entry is added when the same mishearing appears twice. Once is noise.
5. People's names live in a private supplement outside the repository, per the identity policy. This file holds products, companies, places at the published level, and the project's own vocabulary.

## Entries

| Correct | Heard as | What it is | Evidence |
|---|---|---|---|
| Lavelle | Leavell, Laval, Lavell, "lavel dash o s" | this project | seen |
| TheMrFixedIt | the Mr fixed it, Mr. Fixed It, the Mr fixed it agent | the public parts store and its repository | seen |
| Steel City | still city, steel city appliance | the repair shop's name | likely |
| Marcone | Mark own, Marconi, Mark one | parts distributor | likely |
| Trible's | Tribbles, Tribles, Tribble's | parts distributor | seen |
| Housecall Pro, HCP | house call pro, house call, H C P | field-service software | likely |
| WooCommerce, Woo | woo commerce, woo | the store platform | likely |
| Claude, Claude Code | cloud, clod, cloud code | the model and the agent harness | likely |
| Fable, Opus, Sonnet | fable, opus, sonnet | model names; capitalize | likely |
| Grok | grock, grog, groc | the second reviewer | likely |
| Omarchy | omarky, omarchie, oh marky | the Linux setup the rig recipe borrows from | likely |
| Omakase | oma kase, omakasey | "the chef chooses"; opinionated defaults | likely |
| DHH | D H H, David Heinemeier Hansson | the author of Omarchy and Rails | likely |
| VAPI | vappy, V A P I, vape-y | the voice-agent platform | likely |
| Retell | retail | the backup voice platform; the mishearing is a real word, so check context | likely |
| Twilio | twillio, twilly-o | the phone-number carrier | likely |
| ElevenLabs, Cartesia | eleven labs, car tesia | speech vendors | likely |
| Railway | railway | the hosting platform; capitalize when it's the vendor | likely |
| Tailscale | tail scale | the private mesh network | likely |
| Ollama | oh llama, o llama | the local model runner on the rig | likely |
| gitleaks | git leaks | the secrets scanner in the commit gate | likely |
| Steady | steady | the check-in app; capitalize when it's the app, not the adjective | seen |
| Mission Control | mission control | the coordination repository | seen |
| DIRECTIVES, ACTION-TRACKER, BROKEN | the directives file, the tracker, the broken list | the three coordination files; use the file names | seen |
| the gate | the gate, the mood gate, the state gate | the owner-state gate, chapter 1 | seen |
| a sitting | a sitting, a signing | a named level-day ruling, chapter 2 | seen |
| the ledger | the ledger | the decision ledger, chapter 7 | seen |
| the latch | the latch, the stop file | the file that halts every loop | seen |
| Ulysses contract | Ulysses, Odysseus contract | the pre-commitment idea behind the gate | likely |
| Sub-Zero | sub zero | an appliance brand | likely |

## Adding an entry

One line, the four columns, evidence marked. If the correct spelling is itself uncertain, leave the row out and ask the owner; a dictionary that's wrong is worse than none, because the cleaning step trusts it.
