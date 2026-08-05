export interface PowerRole {
  role: string;
  why: string;
  proof: string;
}

/**
 * The bench: roles we introduce deal buyers to. Deliberately no names or
 * numbers on the public page — introductions go through us, per deal.
 */
export const POWER_TEAM: PowerRole[] = [
  {
    role: "Property solicitor",
    why: "Auction-experienced — legal packs reviewed before you bid, 28-day completions hit without drama.",
    proof: "Reviews the packs on our own purchases.",
  },
  {
    role: "Independent surveyor",
    why: "RICS Level 3 building surveys with photographs and costed defects — evidence you can renegotiate with.",
    proof: "Independent of us and of any agent — that's the point.",
  },
  {
    role: "Builder & refurb team",
    why: "Itemised written quotes against a defined spec, staged payments, and timelines built into the programme.",
    proof: "Prices and delivers our own refurbishments.",
  },
  {
    role: "Mortgage & bridging broker",
    why: "BTL, bridging and serviced-accommodation lending — including SA-income refinances most brokers don't know exist.",
    proof: "Structures the finance on our own deals.",
  },
  {
    role: "Property accountant",
    why: "Ltd structures, section 24, and whether to flip or hold — answered before you buy, not at year end.",
    proof: "Keeps our own companies straight.",
  },
  {
    role: "Insurance broker",
    why: "Unoccupied and refurbishment cover from exchange day, then landlord or serviced-accommodation policies that actually pay out.",
    proof: "Covers our portfolio and placements.",
  },
  {
    role: "Compliance engineers",
    why: "Gas Safe and electrical engineers who turn certificates around in days — EICR, gas safety, EPC improvements.",
    proof: "Certify every property we operate.",
  },
  {
    role: "Damp & structural specialists",
    why: "Honest diagnosis before you believe a survey's worst line — half of 'rising damp' is a leaking gutter.",
    proof: "Our second opinion on every scary report.",
  },
  {
    role: "Bridging finance",
    why: "Fast, honest bridging for auction deadlines and heavy refurbs — agreed in principle before you bid, redeemed on the refinance.",
    proof: "Funds the gaps on deals like ours.",
  },
  {
    role: "Serviced accommodation management",
    why: "That's us. Buy the deal, keep the asset — we furnish, list, and operate it as your hands-off SA unit.",
    proof: "We run our own units the same way — see /stays.",
  },
];
