# Accounts and tools

*The systems underneath, and the guardrails between them and the live business.*

**107. Can a test or rehearsal build reach the live calendar?**
Writes `tools.production_guard`. Default: no. Live access requires an explicit setting, and anything unset falls back to a pretend calendar that stores nothing. Holds: code.
If you answer differently: defaulting to live means the first misconfigured run books a real customer into a real day.

**108. Where does "how did you hear about us" go if you do collect it?**
Writes `tools.lead_source_field`. Default: written to a real field only when it exactly matches an existing option, otherwise a free-text note. Holds: code.
If you answer differently: inventing a new option value can make the booking system reject the entire booking, which loses the job over a marketing field.

**109. How fast does the system notice when you change an option list in your own dashboard?**
Writes `tools.option_cache_ttl`. Default: cached for an hour, refreshed immediately on the first unmatched value. Holds: code.
If you answer differently: if the answer is "on the next deploy," then your own dashboard edits do not take effect and nobody will connect the two.

**110. Is a partial update to the phone agent's configuration allowed?**
Writes `tools.config_update_mode`. Default: full replace only. Holds: code.
If you answer differently: a partial update once silently wiped an entire prompt in the worked example. Full replacement is more work every time and it cannot half-apply.

**111. Is there a check that the agent's advertised tools match the code that runs them?**
Writes `tools.schema_drift_test`. Default: none. Holds: code.
If you answer differently: this drift is silent and produces an agent that confidently calls something that no longer exists. The worked example added a test because it kept happening.

**112. Who holds the credentials for each system, and what is the least each agent needs?**
Writes `tools.credential_scope`. Default: one credential per system, scoped to the narrowest thing that works. Holds: code.
If you answer differently: covered properly in chapter 6. It is listed here because it is a setup answer, not only a security posture.
