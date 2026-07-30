/**
 * The resource library — every document is complete, opinionated and usable
 * as-is. Content is rendered on-site and exported as branded PDFs by
 * scripts/generate-pdfs.sh (run after adding or editing a document).
 */

export type ResourceCategory =
  | "Due diligence"
  | "Buying process"
  | "Money & finance"
  | "Operating"
  | "Scripts & negotiation"
  | "Planning & strategy";

export interface ResourceSection {
  heading: string;
  intro?: string;
  items: string[];
}

export interface Resource {
  slug: string;
  title: string;
  category: ResourceCategory;
  description: string;
  readMinutes: number;
  intro: string;
  sections: ResourceSection[];
}

export const CATEGORIES: { name: ResourceCategory; blurb: string }[] = [
  { name: "Due diligence", blurb: "Check everything before money moves." },
  { name: "Buying process", blurb: "From first viewing to completion day." },
  { name: "Money & finance", blurb: "Costs, lending and the numbers." },
  { name: "Operating", blurb: "Running the asset after you own it." },
  { name: "Scripts & negotiation", blurb: "What to say, and how to say it." },
  { name: "Planning & strategy", blurb: "The longer game, on paper." },
];

export const RESOURCES: Resource[] = [
  {
    slug: "due-diligence-checklist",
    title: "Property Due Diligence Checklist",
    category: "Due diligence",
    description:
      "The full pre-offer investigation — title, structure, area, numbers — in the order we actually run it.",
    readMinutes: 8,
    intro:
      "Due diligence is not a mood, it's a list. This is the one we run before any offer goes in. Work top to bottom; anything you can't tick becomes a question for the agent, the vendor or your solicitor — before exchange, not after.",
    sections: [
      {
        heading: "The area",
        items: [
          "Sold prices for the street and surrounding roads over the last 24 months (Land Registry, not asking prices)",
          "Current rental listings within a half-mile — how many, how long listed, at what rent",
          "Walk the street at 9am, 3pm and 9pm — a street changes character three times a day",
          "Flood risk on the government flood map, including surface-water risk",
          "Planning applications on the council portal for the street and both neighbours",
          "Article 4 directions or selective licensing schemes covering the postcode",
          "School catchments and Ofsted ratings if the exit or tenant profile is families",
        ],
      },
      {
        heading: "The building",
        items: [
          "Construction type and age — anything non-standard flags the lender conversation early",
          "Roofline from the street: sagging ridge, slipped tiles, chimney condition",
          "Damp: smell it on entry, look at skirting level, check behind furniture on external walls",
          "Cracks: hairline is cosmetic; stepped cracking through brickwork gets a structural engineer",
          "Boiler age, service history and location — a replacement is £2–3.5k of your budget",
          "Consumer unit age — an old fuse board usually means a full or partial rewire",
          "Window condition and FENSA certificates for replacements",
          "Loft: insulation depth, daylight through the roof, water tank condition",
          "Signs of Japanese knotweed anywhere on the plot or adjoining land",
        ],
      },
      {
        heading: "The legals",
        items: [
          "Tenure — leasehold years remaining, ground rent terms and service charge history",
          "Title plan matches what you walked: boundaries, parking, access",
          "Restrictive covenants that touch your strategy (no business use, no alterations)",
          "Rights of way or shared access across the plot",
          "Building regulations sign-off for any extension or conversion you can see",
          "Gas and electrical certificates if currently tenanted",
          "EPC rating — and what it costs to reach the letting minimum if it's marginal",
        ],
      },
      {
        heading: "The numbers",
        items: [
          "Your maximum price from the deal analysis — set before the viewing, not after",
          "Three genuine rental comparables, phoned and confirmed, not just listed",
          "Refurbishment budget built line by line, plus 15% contingency",
          "All-in acquisition cost: price, stamp duty, legals, survey, finance fees",
          "The deal still works at an interest rate 2% higher than today's quote",
          "Exit tested two ways: what if it won't refinance, what if it won't sell",
        ],
      },
    ],
  },
  {
    slug: "viewing-checklist",
    title: "Property Viewing Checklist",
    category: "Due diligence",
    description:
      "A 15-minute viewing routine that reads the building, the vendor and the deal — printable, one page per property.",
    readMinutes: 5,
    intro:
      "You learn more in fifteen structured minutes than in an hour of wandering. Run the same route every time: outside, ground floor, upstairs, loft, garden — then the questions. Photograph everything; your memory will lie to you by the third viewing.",
    sections: [
      {
        heading: "Before you knock",
        items: [
          "Walk past both neighbouring houses — condition, parked cars, curtains",
          "Photograph the roofline, chimney and guttering from across the road",
          "Check the drains lift: lift an inspection cover if accessible",
          "Note the aspect — which rooms get afternoon light",
        ],
      },
      {
        heading: "Inside",
        items: [
          "Smell first: damp, dogs and fresh paint all tell you something",
          "Floor levels: a marble or phone level on windowsills upstairs",
          "Open and close every door — sticking doors mean movement or moisture",
          "Run every tap; flush every toilet; check water pressure upstairs",
          "Look under the sink, behind the bath panel and inside the loft hatch",
          "Count sockets per room — a 1970s socket count means a rewire for modern use",
          "Measure key rooms — agents' floorplans are optimistic",
        ],
      },
      {
        heading: "Questions for the agent",
        items: [
          "How long has it been listed, and any fall-throughs? Why?",
          "What is the vendor's situation — probate, chain, relocation, landlord selling up?",
          "Have there been offers, and at what level were they rejected?",
          "What would the vendor take today for a proceedable buyer?",
          "Who lives either side and above/below?",
        ],
      },
      {
        heading: "Score it before you leave the street",
        items: [
          "Structure: sound / questions / survey essential",
          "Refurb level: cosmetic / medium / back-to-brick",
          "Vendor motivation: low / medium / high",
          "Fit with your strategy and numbers: pass / analyse tonight / offer this week",
        ],
      },
    ],
  },
  {
    slug: "deal-analysis-template",
    title: "Deal Analysis Template",
    category: "Money & finance",
    description:
      "The one-page appraisal we run on every opportunity — the paper version of our Deal Intelligence analyzer.",
    readMinutes: 6,
    intro:
      "Every deal gets the same page. If the page doesn't work, the deal doesn't happen — however pretty the kitchen is. Fill it in cold, before you fall for the property. Our online Deal Intelligence analyzer runs these numbers live if you'd rather type than write.",
    sections: [
      {
        heading: "The asset",
        items: [
          "Address, asking price, agent and listing date",
          "Strategy: BTL / BRRR / HMO / R2R / flip / SA — one, not several",
          "Why this property suits that strategy in one sentence",
        ],
      },
      {
        heading: "Money in",
        items: [
          "Purchase price (your number, not theirs)",
          "Stamp duty including the additional-dwelling surcharge",
          "Legal, survey and broker fees",
          "Refurbishment budget (line-by-line total, plus 15% contingency)",
          "Finance costs: arrangement fees, bridge interest if applicable",
          "TOTAL CASH REQUIRED — the number that actually leaves your account",
        ],
      },
      {
        heading: "Money out — monthly",
        items: [
          "Realistic rent from three confirmed comparables",
          "Mortgage interest at today's rate AND at +2%",
          "Voids at 5–10% depending on area and tenant profile",
          "Management, maintenance, insurance, bills where applicable",
          "NET MONTHLY CASH FLOW at both interest rates",
        ],
      },
      {
        heading: "The verdict",
        items: [
          "Return on cash employed (annual net cash flow ÷ total cash in)",
          "Gross yield (annual rent ÷ purchase price)",
          "For BRRR/flip: end value evidenced by three sold comparables",
          "Cash left in after refinance, and equity created",
          "The walk-away price — written down before the negotiation starts",
          "Decision: offer / negotiate / pass — and the single reason why",
        ],
      },
    ],
  },
  {
    slug: "refurb-budget-planner",
    title: "Refurbishment Budget Planner",
    category: "Money & finance",
    description:
      "Room-by-room cost lines with realistic UK ranges, plus the rules that stop budgets doubling.",
    readMinutes: 7,
    intro:
      "Refurbs don't overrun because trades are slow; they overrun because the budget was a guess. Price every line before exchange, get real quotes for the big five (roof, damp, electrics, heating, structure), and protect a 15% contingency you genuinely don't spend.",
    sections: [
      {
        heading: "Strip-out & structure",
        items: [
          "Skip hire and strip-out labour — £800–2,000 for a 3-bed",
          "Damp treatment with guarantee — £1,500–4,000 if flagged",
          "Structural work (steels, lintels, wall removal) — engineer's design first, then quotes",
          "Roof repairs £500–2,000; full re-roof £5,000–12,000",
          "Replacement windows — £400–800 per unit fitted",
        ],
      },
      {
        heading: "First fix",
        items: [
          "Full rewire with new consumer unit — £3,000–5,500 on a 3-bed",
          "New boiler and full central heating — £3,500–6,000",
          "Plumbing first fix for new bathroom/kitchen positions",
          "Plastering: skim £8–15/m²; full reboard and skim £25–45/m²",
        ],
      },
      {
        heading: "Second fix & finishes",
        items: [
          "Kitchen fitted: £3,000–6,000 rental grade; £6,000–12,000 for sale",
          "Bathroom fitted: £2,500–5,000",
          "Internal doors, skirting, architrave — £150–250 per door all-in",
          "Decoration throughout — £1,500–3,500 on a 3-bed",
          "Flooring: LVT £30–45/m² fitted; carpet £15–25/m²",
          "External: fencing, path, front door — the kerb appeal your valuation needs",
        ],
      },
      {
        heading: "The rules",
        items: [
          "15% contingency on top of the total — untouched unless something is discovered, not chosen",
          "Fixed-price quotes in writing for everything over £1,000",
          "Payment on completion of stages, never large sums up front",
          "One change-order rule: any addition is priced and signed before work continues",
          "Spec to the exit: rental-grade for rent, sale-grade for sale — never in between",
        ],
      },
    ],
  },
  {
    slug: "offer-and-negotiation-planner",
    title: "Offer & Negotiation Planner",
    category: "Scripts & negotiation",
    description:
      "How we structure an offer, justify it, and hold the line — including the walk-away discipline.",
    readMinutes: 6,
    intro:
      "A negotiation is won before the phone call: you know your maximum, their situation, and the evidence for your number. The planner keeps all three in front of you while you talk.",
    sections: [
      {
        heading: "Before any offer",
        items: [
          "Maximum price from the deal analysis — written, dated, non-negotiable with yourself",
          "Vendor situation from the agent: timescale, chain, why selling",
          "Evidence pack: three sold comparables and your refurb total, ready to quote",
          "Your proceedability proof: agreement in principle, funds statement, solicitor instructed",
        ],
      },
      {
        heading: "Structuring the offer",
        items: [
          "Open 8–12% below your maximum — enough room to move twice, not so low it insults",
          "Attach the evidence, not apologies: 'based on the sold prices at №12 and №31, and £38k of works'",
          "Lead with your strengths: speed, no chain, flexibility on completion date",
          "Offer in writing to the agent the same day you speak",
          "Give the offer a shelf life: 'this stands until Friday' — then let it lapse quietly",
        ],
      },
      {
        heading: "Handling the responses",
        items: [
          "'It's too low' — ask what number would do it today; never bid against yourself",
          "Counter once, moving less than half the gap, restating the evidence",
          "If they hold above your maximum: thank them and ask the agent to keep you first in line",
          "Fall-throughs come back — a lapsed offer at the right number often gets a call in three weeks",
        ],
      },
      {
        heading: "After acceptance",
        items: [
          "Memorandum of sale issued within 48 hours with both solicitors named",
          "Survey booked inside the first week — renegotiate on findings with quotes, not feelings",
          "Weekly chase call to both solicitors, every week, without fail",
          "Any renegotiation is evidence-first: the survey line, the quote, the revised number",
        ],
      },
    ],
  },
  {
    slug: "legal-conveyancing-checklist",
    title: "Legal & Conveyancing Checklist",
    category: "Buying process",
    description:
      "What your solicitor should be doing, what to chase, and the enquiries that actually matter.",
    readMinutes: 6,
    intro:
      "Conveyancing feels like a black box until you know the sequence. This is the sequence — and the handful of enquiries that genuinely protect an investor, so you can push where it matters instead of chasing everything equally.",
    sections: [
      {
        heading: "Instruction week",
        items: [
          "Solicitor instructed, ID checks done, funds source evidenced",
          "Memorandum of sale received and details checked",
          "Searches ordered immediately — local authority searches are the slow ones",
          "Survey booked (level 2 for standard stock; level 3 for anything old, altered or odd)",
        ],
      },
      {
        heading: "Enquiries that matter",
        items: [
          "Title: any restrictions, covenants or charges that touch your intended use",
          "Boundaries and access match what you saw on the ground",
          "Building regs completion certificates for every alteration",
          "Leasehold: remaining term, ground rent review clauses, service charge accounts (3 years), planned major works",
          "Tenanted property: deposit protection, gas/electrical certificates, the actual tenancy agreement",
          "Planning history and anything enforcement-related",
        ],
      },
      {
        heading: "Exchange readiness",
        items: [
          "Mortgage offer issued and valid past your target completion date",
          "Survey findings resolved: renegotiated, quoted or accepted in writing",
          "Buildings insurance arranged to start on exchange, not completion",
          "Deposit funds cleared with the solicitor",
          "Completion date agreed that works for tenancies, trades and finance drawdown",
        ],
      },
      {
        heading: "Completion day",
        items: [
          "Funds requested from lender several days ahead",
          "Final statement checked line by line — query anything unexplained",
          "Keys, alarm codes, meter locations and appliance manuals from the agent",
          "Meter readings photographed on day one",
          "Stamp duty return filed by your solicitor within 14 days",
        ],
      },
    ],
  },
  {
    slug: "finance-mortgage-checklist",
    title: "Finance & Mortgage Checklist",
    category: "Money & finance",
    description:
      "Preparing yourself and the deal for lending — what brokers need, what lenders check, what kills applications.",
    readMinutes: 6,
    intro:
      "Finance falls over on paperwork and surprises, almost never on rates. Get your file lender-ready before you offer and the mortgage becomes the boring part of the deal — which is exactly what it should be.",
    sections: [
      {
        heading: "Your file, lender-ready",
        items: [
          "Three months' personal and business bank statements, clean and explainable",
          "Proof of deposit with a paper trail — gifted funds need a signed letter",
          "SA302s / accounts for two years if self-employed",
          "Credit file pulled and read by you first — fix errors before a lender finds them",
          "Existing portfolio schedule: address, value, loan, rent for every property",
        ],
      },
      {
        heading: "The deal, lender-ready",
        items: [
          "Rent evidenced by comparables — lenders stress at 125–145% cover, so know your ICR",
          "Property type flagged early: ex-council, above commercial, non-standard construction all narrow the panel",
          "HMO: article 4 status, licence requirement and room sizes confirmed",
          "Refinance plans: lenders want 6 months' ownership before most remortgages — plan the bridge accordingly",
        ],
      },
      {
        heading: "Structure questions to settle with your broker",
        items: [
          "Personal name vs limited company — tax treatment differs; take advice, not internet opinion",
          "Interest-only vs repayment against your cash flow target",
          "Fixed term length vs your exit timeline — ERCs punish early refinances",
          "Fee-loaded rate vs higher rate with low fees — total cost over the term, not the headline",
        ],
      },
      {
        heading: "Red flags that kill applications",
        items: [
          "Unexplained deposits landing in your account mid-application",
          "New credit taken during the application",
          "Price renegotiated without telling the lender",
          "Works started before completion on a mortgaged purchase",
        ],
      },
    ],
  },
  {
    slug: "rental-comparables-sheet",
    title: "Rental Comparables Sheet",
    category: "Due diligence",
    description:
      "How to evidence rent properly — three confirmed comparables per property, phoned not scraped.",
    readMinutes: 4,
    intro:
      "A rent figure from a listing is a hope; a rent figure from a phone call is evidence. Complete one line per comparable, and don't stop until three are confirmed — your lender's valuer will do exactly the same, so you want to get there first.",
    sections: [
      {
        heading: "For each comparable, record",
        items: [
          "Address or street, distance from the subject property",
          "Beds, property type, condition relative to yours (better / same / worse)",
          "Advertised rent and date listed",
          "CONFIRMED: spoke to the letting agent — actual achieved rent, and how quickly it let",
          "Demand signal: how many enquiries or viewings the agent reported",
        ],
      },
      {
        heading: "Rules",
        items: [
          "Same street beats same postcode; same postcode beats same town",
          "Condition-adjust honestly: your unrefurbished rent isn't the refurbished comparable's rent",
          "Discard anything listed over six weeks — the market is telling you the price is wrong",
          "Use the middle figure of three confirmed comps, not the best one",
          "Note the date — comparables expire; re-run after three months",
        ],
      },
    ],
  },
  {
    slug: "hmo-compliance-checklist",
    title: "HMO Compliance Checklist",
    category: "Operating",
    description:
      "Licensing, safety and standards for shared houses — the checklist that keeps you the right side of the council.",
    readMinutes: 7,
    intro:
      "HMOs out-earn single lets because they carry more obligation — licensing, fire safety, minimum standards. None of it is difficult; all of it is mandatory. Confirm the licensing position before you buy, not after.",
    sections: [
      {
        heading: "Before purchase",
        items: [
          "Mandatory licensing applies at 5+ occupants from 2+ households — check your council's additional and selective schemes too",
          "Article 4 direction check: C4 planning permission may be required for a new HMO",
          "Minimum room sizes: 6.51m² single, 10.22m² double (councils can set higher)",
          "Amenity ratios: kitchens, bathrooms and WCs per occupant to your council's standard",
          "Existing HMO: ask for the current licence and any inspection reports",
        ],
      },
      {
        heading: "Fire safety",
        items: [
          "Interlinked mains-powered smoke detection to the appropriate grade, heat detector in kitchen",
          "30-minute fire doors with closers on habitable rooms and kitchen",
          "Protected escape route with emergency lighting where required",
          "Fire blanket in kitchen; extinguishers where your risk assessment requires",
          "A written fire risk assessment, reviewed annually",
        ],
      },
      {
        heading: "Certificates & records",
        items: [
          "Gas safety certificate — annually",
          "EICR electrical report — five-yearly",
          "PAT testing for any appliances you supply",
          "EPC rated E or better (check current minimum standard)",
          "Deposit protection and prescribed information within 30 days",
          "Right to Rent checks documented for every occupant",
        ],
      },
      {
        heading: "Ongoing management",
        items: [
          "Licence conditions diarised: inspections, waste arrangements, occupancy limits",
          "Quarterly property inspection with photos and log",
          "Manager's contact details displayed in the property",
          "Renewal dates tracked: licence, certificates, insurance — a shared calendar, not memory",
        ],
      },
    ],
  },
  {
    slug: "sa-setup-checklist",
    title: "Serviced Accommodation Setup Checklist",
    category: "Operating",
    description:
      "From completion to first guest — the setup sequence we used on our own two units.",
    readMinutes: 7,
    intro:
      "We operate two serviced units ourselves, so this is the list we actually used — the difference between an SA that reviews at 4.9 and one that quietly dies is almost all in the setup fortnight.",
    sections: [
      {
        heading: "Legal & money first",
        items: [
          "Mortgage or lease permits short lets — in writing, not assumed",
          "Planning position checked (some cities restrict short stays; know before you spend)",
          "Insurance: specialist SA policy including public liability, not standard landlord cover",
          "Business rates vs council tax assessed — self-catering rules can work in your favour",
          "Pricing built bottom-up: nightly rate × realistic occupancy beats rent × hope",
        ],
      },
      {
        heading: "The unit",
        items: [
          "Sleep quality is the product: hotel-grade mattresses, blackout curtains, quiet rooms",
          "Superfast wifi tested from every room — remote workers are your midweek market",
          "Smart lock or lockbox with rotating codes for self check-in",
          "Kitchen equipped for real cooking, not decoration — guests notice one missing pan",
          "Linen: three full sets per bed; white, boil-washable, replaced without debate",
          "Photograph AFTER dressing the space, in daylight, wide and straight — photos are the whole shopfront",
        ],
      },
      {
        heading: "Operations",
        items: [
          "Cleaning team briefed to a written changeover checklist with photo confirmation",
          "Channel manager syncing calendars across Airbnb, Booking.com and direct",
          "Automated messaging: booking confirmation, check-in instructions, mid-stay check, checkout, review ask",
          "Guest guide in the property: wifi, bins, quirks, local food, emergency contacts",
          "Maintenance contact who answers on weekends — a boiler dies on a Saturday, always",
        ],
      },
      {
        heading: "First-month targets",
        items: [
          "Launch pricing 10–15% under market to buy the first ten reviews",
          "Respond to every enquiry inside an hour — response time drives ranking",
          "Review every guest promptly and ask for the same",
          "Track per-stay economics from day one: fees, cleaning, consumables against the nightly rate",
        ],
      },
    ],
  },
  {
    slug: "tenant-onboarding-checklist",
    title: "Tenant Onboarding Checklist",
    category: "Operating",
    description:
      "Referencing to move-in day, done properly — the paperwork that protects both sides.",
    readMinutes: 5,
    intro:
      "A tenancy that starts tidy tends to stay tidy. Every item here exists because missing it costs real money later — several of them are the difference between a valid possession notice and an unenforceable one.",
    sections: [
      {
        heading: "Before the tenancy",
        items: [
          "Full referencing: credit, employer, previous landlord, affordability at 30 ×'s monthly rent annually",
          "Right to Rent checks completed and copied",
          "Deposit capped correctly (five weeks' rent) and protected within 30 days",
          "Prescribed information served with the deposit certificate",
          "How to Rent guide (current version), EPC, gas certificate and EICR served BEFORE occupation — these gate a valid s21",
        ],
      },
      {
        heading: "Move-in day",
        items: [
          "Signed AST with any addendums (pets, garden, parking)",
          "Independent inventory with timestamped photos, signed by the tenant",
          "Meter readings photographed together",
          "Keys logged: how many cut, who holds what",
          "Standing order confirmed for rent date; first month cleared before keys",
        ],
      },
      {
        heading: "The first quarter",
        items: [
          "Two-week courtesy call: anything not working, anything unclear",
          "Six-week inspection, diarised with proper notice",
          "Repairs channel agreed and in writing (email or portal, not text-message chaos)",
          "Renewal and rent-review dates diarised at month one, not month eleven",
        ],
      },
    ],
  },
  {
    slug: "estate-agent-call-script",
    title: "Estate Agent Call Script",
    category: "Scripts & negotiation",
    description:
      "How to become the buyer agents call first — the exact opening, questions and follow-up rhythm.",
    readMinutes: 5,
    intro:
      "Agents rank buyers in seconds: proceedable, decisive, low-maintenance — or not. The script isn't about tricks; it's about signalling you're the first kind, then staying on their radar without being a pest.",
    sections: [
      {
        heading: "The first call",
        items: [
          "'Morning — I'm an investor buying in [area]. Cash/mortgage arranged, no chain, and I can view this week.'",
          "'I'm looking for [2–3 bed terraces / small blocks / anything needing work] up to £[X].'",
          "'What have you got that's been sitting, had a fall-through, or where the vendor needs speed?'",
          "Take the valuer's name; thank them by name; confirm your number lands in their system",
        ],
      },
      {
        heading: "Questions that surface deals",
        items: [
          "'Anything coming to market in the next fortnight I could see early?'",
          "'Any probate or landlord-selling-up instructions on your books?'",
          "'Where are vendors being unrealistic? I'll make fair offers on stale stock.'",
          "'Who handles your withdrawn listings? Sometimes those vendors still want out.'",
        ],
      },
      {
        heading: "Being the buyer they call first",
        items: [
          "View within 48 hours of any call — reliability is the entire currency",
          "Offer or pass within 24 hours of viewing, with one clear reason either way",
          "Never renegotiate without new evidence; agents remember chip-merchants",
          "A short update call every two weeks: 'still buying, criteria unchanged'",
          "When you complete, tell them what worked — you're building the next deal",
        ],
      },
    ],
  },
  {
    slug: "exit-strategy-planner",
    title: "Exit Strategy Planner",
    category: "Planning & strategy",
    description:
      "Plan the way out before the way in — primary exit, fallback, and the triggers that switch between them.",
    readMinutes: 5,
    intro:
      "Deals go wrong at the exit, not the entrance. Before completion, every property we buy has this page filled in: the intended exit, the fallback, and the numbers at which each one still works. Hope is not a fallback.",
    sections: [
      {
        heading: "Primary exit",
        items: [
          "The plan in one line: refinance and hold / sell on completion of works / hold for income",
          "The number it needs: end value or rent, evidenced by comparables today",
          "The timeline, with lender seasoning rules (typically 6 months) built in",
          "Costs of this exit: ERCs, agent fees, legals, capital gains position",
        ],
      },
      {
        heading: "The fallback",
        items: [
          "If it won't refinance at the number: does it cash flow on the bridge-to-term product?",
          "If it won't sell at the number: does it rent, and at what yield on money in?",
          "The minimum acceptable outcome written as a number, not a feeling",
          "How long you can hold at the fallback before it strains the rest of the portfolio",
        ],
      },
      {
        heading: "Triggers & review",
        items: [
          "Valuation comes in 10%+ under: fallback activates automatically, no debate",
          "Works overrun past contingency: re-run both exits before spending more",
          "Rate environment moves 1.5%+: re-test the refinance maths",
          "Review the exit page at month 3 and month 6 — dates in the diary now",
        ],
      },
    ],
  },
  {
    slug: "portfolio-tracker",
    title: "Portfolio Tracker",
    category: "Planning & strategy",
    description:
      "One page per property, one summary page for everything — the review rhythm that catches drift early.",
    readMinutes: 5,
    intro:
      "A portfolio you don't measure quietly decays: rates drift, rents lag, equity sits idle. Track each asset on one page and the whole estate on one summary, reviewed quarterly like a board would.",
    sections: [
      {
        heading: "Per property, track",
        items: [
          "Current value (honest, comparable-based) and outstanding loan",
          "Equity and loan-to-value",
          "Rent, and the local market rent — the gap is your review opportunity",
          "Monthly cash flow after everything, at today's rate and at +2%",
          "Mortgage product end date and early repayment charges",
          "Certificates and compliance dates: gas, EICR, EPC, licence",
          "Return on equity: annual cash flow ÷ current equity — the number that says 'refinance me'",
        ],
      },
      {
        heading: "Portfolio summary",
        items: [
          "Total value, total debt, blended LTV",
          "Total monthly cash flow and average per property",
          "Equity releasable at 75% LTV across the estate",
          "Concentration: by area, strategy and tenant type — where would one change hurt most?",
          "Next 12 months' product expiries in date order",
        ],
      },
      {
        heading: "Quarterly review questions",
        items: [
          "Which property earned least per pound of equity — and what's the fix: rent, refinance or sell?",
          "What breaks if rates rise 2% — named properties, not vibes",
          "Where is the next acquisition's deposit coming from?",
          "Is every certificate and licence current? (Check the dates, don't trust the memory)",
        ],
      },
    ],
  },
  {
    slug: "investment-proposal-outline",
    title: "Investment Proposal Template",
    category: "Planning & strategy",
    description:
      "The structure we use when presenting a deal to a partner or investor — clear, complete, honest about risk.",
    readMinutes: 6,
    intro:
      "A proposal earns trust by being easy to interrogate: every number sourced, every risk named, every assumption visible. This is the running order we use — if a section feels uncomfortable to write, that's usually the section the deal needed.",
    sections: [
      {
        heading: "Opening — one page maximum",
        items: [
          "The deal in three sentences: asset, strategy, headline return",
          "What you're asking for: amount, structure, term",
          "Why this deal, why now, why you",
        ],
      },
      {
        heading: "The asset & the plan",
        items: [
          "Property: address, type, condition, photos that tell the truth",
          "Purchase price with sold-comparable evidence",
          "Works: line-item budget, contractor quotes, timeline with contingency",
          "Strategy and end state: rented at £X (evidence), or sold at £Y (evidence)",
        ],
      },
      {
        heading: "The numbers",
        items: [
          "Total funds required and exactly where every pound goes",
          "Returns at three scenarios: conservative, expected, favourable — with the assumptions of each stated",
          "Sensitivity: what a 10% value drop or 2% rate rise does to the return",
          "The investor's position: security, charge, order of repayment",
        ],
      },
      {
        heading: "Risk & governance",
        items: [
          "The five biggest risks and the specific mitigation for each — generic risk lists impress no one",
          "What happens if the exit fails: the written fallback",
          "Reporting rhythm: what the investor receives, and when",
          "Track record: real past deals with real numbers, or an honest 'this is our third'",
        ],
      },
    ],
  },
  {
    slug: "completion-day-checklist",
    title: "Completion & First-Week Checklist",
    category: "Buying process",
    description:
      "The 30 unglamorous jobs between getting the keys and the asset actually working.",
    readMinutes: 4,
    intro:
      "Completion isn't the finish line — it's the handover into your systems. The first week sets up everything after; run it as a checklist and nothing leaks.",
    sections: [
      {
        heading: "Day one",
        items: [
          "Every meter read and photographed; suppliers notified of ownership change",
          "Locks changed — you have no idea how many keys exist",
          "Full photo survey of every room before anything moves",
          "Water stopcock, fuse board and gas shut-off located and photographed",
          "Heating tested, alarms tested, obvious leaks checked",
        ],
      },
      {
        heading: "First week",
        items: [
          "Council tax registered (or exemption applied for during works)",
          "Buildings insurance confirmed in force with correct works disclosure",
          "Utilities moved to your accounts or your preferred suppliers",
          "Trades walkthrough against the refurb plan — surprises surface now, not week four",
          "Post redirect or collection arrangement for previous-owner mail",
        ],
      },
      {
        heading: "Set up the file",
        items: [
          "One folder per property: completion statement, title, certificates, warranties, photos",
          "Key dates diarised: insurance renewal, product end, certificate expiries",
          "The property added to your portfolio tracker with day-one numbers",
        ],
      },
    ],
  },
];

export const getResource = (slug: string) =>
  RESOURCES.find((r) => r.slug === slug);

export const relatedResources = (slug: string, n = 3) => {
  const current = getResource(slug);
  if (!current) return [];
  const sameCategory = RESOURCES.filter(
    (r) => r.slug !== slug && r.category === current.category,
  );
  const others = RESOURCES.filter(
    (r) => r.slug !== slug && r.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, n);
};
