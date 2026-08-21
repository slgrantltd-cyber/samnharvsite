export type Insight = {
  slug: string;
  tag: string;
  title: string;
  standfirst: string;
  date: string; // ISO
  readMinutes: number;
  audience: "Investors" | "Landlords" | "Both";
  body: { heading?: string; paragraphs: string[] }[];
};

/**
 * Mechanism-first education, plus data-led Dubai desk notes. Every Dubai
 * figure comes from lib/dubai-data.ts (DXB Interact / DLD) and is dated in
 * the copy; refresh the data file and the posts together.
 */
export const INSIGHTS: Insight[] = [
  {
    slug: "dubai-off-plan-73-percent",
    tag: "Dubai",
    title: "Off-plan is now 73% of Dubai sales. Here's what that means for a UK buyer.",
    standfirst:
      "Three in four Dubai property sales this year are off-plan. The headline sounds like a warning. The detail — the off-plan premium has collapsed from 66% to 19% — changes what you should actually do.",
    date: "2026-08-21",
    readMinutes: 5,
    audience: "Investors",
    body: [
      { paragraphs: [
        "In 2025 Dubai recorded 116,484 residential sales worth AED 327 billion. Two-thirds of those transactions, and 68% of the money, were off-plan — homes bought before they exist. So far in 2026 the share has risen again: 73% by volume and by value.",
        "Most commentary stops there and calls it froth. We'd rather look at the price per square foot, because that's what decides whether an individual buyer is overpaying.",
      ]},
      { heading: "The premium has gone", paragraphs: [
        "In 2019 the median off-plan square foot cost AED 1,353 against AED 815 for ready stock — a 66% premium for a promise. In 2021 the two lines nearly crossed. Today off-plan sits at AED 1,762 and ready at AED 1,484: a 19% gap, the narrowest since the data begins in 2014.",
        "That tells you the market has repriced ready property upward far faster than it has repriced launches. The old logic — buy off-plan because it's cheap and sell into completion — is mostly gone. Off-plan is no longer an entry discount. It is a financing structure.",
      ]},
      { heading: "So why buy off-plan at all?", paragraphs: [
        "Because of the payment plan, the stock, and the developer. A 60/40 or 70/30 plan lets a UK investor control a dollar-pegged asset for a fraction of its price during the build, with no UK stamp duty and no mortgage application. The best units — floor, view, layout — are only ever available at launch. And the right developer's launches have, on the evidence, been resold at a median gain of 20–31% within a year.",
        "None of that argues for buying any launch. It argues for buying the right one, at developer price, through someone whose fee the developer pays.",
      ]},
      { heading: "What we do with this", paragraphs: [
        "We underwrite every Dubai unit against ready comparables in the same community — if the launch price per square foot is more than a modest premium over completed stock next door, the payment plan has to justify the difference or we pass. We model the exit at today's ready price, not at a projected one. And we say so in writing before you reserve.",
        "Data: DXB Interact (Dubai Land Department transactions), accessed 21 August 2026; 2026 figures are year to date. Our reading of it is our own.",
      ]},
    ],
  },
  {
    slug: "dubai-cycle-84-percent-from-floor",
    tag: "Dubai",
    title: "Ready prices are up 84% from the 2020 floor. Where in the cycle are we?",
    standfirst:
      "Everyone quotes the boom. Fewer people mention that Dubai spent 2014 to 2020 falling. Both facts belong in the same underwriting.",
    date: "2026-08-21",
    readMinutes: 6,
    audience: "Investors",
    body: [
      { paragraphs: [
        "The median ready apartment in Dubai sold for AED 805 per square foot in 2020. This year it's AED 1,484 — up 84% in six years. Transactions went from 16,867 in 2020 to 116,484 in 2025, nearly seven times. Total sales value rose from AED 27 billion to AED 327 billion.",
        "Those are the numbers on the brochure. Here are the ones that aren't.",
      ]},
      { heading: "The slide nobody advertises", paragraphs: [
        "In 2014 the same median square foot cost AED 1,098. It then fell every year bar one until 2020: 1,031, 1,000, 1,036, 950, 815, 805. That's a 27% decline over six years, through a period when Dubai was building, marketing and selling hard. Anyone who bought ready stock in 2014 waited until 2023 to get their money back in nominal terms.",
        "Measured from 2014 rather than 2020, today's price is up 35% in twelve years — roughly 2.5% a year. That's not a bubble and it's not a miracle. It's a market with a proper cycle.",
      ]},
      { heading: "Where we think we are", paragraphs: [
        "Prices are rising but the pace is slowing: ready stock gained 5.6% in 2025 and off-plan 3.5%. Transaction counts in several prime communities are down 20–30% year on year even as prices edge up — Dubai Marina volumes fell 32%, Downtown 24%, Palm Jumeirah 28%. Rising prices on falling volume is late-cycle behaviour, not early.",
        "Supply is the other side. Jumeirah Village Circle has 38,269 units in the pipeline; Dubai South has 37,020. Those are not small numbers for communities that transacted 4,543 and 693 units respectively in the last twelve months.",
      ]},
      { heading: "How to buy in a late cycle", paragraphs: [
        "Underwrite the exit at a flat price, and check the deal still works. Prefer communities that are nearly sold out over ones with tens of thousands of units to come. Prefer developers whose stock has actually resold at a gain. Buy product with rental depth — studios and one-beds are 62% of all rental contracts — so that if the capital story pauses, the income doesn't.",
        "We'd rather tell you this now than after handover. Data: DXB Interact (Dubai Land Department), accessed 21 August 2026; 2026 year to date.",
      ]},
    ],
  },
  {
    slug: "dubai-yield-map",
    tag: "Dubai",
    title: "The yield map: Dubai South at 8.3%, Palm Jumeirah at 4.4%.",
    standfirst:
      "Gross yields across Dubai's main communities span nearly four percentage points. The pattern is exactly what you'd expect — and it tells you which product to buy for income and which for growth.",
    date: "2026-08-21",
    readMinutes: 5,
    audience: "Investors",
    body: [
      { paragraphs: [
        "Across the twelve months to August 2026, gross apartment yields ran from 8.3% in Dubai South and 7.3% in Jumeirah Village Circle, down through Business Bay (6.8%), Damac Hills (6.3%) and Sobha Hartland (6.1%), to Downtown (4.9%), Emaar Beachfront (4.6%) and Palm Jumeirah (4.4%).",
        "Line those yields up against price per square foot and the relationship is almost perfectly inverse: Dubai South at AED 1,149 per square foot pays the most; Emaar Beachfront at AED 3,567 pays the least. You are choosing between income and prestige, and the market prices the choice efficiently.",
      ]},
      { heading: "Yield is only half the number", paragraphs: [
        "Liquidity matters as much. JVC recorded 4,543 sales in the period — the deepest market on the list — at a 7.3% yield. Dubai South's 8.3% came on 693 sales with 37,020 units still to be delivered. One of those is an income market you can get out of; the other is a bet on a community that hasn't finished arriving.",
        "Two communities managed the rare double of rising prices and rising volume: Sobha Hartland (price +4%, volume +11%, 99% sold) and Town Square (price +15%, volume +10%). That combination is what genuine demand looks like.",
      ]},
      { heading: "What the rental data adds", paragraphs: [
        "Dubai registered 229,000 rental contracts in 2025 — nearly three times the 81,000 of 2015 — and is already past that figure in 2026. Forty-one percent of this year's contracts are one-bedroom apartments and a further 21% are studios. Income product in Dubai means small apartments in communities people actually rent in.",
      ]},
      { heading: "Our read", paragraphs: [
        "For a client who wants income: JVC or Business Bay, a one-bed, from a developer with a delivery record, underwritten at the area's gross yield less service charges and management. For a client who wants growth and can hold: the nearly-sold-out communities with a brand — Hartland, Dubai Hills, Creek Harbour — accepting a 5–6% yield as the price of scarcity. We don't recommend chasing the top yield into the largest supply pipeline.",
        "Data: DXB Interact (Dubai Land Department), apartments, 22 Aug 2025 – 21 Aug 2026, accessed 21 August 2026.",
      ]},
    ],
  },
  {
    slug: "dubai-developer-scorecard",
    tag: "Dubai",
    title: "Developer scorecard: who is actually delivering capital gains.",
    standfirst:
      "Volume leaders are not value leaders. Resale data from the last twelve months shows a 25-point spread between developers — which makes who you buy from the most important decision you'll make.",
    date: "2026-08-21",
    readMinutes: 5,
    audience: "Investors",
    body: [
      { paragraphs: [
        "Take every Dubai unit resold in the last twelve months and group the median price change by the developer who built it. Nakheel leads at 31.2%, then Meraas (28.9%) and Emaar (28.6%). Binghatti sits at 20.0% and Ellington at 18.2%. Damac resales gained 11.9%, Danube 11.5%, Azizi 8.5%, Sobha 5.9%.",
        "Now look at volume. Azizi sold 11,225 units so far in 2026 — more than anyone — and shows the lowest resale gain and the lowest absorption of under-construction stock, at 49%. Emaar sold fewer units (5,961) for three times the value (AED 31.9 billion) with 93% absorption. Selling the most is not the same as holding value.",
      ]},
      { heading: "What the spread means in money", paragraphs: [
        "On a £300,000 purchase, the difference between a developer at 28% and one at 8% is £60,000 of resale value in a single year. No payment plan, launch discount or broker incentive comes close to that. It dwarfs the difference between a good unit and a great one in the same building.",
        "This is why we compare across developers before we compare units — and why 'which developer' is the first question in our brief, not the last.",
      ]},
      { heading: "Reading the scorecard honestly", paragraphs: [
        "A year of resales is a year of resales: it favours developers whose stock completed into a rising market, and it says nothing about the next cycle. Sobha's low figure sits alongside a 99%-sold flagship community and strong pricing — their buyers hold rather than flip. Absorption tells you how fast the market is taking a developer's current launches, which is a better guide to liquidity than any marketing.",
        "We use all three columns — gain, volume and absorption — and we'd be wary of anyone quoting one.",
      ]},
      { heading: "How this shapes what we bring you", paragraphs: [
        "Our Dubai allocations come from across these developers, at developer price, with the developer paying our fee — so we have no reason to steer you toward one. The scorecard is our starting filter; the unit, the community's supply and the payment plan come after. Data: DXB Interact (Dubai Land Department), 2026 year to date, accessed 21 August 2026.",
      ]},
    ],
  },

  {
    slug: "brrr-explained-properly",
    tag: "BRRR",
    title: "BRRR, explained properly",
    standfirst:
      "Buy, refurbish, refinance, rent — the strategy everyone quotes and fewer people finish. Here's how the mechanism actually works, and where it goes wrong.",
    date: "2026-07-29",
    readMinutes: 6,
    audience: "Investors",
    body: [
      {
        paragraphs: [
          "BRRR is a recycling machine. You buy a property that's worth less than it should be — usually because it's tired, badly laid out, or being sold in a hurry — do the works that fix the reason it was cheap, then refinance onto the property's new, higher value. The refinance hands you back a chunk of the capital you put in, while the property stays yours and rents.",
          "Done well, the same pot of money buys the next project, and the one after that. That's the whole appeal: your capital keeps working instead of being buried in one deal.",
        ],
      },
      {
        heading: "Where the profit is really made",
        paragraphs: [
          "On the purchase. If you buy at full market price and hope the refurb creates the uplift, you're gambling on the works and the market at the same time. The deals we take seriously are the ones where the discount exists on day one — because of condition, circumstance, or a seller who values speed over squeezing the last pound.",
          "The refurbishment protects that profit; it doesn't create it. Disciplined build costs, a scope that matches what the end valuation actually rewards, and no gold taps in a street that won't pay for them.",
        ],
      },
      {
        heading: "The three places BRRR goes wrong",
        paragraphs: [
          "First: the end value is imagined. The refinance valuation is an opinion formed by a surveyor on a Tuesday morning, not a number you chose in a spreadsheet. Stress-test the deal at a lower valuation than you hope for, and make sure it still stands.",
          "Second: the works run away. Every extra month of holding costs eats the margin, and every 'while we're at it' adds scope. Fixed quotes, a contingency you genuinely expect to spend, and someone on site who notices problems early.",
          "Third: the exit is single-track. If the refinance disappoints, can you still rent it profitably and wait? If the answer is no, the deal is fragile — and fragile deals don't belong in anyone's portfolio, including ours.",
        ],
      },
      {
        heading: "What we actually do",
        paragraphs: [
          "We run BRRR projects with our own money, which is why the deals we source for investors get stress-tested the same way: worst-case valuation, honest works budget, and a rental exit that works even if the refinance doesn't flatter us. If a BRRR deal only works in the best case, it doesn't work.",
        ],
      },
    ],
  },
  {
    slug: "rent-to-rent-for-landlords",
    tag: "R2R",
    title: "Rent to rent: what's actually in it for the landlord?",
    standfirst:
      "Guaranteed rent sounds too good until you understand who's carrying which risk. A straight explanation of the arrangement — including when to say no to it.",
    date: "2026-07-29",
    readMinutes: 5,
    audience: "Landlords",
    body: [
      {
        paragraphs: [
          "Rent to rent is a simple trade. An operator — us — takes your property on a company let, pays you an agreed rent every month whether or not the property earns, and runs it as the business: tenants or guests, turnovers, maintenance calls, void periods. You trade some upside for certainty and your evenings back.",
        ],
      },
      {
        heading: "What you give up, honestly",
        paragraphs: [
          "The operator has to make a margin, so the guaranteed rent is below the theoretical maximum you might squeeze out managing it yourself on a perfect year. If you enjoy the work, never have voids, and like 11pm phone calls about boilers, self-managing may genuinely pay you more.",
          "What most landlords discover is that the theoretical maximum isn't real. Voids, re-lets, arrears, agent fees and their own unpaid hours close most of the gap — and the certainty closes the rest.",
        ],
      },
      {
        heading: "The questions to ask any operator",
        paragraphs: [
          "Who exactly is my contract with, and what happens if their business fails? What condition does the property come back in, and who pays for wear? How is the rent guaranteed in a bad month — reserves, other income, or hope? Can I speak to a landlord they already work with?",
          "Any operator worth dealing with answers these in writing without flinching. We do — and our first landlord's review is on our Google page, unedited, where we can't touch it.",
        ],
      },
      {
        heading: "When it fits",
        paragraphs: [
          "Rent to rent suits landlords who value certainty, live far from the property, or simply want out of the day-to-day without selling an asset that's doing its job. Everything — rent, term, responsibilities, return condition — goes on paper before a key changes hands. If it's not written down, it isn't agreed.",
        ],
      },
    ],
  },
  {
    slug: "buy-to-sa-beyond-tourists",
    tag: "SA",
    title: "Buy-to-SA: the demand nobody photographs",
    standfirst:
      "Serviced accommodation gets sold on city-break imagery. The steadier story — contractors, relocations, and council placements — is what makes the numbers survive winter.",
    date: "2026-07-29",
    readMinutes: 5,
    audience: "Both",
    body: [
      {
        paragraphs: [
          "Ask someone to picture a serviced accommodation guest and they'll describe a weekend tourist. Tourists are real demand, but they're seasonal, price-sensitive and fickle — a unit underwritten on tourism alone is a unit that has a great August and a nervous January.",
        ],
      },
      {
        heading: "The three quieter demand streams",
        paragraphs: [
          "Contractors and project workers need somewhere clean, self-contained and near the job for weeks at a time, invoiced properly. Relocations and insurance placements need a home-shaped stopgap while a sale completes or a repair finishes. And local authorities need housing — for people in transition and sometimes for their own staff — placed with operators they trust.",
          "We work with local councils on housing placements ourselves, alongside running our own two units. That mix — short stays on top of managed, steadier occupancy underneath — is what a resilient SA unit looks like from the inside.",
        ],
      },
      {
        heading: "What this means if you're buying",
        paragraphs: [
          "Underwrite the boring demand first. A buy-to-SA deal should stand on realistic occupancy from workers, placements and mid-stays, with tourism as the upside rather than the foundation. Location logic changes too: proximity to hospitals, works, and transport can matter more than postcard views.",
          "It also changes the conversation with landlords: a rent-to-rent agreement backed by diversified demand is a safer promise than one propped on a listing platform's summer.",
        ],
      },
      {
        heading: "The honest caveat",
        paragraphs: [
          "SA is operating, not owning. Cleaning, linen, pricing, guest vetting and compliance are a business you're either running or paying someone to run. We run ours day to day, which is exactly why our advice on buy-to-SA comes from operating — not from a course.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return INSIGHTS.find((i) => i.slug === slug);
}
