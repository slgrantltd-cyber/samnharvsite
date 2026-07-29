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
 * Evergreen, mechanism-first education — no market statistics, no
 * predictions, no invented figures. Time-sensitive commentary can be added
 * as new entries once there's a process for keeping it current.
 */
export const INSIGHTS: Insight[] = [
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
