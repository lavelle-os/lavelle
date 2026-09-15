# Brand and voice

*How it sounds. Small answers, and they are most of what a caller actually experiences.*

**102. Does the agent mirror the caller, or hold one tone for everybody?**
Writes `voice.mirroring`. Default: mirror, faster for a brisk caller and slower for an uncertain one. Holds: prompt.
If you answer differently: a uniform tone is predictable and testable. Mirroring is warmer and harder to keep consistent.

**103. Are there local place names that must be pronounced a particular way?**
Writes `voice.pronunciations`. Default: empty. Holds: prompt.
If you answer differently: one mispronounced local name is the fastest way to sound like an out-of-town call center, and it is a five-minute fix.

**104. How fast does it speak, and how easily can it be interrupted?**
Writes `voice.rate` and `voice.interruption_threshold`. Default: vendor defaults. Holds: code.
If you answer differently: these are tuned by ear over months, not set once. In the worked example the interruption threshold was lowered because the agent was talking over callers.

**105. Is there a fallback voice for an outage, and does the caller know when it takes over?**
Writes `voice.fallback`. Default: none. Holds: code.
If you answer differently: a silent fallback keeps the phone answering and means some callers hear a different voice than others with no explanation. The alternative is a phone that does not answer.

**106. Are compliance modes for health or card data turned on for this line?**
Writes `voice.compliance_mode`. Default: off. Holds: code.
If you answer differently: off is right for a line that never handles either. The moment question 46 is answered with "we take a deposit by phone," this answer changes with it.
