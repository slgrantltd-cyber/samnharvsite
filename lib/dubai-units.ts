/**
 * UAE units on show — pulled from each developer's own site on 21 Aug 2026
 * (prices, unit mix, sizes, payment plans and completion dates as published
 * there). Renders are the developers' own marketing images, served from
 * /public. "On enquiry" = the developer does not publish it online; we
 * confirm from the current price sheet when asked. Sterling at the
 * developer's own conversion where given (≈ AED 4.9 / £).
 */
export type Collection = "branded" | "abu-dhabi" | "dubai";
export interface MixRow { type: string; from?: string; note?: string; size?: string }
export interface DubaiUnit {
  slug: string;
  collection: Collection;
  developer: string;
  brand?: string;          // e.g. "Bugatti", "Jacob & Co", "Mercedes-Benz"
  name: string;
  area: string;
  city: "Dubai" | "Abu Dhabi";
  type: string;
  beds: string;
  priceFrom: string;
  priceNote?: string;
  plan: string;
  handover: string;
  image: string;
  gallery: string[];
  plans?: { label: string; image: string }[];
  tour?: string;
  mix: MixRow[];
  source: string;
  tone: "income" | "balanced" | "growth" | "trophy";
  line: string;
  /** availability note shown as a badge — set from the current price sheet */
  availability?: "Limited stock" | "Selling fast" | "Final units" | "New release";
}

const P = "/partners/dubai/projects/";

/** Exclusive payment plans — negotiated per launch; confirmed on the sheet. */
export const PLANS_NOTE = "Exclusive payment plans available through our desk on selected launches — extended post-handover terms and reduced bookings, confirmed on the current sheet.";

export const COLLECTIONS: { key: Collection; label: string; title: string; body: string }[] = [
  { key: "branded", label: "Branded residences", title: "The branded collection.", body: "Bugatti, Jacob & Co, Mercedes-Benz — with Binghatti. The scarcest product in the city, at developer price, through us." },
  { key: "abu-dhabi", label: "Abu Dhabi · Aldar", title: "Abu Dhabi, with Aldar.", body: "Saadiyat and Yas Island — the capital's master developer, cultural-district addresses and family communities with a quieter supply picture than Dubai." },
  { key: "dubai", label: "Dubai launches", title: "Dubai launches.", body: "Current allocations across Binghatti, Damac, Sobha, Emaar, Danube and Ellington — income-led to growth-led." },
];

export const UNITS: DubaiUnit[] = [
  /* ---------- branded ---------- */
  { slug: "bugatti-residences", availability: "Limited stock", collection: "branded", developer: "Binghatti", brand: "Bugatti", name: "Bugatti Residences by Binghatti", area: "Business Bay", city: "Dubai", type: "Riviera Mansions & Sky Mansion penthouses", beds: "2 – 5 bed", priceFrom: "£3,958,806", priceNote: "AED 19.4m", plan: "Developer payment plan", handover: "On enquiry", image: P + "bugatti-1.jpg", gallery: [P + "bugatti-1.jpg", P + "bugatti-2.jpg", P + "bugatti-3.jpg", P + "bugatti-5.jpg"], tour: "https://bugattiresidences.com/", mix: [{ type: "2 bed", from: "From £3.96m", note: "Riviera Mansion Collection" }, { type: "3 bed", note: "Riviera Mansion Collection" }, { type: "4 bed", note: "Sky Mansion Collection" }, { type: "5 bed", note: "Sky Mansion penthouse" }], source: "bugattiresidences.com", tone: "trophy", line: "The first Bugatti-branded residence in the world — a hyper form on the Business Bay waterfront." },
  { slug: "burj-binghatti-jacob-co", availability: "Limited stock", collection: "branded", developer: "Binghatti", brand: "Jacob & Co", name: "Burj Binghatti Jacob & Co Residences", area: "Business Bay", city: "Dubai", type: "Hyper-tower residences & penthouses", beds: "2 – 4 bed", priceFrom: "£1,714,122", priceNote: "AED 8.4m", plan: "Developer payment plan", handover: "On enquiry", image: P + "jacobco-2.jpg", gallery: [P + "jacobco-2.jpg", P + "jacobco-1.jpg"], mix: [{ type: "2 bed", from: "From £1.71m" }, { type: "3 bed" }, { type: "4 bed", note: "Sky penthouses" }], source: "binghatti.com", tone: "trophy", line: "Jewelled crown, over a hundred storeys — the tallest residential tower of its kind." },
  { slug: "mercedes-benz-places", availability: "Limited stock", collection: "branded", developer: "Binghatti", brand: "Mercedes-Benz", name: "Mercedes-Benz Places | Binghatti", area: "Downtown Dubai", city: "Dubai", type: "Suites & penthouses", beds: "2 – 4 bed · penthouses to 5", priceFrom: "£2,101,840", priceNote: "AED 10.3m", plan: "Developer payment plan", handover: "On enquiry", image: P + "mercedes-2.jpg", gallery: [P + "mercedes-2.jpg", P + "mercedes-1.jpg"], mix: [{ type: "2 bed suite", from: "From £2.10m" }, { type: "3 bed" }, { type: "4 bed penthouse" }, { type: "5 bed penthouse", note: "Triplex" }], source: "binghatti.com", tone: "trophy", line: "The first Mercedes-Benz branded residence, beside the Burj Khalifa." },
  { slug: "mercedes-benz-places-binghatti-city", availability: "Selling fast", collection: "branded", developer: "Binghatti", brand: "Mercedes-Benz", name: "Mercedes-Benz Places | Binghatti City", area: "Nad Al Sheba", city: "Dubai", type: "Branded apartments", beds: "Studio – 5 bed", priceFrom: "£326,499", priceNote: "AED 1.6m", plan: "Developer payment plan", handover: "On enquiry", image: P + "mbp-city-1.jpg", gallery: [P + "mbp-city-1.jpg"], mix: [{ type: "Studio", from: "From £326k" }, { type: "1 bed" }, { type: "2 bed" }, { type: "3 bed" }, { type: "4 – 5 bed" }], source: "binghatti.com", tone: "growth", line: "The accessible door into the Mercedes-Benz brand — a whole district, not a tower." },

  /* ---------- Abu Dhabi · Aldar ---------- */
  { slug: "aldar-baccarat-saadiyat", availability: "Limited stock", collection: "abu-dhabi", developer: "Aldar", brand: "Baccarat", name: "Baccarat Residences Saadiyat", area: "Saadiyat Island", city: "Abu Dhabi", type: "Apartments, sky villas & penthouses", beds: "Studio – 4 bed", priceFrom: "On request", plan: "Developer payment plan", handover: "Q3 2029", image: P + "aldar-baccarat.jpg", gallery: [P + "aldar-baccarat.jpg"], mix: [{ type: "Studio" }, { type: "1 bed" }, { type: "2 bed" }, { type: "3 bed" }, { type: "4 bed sky villa / penthouse" }], source: "aldar.com", tone: "trophy", line: "Baccarat's first residences in the region, in the Saadiyat cultural district." },
  { slug: "aldar-gardenia-bay", availability: "Selling fast", collection: "abu-dhabi", developer: "Aldar", name: "Gardenia Bay", area: "Yas Island", city: "Abu Dhabi", type: "Apartments & townhouses", beds: "Studio – 4 bed", priceFrom: "£144,000", priceNote: "AED 707,400", plan: "Developer payment plan", handover: "Q4 2028", image: P + "aldar-gardenia-bay.jpg", gallery: [P + "aldar-gardenia-bay.jpg"], mix: [{ type: "Studio", from: "From £144k" }, { type: "1 bed" }, { type: "2 bed" }, { type: "3 bed" }, { type: "4 bed townhouse" }], source: "aldar.com", tone: "income", line: "Waterfront Yas Island at an entry price Dubai can't match." },
  { slug: "aldar-yas-acres-orchids", availability: "Final units", collection: "abu-dhabi", developer: "Aldar", name: "The Orchids at Yas Acres", area: "Yas Island", city: "Abu Dhabi", type: "Villas & townhouses", beds: "2 – 5 bed", priceFrom: "On request", plan: "Developer payment plan", handover: "On enquiry", image: P + "aldar-orchids.jpg", gallery: [P + "aldar-orchids.jpg"], mix: [{ type: "2 bed townhouse", size: "from 1,361 sq ft" }, { type: "3 bed" }, { type: "4 bed" }, { type: "5 bed villa", size: "to 5,015 sq ft" }], source: "aldar.com", tone: "balanced", line: "A limited release of 217 family homes in one of Yas Island's most established communities." },

  /* ---------- Dubai launches ---------- */
  { slug: "binghatti-aquarise", availability: "Selling fast", collection: "dubai", developer: "Binghatti", name: "Binghatti Aquarise", area: "Business Bay", city: "Dubai", type: "Apartments", beds: "Studio – 4 bed", priceFrom: "£204,062", priceNote: "AED 999,999", plan: "20% booking · 50% during build · 30% on completion", handover: "Q1 2027", image: P + "binghatti-aquarise.jpg", gallery: [P + "binghatti-aquarise.jpg", P + "aquarise-2.jpg", P + "aquarise-3.jpg", P + "aquarise-4.jpg", P + "aquarise-5.jpg"], mix: [{ type: "Studio", from: "From £204k" }, { type: "1 bed", from: "From £408,124", size: "789 sq ft" }, { type: "2 bed", from: "From £593,821", size: "1,090 sq ft" }, { type: "3 bed" }, { type: "4 bed" }], source: "binghatti.com", tone: "income", line: "Canal-front Business Bay with a private beach — the rental engine of the city." },
  { slug: "damac-lagoon-views", availability: "Selling fast", collection: "dubai", developer: "Damac", name: "Lagoon Views", area: "Damac Lagoons, Dubailand", city: "Dubai", type: "Apartments", beds: "1 – 2 bed", priceFrom: "£277,839", plan: "1% monthly payment plan", handover: "Q2 2027", image: P + "damac-lagoon-views.jpg", gallery: [P + "damac-lagoon-views.jpg", P + "lagoon-2.jpg", P + "lagoon-3.jpg", P + "lagoon-4.jpg", P + "lagoon-5.jpg"], mix: [{ type: "1 bed", from: "From £277,839", size: "to 1,418 sq ft" }, { type: "2 bed", from: "From £369,835", size: "to 1,797 sq ft" }], source: "damacproperties.com", tone: "income", line: "Crystal-lagoon community at a one-percent-a-month plan." },
  { slug: "binghatti-skyblade", collection: "dubai", developer: "Binghatti", name: "Binghatti Skyblade", area: "Downtown Dubai", city: "Dubai", type: "Apartments", beds: "Studio – 3 bed", priceFrom: "£360,170", priceNote: "AED 1.76m", plan: "Developer payment plan", handover: "On enquiry", image: P + "binghatti-skyblade.jpg", gallery: [P + "binghatti-skyblade.jpg", P + "skyblade-2.jpg", P + "skyblade-3.jpg", P + "skyblade-4.jpg", P + "skyblade-5.jpg"], plans: [{ label: "Studio", image: P + "skyblade-plan-studio.jpg" }, { label: "1 bed", image: P + "skyblade-plan-1bed.jpg" }, { label: "2 bed", image: P + "skyblade-plan-2bed.jpg" }, { label: "3 bed", image: P + "skyblade-plan-3bed.jpg" }], mix: [{ type: "Studio", from: "From £360,170", size: "386 sq ft" }, { type: "1 bed", from: "From £813,188", size: "1,030 sq ft" }, { type: "2 bed", from: "From £994,803", size: "1,263 sq ft" }, { type: "3 bed", from: "From £2,733,413", size: "2,196 sq ft" }], source: "binghatti.com", tone: "balanced", line: "Downtown, by the Burj — with floor plans published for every type." },
  { slug: "sobha-orbis", collection: "dubai", developer: "Sobha", name: "Sobha Orbis", area: "Motor City", city: "Dubai", type: "Apartments", beds: "1 – 2 bed", priceFrom: "£420,000", priceNote: "AED 2.01m", plan: "Developer payment plan", handover: "On enquiry", image: P + "sobha-orbis.jpg", gallery: [P + "sobha-orbis.jpg", P + "orbis-2.jpg", P + "orbis-3.jpg", P + "orbis-4.jpg"], mix: [{ type: "1 bed", from: "From £420k", size: "484 – 524 sq ft" }, { type: "2 bed" }], source: "sobharealty.com", tone: "balanced", line: "Sobha build quality in a resort-style Motor City community." },
  { slug: "damac-chelsea-residences", availability: "New release", collection: "dubai", developer: "Damac", brand: "Chelsea FC", name: "Chelsea Residences", area: "Dubai Maritime City", city: "Dubai", type: "Sea-view apartments", beds: "1 – 2 bed", priceFrom: "£516,045", plan: "1% monthly payment plan", handover: "On enquiry", image: P + "chelsea-1.jpg", gallery: [P + "chelsea-1.jpg", P + "chelsea-2.jpg", P + "chelsea-3.jpg", P + "chelsea-4.jpg"], mix: [{ type: "1 bed", from: "From £516,045", size: "to 1,011 sq ft" }, { type: "2 bed", from: "From £728,582", size: "to 1,660 sq ft" }], source: "damacproperties.com", tone: "growth", line: "Chelsea-branded, sea-facing, on the new Maritime City peninsula." },
  { slug: "emaar-creek-haven", availability: "New release", collection: "dubai", developer: "Emaar", name: "Creek Haven", area: "Dubai Creek Harbour", city: "Dubai", type: "Waterfront apartments", beds: "1 – 3 bed", priceFrom: "£556,000", priceNote: "AED 2,722,888", plan: "Developer payment plan", handover: "On enquiry", image: P + "emaar-creek-haven.jpg", gallery: [P + "emaar-creek-haven.jpg", P + "creek-2.jpg", P + "creek-3.jpg", P + "creek-4.jpg", P + "creek-5.jpg"], mix: [{ type: "1 bed", from: "From £556k", size: "from 1,192 sq ft" }, { type: "2 bed" }, { type: "3 bed" }], source: "emaar.com", tone: "growth", line: "Emaar waterfront with Burj views — the developer with the strongest resale record in the city." },
  { slug: "danube-greenz", collection: "dubai", developer: "Danube", name: "Greenz by Danube", area: "Academic City", city: "Dubai", type: "Townhouses & villas", beds: "3 – 5 bed", priceFrom: "£714,000", priceNote: "AED 3.5m", plan: "0.5% monthly payment plan", handover: "Q4 2029", image: P + "danube-greenz.jpg", gallery: [P + "danube-greenz.jpg", P + "greenz-pool-deck.jpg", P + "greenz-amenities.jpg", P + "greenz-kitchen.jpg", P + "greenz-bedroom.jpg"], tour: "https://danubeproperties.com/3d-tours/", mix: [{ type: "3 bed townhouse", from: "From £714k" }, { type: "4 bed" }, { type: "5 bed villa" }], source: "danubeproperties.com", tone: "growth", line: "Family villas on a half-percent-a-month plan — Danube's signature." },
  { slug: "ellington-windsor-house-ii", collection: "dubai", developer: "Ellington", name: "Windsor House II", area: "Dubai South", city: "Dubai", type: "Apartments", beds: "Studio – 3 bed", priceFrom: "On request", plan: "Developer payment plan", handover: "On enquiry", image: P + "ellington-windsor-house-ii.jpg", gallery: [P + "ellington-windsor-house-ii.jpg", P + "windsor-1.jpg"], tour: "https://ellingtonproperties.ae/en/virtual-tour", mix: [{ type: "Studio" }, { type: "1 bed" }, { type: "2 bed" }, { type: "3 bed" }], source: "ellingtonproperties.ae", tone: "income", line: "Design-led Ellington in Dubai South — the highest-yield corridor in the city." },
];
