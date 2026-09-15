# Scheduling and capacity

*What a day holds, and what the phone is allowed to promise about it. These answers set the ceiling on the whole business.*

**16. What days do you work? [BLOCKING]**
Writes `schedule.working_days`. Default: none. Holds: code.
If you answer differently: this is the weekly capacity ceiling and the weekend revenue question in one line.

**17. What arrival windows do you offer, and how wide is each? [BLOCKING]**
Writes `schedule.windows`. Default: none. Holds: code.
If you answer differently: window count times working days is the whole capacity of the business. Narrower windows sell better and strand more time.

**18. What is the earliest day you can be booked? [BLOCKING]**
Writes `schedule.earliest_day`. Default: none. Holds: code.
If you answer differently: "today if it is before noon" is a different product from "tomorrow, always," and the first one needs a cutoff hour, which opens question 19.
Incident: the worked example rules out same-day entirely, and that ruling was made after a same-day promise could not be kept.

**19. If you do take same-day, what is the cutoff hour, and what happens to a call after it?**
Writes `schedule.same_day_cutoff`. Default: not applicable when 18 is "tomorrow or later." Holds: code.
If you answer differently: without a cutoff the agent will sell a 4 p.m. slot at 3:55.

**20. Where in the window does somebody actually aim to arrive?**
Writes `schedule.arrival_target`. Default: the start of the window. Holds: prompt.
If you answer differently: a two-hour window where you aim for the middle is a different promise from one where you aim for the start, and the customer plans their day on it.

**21. Is an exact time ever given instead of the window?**
Writes `schedule.exact_times_allowed`. Default: never. Holds: code.
If you answer differently: exact times are what customers ask for and what generates the angry call at 2:20.

**22. When does a weekday name stop meaning this week and start meaning next?**
Writes `schedule.weekday_rollover_hour`. Default: after the last window of the day has started. Holds: code.
If you answer differently: get this wrong and the agent offers a slot that has already passed.

**23. How far ahead does the system look before it says you are full?**
Writes `schedule.search_days_ahead`. Default: fourteen. Holds: code.
If you answer differently: a short window turns a busy fortnight into "we cannot help you." A long one books somebody into a month they will forget about.

**24. Which closures are automatic, and which do you block by hand?**
Writes `schedule.holidays` and `schedule.blocked_dates`. Default: a small fixed holiday list, everything else blocked manually. Holds: code.
If you answer differently: whatever is manual has to be entered far enough ahead that the phone sees it before somebody books into it.

**25. How fast does a short-notice day off reach the phone?**
Writes `schedule.blocked_dates_source`. Default: a list the phone checks before offering any day. Holds: code.
If you answer differently: if the answer involves a deploy or an edit somebody has to remember, the phone will book a day you are not working.

**26. If a customer already has an appointment, can they book a second one?**
Writes `schedule.existing_appointment_rule`. Default: an existing appointment blocks a new booking; a second appliance at the same address is added to the same visit. Holds: code.
If you answer differently: one visit for two appliances is one fee and one drive. Two bookings is two of each. Your customers will notice which one you chose.

**27. Can two callers claim the same window at once?**
Writes `schedule.slot_lock`. Default: a short-lived hold on the slot before the calendar is asked, expiring if the booking never completes. Holds: code.
If you answer differently: without a hold, a booking that takes ninety seconds of conversation can be sold twice.

**28. Is a reschedule a move, or a cancel and rebook?**
Writes `schedule.reschedule_mode`. Default: a true move. Holds: code.
If you answer differently: cancel-then-rebook leaves a window where the customer looks unbooked, and it usually drops the notes and history attached to the original job.

**29. When a diagnosed job comes back for the actual repair, is that a new job?**
Writes `schedule.repair_visit_mode`. Default: attached to the original job, carrying the diagnosis and quote forward. Holds: code.
If you answer differently: a new record means the history is split across two, and somebody eventually charges the fee twice.

**30. Is a return visit for the same unfixed problem free? [BLOCKING-adjacent]**
Writes `pricing.recall_policy`. Default: free if the same appliance was worked on within a defined window by you. Holds: code.
If you answer differently: this is the one recall answer the phone may state out loud, so it has to be a rule and not a judgment call. Everything outside the window is decided in person.

**31. Is there any same-day override for a genuine emergency?**
Writes `schedule.emergency_override`. Default: none. See `unanswered.md`. Holds: code.
If you answer differently: a hard no is simple and will be tested by somebody with water coming through a ceiling.
