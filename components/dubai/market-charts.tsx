"use client";

import { useMemo, useState } from "react";
import { AREAS, DEVELOPERS, PSF, PSF_YEARS, SOURCE, VOLUME, YEARS } from "@/lib/dubai-data";

/* Two-tone brand charts: ink for ready/resale, gold (dashed) for off-plan.
   Identity is never colour alone — legend, direct end labels, dash pattern,
   hover tooltip, and a table view under every chart. */
const INK = "#2b2823", GOLD = "#8a6a35", GRID = "rgba(26,26,26,.10)", MUTED = "#5c5952";
const fmt = (n: number) => n.toLocaleString("en-GB");

function Frame({ title, note, children, table }: { title: string; note: string; children: React.ReactNode; table: React.ReactNode }) {
  return (
    <figure className="border hairline bg-[var(--plaster)] p-5 md:p-7">
      <figcaption>
        <p className="display text-xl md:text-2xl">{title}</p>
        <p className="muted mt-1 text-sm">{note}</p>
      </figcaption>
      <div className="mt-5">{children}</div>
      <details className="mt-4">
        <summary className="annot cursor-pointer text-bronze">Table view</summary>
        <div className="mt-3 overflow-x-auto">{table}</div>
      </details>
      <p className="annot mt-4 muted">{SOURCE.short}</p>
    </figure>
  );
}

/** Price per sq ft — two lines, crosshair tooltip */
export function PsfLines() {
  const W = 640, H = 280, P = { l: 44, r: 64, t: 16, b: 28 };
  const all = [...PSF.ready, ...PSF.offplan]; const lo = 700, hi = Math.ceil(Math.max(...all) / 200) * 200;
  const x = (i: number) => P.l + (i / (PSF_YEARS.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - lo) / (hi - lo)) * (H - P.t - P.b);
  const path = (s: number[]) => s.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const [hover, setHover] = useState<number | null>(null);
  const ticks = useMemo(() => { const t: number[] = []; for (let v = lo + 100; v < hi; v += 200) t.push(v); return t; }, [hi]);
  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (PSF_YEARS.length - 1));
    setHover(Math.max(0, Math.min(PSF_YEARS.length - 1, i)));
  };
  return (
    <Frame title="Price per square foot, ready vs off-plan" note="Median AED per sq ft, residential, 2014 – 2026 YTD. The off-plan premium has narrowed from 66% in 2019 to 19% today."
      table={<table className="w-full text-sm"><thead><tr className="annot muted text-left"><th className="py-1">Year</th><th>Ready</th><th>Off-plan</th></tr></thead><tbody>{PSF_YEARS.map((yr, i) => <tr key={yr} className="border-t hairline"><td className="py-1">{yr}</td><td>{fmt(PSF.ready[i])}</td><td>{fmt(PSF.offplan[i])}</td></tr>)}</tbody></table>}>
      <div className="annot mb-3 flex gap-6 muted"><span className="inline-flex items-center gap-2"><span className="inline-block h-0.5 w-6" style={{ background: INK }} />Ready</span><span className="inline-flex items-center gap-2"><span className="inline-block h-0.5 w-6" style={{ background: `repeating-linear-gradient(90deg,${GOLD} 0 4px,transparent 4px 7px)` }} />Off-plan</span></div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Line chart of Dubai median price per square foot, ready versus off-plan, 2014 to 2026" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          {ticks.map((v) => <g key={v}><line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke={GRID} /><text x={P.l - 8} y={y(v) + 3} textAnchor="end" fontSize="10" fill={MUTED}>{fmt(v)}</text></g>)}
          {PSF_YEARS.map((yr, i) => (i % 2 === 0 || i === PSF_YEARS.length - 1) && <text key={yr} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill={MUTED}>{yr}</text>)}
          <path d={path(PSF.ready)} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d={path(PSF.offplan)} fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />
          <text x={x(PSF_YEARS.length - 1) + 8} y={y(PSF.ready[PSF_YEARS.length - 1]) + 4} fontSize="11" fill={INK}>{fmt(PSF.ready[12])}</text>
          <text x={x(PSF_YEARS.length - 1) + 8} y={y(PSF.offplan[PSF_YEARS.length - 1]) + 4} fontSize="11" fill={GOLD}>{fmt(PSF.offplan[12])}</text>
          {hover !== null && (<g><line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="rgba(26,26,26,.35)" />
            <circle cx={x(hover)} cy={y(PSF.ready[hover])} r="4" fill={INK} stroke="#f2efe8" strokeWidth="2" /><circle cx={x(hover)} cy={y(PSF.offplan[hover])} r="4" fill={GOLD} stroke="#f2efe8" strokeWidth="2" /></g>)}
        </svg>
        {hover !== null && <div className="pointer-events-none absolute top-2 border hairline bg-[var(--plaster)] px-3 py-2 text-xs shadow-daylight" style={{ left: `${(x(hover) / W) * 100}%`, transform: hover > 8 ? "translateX(-110%)" : "translateX(12px)" }}><p className="annot muted">{PSF_YEARS[hover]}</p><p className="mt-1">Ready <b>{fmt(PSF.ready[hover])}</b></p><p>Off-plan <b>{fmt(PSF.offplan[hover])}</b></p></div>}
      </div>
    </Frame>
  );
}

/** Transactions by year — stacked, 2px gaps, hover tooltip */
export function VolumeBars() {
  const W = 640, H = 280, P = { l: 48, r: 12, t: 16, b: 28 };
  const totals = YEARS.map((_, i) => VOLUME.ready[i] + VOLUME.offplan[i]); const hi = 120000;
  const bw = (W - P.l - P.r) / YEARS.length; const y = (v: number) => P.t + (1 - v / hi) * (H - P.t - P.b);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Frame title="Sales transactions by year" note="Residential sales, ready (ink) and off-plan (gold), 2011 – 2026 YTD. 2025: 116,484 transactions — seven times 2020."
      table={<table className="w-full text-sm"><thead><tr className="annot muted text-left"><th className="py-1">Year</th><th>Ready</th><th>Off-plan</th><th>Total</th></tr></thead><tbody>{YEARS.map((yr, i) => <tr key={yr} className="border-t hairline"><td className="py-1">{yr}</td><td>{fmt(VOLUME.ready[i])}</td><td>{fmt(VOLUME.offplan[i])}</td><td>{fmt(totals[i])}</td></tr>)}</tbody></table>}>
      <div className="annot mb-3 flex gap-6 muted"><span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3" style={{ background: INK }} />Ready</span><span className="inline-flex items-center gap-2"><span className="inline-block h-3 w-3" style={{ background: GOLD }} />Off-plan</span></div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Stacked bars of Dubai sales transactions by year, ready and off-plan" onMouseLeave={() => setHover(null)}>
          {[30000, 60000, 90000, 120000].map((v) => <g key={v}><line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke={GRID} /><text x={P.l - 8} y={y(v) + 3} textAnchor="end" fontSize="10" fill={MUTED}>{v / 1000}k</text></g>)}
          {YEARS.map((yr, i) => { const x0 = P.l + i * bw + 3, w = bw - 6; const r = VOLUME.ready[i], o = VOLUME.offplan[i]; return (
            <g key={yr} onMouseEnter={() => setHover(i)}>
              <rect x={x0} y={y(r)} width={w} height={y(0) - y(r)} fill={INK} rx="2" />
              <rect x={x0} y={y(r + o) } width={w} height={Math.max(0, y(r) - y(r + o) - 2)} fill={GOLD} rx="2" />
              <rect x={x0 - 3} y={P.t} width={bw} height={H - P.t - P.b} fill="transparent" />
              {(i % 3 === 0 || i === YEARS.length - 1) && <text x={x0 + w / 2} y={H - 8} textAnchor="middle" fontSize="10" fill={MUTED}>{yr}</text>}
            </g>); })}
        </svg>
        {hover !== null && <div className="pointer-events-none absolute top-2 border hairline bg-[var(--plaster)] px-3 py-2 text-xs shadow-daylight" style={{ left: `${((P.l + hover * bw) / W) * 100}%`, transform: hover > 10 ? "translateX(-105%)" : "translateX(8px)" }}><p className="annot muted">{YEARS[hover]}{hover === YEARS.length - 1 ? " YTD" : ""}</p><p className="mt-1">Ready <b>{fmt(VOLUME.ready[hover])}</b></p><p>Off-plan <b>{fmt(VOLUME.offplan[hover])}</b></p><p className="border-t hairline mt-1 pt-1">Total <b>{fmt(totals[hover])}</b></p></div>}
      </div>
    </Frame>
  );
}

/** Horizontal bars, single series, direct labels */
function HBars({ rows, max, unit }: { rows: { label: string; value: number; sub?: string }[]; max: number; unit: string }) {
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="group grid grid-cols-[9rem_1fr_3.5rem] items-center gap-3 text-sm md:grid-cols-[11rem_1fr_4rem]">
          <span className="truncate" title={r.label}>{r.label}</span>
          <span className="relative h-2.5 overflow-hidden rounded-sm bg-[var(--line)]"><span className="absolute inset-y-0 left-0 rounded-sm transition-[width] duration-700" style={{ width: `${(r.value / max) * 100}%`, background: GOLD }} /></span>
          <span className="annot text-right text-ink">{r.value}{unit}</span>
        </li>
      ))}
    </ul>
  );
}

export function YieldBars() {
  const rows = [...AREAS].sort((a, b) => b.yieldPct - a.yieldPct).map((a) => ({ label: a.area, value: a.yieldPct }));
  return (
    <Frame title="Gross rental yield by area" note="Apartments, 12 months to 21 Aug 2026. Price and yield move against each other: the cheapest square foot pays the most."
      table={<table className="w-full text-sm"><thead><tr className="annot muted text-left"><th className="py-1">Area</th><th>AED/sq ft</th><th>Δ price</th><th>Transactions</th><th>Δ vol.</th><th>Yield</th></tr></thead><tbody>{AREAS.map((a) => <tr key={a.area} className="border-t hairline"><td className="py-1">{a.area}</td><td>{fmt(a.psf)}</td><td>{a.psfChange > 0 ? "+" : ""}{a.psfChange}%</td><td>{fmt(a.transactions)}</td><td>{a.txChange > 0 ? "+" : ""}{a.txChange}%</td><td>{a.yieldPct}%</td></tr>)}</tbody></table>}>
      <HBars rows={rows} max={9} unit="%" />
    </Frame>
  );
}

export function DeveloperBars() {
  const rows = [...DEVELOPERS].sort((a, b) => b.capitalGain - a.capitalGain).map((d) => ({ label: d.name, value: d.capitalGain }));
  return (
    <Frame title="Capital gain by developer" note="Median resale price change over the last 12 months, by developer. Who you buy from is the biggest single lever."
      table={<table className="w-full text-sm"><thead><tr className="annot muted text-left"><th className="py-1">Developer</th><th>2026 sales</th><th>Value (AED bn)</th><th>Capital gain</th><th>Absorption</th></tr></thead><tbody>{DEVELOPERS.map((d) => <tr key={d.name} className="border-t hairline"><td className="py-1">{d.name}</td><td>{fmt(d.salesVolume)}</td><td>{d.salesValueBn}</td><td>{d.capitalGain}%</td><td>{d.absorption}%</td></tr>)}</tbody></table>}>
      <HBars rows={rows} max={35} unit="%" />
    </Frame>
  );
}
