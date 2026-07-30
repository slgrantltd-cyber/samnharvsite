/**
 * The glossary — UK property investment terms in plain English,
 * with the honest asides a course would charge for.
 */

export interface Term {
  term: string;
  definition: string;
}

export const GLOSSARY: Term[] = [
  { term: "Agreement in Principle (AIP)", definition: "A lender's indication of what they'd lend you, based on a soft check. Not a promise — but agents take you seriously with one." },
  { term: "Article 4 Direction", definition: "A council order removing permitted development rights in an area — most commonly meaning you need planning permission to create a new HMO. Check before you buy, not after." },
  { term: "AST", definition: "Assured Shorthold Tenancy — the standard tenancy contract for most UK residential lets." },
  { term: "BMV (Below Market Value)", definition: "Buying under what the property would fetch properly marketed. Real BMV comes from motivated sellers and speed, not from magic — anyone promising 30% discounts everywhere is selling you something." },
  { term: "Bridging finance", definition: "Short-term lending used to buy fast or fund works before refinancing or selling. Expensive by the month, so the exit plan matters more than the rate." },
  { term: "BRRR", definition: "Buy, Refurbish, Rent, Refinance — add value through works, refinance at the higher value, and pull most of your cash back out to go again." },
  { term: "Capital growth", definition: "The rise in a property's value over time. Nice when it happens; a bonus, not a plan — we buy on cash flow and treat growth as upside." },
  { term: "Cash flow", definition: "What's left of the rent each month after every cost — mortgage, management, maintenance, voids, bills. The number that decides whether a deal feeds you or eats you." },
  { term: "Completion", definition: "The day money moves, ownership transfers, and you get the keys. Exchange is the commitment; completion is the handover." },
  { term: "Conveyancing", definition: "The legal work of transferring property ownership — searches, enquiries, contracts. Slow when unmanaged; chase it weekly." },
  { term: "Deal packaging", definition: "Finding and negotiating a deal, doing the due diligence, then selling that ready-made opportunity to an investor for a fee. The packager's reputation is the product." },
  { term: "Deal sourcing", definition: "Finding investment opportunities — on-market, off-market, direct-to-vendor — for yourself or for investor clients. Compliant sourcers are registered, insured and transparent about fees." },
  { term: "Development finance", definition: "Lending for heavier projects, drawn in stages as works complete, with the lender's surveyor signing off each stage." },
  { term: "Due diligence", definition: "Everything you verify before committing: title, structure, area, numbers, comparables. The work that separates investing from gambling." },
  { term: "EICR", definition: "Electrical Installation Condition Report — legally required for lets, renewed five-yearly. Budget for remedial works on older stock." },
  { term: "EPC", definition: "Energy Performance Certificate, rated A–G. Rental property currently needs E or better, and the bar is expected to rise — check the upgrade cost on anything marginal." },
  { term: "Equity", definition: "The slice of the property you actually own: value minus debt. Idle equity in a portfolio is capital not working — the tracker's job is to spot it." },
  { term: "ERC (Early Repayment Charge)", definition: "The penalty for leaving a mortgage product early. The silent killer of refinance plans — check the dates before you plan the exit." },
  { term: "Exchange of contracts", definition: "The moment both sides are legally committed and the deposit is at risk. Until exchange, anyone can walk away." },
  { term: "Exit strategy", definition: "How you get your money back out: refinance, sell, or hold. Decided before purchase, with a written fallback — deals fail at the exit, not the entrance." },
  { term: "Flip", definition: "Buy, improve, sell. Profit lives in the margin between all-in cost and sale price — we want 20% on cost before we'll touch one." },
  { term: "Gazumping", definition: "The vendor accepting a higher offer after accepting yours, pre-exchange. Legal in England. Speed to exchange is the only real defence." },
  { term: "GDV (Gross Development Value)", definition: "What the finished project will be worth. Every other number leans on this one, so evidence it with sold comparables, not optimism." },
  { term: "Ground rent", definition: "Annual charge on some leaseholds. Doubling ground rent clauses can make a property unmortgageable — read the lease." },
  { term: "HMO", definition: "House in Multiple Occupation — three or more unrelated people sharing facilities. Higher income, higher obligation: licensing, fire safety, minimum room sizes." },
  { term: "ICR (Interest Coverage Ratio)", definition: "The lender's stress test: rent must cover the mortgage interest by 125–145% at a stressed rate. It caps what you can borrow regardless of the property's price." },
  { term: "Lease option", definition: "The right — not the obligation — to buy a property at a fixed price within a period, usually while controlling and profiting from it meanwhile. Powerful, and utterly dependent on proper legal drafting." },
  { term: "Leasehold", definition: "Owning the property but not the land, for a fixed term. Below ~80 years remaining, extension costs bite and lenders flinch." },
  { term: "LTV (Loan to Value)", definition: "Debt as a percentage of value. 75% is the standard investment ceiling; lower LTV means safer, lazier money." },
  { term: "Off-market", definition: "Property sold without public marketing — through relationships, letters, or word of mouth. Less competition, more work." },
  { term: "Permitted development", definition: "Building works allowed without full planning permission. The rules are detailed and council-specific — confirm in writing for anything structural." },
  { term: "Probate sale", definition: "A sale following the owner's death. Often chain-free with motivated executors — handled with respect, these are some of the fairest deals done." },
  { term: "Refinancing", definition: "Replacing one mortgage with another — usually after adding value, to release equity. Most lenders want six months' ownership first." },
  { term: "Rent to rent", definition: "Leasing a property from a landlord at a guaranteed rent, then operating it (often as serviced accommodation) for the margin. A business built on an agreement — the contract is everything." },
  { term: "ROI / Return on cash", definition: "Annual profit divided by the cash you actually put in. The honest scorecard for leveraged property — we grade every deal on it." },
  { term: "Section 21 / Section 8", definition: "The two legal routes to regaining possession from a tenant. Both depend on your paperwork being right from day one — deposit protection, certificates, notices." },
  { term: "Serviced accommodation (SA)", definition: "Furnished short-stay lets run like a hotel. Higher revenue, real operations — cleaning, guests, channels. We run two ourselves." },
  { term: "Sourcing fee", definition: "What a deal sourcer charges for a packaged deal — typically £2–5k. Fair when the work is real and the fee is agreed in writing before commitment." },
  { term: "Stamp duty (SDLT)", definition: "Tax on purchase, with a surcharge on additional dwellings. Always in the deal analysis from the start — it's not a footnote, it's thousands." },
  { term: "Stress test", definition: "Re-running the numbers at worse conditions — higher rates, lower rent, longer voids. If the deal only works in the sunshine, it doesn't work." },
  { term: "Title", definition: "The legal record of ownership at the Land Registry, including boundaries, covenants and charges. Your solicitor reads it; you should understand it." },
  { term: "Vendor", definition: "The seller. Understanding their situation — timescale, motivation, pressure — is worth more than any negotiation script." },
  { term: "Void", definition: "A period with no tenant and no rent. Budget 5–10% of the year for them; pretending they won't happen is how spreadsheets lie." },
  { term: "Yield (gross)", definition: "Annual rent divided by purchase price. A quick comparison tool between properties — useful shorthand, but cash flow pays the bills, not yield." },
];
