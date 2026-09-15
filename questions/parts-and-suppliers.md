# Parts and suppliers

*What gets ordered, from whom, and who is allowed to pay. The last question in this file is the one with no acceptable second answer.*

**86. What happens when a part is not in your catalog?**
Writes `sourcing.unknown_part_action`. Default: flagged for the owner to source by hand, never guessed. Holds: code.
If you answer differently: a guess here ships the wrong part at the wrong price to somebody who paid already.

**87. Is a missing part number treated the same as a part you do not carry?**
Writes `sourcing.blank_sku_reason`. Default: logged as its own distinct reason. Holds: code.
If you answer differently: collapsing the two hides the real cause. One means fill the catalog. The other means a product page is broken and will keep producing the same failure until somebody fixes it.

**88. When more than one supplier can fill a part, who wins?**
Writes `sourcing.supplier_priority`. Default: a preferred supplier when in stock, otherwise the cheapest in stock. Holds: code.
If you answer differently: the important half is the third case. When nobody has it, does it backorder silently or come to you? Silent backorders are found by the customer.

**89. If the wholesale price is unknown, does it still auto-source?**
Writes `sourcing.require_known_cost`. Default: no, it goes to manual review. Holds: code.
If you answer differently: allowing it keeps the pipeline moving and makes every margin number downstream a guess.

**90. Is there any fuzzy matching when an exact part number lookup fails?**
Writes `sourcing.fuzzy_matching`. Default: none, ever. Holds: code.
If you answer differently: the convenience is one saved lookup. The cost is a part that nearly fits.

**91. How do you tell a customer whether a part fits their model?**
Writes `store.fitment_check`. Default: compare against a stored list, and show "could not confirm" rather than "does not fit" for anything unlisted. Holds: code.
If you answer differently: a hard no on an incomplete list costs sales you should have had. An amber maybe shifts the judgment to the customer, which is why question 92 exists.

**92. Who is responsible when the customer types the wrong model and the checker agrees?**
Writes `store.fitment_liability`. Default: the customer confirms their own model. Holds: code.
If you answer differently: this is a terms question and it gets the independent second check before it goes on a website.

**93. Does the supplier's name appear in the box?**
Writes `sourcing.blind_ship`. Default: assumed blind. Holds: code.
If you answer differently: check how it is actually achieved on your account. In the worked example it is not a setting anybody turned on, it is a side effect of the ship-to address differing from the billing address, which means a different account could behave differently and nobody would be told.

**94. How is a supplier shipping notice matched back to a customer order?**
Writes `sourcing.match_strategy`. Default: exact supplier order number when unambiguous, then postal code among open orders, then treated as your own stock. Holds: code.
If you answer differently: never match on "same part, most recent order." Mailing a stranger's tracking number to the wrong person is the most expensive mistake on this whole path and it is silent.

**95. How does the system tell your own restock from a customer's part?**
Writes `sourcing.own_restock_test`. Default: anything shipping to your own postal code is yours and is left alone. Holds: code.
If you answer differently: without a test, your own van stock generates a customer notification to nobody.

**96. When a shipping email arrives with no tracking number, is that logged differently from a non-shipping email?**
Writes `sourcing.parse_failure_modes`. Default: yes, loudly and separately. Holds: code.
If you answer differently: collapsing them means real shipments go missing quietly.
Incident: an earlier version in the worked example conflated the two and missed real shipping notices for weeks.

**97. How many inboxes have to be watched?**
Writes `sourcing.mailboxes`. Default: one. Holds: code.
If you answer differently: any second account name, brand or login produces a second inbox, and the notices that land there are invisible until somebody complains.
Incident: an order placed under a different account name sent its shipping notice to an unwatched inbox for days.

**98. Is your own order number written onto the supplier's order?**
Writes `sourcing.po_reference`. Default: yes, even where nothing automated reads it. Holds: code.
If you answer differently: it costs nothing and it is the only way a human traces the two systems together six months later.

**99. Is there a ceiling on an automated purchase, and is the price re-checked at the moment of ordering?**
Writes `sourcing.price_ceiling`. Default: a ceiling, re-verified immediately before ordering, aborting if it has drifted. Holds: code.
If you answer differently: without the re-check you buy at a price nobody approved.

**100. Are carts ever pre-built and left waiting?**
Writes `sourcing.prebuilt_carts`. Default: never. Holds: code.
If you answer differently: prices drift, sessions expire, and an idle cart is an accidental checkout waiting for somebody to click the wrong thing.

**101. Who may hold payment credentials and click pay? [BLOCKING]**
Writes `sourcing.payment_authority`. Default: none. Holds: code.
If you answer differently: in the worked example the answer is the owner, personally, every single time, and no automation may ever hold or type card details. This is the hardest boundary in the bank and the one most likely to be quietly eroded by convenience.
