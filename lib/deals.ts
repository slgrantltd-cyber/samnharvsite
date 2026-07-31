export type DealStatus = "available" | "under-offer" | "placed";

export interface Deal {
  /** Reference quoted by investors, e.g. "SH-26-001" */
  ref: string;
  strategy: "BRRR" | "BTL" | "HMO" | "Flip" | "Serviced Accommodation" | "Lease Option";
  /** Area only — never a postcode or address */
  area: string;
  headline: string;
  /** One honest paragraph: condition, angle, why it works. No address clues. */
  summary: string;
  numbers: { label: string; value: string }[];
  status: DealStatus;
  /** Month listed, e.g. "Aug 2026" */
  listed: string;
  /** True renders an ILLUSTRATIVE EXAMPLE badge and excludes it from "live" counts */
  example?: boolean;
}

export const STATUS_LABEL: Record<DealStatus, string> = {
  available: "Available",
  "under-offer": "Reserved",
  placed: "Placed",
};

/**
 * Add real deals to the TOP of this list. Keep every deal anonymised:
 * area-level location only, no photos, no postcode, no details that
 * identify the property. Full pack goes out after NDA only.
 */
export const DEALS: Deal[] = [
  {
    ref: "SH-EX-000",
    strategy: "BRRR",
    area: "Weston-super-Mare",
    headline: "3-bed terrace, cosmetic refurb, strong refinance margin",
    summary:
      "The shape of deal we source: a tired but structurally sound terrace bought below market from a motivated seller, a cosmetic-plus refurbishment, refinanced onto a single let at a conservative end value. Numbers below show how we present every deal — verified, stress-tested, and shared in full after NDA.",
    numbers: [
      { label: "Purchase", value: "£148,000" },
      { label: "Refurb", value: "£22,000" },
      { label: "End value (conservative)", value: "£205,000" },
      { label: "Money left in", value: "≈ £16,000" },
      { label: "Rent", value: "£950 pcm" },
      { label: "ROI on money left", value: "38%+" },
    ],
    status: "placed",
    listed: "Jul 2026",
    example: true,
  },
];
