# Trade knowledge

*The judgment calls that are the trade itself. These are the questions where the answer is not a preference, it is what you know.*

**63. What do you fix? [BLOCKING]**
Writes `trade.services`. Default: none. Holds: code.
If you answer differently: this is the whole addressable market in one line.

**64. What do you refuse, by brand? [BLOCKING]**
Writes `trade.excluded_brands`. Default: none. Holds: code.
If you answer differently: an exclusion list is usually parts availability, training, or one bad experience. Write down which, because the reason is what tells you when to revisit it.

**65. Is an exclusion whole-brand, or only certain appliance types from that brand?**
Writes `trade.exclusion_granularity`. Default: whole brand. Holds: code.
If you answer differently: per-type exclusions are common and the agent has to hold both facts at once, or it turns away work you would take.

**66. Do you do residential only, commercial only, or both? [BLOCKING]**
Writes `trade.market_segment`. Default: none. Holds: code.
If you answer differently: this decides half the calls.

**67. How do you tell commercial from residential when the brand does not say?**
Writes `trade.commercial_test`. Default: the test is the appliance itself, never the address. Holds: prompt.
If you answer differently: judging by the setting produces both failures at once. You decline a home-style unit in a church kitchen, and you accept a heavy commercial unit somebody put in a basement.

**68. Do you install, or repair only?**
Writes `trade.installs`. Default: repair only. Holds: code.
If you answer differently: installs are adjacent revenue and a different liability. If the answer is no, decide separately whether you refer them out.

**69. Are there tasks that sound like yours but are somebody else's job?**
Writes `trade.referral_tasks`. Default: none. Holds: code.
If you answer differently: the trap is that the referral task and a real repair share a description. A cleaning request and a broken unit with the same symptom must not be routed the same way, or you refer away a paying job.

**70. Is there a brand whose model number is required before you can even say yes or no?**
Writes `trade.model_required_brands`. Default: none. Holds: code.
If you answer differently: store brands whose nameplate covers several manufacturers are the usual case. That call cannot be answered live, so it needs its own route: a callback or a photo request instead of a guess.

**71. What happens when the agent does not recognize a brand the caller says?**
Writes `trade.unknown_brand_behavior`. Default: spell it back once, then book with the field blank and the caller's exact words in the description. Holds: code.
If you answer differently: guessing the nearest known brand books a job under a fact nobody checked.

**72. Do you check for safety recalls before quoting?**
Writes `trade.recall_check`. Default: no. Holds: code.
If you answer differently: answering yes turns some paid jobs into manufacturer-covered fixes you do not bill for, and is closer to a disclosure obligation than a policy. It also needs a list somebody maintains.

**73. When two parts look interchangeable, may one be substituted?**
Writes `trade.substitution_rule`. Default: only with retesting and a written disclosure on the invoice. Holds: code.
If you answer differently: physical fit does not mean electrical or functional equivalence, and the failure shows up at the customer's house weeks later.

**74. Do you keep your own reference of confirmed part numbers and look-alike traps?**
Writes `trade.parts_reference`. Default: none. Holds: code.
If you answer differently: this is the only item in the bank that becomes more valuable every year you run the business. It is built from your own jobs and nobody else has it.

**75. What does the agent do when a caller describes something dangerous? [BLOCKING]**
Writes `trade.safety_interrupt`. Default: none. Holds: code.
If you answer differently: gas, smoke and sparking need a scripted interrupt that stops the booking flow, tells the caller to get out and call the emergency number, and books nothing. It overrides every other rule in the system, including the ones trying to make a sale.
