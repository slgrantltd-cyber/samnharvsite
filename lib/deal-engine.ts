/**
 * Deal Intelligence engine — pure, synchronous deal maths.
 *
 * Six strategies, each a field schema plus a compute function returning
 * KPIs (with a graded rating), chart data and a rules-based verdict.
 * Everything recomputes on every keystroke; nothing here touches the DOM.
 *
 * All figures are illustrative appraisal maths, not financial advice —
 * the page carries that caveat in copy.
 */

export type StrategyId = "btl" | "brrr" | "r2r" | "hmo" | "lo" | "flip";

export type Rating = "excellent" | "good" | "average" | "poor";

export interface FieldDef {
  id: string;
  label: string;
  unit: "£" | "%" | "×" | "";
  /** monthly figures get an annotation so the ledger reads unambiguously */
  note?: string;
  group: string;
  default: number;
  step?: number;
}

export interface Kpi {
  id: string;
  label: string;
  /** already formatted for display */
  value: string;
  note?: string;
  rating?: Rating;
  /** raw number for the animated counter; NaN means show value as-is */
  raw: number;
  /** formatter kind so the counter can animate the raw number */
  kind: "money" | "pct" | "months" | "plain";
}

export interface AllocationSlice {
  label: string;
  amount: number;
}

export interface WaterfallStep {
  label: string;
  /** negative = cost step */
  amount: number;
}

export interface CashflowAnatomy {
  incomeLabel: string;
  income: number;
  costs: { label: string; amount: number }[];
}

export interface ScoreAxis {
  label: string;
  rating: Rating;
  value: number;
}

export interface Score {
  overall: number;
  axes: ScoreAxis[];
}

export interface Verdict {
  stamp: "strong deal" | "solid deal" | "marginal deal" | "walk away";
  rating: Rating;
  paragraphs: string[];
}

export interface Analysis {
  kpis: Kpi[];
  /** headline return percentage for the gauge, clamped 0–40 */
  gaugeValue: number;
  gaugeLabel: string;
  gaugeRating: Rating;
  allocation: AllocationSlice[];
  allocationTitle: string;
  cashflow?: CashflowAnatomy;
  waterfall?: WaterfallStep[];
  waterfallTitle?: string;
  verdict: Verdict;
  score: Score;
}

export interface Strategy {
  id: StrategyId;
  code: string;
  name: string;
  tagline: string;
  fields: FieldDef[];
  compute: (v: Record<string, number>) => Analysis;
}

/* ---------- formatting ---------- */

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export const fmtMoney = (n: number) =>
  Number.isFinite(n) ? gbp.format(Math.round(n)) : "—";

export const fmtPct = (n: number) =>
  Number.isFinite(n) ? `${n.toFixed(1)}%` : "∞";

const AVG_DAYS_PER_MONTH = 30.4;

/* ---------- rating scales ---------- */

const grade = (n: number, scale: [number, number, number]): Rating =>
  n >= scale[0]
    ? "excellent"
    : n >= scale[1]
      ? "good"
      : n >= scale[2]
        ? "average"
        : "poor";

const ROC_SCALE: [number, number, number] = [15, 10, 6]; // % return on cash
const YIELD_SCALE: [number, number, number] = [8, 6, 4.5]; // % gross yield
const CASHFLOW_SCALE: [number, number, number] = [500, 250, 50]; // £/month
const MARGIN_SCALE: [number, number, number] = [20, 15, 8]; // % flip margin

const RATING_ORDER: Rating[] = ["poor", "average", "good", "excellent"];
const worst = (...rs: Rating[]) =>
  rs.reduce((a, b) =>
    RATING_ORDER.indexOf(b) < RATING_ORDER.indexOf(a) ? b : a,
  );

const stampFor = (r: Rating): Verdict["stamp"] =>
  r === "excellent"
    ? "strong deal"
    : r === "good"
      ? "solid deal"
      : r === "average"
        ? "marginal deal"
        : "walk away";

/* the Sam & Harv Score: five graded axes per deal — the measured ones
   from this appraisal, plus the strategy's inherent qualities */
const AXIS_VALUE: Record<Rating, number> = {
  excellent: 92,
  good: 76,
  average: 56,
  poor: 32,
};

const buildScore = (entries: [string, Rating][]): Score => {
  const axes = entries.map(([label, rating]) => ({
    label,
    rating,
    value: AXIS_VALUE[rating],
  }));
  return {
    overall: Math.round(axes.reduce((a, x) => a + x.value, 0) / axes.length),
    axes,
  };
};

/* ---------- strategies ---------- */

export const STRATEGIES: Strategy[] = [
  {
    id: "btl",
    code: "BTL",
    name: "Buy to Let",
    tagline: "Single let, held for income and growth.",
    fields: [
      { id: "price", label: "Purchase price", unit: "£", group: "Acquisition", default: 165000 },
      { id: "depositPct", label: "Deposit", unit: "%", group: "Acquisition", default: 25 },
      { id: "stamp", label: "Stamp duty", unit: "£", group: "Acquisition", default: 7000 },
      { id: "legal", label: "Legal costs", unit: "£", group: "Acquisition", default: 1500 },
      { id: "refurb", label: "Refurbishment", unit: "£", group: "Acquisition", default: 5000 },
      { id: "rate", label: "Mortgage rate", unit: "%", note: "interest only", group: "Finance", default: 5.5, step: 0.1 },
      { id: "rent", label: "Rental income", unit: "£", note: "per month", group: "Income", default: 1250 },
      { id: "bills", label: "Monthly costs", unit: "£", note: "insurance, ground", group: "Running costs", default: 60 },
      { id: "voidPct", label: "Voids", unit: "%", group: "Running costs", default: 5 },
      { id: "mgmtPct", label: "Management", unit: "%", group: "Running costs", default: 10 },
      { id: "maintPct", label: "Maintenance", unit: "%", group: "Running costs", default: 8 },
    ],
    compute(v) {
      const deposit = (v.price * v.depositPct) / 100;
      const loan = v.price - deposit;
      const capital = deposit + v.stamp + v.legal + v.refurb;
      const interest = (loan * v.rate) / 100 / 12;
      const deductions = (v.rent * (v.voidPct + v.mgmtPct + v.maintPct)) / 100;
      const net = v.rent - deductions - interest - v.bills;
      const annual = net * 12;
      const roc = capital > 0 ? (annual / capital) * 100 : Infinity;
      const grossYield = v.price > 0 ? ((v.rent * 12) / v.price) * 100 : 0;

      const rCash = grade(net, CASHFLOW_SCALE);
      /* a 25%-down single let realistically returns 5–10% on cash; graded
         against that, not against leveraged-strategy returns */
      const rRoc = grade(roc, [10, 7, 4.5]);
      const rYield = grade(grossYield, YIELD_SCALE);
      const overall = worst(rRoc, rCash);

      const paragraphs = [
        `On these figures the property lets at ${fmtMoney(v.rent)} a month and clears ${fmtMoney(net)} after voids, management, maintenance and the mortgage — ${fmtPct(roc)} return on the ${fmtMoney(capital)} of cash employed, against a gross yield of ${fmtPct(grossYield)}.`,
        overall === "excellent"
          ? "Cash flow and return on cash are both comfortably above our buying bar. Stress-test the rate two points higher; if it still washes its face, this is the kind of deal we would move on."
          : overall === "good"
            ? "A dependable single let: the return beats money in the bank by a distance and the cash flow carries the costs. Negotiate harder on price or add value through the refurb to push it into the excellent band."
            : overall === "average"
              ? "It works on paper but the margin for error is thin — one void month or a rate rise eats the year's profit. We would want the price down or the rent demonstrably higher before committing."
              : "The numbers do not support the purchase: the cash flow is too thin for the capital employed. Renegotiate the price, find the rent uplift, or walk away — there is always another deal.",
      ];

      return {
        kpis: [
          { id: "net", label: "Monthly cash flow", value: fmtMoney(net), raw: net, kind: "money", rating: rCash },
          { id: "annual", label: "Annual profit", value: fmtMoney(annual), raw: annual, kind: "money" },
          { id: "roc", label: "Return on cash", value: fmtPct(roc), raw: roc, kind: "pct", rating: rRoc },
          { id: "yield", label: "Gross yield", value: fmtPct(grossYield), raw: grossYield, kind: "pct", rating: rYield },
          { id: "capital", label: "Capital required", value: fmtMoney(capital), raw: capital, kind: "money" },
          { id: "mortgage", label: "Monthly mortgage", value: fmtMoney(interest), raw: interest, kind: "money", note: "interest only" },
        ],
        gaugeValue: roc,
        gaugeLabel: "Return on cash",
        gaugeRating: rRoc,
        allocationTitle: "Capital employed",
        allocation: [
          { label: "Deposit", amount: deposit },
          { label: "Stamp duty", amount: v.stamp },
          { label: "Legal", amount: v.legal },
          { label: "Refurb", amount: v.refurb },
        ],
        cashflow: {
          incomeLabel: "Rent",
          income: v.rent,
          costs: [
            { label: "Mortgage", amount: interest },
            { label: "Voids", amount: (v.rent * v.voidPct) / 100 },
            { label: "Management", amount: (v.rent * v.mgmtPct) / 100 },
            { label: "Maintenance", amount: (v.rent * v.maintPct) / 100 },
            { label: "Other costs", amount: v.bills },
          ],
        },
        score: buildScore([
          ["Cash flow", rCash],
          ["Return on cash", rRoc],
          ["Yield", rYield],
          ["Liquidity", "excellent"],
          ["Management load", "good"],
        ]),
        verdict: { stamp: stampFor(overall), rating: overall, paragraphs },
      };
    },
  },

  {
    id: "brrr",
    code: "BRRR",
    name: "BRRR",
    tagline: "Buy, refurbish, refinance, rent — recycle the cash.",
    fields: [
      { id: "price", label: "Purchase price", unit: "£", group: "Acquisition", default: 150000 },
      { id: "stamp", label: "Stamp duty", unit: "£", group: "Acquisition", default: 5000 },
      { id: "legal", label: "Legal costs", unit: "£", group: "Acquisition", default: 1500 },
      { id: "refurb", label: "Refurbishment", unit: "£", group: "Works & finance", default: 30000 },
      { id: "finance", label: "Finance costs", unit: "£", note: "bridge, fees", group: "Works & finance", default: 6000 },
      { id: "gdv", label: "Expected GDV", unit: "£", group: "Refinance", default: 240000 },
      { id: "ltv", label: "Refinance LTV", unit: "%", group: "Refinance", default: 75 },
      { id: "rate", label: "Mortgage rate", unit: "%", note: "interest only", group: "Refinance", default: 5.5, step: 0.1 },
      { id: "rent", label: "Rental income", unit: "£", note: "per month", group: "Income", default: 1350 },
      { id: "bills", label: "Monthly costs", unit: "£", group: "Running costs", default: 80 },
      { id: "voidPct", label: "Voids", unit: "%", group: "Running costs", default: 5 },
      { id: "mgmtPct", label: "Management", unit: "%", group: "Running costs", default: 10 },
      { id: "maintPct", label: "Maintenance", unit: "%", group: "Running costs", default: 8 },
    ],
    compute(v) {
      const totalIn = v.price + v.stamp + v.legal + v.refurb + v.finance;
      const refiLoan = (v.gdv * v.ltv) / 100;
      const recycled = Math.min(refiLoan, totalIn);
      const leftIn = Math.max(totalIn - refiLoan, 0);
      const equity = v.gdv - refiLoan;
      const uplift = v.gdv - totalIn;
      const interest = (refiLoan * v.rate) / 100 / 12;
      const deductions = (v.rent * (v.voidPct + v.mgmtPct + v.maintPct)) / 100;
      const net = v.rent - deductions - interest - v.bills;
      const annual = net * 12;
      const roc = leftIn > 0 ? (annual / leftIn) * 100 : Infinity;
      const allOut = leftIn <= 0;

      /* post-refinance cash flow is structurally thin in a BRRR — the deal
         is judged on the equity created and the cash recycled, with the
         monthly figure required only to carry itself with margin */
      const rCash: Rating =
        net < 0 ? "poor" : net < 75 ? "average" : net < 250 ? "good" : "excellent";
      const rRoc = allOut ? "excellent" : grade(roc, ROC_SCALE);
      const rUplift = grade((uplift / Math.max(totalIn, 1)) * 100, [15, 8, 3]);
      const overall = worst(rUplift, rCash, uplift < 0 ? "poor" : "excellent");

      const paragraphs = [
        `The project costs ${fmtMoney(totalIn)} all-in against an expected end value of ${fmtMoney(v.gdv)}. Refinancing at ${v.ltv.toFixed(0)}% releases ${fmtMoney(recycled)}, leaving ${allOut ? "nothing" : fmtMoney(leftIn)} of your cash in the deal and ${fmtMoney(equity)} of retained equity.`,
        allOut
          ? `A full recycle: every pound comes back out at refinance while the property clears ${fmtMoney(net)} a month. This is the BRRR model working exactly as intended — infinite return on the cash left in.`
          : overall === "excellent" || overall === "good"
            ? `After refinance the deal clears ${fmtMoney(net)} a month — ${fmtPct(roc)} on the cash still in. The uplift covers the works with margin, and the money released funds the next acquisition. On these figures we would pursue it.`
            : overall === "average"
              ? "The refinance leaves meaningful cash trapped in the deal and the monthly margin is modest. Push the GDV assumption with hard comparables, trim the works budget, or renegotiate the entry price before proceeding."
              : uplift < 0
                ? "The end value does not cover the money going in — this is value destruction, not value creation. The purchase price or the works budget must come down materially before this resembles a deal."
                : "Too much cash stays trapped for too little monthly return. Without a stronger GDV or a cheaper entry, the capital works harder elsewhere.",
      ];

      return {
        kpis: [
          { id: "leftIn", label: "Cash left in deal", value: allOut ? "£0" : fmtMoney(leftIn), raw: leftIn, kind: "money", rating: allOut ? "excellent" : grade((recycled / Math.max(totalIn, 1)) * 100, [95, 80, 60]) },
          { id: "recycled", label: "Cash recycled", value: fmtMoney(recycled), raw: recycled, kind: "money" },
          { id: "equity", label: "Equity retained", value: fmtMoney(equity), raw: equity, kind: "money", rating: rUplift },
          { id: "net", label: "Monthly cash flow", value: fmtMoney(net), raw: net, kind: "money", rating: rCash },
          { id: "roc", label: "Return on cash left", value: allOut ? "∞" : fmtPct(roc), raw: allOut ? NaN : roc, kind: "pct", rating: rRoc },
          { id: "totalIn", label: "Total project cost", value: fmtMoney(totalIn), raw: totalIn, kind: "money" },
        ],
        gaugeValue: allOut ? 40 : roc,
        gaugeLabel: "Return on cash left",
        gaugeRating: rRoc,
        allocationTitle: "Project cost",
        allocation: [
          { label: "Purchase", amount: v.price },
          { label: "Stamp duty", amount: v.stamp },
          { label: "Legal", amount: v.legal },
          { label: "Refurb", amount: v.refurb },
          { label: "Finance", amount: v.finance },
        ],
        waterfallTitle: "Where the value lands",
        waterfall: [
          { label: "GDV", amount: v.gdv },
          { label: "Refinance loan", amount: -refiLoan },
          { label: "Equity retained", amount: equity },
        ],
        cashflow: {
          incomeLabel: "Rent",
          income: v.rent,
          costs: [
            { label: "Mortgage", amount: interest },
            { label: "Voids", amount: (v.rent * v.voidPct) / 100 },
            { label: "Management", amount: (v.rent * v.mgmtPct) / 100 },
            { label: "Maintenance", amount: (v.rent * v.maintPct) / 100 },
            { label: "Other costs", amount: v.bills },
          ],
        },
        score: buildScore([
          ["Cash recycling", allOut ? "excellent" : grade((recycled / Math.max(totalIn, 1)) * 100, [95, 80, 60])],
          ["Equity created", rUplift],
          ["Cash flow", rCash],
          ["Exit flexibility", "good"],
          ["Execution risk", "average"],
        ]),
        verdict: { stamp: stampFor(overall), rating: overall, paragraphs },
      };
    },
  },

  {
    id: "r2r",
    code: "R2R",
    name: "Rent to Rent",
    tagline: "Serviced accommodation on a company let.",
    fields: [
      { id: "rentOut", label: "Monthly rent", unit: "£", note: "to the landlord", group: "The agreement", default: 1200 },
      { id: "deposit", label: "Deposit", unit: "£", group: "The agreement", default: 1200 },
      { id: "setup", label: "Setup costs", unit: "£", group: "Setting up", default: 3000 },
      { id: "furniture", label: "Furniture", unit: "£", group: "Setting up", default: 6000 },
      { id: "nightly", label: "Nightly rate", unit: "£", group: "Income", default: 120 },
      { id: "occPct", label: "Occupancy", unit: "%", group: "Income", default: 70 },
      { id: "bills", label: "Monthly bills", unit: "£", group: "Running costs", default: 350 },
      { id: "cleaning", label: "Cleaning", unit: "£", note: "per month", group: "Running costs", default: 400 },
      { id: "software", label: "Software", unit: "£", note: "per month", group: "Running costs", default: 60 },
      { id: "mgmtPct", label: "Management", unit: "%", note: "of revenue", group: "Running costs", default: 0 },
      { id: "maint", label: "Maintenance", unit: "£", note: "per month", group: "Running costs", default: 100 },
    ],
    compute(v) {
      const revenue = (v.nightly * AVG_DAYS_PER_MONTH * v.occPct) / 100;
      const mgmt = (revenue * v.mgmtPct) / 100;
      const fixed = v.rentOut + v.bills + v.cleaning + v.software + v.maint;
      const net = revenue - fixed - mgmt;
      const annual = net * 12;
      const capital = v.deposit + v.setup + v.furniture;
      const roc = capital > 0 ? (annual / capital) * 100 : Infinity;
      const beNights = v.nightly > 0 ? fixed / (v.nightly * (1 - v.mgmtPct / 100)) : Infinity;
      const beOcc = (beNights / AVG_DAYS_PER_MONTH) * 100;
      const payback = net > 0 ? capital / net : Infinity;

      const rCash = grade(net, CASHFLOW_SCALE);
      const rRoc = grade(roc, [40, 25, 12]); // R2R runs on higher cash-on-cash
      const rBe = grade(100 - beOcc, [45, 30, 15]); // headroom over break-even
      const overall = worst(rCash, rRoc, rBe);

      const paragraphs = [
        `At ${fmtPct(v.occPct)} occupancy the unit turns over ${fmtMoney(revenue)} a month and clears ${fmtMoney(net)} after rent, bills and operations. Break-even sits at ${fmtPct(beOcc)} occupancy — ${beOcc < v.occPct ? `${fmtPct(v.occPct - beOcc)} of headroom` : "above your assumption, which is a warning"}.`,
        overall === "excellent"
          ? `The ${fmtMoney(capital)} setup money comes back in ${payback.toFixed(1)} months and the margin survives a soft season. As operators of two serviced units ourselves, these are numbers we would take.`
          : overall === "good"
            ? "A workable unit: solid margin, sensible break-even. The lever is the nightly rate — push average daily rate through better presentation before chasing occupancy."
            : overall === "average"
              ? "The margin is real but thin. One quiet month puts you underwater on the landlord's rent, which you owe regardless. We would want the rent down or evidence the occupancy assumption is conservative."
              : "The unit does not clear its fixed costs with any safety margin — you are taking hotel risk for landlord's-rent reward. Renegotiate the rent, or this is not a deal.",
      ];

      return {
        kpis: [
          { id: "net", label: "Monthly cash flow", value: fmtMoney(net), raw: net, kind: "money", rating: rCash },
          { id: "annual", label: "Annual profit", value: fmtMoney(annual), raw: annual, kind: "money" },
          { id: "roc", label: "Return on cash", value: fmtPct(roc), raw: roc, kind: "pct", rating: rRoc },
          { id: "beocc", label: "Break-even occupancy", value: fmtPct(beOcc), raw: beOcc, kind: "pct", rating: rBe },
          { id: "capital", label: "Capital required", value: fmtMoney(capital), raw: capital, kind: "money" },
          { id: "payback", label: "Payback period", value: Number.isFinite(payback) ? `${payback.toFixed(1)} mo` : "—", raw: payback, kind: "months" },
        ],
        gaugeValue: roc,
        gaugeLabel: "Return on cash",
        gaugeRating: rRoc,
        allocationTitle: "Setup capital",
        allocation: [
          { label: "Deposit", amount: v.deposit },
          { label: "Setup", amount: v.setup },
          { label: "Furniture", amount: v.furniture },
        ],
        cashflow: {
          incomeLabel: "Revenue",
          income: revenue,
          costs: [
            { label: "Rent", amount: v.rentOut },
            { label: "Bills", amount: v.bills },
            { label: "Cleaning", amount: v.cleaning },
            { label: "Software", amount: v.software },
            { label: "Management", amount: mgmt },
            { label: "Maintenance", amount: v.maint },
          ],
        },
        score: buildScore([
          ["Cash flow", rCash],
          ["Return on cash", rRoc],
          ["Break-even headroom", rBe],
          ["Capital at risk", "excellent"],
          ["Contract dependency", "average"],
        ]),
        verdict: { stamp: stampFor(overall), rating: overall, paragraphs },
      };
    },
  },

  {
    id: "hmo",
    code: "HMO",
    name: "HMO",
    tagline: "Rooms let individually, licensed and managed.",
    fields: [
      { id: "price", label: "Purchase price", unit: "£", group: "Acquisition", default: 280000 },
      { id: "mortgage", label: "Mortgage", unit: "£", note: "per month", group: "Finance", default: 960 },
      { id: "rooms", label: "Room count", unit: "", group: "Income", default: 5, step: 1 },
      { id: "roomRent", label: "Average room rent", unit: "£", note: "per month", group: "Income", default: 550 },
      { id: "bills", label: "Bills", unit: "£", note: "per month, all-in", group: "Running costs", default: 550 },
      { id: "licence", label: "Licence costs", unit: "£", note: "per year", group: "Running costs", default: 250 },
      { id: "maint", label: "Maintenance", unit: "£", note: "per month", group: "Running costs", default: 150 },
      { id: "voidPct", label: "Voids", unit: "%", group: "Running costs", default: 8 },
      { id: "mgmtPct", label: "Management", unit: "%", group: "Running costs", default: 12 },
    ],
    compute(v) {
      const gross = v.rooms * v.roomRent;
      const afterVoids = gross * (1 - v.voidPct / 100);
      const mgmt = (afterVoids * v.mgmtPct) / 100;
      const costs = v.mortgage + v.bills + v.maint + v.licence / 12 + mgmt;
      const net = afterVoids - costs;
      const annual = net * 12;
      const grossYield = v.price > 0 ? ((gross * 12) / v.price) * 100 : 0;
      const perRoom = v.rooms > 0 ? net / v.rooms : 0;
      const beRooms = v.roomRent > 0
        ? (v.mortgage + v.bills + v.maint + v.licence / 12) /
          (v.roomRent * (1 - v.mgmtPct / 100))
        : Infinity;

      const rCash = grade(net, [900, 500, 150]); // HMOs must out-earn single lets
      const rYield = grade(grossYield, [12, 9, 7]);
      const rBe = grade(v.rooms - beRooms, [2.5, 1.5, 0.5]);
      const overall = worst(rCash, rYield, rBe);

      const paragraphs = [
        `${v.rooms.toFixed(0)} rooms at ${fmtMoney(v.roomRent)} gross ${fmtMoney(gross)} a month; after voids, management, bills and the mortgage the house clears ${fmtMoney(net)} — ${fmtMoney(perRoom)} per room, on a gross yield of ${fmtPct(grossYield)}. The house breaks even with ${beRooms.toFixed(1)} rooms filled.`,
        overall === "excellent"
          ? "Strong multi-let economics: the yield is doing what an HMO exists to do and the break-even sits comfortably low. Verify the licence terms and Article 4 position, then move."
          : overall === "good"
            ? "Sound numbers for a managed HMO. The upside is in the room rates — small uplifts across every room compound quickly. Check comparable room listings before completing."
            : overall === "average"
              ? "The house earns, but not enough margin over a single let to justify the licensing overhead and management intensity. It needs a higher average room rate or a lower entry."
              : "On these figures the HMO premium has vanished — the extra doors are not paying for the extra complexity. Reprice or walk.",
      ];

      return {
        kpis: [
          { id: "net", label: "Monthly cash flow", value: fmtMoney(net), raw: net, kind: "money", rating: rCash },
          { id: "annual", label: "Annual profit", value: fmtMoney(annual), raw: annual, kind: "money" },
          { id: "yield", label: "Gross yield", value: fmtPct(grossYield), raw: grossYield, kind: "pct", rating: rYield },
          { id: "perRoom", label: "Cash flow per room", value: fmtMoney(perRoom), raw: perRoom, kind: "money" },
          { id: "beRooms", label: "Break-even rooms", value: beRooms.toFixed(1), raw: beRooms, kind: "plain", rating: rBe },
          { id: "gross", label: "Gross monthly income", value: fmtMoney(gross), raw: gross, kind: "money" },
        ],
        gaugeValue: grossYield,
        gaugeLabel: "Gross yield",
        gaugeRating: rYield,
        allocationTitle: "Monthly cost base",
        allocation: [
          { label: "Mortgage", amount: v.mortgage },
          { label: "Bills", amount: v.bills },
          { label: "Management", amount: mgmt },
          { label: "Maintenance", amount: v.maint },
          { label: "Licence", amount: v.licence / 12 },
        ],
        cashflow: {
          incomeLabel: "Room income",
          income: gross,
          costs: [
            { label: "Voids", amount: gross - afterVoids },
            { label: "Mortgage", amount: v.mortgage },
            { label: "Bills", amount: v.bills },
            { label: "Management", amount: mgmt },
            { label: "Maintenance", amount: v.maint },
            { label: "Licence", amount: v.licence / 12 },
          ],
        },
        score: buildScore([
          ["Cash flow", rCash],
          ["Yield", rYield],
          ["Break-even headroom", rBe],
          ["Rental demand", "good"],
          ["Liquidity", "average"],
        ]),
        verdict: { stamp: stampFor(overall), rating: overall, paragraphs },
      };
    },
  },

  {
    id: "lo",
    code: "LO",
    name: "Lease Option",
    tagline: "Control now, complete later.",
    fields: [
      { id: "optionFee", label: "Option fee", unit: "£", group: "The agreement", default: 5000 },
      { id: "price", label: "Purchase price", unit: "£", note: "agreed today", group: "The agreement", default: 190000 },
      { id: "futurePrice", label: "Future value", unit: "£", note: "at completion", group: "The agreement", default: 220000 },
      { id: "cashflow", label: "Monthly cash flow", unit: "£", group: "During the option", default: 350 },
      { id: "refurb", label: "Refurbishment", unit: "£", group: "During the option", default: 8000 },
      { id: "legal", label: "Legal fees", unit: "£", group: "During the option", default: 1500 },
      { id: "equity", label: "Expected equity", unit: "£", note: "at completion", group: "The exit", default: 30000 },
    ],
    compute(v) {
      const capital = v.optionFee + v.refurb + v.legal;
      const annual = v.cashflow * 12;
      const roc = capital > 0 ? (annual / capital) * 100 : Infinity;
      const discount = v.futurePrice > 0 ? ((v.futurePrice - v.price) / v.futurePrice) * 100 : 0;
      const totalFiveYear = annual * 5 + v.equity;
      const multiple = capital > 0 ? totalFiveYear / capital : Infinity;

      const rCash = grade(v.cashflow, [400, 250, 100]);
      const rRoc = grade(roc, [40, 25, 12]);
      const rEquity = grade(discount, [15, 8, 3]);
      const overall = worst(rCash, rRoc, rEquity);

      const paragraphs = [
        `You control the asset for ${fmtMoney(capital)} — option fee, works and legals — with the purchase price locked at ${fmtMoney(v.price)} against an expected completion value of ${fmtMoney(v.futurePrice)}: ${fmtPct(discount)} baked in before a penny of mortgage. Meanwhile the property pays ${fmtMoney(v.cashflow)} a month.`,
        overall === "excellent"
          ? `Over a five-year option the cash flow plus ${fmtMoney(v.equity)} of expected equity returns roughly ${multiple.toFixed(1)}× the money in. Locked price, low entry, paid to wait — this is what a lease option is for. Get the agreement drafted by a specialist solicitor.`
          : overall === "good"
            ? "A sound option: the locked price protects the upside and the monthly income covers your involvement. Ensure the option period is long enough for the equity to mature."
            : overall === "average"
              ? "The structure works but the prize is small — the discount and monthly margin barely reward the years of obligation. Negotiate the strike price down or the cash flow up."
              : "Little discount, thin cash flow: you are carrying a landlord's obligations without an owner's reward. Restructure the terms or decline.",
      ];

      return {
        kpis: [
          { id: "capital", label: "Cash to control", value: fmtMoney(capital), raw: capital, kind: "money" },
          { id: "cashflow", label: "Monthly cash flow", value: fmtMoney(v.cashflow), raw: v.cashflow, kind: "money", rating: rCash },
          { id: "roc", label: "Return on cash", value: fmtPct(roc), raw: roc, kind: "pct", rating: rRoc },
          { id: "discount", label: "Locked-in discount", value: fmtPct(discount), raw: discount, kind: "pct", rating: rEquity },
          { id: "equity", label: "Expected equity", value: fmtMoney(v.equity), raw: v.equity, kind: "money" },
          { id: "multiple", label: "5-year money multiple", value: Number.isFinite(multiple) ? `${multiple.toFixed(1)}×` : "∞", raw: multiple, kind: "plain" },
        ],
        gaugeValue: roc,
        gaugeLabel: "Return on cash",
        gaugeRating: rRoc,
        allocationTitle: "Cash to control",
        allocation: [
          { label: "Option fee", amount: v.optionFee },
          { label: "Refurb", amount: v.refurb },
          { label: "Legal", amount: v.legal },
        ],
        waterfallTitle: "Five-year return",
        waterfall: [
          { label: "Cash flow ×60", amount: annual * 5 },
          { label: "Expected equity", amount: v.equity },
          { label: "Cash in", amount: -capital },
        ],
        score: buildScore([
          ["Cash flow", rCash],
          ["Return on cash", rRoc],
          ["Locked-in discount", rEquity],
          ["Capital at risk", "excellent"],
          ["Legal complexity", "average"],
        ]),
        verdict: { stamp: stampFor(overall), rating: overall, paragraphs },
      };
    },
  },

  {
    id: "flip",
    code: "FLIP",
    name: "Flip",
    tagline: "Buy, transform, sell — one clean exit.",
    fields: [
      { id: "price", label: "Purchase price", unit: "£", group: "Acquisition", default: 160000 },
      { id: "stamp", label: "Stamp duty", unit: "£", group: "Acquisition", default: 5500 },
      { id: "legal", label: "Legal costs", unit: "£", note: "both ends", group: "Acquisition", default: 2500 },
      { id: "refurb", label: "Refurbishment", unit: "£", group: "The works", default: 35000 },
      { id: "finance", label: "Finance costs", unit: "£", note: "bridge, fees", group: "The works", default: 9000 },
      { id: "holding", label: "Holding costs", unit: "£", note: "whole project", group: "The works", default: 3000 },
      { id: "sale", label: "Expected sale price", unit: "£", group: "The exit", default: 245000 },
      { id: "agentPct", label: "Estate agent", unit: "%", group: "The exit", default: 1.5, step: 0.1 },
      { id: "selling", label: "Selling costs", unit: "£", note: "EPC, staging", group: "The exit", default: 800 },
    ],
    compute(v) {
      const agent = (v.sale * v.agentPct) / 100;
      const totalCost = v.price + v.stamp + v.legal + v.refurb + v.finance + v.holding + agent + v.selling;
      const profit = v.sale - totalCost;
      const margin = totalCost > 0 ? (profit / totalCost) * 100 : 0;
      const marginOnGdv = v.sale > 0 ? (profit / v.sale) * 100 : 0;
      const cashIn = totalCost; // simplified: unbridged cash basis

      const rMargin = grade(margin, MARGIN_SCALE);
      const rGdv = grade(marginOnGdv, [17, 12, 7]);
      const overall = worst(rMargin, rGdv);

      const paragraphs = [
        `All-in the project costs ${fmtMoney(totalCost)} against an expected sale of ${fmtMoney(v.sale)} — ${fmtMoney(profit)} of profit, a ${fmtPct(margin)} margin on cost and ${fmtPct(marginOnGdv)} of the end value.`,
        overall === "excellent"
          ? "The margin clears the developer's 20% bar, which is what absorbs the surprises every refurb produces. Verify the end value with sold comparables on the same street, then move quickly."
          : overall === "good"
            ? "A viable flip with honest margin. Protect it: fix the works budget with contractors before exchange, and price the exit realistically rather than hopefully."
            : overall === "average"
              ? "The paper profit is there, but a 10% overrun on works or a soft sale takes most of it. This margin only suits a project you can control end to end."
              : "The margin does not survive contact with reality — one delay or price reduction puts the project underwater. Buy cheaper or do not buy.",
      ];

      return {
        kpis: [
          { id: "profit", label: "Projected profit", value: fmtMoney(profit), raw: profit, kind: "money", rating: rMargin },
          { id: "margin", label: "Margin on cost", value: fmtPct(margin), raw: margin, kind: "pct", rating: rMargin },
          { id: "marginGdv", label: "Margin on GDV", value: fmtPct(marginOnGdv), raw: marginOnGdv, kind: "pct", rating: rGdv },
          { id: "totalCost", label: "Total project cost", value: fmtMoney(totalCost), raw: totalCost, kind: "money" },
          { id: "capital", label: "Capital at risk", value: fmtMoney(cashIn), raw: cashIn, kind: "money" },
          { id: "agent", label: "Cost of sale", value: fmtMoney(agent + v.selling), raw: agent + v.selling, kind: "money" },
        ],
        gaugeValue: margin,
        gaugeLabel: "Margin on cost",
        gaugeRating: rMargin,
        allocationTitle: "Project cost",
        allocation: [
          { label: "Purchase", amount: v.price },
          { label: "Stamp duty", amount: v.stamp },
          { label: "Legal", amount: v.legal },
          { label: "Refurb", amount: v.refurb },
          { label: "Finance", amount: v.finance },
          { label: "Holding", amount: v.holding },
          { label: "Sale costs", amount: agent + v.selling },
        ],
        waterfallTitle: "Profit waterfall",
        waterfall: [
          { label: "Sale price", amount: v.sale },
          { label: "Acquisition", amount: -(v.price + v.stamp + v.legal) },
          { label: "Works & finance", amount: -(v.refurb + v.finance + v.holding) },
          { label: "Cost of sale", amount: -(agent + v.selling) },
          { label: "Profit", amount: profit },
        ],
        score: buildScore([
          ["Profit margin", rMargin],
          ["Margin on GDV", rGdv],
          ["Speed of capital return", "excellent"],
          ["Market timing risk", "average"],
          ["Liquidity", "good"],
        ]),
        verdict: { stamp: stampFor(overall), rating: overall, paragraphs },
      };
    },
  },
];

export const strategyById = (id: StrategyId) =>
  STRATEGIES.find((s) => s.id === id)!;
