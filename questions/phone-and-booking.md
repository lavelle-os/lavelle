# Phone and booking

*What the phone does with a call, from the first second to the booked job. The order of these questions is the order of a call.*

**1. Is the call recorded, and is the caller told? [BLOCKING]**
Writes `phone.recording_disclosure`. Default: none. Holds: code.
If you answer differently: recording without disclosure is a legal question in many places and the answer differs by state and by who is on the line. This one gets an independent second check before anybody relies on it.

**2. Does the agent have a name and an identity of its own?**
Writes `phone.identity`. Default: no name, describes itself as the company's assistant. Holds: prompt.
If you answer differently: naming it makes the call feel like a person and makes every later "am I talking to a machine" moment worse. Leaving it unnamed costs some warmth.

**3. What may it say about who built it or what it runs on?**
Writes `phone.provenance_line`. Default: nothing beyond who owns the business. Holds: prompt.
If you answer differently: a vendor name in the answer is a marketing decision you are making on every call.

**4. Does the agent ever claim to be a person when asked directly?**
Writes `phone.honesty_rule`. Default: never claims to be a person. Holds: prompt.
If you answer differently: the cost of being caught is the call plus the review.

**5. When a caller asks "can I speak to a human," what happens? [BLOCKING]**
Writes `phone.escalation`. Default: none. Holds: code.
If you answer differently: answering the first ask immediately means the phone is a switchboard. Requiring a second explicit ask means some callers hang up first. There is no free version of this.

**6. What conditions must all be true before a call reaches a human live?**
Writes `phone.transfer_conditions`. Default: last resort only, after the booking path and a callback offer have both failed. Holds: code.
If you answer differently: every transfer interrupts whoever is holding a screwdriver. A shop with somebody in an office answers this completely differently from a shop where the only human is under a sink.

**113. What number does a transfer or a callback actually ring, and is that number forwarded to this agent? [BLOCKING]**
Writes `phone.transfer_number`. Default: none. Holds: code.
If you answer differently: this is the one that looks like the agent is broken when it is not. Most people put an agent on a new number and forward the business line to it. If the agent then transfers to the business line, the call forwards straight back into the agent, and it does that forever. **The minimum working setup is two numbers: the forwarded one the agent answers, and an unforwarded one a human answers.** Added 2026-09-15, after the operator pointed out that his own transfer goes to an entirely separate phone and had done for months, which nobody writing this down had known was load-bearing. The deploy should refuse to ship when the number a transfer dials is one that is attached to the same agent, rather than warn about it; see chapter 3 on rules that must hold.

**7. Is the line used for anything besides work?**
Writes `phone.non_business_route`. Default: business only. Holds: code.
If you answer differently: a mixed-use line needs a second flow that does not try to book anybody, and the agent has to tell them apart before it starts qualifying.

**8. Does any caller bypass the business script entirely?**
Writes `phone.bypass_rule`. Default: nobody. Holds: code.
If you answer differently: a bypass belongs on a record the system reads, never written into the script itself. A person hardcoded into a prompt is a maintenance problem that only shows up when they call and the entry is stale.
Incident: the worked example put per-caller detail directly in the script, and its own build notes flag it as belonging on the customer record instead.

**9. Are callers waiting on a callback recognized when they ring back?**
Writes `phone.expected_callbacks_source`. Default: no. Holds: code.
If you answer differently: recognizing them is a genuinely good moment on a call. Doing it from a hand-edited list means somebody has to remember to remove each entry once the job is booked, and nobody does.

**10. Are robocalls and spam answered at all?**
Writes `phone.spam_action`. Default: hang up without speaking. Holds: code.
If you answer differently: silent hangups are cheap and they will eventually drop a real customer that got misclassified, with no trace that anybody called.

**11. Does the agent ask how the caller heard about you?**
Writes `phone.ask_attribution`. Default: never asks, but logs it in the caller's own words if volunteered. Holds: prompt.
If you answer differently: asking gets you clean marketing data and turns a repair call into a survey. Not asking costs you the attribution on most jobs.

**12. Is the service area confirmed before or after the problem is described?**
Writes `phone.qualify_order`. Default: area first, for every caller not already recognized. Holds: prompt.
If you answer differently: problem-first means a caller you are about to turn down has already spent three minutes describing a broken oven, which is the worst version of that call. Area-first feels abrupt to somebody you were always going to serve.

**13. Does a recognized returning caller repeat the full intake?**
Writes `phone.returning_caller_shortcut`. Default: the address on file stands in for the area check. Holds: code.
If you answer differently: the shortcut makes repeat calls short and leans on file data that may be a year stale. Ask yourself what happens when they moved.

**14. Is the agent allowed to state a day or date before the calendar has answered? [BLOCKING-adjacent]**
Writes `phone.no_dates_before_tool`. Default: forbidden. Holds: code.
If you answer differently: this is the cheapest broken promise there is.
Incident: in the worked example the agent calculated a date itself, said it out loud, and the customer had to correct it on the call.

**15. When a caller says "can you come out," is that read as a question about the agent or about the company?**
Writes `phone.literal_questions`. Default: always read as a scheduling question about the company. Holds: prompt.
If you answer differently: correcting the caller is technically honest and sounds like a machine at the exact moment they were trying to hire you.
