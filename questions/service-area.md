# Service area

*Who gets served, who gets turned down, and which way the system leans when it cannot tell. The turn-down script is a bigger part of this than most owners expect.*

**32. How is the area defined? [BLOCKING]**
Writes `area.definition`. Default: none. Holds: code.
If you answer differently: a named-place list, a postal code list, a radius, and a scheduling platform's own zone setting are four different things, and a shop that uses more than one has to keep them in step. Expanding the area means editing every one of them.

**33. Which of those is the source of truth at the moment of booking?**
Writes `area.authority`. Default: the scheduling platform's own zone check. Holds: code.
If you answer differently: whatever is not authoritative is a script the agent reads out loud, and it will drift. Deciding which one wins is what stops a coverage change from being half-applied.

**34. What happens to a call outside the area?**
Writes `area.decline_script`. Default: a plain decline with no referral. Holds: prompt.
If you answer differently: this is a script somebody hears on a bad day. It is worth writing properly rather than leaving the agent to improvise.

**35. Do you send declined callers to anyone by name?**
Writes `area.referrals`. Default: no names, a generic line that other companies exist. Holds: prompt.
If you answer differently: naming somebody is free goodwill and free advertising for a competitor. Naming nobody is safe and slightly cold.

**36. Are there companies the agent must never name?**
Writes `area.banned_names`. Default: empty. Holds: code.
If you answer differently: if the answer is not empty it needs enforcement in code, not a line in a script.
Incident: in the worked example a competitor was named aloud on a real call before the ban became an actual checked list.

**37. When a caller names a place the system does not recognize, does it decline or ask more?**
Writes `area.unknown_place_behavior`. Default: never decline blind, ask for a postal code and decide on that. Holds: code.
If you answer differently: blind declines on an unlisted neighborhood name turn away people you serve.

**38. Are there places technically outside your stated area that you do cover?**
Writes `area.exceptions` and `area.volunteer_exceptions`. Default: exceptions exist but are never volunteered, only honored if the caller names the place first. Holds: code.
If you answer differently: volunteering them turns every call from the excluded city into a negotiation. Not volunteering them loses the customers who did not know to ask. Pick which loss you want.

**39. Are any postal codes split, so the answer depends on which neighborhood inside it the caller names?**
Writes `area.split_codes`. Default: none. Holds: code.
If you answer differently: a split code means a required follow-up question and, usually, an exact string the booking system demands or it rejects the address. This is the single easiest thing for a new hire or a new agent to get wrong.

**40. If the coverage check is unreachable, do you accept or decline? [BLOCKING-adjacent]**
Writes `area.failure_mode`. Default: accept. Holds: code.
If you answer differently: this is a direct choice between two error costs. A wrong acceptance is caught later and costs a phone call. A wrong decline is never caught and the customer is gone. The worked example accepts, on exactly that reasoning.

**41. If the caller's own postal code is ambiguous, do you accept or decline?**
Writes `area.ambiguous_input_mode`. Default: decline. Holds: code.
If you answer differently: note this is the opposite lean from question 40, deliberately. An unreachable system will re-check later. A caller who cannot tell you where they are will not.

**42. Does an out-of-area caller who wants a callback get one?**
Writes `area.out_of_area_callback`. Default: details taken, no promise of a callback and no promise the area will ever cover them. Holds: prompt.
If you answer differently: taking details with a promise attached is how you generate a complaint from somebody who was never a customer.
