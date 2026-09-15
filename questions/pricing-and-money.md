# Pricing and money

*Every number an agent may say out loud, and every one it may not. This file has more blocking questions than any other, for that reason.*

**43. Do you charge to come out? [BLOCKING]**
Writes `pricing.trip_fee`. Default: none. Holds: code.
If you answer differently: this is the base unit economics of every drive you make, whether or not the job closes.

**44. What does that fee cover? [BLOCKING]**
Writes `pricing.trip_fee_covers`. Default: none. Holds: code.
If you answer differently: "the visit" and "the visit, the diagnosis and a written quote" are different products and price-shoppers compare them.

**45. Does the fee apply toward the repair if they go ahead? [BLOCKING]**
Writes `pricing.trip_fee_credited`. Default: none. Holds: code.
If you answer differently: crediting it gives the agent a real line to close with and costs you the fee on every job that closes. Keeping it is cleaner revenue and a harder call.

**46. When is money collected? [BLOCKING]**
Writes `pricing.collection_point`. Default: none. Holds: code.
If you answer differently: taking nothing on the call means a simple script and full exposure to no-shows. Taking a deposit means card handling on a phone line, which changes what that line is legally doing.

**47. What payment methods do you accept at the door?**
Writes `pricing.methods`. Default: none. See `unanswered.md`. Holds: prompt.
If you answer differently: the agent gets asked this on calls and currently has nothing to say.

**48. Is a repair price ever quoted before somebody has seen the appliance? [BLOCKING]**
Writes `pricing.phone_quotes_allowed`. Default: never, and the fee is the only number the agent may state. Holds: code.
If you answer differently: quoting on the phone wins price-shoppers and loses you the ones where the guess was low. Refusing loses the shoppers outright. Whichever you choose, the agent needs one sentence for the caller who insists.

**49. Are there access or difficulty surcharges?**
Writes `pricing.surcharges`. Default: decided on site, never quoted or hinted at on the phone. Holds: code.
If you answer differently: if a surcharge can be named on the phone it must be in the bank. If it cannot, the agent needs a line that does not sound evasive.

**50. Is the fee flat, or tiered by appliance, brand or complexity?**
Writes `pricing.tiering`. Default: flat. Holds: code.
If you answer differently: flat is one number the agent can say. Tiered means the agent has to identify the appliance correctly before it can quote anything, which moves a diagnosis onto the phone.

**51. What is the warranty on your labor?**
Writes `pricing.labor_warranty`. Default: none. See `unanswered.md`. Holds: code.
If you answer differently: this is asked on sales calls and it is a real commitment. A shop without an answer gives a different one every time.

**52. Is a trip fee charged for a no-show or a no-access visit?**
Writes `pricing.no_access_policy`. Default: none. See `unanswered.md`. Holds: code.
If you answer differently: this is the answer that decides whether a wasted drive is free.

**53. Is every price rounded to a fixed increment?**
Writes `pricing.rounding`. Default: none. Holds: code.
If you answer differently: rounding makes quotes readable and repeatable and costs a little on every line. The worked example rounds every part and labor line.

--- selling parts, if you do ---

**54. Do you charge the customer for shipping?**
Writes `store.shipping_policy`. Default: charged. Holds: code.
If you answer differently: free shipping absorbed into margin converts better and quietly eats the profit on light, cheap parts.

**55. If the supplier's price rose after the customer ordered, who pays?**
Writes `store.price_drift_policy`. Default: the seller absorbs it on that order and raises the listed price afterward. Holds: code.
If you answer differently: re-billing a placed order is legal in some cases and is the fastest way to a chargeback. The worked example never touches a placed order.

**56. Which categories are final sale, and why?**
Writes `store.final_sale_categories`. Default: none. Holds: code.
If you answer differently: parts that cannot be resold once they have been in somebody's hands are the whole reason this question exists. Whatever you pick has to be on the product page before checkout, not only in the terms.

**57. What is the return window and condition?**
Writes `store.return_window`. Default: thirty days, unused and in original packaging. Holds: code.
If you answer differently: this is your exposure to wrong-part orders, which is most of them.

**58. Who pays return shipping?**
Writes `store.return_shipping`. Default: the customer, unless you shipped the wrong or a defective part. Holds: code.
If you answer differently: paying it yourself is a real cost on a category where customers order the wrong thing routinely.

**59. Is there a restocking fee?**
Writes `store.restocking_fee`. Default: none. Holds: code.
If you answer differently: note this sat as an unresolved placeholder in the worked example's own posted policy, which is what an undecided answer looks like once it is live on a website.

**60. Which parts do you sell yourself and which do you refer out?**
Writes `store.affiliate_threshold`. Default: sell everything. Holds: code.
If you answer differently: thin-margin items cost the same handling as thick ones. Referring them out earns less per item and removes the work entirely.

**61. Is sales tax based on where it ships in your margin figure?**
Writes `store.tax_in_margin`. Default: no, and the figure is understated. Holds: code.
If you answer differently: this is a tax question and it gets the independent second check before anybody prices against it. The worked example has this open and has recorded that at least one real order netted less than its own packet showed.

**62. Is supplier cost or margin ever visible to the customer?**
Writes `store.margin_visibility`. Default: never, and never in the box. Holds: code.
If you answer differently: drop-shipping makes this an operational question, not a policy one. Somebody has to check what the supplier puts in the carton.
