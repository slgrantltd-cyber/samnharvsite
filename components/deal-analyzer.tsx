"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  STRATEGIES,
  strategyById,
  fmtMoney,
  fmtPct,
  type Analysis,
  type Rating,
  type StrategyId,
} from "@/lib/deal-engine";

/**
 * Deal Intelligence — the appraisal desk.
 * One strategy on the desk at a time; every keystroke re-runs the whole
 * appraisal. Figures are set in Fragment mono on ruled lines; the dashboard
 * is a single smoked-stone instrument panel; charts are drawn as hairline
 * SVG/CSS marks in the material palette. No chart library, no glass.
 */

/* ---------- animated figures ---------- */

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCounter(target: number, format: (n: number) => string, dur = 550) {
  const [disp, setDisp] = useState(target);
  const prev = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    if (!Number.isFinite(target) || reduced()) {
      prev.current = target;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setDisp(target));
      return () => cancelAnimationFrame(raf.current);
    }
    const from = Number.isFinite(prev.current) ? prev.current : 0;
    prev.current = target;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(2, -10 * p);
      setDisp(p < 1 ? from + (target - from) * e : target);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, dur]);

  return Number.isFinite(disp) ? format(disp) : "∞";
}

function Counter({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const text = useCounter(value, format);
  return <span className={className}>{text}</span>;
}

/* ---------- shared marks ---------- */

const RATING_WORD: Record<Rating, string> = {
  excellent: "Excellent",
  good: "Good",
  average: "Average",
  poor: "Poor",
};

function RatingMark({ rating }: { rating: Rating }) {
  return (
    <span className={`v-${rating} inline-flex items-center gap-2`}>
      <span aria-hidden className="h-1.5 w-1.5 bg-current" />
      <span className="annot">{RATING_WORD[rating]}</span>
    </span>
  );
}

/* chart series tones, tuned for the smoked panel */
const SEG = [
  "#b5a183",
  "#8f8a80",
  "#d8cfbf",
  "#a89478",
  "#6e6a62",
  "#c9c0af",
  "#7d7466",
];

/* ---------- charts ---------- */

function AllocationBar({
  title,
  slices,
}: {
  title: string;
  slices: { label: string; amount: number }[];
}) {
  const total = slices.reduce((a, s) => a + Math.max(s.amount, 0), 0) || 1;
  return (
    <div>
      <p className="annot text-[var(--stone-dark)]">{title}</p>
      <div className="mt-4 flex h-9 w-full gap-px" role="img" aria-label={title}>
        {slices.map((s, i) => (
          <div
            key={s.label}
            className="min-w-0"
            style={{
              flexGrow: Math.max(s.amount, 0) / total,
              flexBasis: 0,
              background: SEG[i % SEG.length],
              transition: "flex-grow 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-1.5">
        {slices.map((s, i) => (
          <li key={s.label} className="flex items-baseline gap-2.5 text-sm">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 self-center"
              style={{ background: SEG[i % SEG.length] }}
            />
            <span className="text-[var(--stone-dark)]">{s.label}</span>
            <span className="ml-auto font-mono tabular-nums">
              {fmtMoney(s.amount)}
            </span>
            <span className="w-12 text-right font-mono text-xs tabular-nums text-[var(--stone-dark)]">
              {((Math.max(s.amount, 0) / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const GAUGE_MAX = 40;
const GAUGE_R = 78;
const GAUGE_LEN = Math.PI * GAUGE_R;

function Gauge({
  value,
  label,
  rating,
  format,
}: {
  value: number;
  label: string;
  rating: Rating;
  format: (n: number) => string;
}) {
  const clamped = Math.min(Math.max(Number.isFinite(value) ? value : GAUGE_MAX, 0), GAUGE_MAX);
  const frac = clamped / GAUGE_MAX;
  const angle = -180 + frac * 180;
  const text = useCounter(Number.isFinite(value) ? value : NaN, format);
  const ticks = [0, 10, 20, 30, 40];

  return (
    <div>
      <p className="annot text-[var(--stone-dark)]">{label}</p>
      <div className="relative mx-auto mt-2 max-w-[17rem]">
        <svg viewBox="0 0 200 112" className="w-full">
          {/* dial */}
          <path
            d={`M ${100 - GAUGE_R} 100 A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${100 + GAUGE_R} 100`}
            fill="none"
            stroke="rgba(242,239,232,0.16)"
            strokeWidth="2"
          />
          {/* reading */}
          <path
            d={`M ${100 - GAUGE_R} 100 A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${100 + GAUGE_R} 100`}
            fill="none"
            className={`v-${rating}`}
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={GAUGE_LEN}
            strokeDashoffset={GAUGE_LEN * (1 - frac)}
            style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
          {/* graduations */}
          {ticks.map((t) => {
            const a = (Math.PI * t) / GAUGE_MAX;
            const x = 100 - Math.cos(a) * (GAUGE_R + 8);
            const y = 100 - Math.sin(a) * (GAUGE_R + 8);
            const x2 = 100 - Math.cos(a) * (GAUGE_R + 3);
            const y2 = 100 - Math.sin(a) * (GAUGE_R + 3);
            return (
              <g key={t}>
                <line
                  x1={x2}
                  y1={y2}
                  x2={x}
                  y2={y}
                  stroke="rgba(242,239,232,0.35)"
                  strokeWidth="1"
                />
                <text
                  x={100 - Math.cos(a) * (GAUGE_R + 17)}
                  y={100 - Math.sin(a) * (GAUGE_R + 17) + 2.5}
                  textAnchor="middle"
                  className="fill-[var(--stone-dark)] font-mono"
                  fontSize="7"
                >
                  {t === GAUGE_MAX ? `${t}+` : t}
                </text>
              </g>
            );
          })}
          {/* needle */}
          <g
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "100px 100px",
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <line
              x1="100"
              y1="100"
              x2={100 + GAUGE_R - 14}
              y2="100"
              stroke="var(--bronze-bright)"
              strokeWidth="1.5"
            />
          </g>
          <circle cx="100" cy="100" r="3" fill="var(--bronze-bright)" />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-1 text-center">
          <span className="font-mono text-3xl tabular-nums">{text}</span>
        </div>
      </div>
      <p className="mt-3 text-center">
        <RatingMark rating={rating} />
      </p>
    </div>
  );
}

function LedgerRow({
  label,
  amount,
  tone,
  scale,
  start = 0,
  strong,
}: {
  label: string;
  amount: number;
  tone: string;
  scale: number;
  start?: number;
  strong?: boolean;
}) {
  const dim = strong ? "" : "text-[var(--stone-dark)]";
  return (
    <li className="grid grid-cols-[6.5rem_1fr_5.5rem] items-center gap-3 md:grid-cols-[8rem_1fr_6rem]">
      <span className={`truncate text-sm ${dim}`}>{label}</span>
      <span className="relative h-2 overflow-clip">
        <span
          className="absolute inset-y-0"
          style={{
            left: `${Math.min(Math.max(start, 0) / scale, 1) * 100}%`,
            width: `${Math.min(Math.abs(amount) / scale, 1) * 100}%`,
            background: tone,
            transition:
              "left 0.55s cubic-bezier(0.22, 1, 0.36, 1), width 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </span>
      <Counter
        value={amount}
        format={fmtMoney}
        className={`text-right font-mono text-sm tabular-nums ${dim}`}
      />
    </li>
  );
}

function CashflowLedger({
  incomeLabel,
  income,
  costs,
}: {
  incomeLabel: string;
  income: number;
  costs: { label: string; amount: number }[];
}) {
  const net = income - costs.reduce((a, c) => a + c.amount, 0);
  const scale = Math.max(income, 1);

  return (
    <div>
      <p className="annot text-[var(--stone-dark)]">Monthly cash flow</p>
      <ul className="mt-4 space-y-2.5">
        <LedgerRow label={incomeLabel} amount={income} tone="#b5a183" scale={scale} strong />
        {costs.map((c) => (
          <LedgerRow key={c.label} label={c.label} amount={c.amount} tone="#6e6a62" scale={scale} />
        ))}
      </ul>
      <div className="mt-3 border-t pt-3 hairline">
        <ul>
          <LedgerRow
            label="Net cash flow"
            amount={net}
            tone={net >= 0 ? "#a9bd8e" : "#d69a83"}
            scale={scale}
            strong
          />
        </ul>
      </div>
    </div>
  );
}

function Waterfall({
  title,
  steps,
}: {
  title: string;
  steps: { label: string; amount: number }[];
}) {
  /* floating-bar waterfall: intermediate steps accumulate, the last row is
     the settled total drawn from zero */
  const { rows, scale } = useMemo(() => {
    type Acc = {
      run: number;
      peak: number;
      built: { label: string; amount: number; start: number; last: boolean }[];
    };
    const acc = steps.reduce<Acc>(
      (st, s, i) => {
        const last = i === steps.length - 1;
        const start = last
          ? Math.min(0, s.amount)
          : s.amount >= 0
            ? st.run
            : st.run + s.amount;
        const run = last ? st.run : st.run + s.amount;
        return {
          run,
          peak: Math.max(st.peak, start + Math.abs(s.amount), run),
          built: [...st.built, { ...s, start, last }],
        };
      },
      { run: 0, peak: 0, built: [] },
    );
    return { rows: acc.built, scale: Math.max(acc.peak, 1) };
  }, [steps]);

  return (
    <div>
      <p className="annot text-[var(--stone-dark)]">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {rows.map((r) => (
          <LedgerRow
            key={r.label}
            label={r.label}
            amount={r.amount}
            start={r.start}
            scale={scale}
            strong={r.last}
            tone={
              r.last
                ? r.amount >= 0
                  ? "#a9bd8e"
                  : "#d69a83"
                : r.amount >= 0
                  ? "#b5a183"
                  : "#6e6a62"
            }
          />
        ))}
      </ul>
    </div>
  );
}

/* ---------- the desk ---------- */

const VERDICT_LINE: Record<string, string> = {
  "strong deal": "We would buy this.",
  "solid deal": "We would take a hard look.",
  "marginal deal": "We would negotiate harder.",
  "walk away": "We would walk away.",
};

export default function DealAnalyzer() {
  const [active, setActive] = useState<StrategyId>("brrr");
  /* each strategy keeps its own ledger, so switching never loses figures */
  const [ledgers, setLedgers] = useState<
    Partial<Record<StrategyId, Record<string, string>>>
  >({});

  const strategy = strategyById(active);
  const ledger = useMemo(
    () =>
      ledgers[active] ??
      Object.fromEntries(strategy.fields.map((f) => [f.id, String(f.default)])),
    [ledgers, active, strategy],
  );

  const values = useMemo(
    () =>
      Object.fromEntries(
        strategy.fields.map((f) => {
          const n = Number((ledger[f.id] ?? "").replace(/,/g, ""));
          return [f.id, Number.isFinite(n) ? n : 0];
        }),
      ),
    [strategy, ledger],
  );

  const analysis: Analysis = useMemo(
    () => strategy.compute(values),
    [strategy, values],
  );

  const setField = (id: string, raw: string) =>
    setLedgers((prev) => ({
      ...prev,
      [active]: { ...ledger, [id]: raw },
    }));

  const groups = useMemo(() => {
    const map = new Map<string, typeof strategy.fields>();
    for (const f of strategy.fields) {
      map.set(f.group, [...(map.get(f.group) ?? []), f]);
    }
    return [...map.entries()];
  }, [strategy]);

  return (
    <div>
      {/* ---- strategy tiles ---- */}
      <div
        role="radiogroup"
        aria-label="Investment strategy"
        className="grid grid-cols-2 gap-px border bg-[var(--line)] hairline md:grid-cols-3"
      >
        {STRATEGIES.map((s) => {
          const selected = s.id === active;
          return (
            <button
              key={s.id}
              role="radio"
              aria-checked={selected}
              onClick={() => setActive(s.id)}
              className={`group p-5 text-left transition-colors duration-300 md:p-8 ${
                selected
                  ? "on-stone"
                  : "bg-[var(--plaster)] hover:bg-[var(--limestone)]"
              }`}
            >
              <span
                className={`annot ${selected ? "text-[var(--bronze-bright)]" : "muted group-hover:text-[var(--bronze)]"}`}
              >
                {s.code}
              </span>
              <span className="display mt-2 block text-xl md:text-[1.6rem]">
                {s.name}
              </span>
              <span
                className={`mt-2 hidden text-sm leading-snug md:block ${selected ? "text-[var(--stone-dark)]" : "muted"}`}
              >
                {s.tagline}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---- the appraisal ---- */}
      <div
        key={active}
        className="desk-enter mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8"
      >
        {/* ledger of inputs */}
        <aside className="self-start lg:sticky lg:top-24 lg:col-span-5 xl:col-span-4">
          <div className="m-paper border p-6 hairline md:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="display text-2xl">The figures</h2>
              <span className="annot muted">{strategy.code}</span>
            </div>
            {groups.map(([group, fields]) => (
              <fieldset key={group} className="mt-7 first-of-type:mt-6">
                <legend className="annot muted">{group}</legend>
                <div className="mt-1.5">
                  {fields.map((f) => (
                    <label
                      key={f.id}
                      className="flex items-baseline justify-between gap-6 py-1.5"
                    >
                      <span className="text-[0.9375rem]">
                        {f.label}
                        {f.note && (
                          <span className="annot ml-2 normal-case tracking-normal muted">
                            {f.note}
                          </span>
                        )}
                      </span>
                      <span className="flex w-32 shrink-0 items-baseline gap-1.5">
                        {f.unit === "£" && (
                          <span className="font-mono text-sm muted">£</span>
                        )}
                        <input
                          type="number"
                          inputMode="decimal"
                          step={f.step ?? "any"}
                          value={ledger[f.id] ?? ""}
                          onChange={(e) => setField(f.id, e.target.value)}
                          /* a wheel over a focused number input silently
                             changes the figure while the page scrolls */
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          className="ledger-input"
                          aria-label={`${f.label}${f.note ? ` (${f.note})` : ""}`}
                        />
                        {f.unit === "%" && (
                          <span className="font-mono text-sm muted">%</span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <p className="annot mt-8 border-t pt-4 hairline muted">
              Recalculates as you type
            </p>
          </div>
        </aside>

        {/* instrument panel */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="on-stone shadow-daylight">
            {/* KPI cells */}
            <div className="grid grid-cols-2 gap-px bg-[rgba(242,239,232,0.14)] p-px lg:grid-cols-3">
              {analysis.kpis.map((k) => (
                <div key={k.id} className="bg-[var(--smoked)] p-5 md:p-6">
                  <p className="annot text-[var(--stone-dark)]">{k.label}</p>
                  <p className="mt-3 font-mono text-[1.375rem] tabular-nums md:text-2xl">
                    {Number.isFinite(k.raw) && k.kind !== "plain" ? (
                      <Counter
                        value={k.raw}
                        format={
                          k.kind === "money"
                            ? fmtMoney
                            : k.kind === "pct"
                              ? fmtPct
                              : (n) => `${n.toFixed(1)} mo`
                        }
                      />
                    ) : (
                      k.value
                    )}
                  </p>
                  <p className="mt-2 min-h-4">
                    {k.rating ? (
                      <RatingMark rating={k.rating} />
                    ) : (
                      k.note && (
                        <span className="annot text-[var(--stone-dark)]">
                          {k.note}
                        </span>
                      )
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* instruments */}
            <div className="grid gap-px border-t bg-[rgba(242,239,232,0.14)] hairline md:grid-cols-2">
              <div className="bg-[var(--smoked)] p-6 md:p-8">
                <Gauge
                  value={analysis.gaugeValue}
                  label={analysis.gaugeLabel}
                  rating={analysis.gaugeRating}
                  format={fmtPct}
                />
              </div>
              <div className="bg-[var(--smoked)] p-6 md:p-8">
                <AllocationBar
                  title={analysis.allocationTitle}
                  slices={analysis.allocation}
                />
              </div>
              {analysis.cashflow && (
                <div className="bg-[var(--smoked)] p-6 md:col-span-2 md:p-8">
                  <CashflowLedger {...analysis.cashflow} />
                </div>
              )}
              {analysis.waterfall && analysis.waterfallTitle && (
                <div className="bg-[var(--smoked)] p-6 md:col-span-2 md:p-8">
                  <Waterfall
                    title={analysis.waterfallTitle}
                    steps={analysis.waterfall}
                  />
                </div>
              )}

              {/* the Sam & Harv Score: the deal graded the way we grade our own */}
              <div className="bg-[var(--smoked)] p-6 md:col-span-2 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="annot text-[var(--stone-dark)]">
                    The Sam &amp; Harv Score
                  </p>
                  <p className="annot text-[var(--stone-dark)]">
                    Five axes, no mercy
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-start gap-x-12 gap-y-6">
                  <div className="shrink-0">
                    <span className="font-mono text-6xl tabular-nums">
                      <Counter
                        value={analysis.score.overall}
                        format={(n) => String(Math.round(n))}
                      />
                    </span>
                    <span className="font-mono text-xl text-[var(--stone-dark)]">
                      /100
                    </span>
                  </div>
                  <ul className="min-w-64 flex-1 space-y-3">
                    {analysis.score.axes.map((a) => (
                      <li
                        key={a.label}
                        className="grid grid-cols-[8.5rem_1fr_5rem] items-center gap-3 md:grid-cols-[11rem_1fr_6rem]"
                      >
                        <span className="truncate text-sm text-[var(--stone-dark)]">
                          {a.label}
                        </span>
                        <span className="relative h-2 overflow-clip bg-[rgba(242,239,232,0.1)]">
                          <span
                            className={`absolute inset-y-0 left-0 bg-current v-${a.rating}`}
                            style={{
                              width: `${a.value}%`,
                              transition:
                                "width 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                          />
                        </span>
                        <span className={`annot text-right v-${a.rating}`}>
                          {RATING_WORD[a.rating]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* verdict */}
          <div className="m-paper mt-8 border p-7 hairline md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="annot muted">Would we buy this deal?</p>
              <span className={`annot px-2.5 py-1.5 vstamp-${analysis.verdict.rating}`}>
                {analysis.verdict.stamp}
              </span>
            </div>
            <p className="display mt-5 text-3xl md:text-4xl">
              {VERDICT_LINE[analysis.verdict.stamp]}
            </p>
            <div className="mt-5 max-w-prose space-y-4 leading-relaxed text-[0.9688rem] md:text-base">
              {analysis.verdict.paragraphs.map((p, i) => (
                <p key={i} className={i > 0 ? "muted" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <p className="annot mt-7 border-t pt-4 hairline muted">
              An appraisal of the figures you entered — not financial advice.
            </p>
          </div>

          {/* the ask */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/services" className="btn btn-ink">
              Need deals like this? Browse what we do →
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Speak to Sam & Harv →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
