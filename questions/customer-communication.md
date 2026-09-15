# Customer communication

*What goes out after the call, and what the system is allowed to promise while sending it.*

**76. How is a confirmation delivered, and who picks the channel?**
Writes `comms.confirmation_channels`. Default: email and text when both are on file, text alone when there is no email. Holds: code.
If you answer differently: the case that matters is a caller with neither. That customer has to be told out loud that nothing is coming, and offered something else.

**77. Is a confirmation ever promised before it can actually be sent?**
Writes `comms.promise_rule`. Default: only promised when the address or number was actually captured on that call. Holds: code.
If you answer differently: this is a promise the agent makes confidently and cannot keep.
Incident: in the worked example a confirmation email was promised to somebody who never gave an email address.

**78. Are specific timeframes ever promised in a reply?**
Writes `comms.banned_phrases`. Default: a checked list of banned phrases, including any promised turnaround and any claim about what the system did internally. Holds: code.
If you answer differently: a phrase list has to be enforced in code to be real. A line in a script is a suggestion.
Incident: the worked example added its list after a promised timeframe was made on a live call and missed.

**79. When something breaks mid-call, how is it described?**
Writes `comms.failure_language`. Default: plain words, never system language. Holds: code.
If you answer differently: technical phrasing at the moment of a failure is what makes a caller realize they have been talking to software, and it happens at the worst possible moment.
Incident: callers in the worked example had to correct a machine-sounding failure message twice before this became a code-level rule.

**80. When a booking fails outright, what is the fallback order?**
Writes `comms.fallback_order`. Default: self-service link, then a callback with no promised timeframe, then a live transfer as a last resort. Holds: code.
If you answer differently: each step you remove pushes the call to a human faster and interrupts whoever that is.

**81. Is a callback ever given a specific time?**
Writes `comms.callback_promise`. Default: no time, with a plain warning that evenings and weekends take longer. Holds: prompt.
If you answer differently: naming a time on behalf of a person who is under a sink is a promise somebody else has to keep.

**82. How are numbers spoken?**
Writes `comms.number_reading`. Default: ordinary numbers as words, structured identifiers read back digit by digit with grouping. Holds: prompt.
If you answer differently: reading a postal code as a single number is how a wrong address gets confirmed by a customer who was not really listening.

**83. Are tracking and shipping notices sent by your automation, or by the platform?**
Writes `comms.notification_source`. Default: through the storefront platform only. Holds: code.
If you answer differently: sending directly means a bug in your own code can message a customer. Routing through the platform caps how bad that can get.

**84. May the system send a message to an arbitrary number, ever?**
Writes `comms.outbound_scope`. Default: no, not even an internal one to the owner. Holds: code.
If you answer differently: this is the narrowest and most useful boundary in the file. Whatever you allow is what a misbehaving agent can do at three in the morning.

**85. Is the repair brand and the parts brand the same to a customer?**
Writes `comms.brand_split`. Default: the same. Holds: code.
If you answer differently: two brands means two voices, two sets of policies, and a customer who does not know the two are related. It also means the supplier's name appears in neither.
