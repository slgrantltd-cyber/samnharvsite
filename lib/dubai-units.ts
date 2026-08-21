/**
 * Dubai units on show — pulled from each developer's own site on 21 Aug 2026
 * (prices, unit mix, payment plans, completion dates as published there).
 * Imagery is the developer's own marketing render, served from /public.
 * "On enquiry" means the developer does not publish that figure — we confirm
 * it from the current price sheet when someone asks.
 */
export interface DubaiUnit {
  slug: string;
  developer: string;
  name: string;
  area: string;
  type: string;
  beds: string;
  priceFrom: string;      // headline, in £ where the developer publishes it
  priceNote?: string;     // AED or conversion note
  plan: string;
  handover: string;
  image: string;
  source: string;
  tone: "income" | "balanced" | "growth";
}

export const UNITS: DubaiUnit[] = [
  { slug: "binghatti-aquarise", developer: "Binghatti", name: "Binghatti Aquarise", area: "Business Bay", type: "Apartments", beds: "Studio – 4 bed", priceFrom: "£204,062", priceNote: "AED 999,999", plan: "20% booking · 50% during build · 30% on completion", handover: "Q1 2027", image: "/partners/dubai/projects/binghatti-aquarise.jpg", source: "binghatti.com", tone: "income" },
  { slug: "damac-lagoon-views", developer: "Damac", name: "Lagoon Views", area: "Damac Lagoons, Dubailand", type: "Apartments", beds: "1 – 2 bed", priceFrom: "£277,839", plan: "1% monthly payment plan", handover: "Q2 2027", image: "/partners/dubai/projects/damac-lagoon-views.jpg", source: "damacproperties.com", tone: "income" },
  { slug: "binghatti-skyblade", developer: "Binghatti", name: "Binghatti Skyblade", area: "Downtown Dubai", type: "Apartments", beds: "Studio – 3 bed", priceFrom: "£341,804", priceNote: "AED 1,674,999", plan: "Developer payment plan", handover: "On enquiry", image: "/partners/dubai/projects/binghatti-skyblade.jpg", source: "binghatti.com", tone: "balanced" },
  { slug: "sobha-orbis", developer: "Sobha", name: "Sobha Orbis", area: "Motor City", type: "Apartments", beds: "1 – 2 bed", priceFrom: "£420,000", priceNote: "AED 2.01m", plan: "Developer payment plan", handover: "On enquiry", image: "/partners/dubai/projects/sobha-orbis.jpg", source: "sobharealty.com", tone: "balanced" },
  { slug: "damac-chelsea-residences", developer: "Damac", name: "Chelsea Residences", area: "Dubai Maritime City", type: "Sea-view apartments", beds: "1 – 2 bed", priceFrom: "£516,045", plan: "1% monthly payment plan", handover: "On enquiry", image: "/partners/dubai/projects/damac-chelsea-residences.jpg", source: "damacproperties.com", tone: "growth" },
  { slug: "emaar-creek-haven", developer: "Emaar", name: "Creek Haven", area: "Dubai Creek Harbour", type: "Waterfront apartments", beds: "1 – 3 bed", priceFrom: "£556,000", priceNote: "AED 2,722,888", plan: "Developer payment plan", handover: "On enquiry", image: "/partners/dubai/projects/emaar-creek-haven.jpg", source: "emaar.com", tone: "growth" },
  { slug: "danube-greenz", developer: "Danube", name: "Greenz by Danube", area: "Academic City", type: "Townhouses & villas", beds: "3 – 5 bed", priceFrom: "£714,000", priceNote: "AED 3.5m", plan: "0.5% monthly payment plan", handover: "Q4 2029", image: "/partners/dubai/projects/danube-greenz.jpg", source: "danubeproperties.com", tone: "growth" },
  { slug: "ellington-windsor-house-ii", developer: "Ellington", name: "Windsor House II", area: "Dubai South", type: "Apartments", beds: "1 – 3 bed", priceFrom: "On request", plan: "Developer payment plan", handover: "On enquiry", image: "/partners/dubai/projects/ellington-windsor-house-ii.jpg", source: "ellingtonproperties.ae", tone: "income" },
];
