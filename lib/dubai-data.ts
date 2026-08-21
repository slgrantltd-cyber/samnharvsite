/**
 * Dubai market data — Dubai Land Department transactions as compiled and
 * published by DXB Interact (dxbinteract.com). Their terms require clear,
 * visible attribution wherever a figure is used; every surface that renders
 * this data must show SOURCE.label. Captured 21 August 2026; 2026 figures
 * are year-to-date. Refresh by re-reading the same pages and updating here.
 */
export const SOURCE = {
  label: "Source: DXB Interact (Dubai Land Department data), accessed 21 Aug 2026. 2026 = year to date.",
  short: "Source: DXB Interact · DLD data · 21 Aug 2026",
  url: "https://dxbinteract.com",
};

/** Residential sales volume (transactions) and value (AED bn), ready vs off-plan, by year. */
export const YEARS = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;
export const VOLUME = {
  ready:   [11496, 15299, 23537, 19920, 14350, 10754, 12157, 9273, 8242, 7413, 16837, 23599, 31661, 37969, 39067, 26975],
  offplan: [7309, 4225, 7360, 11119, 11790, 10828, 14980, 9963, 11736, 9454, 12988, 24299, 38978, 56977, 77417, 71355],
};
export const VALUE_BN = {
  ready:   [20, 23, 37, 35, 24, 17, 20, 15, 15, 12, 37, 55, 74, 89, 104, 73],
  offplan: [10, 8, 19, 23, 28, 22, 24, 15, 19, 15, 24, 56, 105, 151, 223, 194],
};

/** Median price per sq ft (AED), ready vs off-plan, 2014–2026 YTD. */
export const PSF_YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;
export const PSF = {
  ready:   [1098, 1031, 1000, 1036, 950, 815, 805, 884, 1064, 1168, 1312, 1385, 1484],
  offplan: [1161, 1109, 1161, 1046, 1335, 1353, 1265, 1095, 1300, 1433, 1665, 1723, 1762],
};

/** Share of sales by segment. */
export const SHARE = {
  2025: { volume: { ready: 34, offplan: 66 }, value: { ready: 32, offplan: 68 } },
  2026: { volume: { ready: 27, offplan: 73 }, value: { ready: 27, offplan: 73 } },
};

/** Registered rental contracts (Ejari), thousands, by year. */
export const RENTAL_CONTRACTS_K = { years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], values: [81, 86, 101, 111, 122, 125, 156, 175, 193, 208, 229, 237] };
/** 2026 rental contracts by bedroom (share %). */
export const RENTAL_MIX_2026 = [["Studio", 21], ["1 bed", 41], ["2 beds", 23], ["3 beds", 10], ["4 beds", 3]] as const;

/** Area performance — apartments, 12 months to 21 Aug 2026 vs the prior 12 months. */
export interface AreaRow { area: string; psf: number; psfChange: number; transactions: number; txChange: number; supply: number; sold: number; yieldPct: number }
export const AREAS: AreaRow[] = [
  { area: "Dubai South",        psf: 1149, psfChange: 18, transactions: 693,  txChange: -19, supply: 37020, sold: 62, yieldPct: 8.3 },
  { area: "Jumeirah Village Circle", psf: 1341, psfChange: 7, transactions: 4543, txChange: -7, supply: 38269, sold: 80, yieldPct: 7.3 },
  { area: "Business Bay",       psf: 2000, psfChange: 4,  transactions: 3547, txChange: -10, supply: 24923, sold: 86, yieldPct: 6.8 },
  { area: "Damac Hills",        psf: 1370, psfChange: 10, transactions: 642,  txChange: -27, supply: 2614,  sold: 91, yieldPct: 6.3 },
  { area: "Sobha Hartland",     psf: 2050, psfChange: 4,  transactions: 1117, txChange: 11,  supply: 1700,  sold: 99, yieldPct: 6.1 },
  { area: "Dubai Marina",       psf: 1931, psfChange: 13, transactions: 2311, txChange: -32, supply: 5463,  sold: 93, yieldPct: 5.9 },
  { area: "Town Square",        psf: 1324, psfChange: 15, transactions: 999,  txChange: 10,  supply: 4662,  sold: 95, yieldPct: 5.9 },
  { area: "Dubai Hills Estate", psf: 2377, psfChange: 6,  transactions: 1206, txChange: -12, supply: 7940,  sold: 96, yieldPct: 5.7 },
  { area: "Dubai Creek Harbour",psf: 2369, psfChange: 6,  transactions: 1646, txChange: -3,  supply: 6412,  sold: 97, yieldPct: 5.3 },
  { area: "Downtown Dubai",     psf: 2784, psfChange: 4,  transactions: 2297, txChange: -24, supply: 6246,  sold: 94, yieldPct: 4.9 },
  { area: "Emaar Beachfront",   psf: 3567, psfChange: -1, transactions: 430,  txChange: -26, supply: 2262,  sold: 100, yieldPct: 4.6 },
  { area: "Palm Jumeirah",      psf: 2806, psfChange: 8,  transactions: 966,  txChange: -28, supply: 2880,  sold: 89, yieldPct: 4.4 },
];

/** Developer scorecard — 2026 YTD sales; capital gain = median resale price change over the last 12 months; absorption = share of under-construction stock sold. */
export interface DeveloperRow { name: string; salesVolume: number; salesValueBn: number; capitalGain: number; absorption: number; est: number }
export const DEVELOPERS: DeveloperRow[] = [
  { name: "Emaar",     salesVolume: 5961,  salesValueBn: 31.9, capitalGain: 28.6, absorption: 92.6, est: 1997 },
  { name: "Damac",     salesVolume: 6922,  salesValueBn: 17.9, capitalGain: 11.9, absorption: 81.7, est: 2002 },
  { name: "Azizi",     salesVolume: 11225, salesValueBn: 9.8,  capitalGain: 8.5,  absorption: 49.3, est: 2007 },
  { name: "Binghatti", salesVolume: 5835,  salesValueBn: 9.4,  capitalGain: 20.0, absorption: 78.3, est: 2008 },
  { name: "Ellington", salesVolume: 2957,  salesValueBn: 8.6,  capitalGain: 18.2, absorption: 79.0, est: 2014 },
  { name: "Meraas",    salesVolume: 977,   salesValueBn: 7.9,  capitalGain: 28.9, absorption: 91.5, est: 2007 },
  { name: "Sobha",     salesVolume: 1932,  salesValueBn: 5.9,  capitalGain: 5.9,  absorption: 89.7, est: 1998 },
  { name: "Nakheel",   salesVolume: 972,   salesValueBn: 4.6,  capitalGain: 31.2, absorption: 93.8, est: 2000 },
  { name: "Danube",    salesVolume: 1871,  salesValueBn: 3.9,  capitalGain: 11.5, absorption: 88.7, est: 1993 },
];

/* ---------- derived headline figures ---------- */
const last = <T,>(a: readonly T[]) => a[a.length - 1];
export const HEADLINES = {
  /** total 2025 transactions and value */
  tx2025: VOLUME.ready[14] + VOLUME.offplan[14],                 // 116,484
  valueBn2025: VALUE_BN.ready[14] + VALUE_BN.offplan[14],        // 327
  /** growth of transactions 2020 → 2025 */
  txGrowth2020to2025: Math.round(((VOLUME.ready[14] + VOLUME.offplan[14]) / (VOLUME.ready[9] + VOLUME.offplan[9]) - 1) * 100), // ~591%
  /** ready price/sqft from the 2020 floor to 2026 YTD */
  readyPsfFromFloor: Math.round((last(PSF.ready) / PSF.ready[6] - 1) * 100),   // ~84%
  readyPsf2025vs2024: +((PSF.ready[11] / PSF.ready[10] - 1) * 100).toFixed(1),  // ~5.6%
  offplanPsf2025vs2024: +((PSF.offplan[11] / PSF.offplan[10] - 1) * 100).toFixed(1), // ~3.5%
  offplanShare2026: SHARE[2026].volume.offplan,                  // 73
  rentalContracts2025K: 229,
  topYield: AREAS[0],
  lowYield: AREAS[AREAS.length - 1],
};
