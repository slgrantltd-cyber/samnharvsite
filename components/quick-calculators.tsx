"use client";

import { useState } from "react";
import { fmtMoney, fmtPct } from "@/lib/deal-engine";

/**
 * The quick instruments: four single-purpose calculators sharing the
 * Deal Intelligence design language. Full multi-strategy appraisal lives
 * in the analyzer; these answer one question each, instantly.
 */

const num = (s: string) => {
  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function Field({
  label,
  unit,
  value,
  onChange,
  note,
}: {
  label: string;
  unit: "£" | "%";
  value: string;
  onChange: (v: string) => void;
  note?: string;
}) {
  return (
    <label className="flex items-baseline justify-between gap-6 py-1.5">
      <span className="text-[0.9375rem]">
        {label}
        {note && (
          <span className="annot ml-2 normal-case tracking-normal muted">
            {note}
          </span>
        )}
      </span>
      <span className="flex w-32 shrink-0 items-baseline gap-1.5">
        {unit === "£" && <span className="font-mono text-sm muted">£</span>}
        <input
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          className="ledger-input"
          aria-label={label}
        />
        {unit === "%" && <span className="font-mono text-sm muted">%</span>}
      </span>
    </label>
  );
}

function Result({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <span className={`text-[0.9375rem] ${strong ? "" : "muted"}`}>
        {label}
      </span>
      <span
        className={`font-mono tabular-nums ${strong ? "text-xl" : "text-[0.9375rem] muted"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Card({
  title,
  tagline,
  children,
}: {
  title: string;
  tagline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="m-paper border p-6 hairline md:p-8">
      <h3 className="display text-2xl">{title}</h3>
      <p className="annot mt-1.5 muted">{tagline}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/* ---- stamp duty (England & NI residential, additional dwelling) ---- */

const SDLT_BANDS: [number, number][] = [
  [125000, 0],
  [250000, 0.02],
  [925000, 0.05],
  [1500000, 0.1],
  [Infinity, 0.12],
];

function sdlt(price: number, surchargePct: number) {
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of SDLT_BANDS) {
    const slice = Math.min(price, cap) - prev;
    if (slice <= 0) break;
    tax += slice * rate;
    prev = cap;
  }
  return tax + (price * surchargePct) / 100;
}

function StampDuty() {
  const [price, setPrice] = useState("165000");
  const [surcharge, setSurcharge] = useState("5");
  const p = num(price);
  const tax = sdlt(p, num(surcharge));
  return (
    <Card
      title="Stamp duty"
      tagline="England & NI — additional dwelling"
    >
      <Field label="Purchase price" unit="£" value={price} onChange={setPrice} />
      <Field
        label="Surcharge"
        unit="%"
        note="additional property"
        value={surcharge}
        onChange={setSurcharge}
      />
      <div className="mt-4 border-t pt-2 hairline">
        <Result label="Stamp duty" value={fmtMoney(tax)} strong />
        <Result
          label="Effective rate"
          value={p > 0 ? fmtPct((tax / p) * 100) : "—"}
        />
      </div>
      <p className="annot mt-4 muted">
        Rates change at Budgets — verify before exchange. Scotland and Wales
        tax differently.
      </p>
    </Card>
  );
}

/* ---- rental yield ---- */

function RentalYield() {
  const [price, setPrice] = useState("165000");
  const [rent, setRent] = useState("1250");
  const [costs, setCosts] = useState("250");
  const p = num(price);
  const annual = num(rent) * 12;
  const netAnnual = (num(rent) - num(costs)) * 12;
  return (
    <Card title="Rental yield" tagline="Gross and net, instantly">
      <Field label="Purchase price" unit="£" value={price} onChange={setPrice} />
      <Field
        label="Monthly rent"
        unit="£"
        value={rent}
        onChange={setRent}
      />
      <Field
        label="Monthly costs"
        unit="£"
        note="ex-mortgage"
        value={costs}
        onChange={setCosts}
      />
      <div className="mt-4 border-t pt-2 hairline">
        <Result
          label="Gross yield"
          value={p > 0 ? fmtPct((annual / p) * 100) : "—"}
          strong
        />
        <Result
          label="Net yield"
          value={p > 0 ? fmtPct((netAnnual / p) * 100) : "—"}
        />
        <Result label="Annual rent" value={fmtMoney(annual)} />
      </div>
    </Card>
  );
}

/* ---- mortgage stress test ---- */

function StressTest() {
  const [rent, setRent] = useState("1250");
  const [rate, setRate] = useState("7.5");
  const [icr, setIcr] = useState("145");
  const [loan, setLoan] = useState("123750");
  const maxLoan =
    num(rate) > 0 && num(icr) > 0
      ? (num(rent) * 12) / ((num(rate) / 100) * (num(icr) / 100))
      : 0;
  const actualIcr =
    num(loan) > 0 && num(rate) > 0
      ? ((num(rent) * 12) / (num(loan) * (num(rate) / 100))) * 100
      : 0;
  const passes = actualIcr >= num(icr);
  return (
    <Card
      title="Mortgage stress test"
      tagline="What the rent will actually borrow"
    >
      <Field label="Monthly rent" unit="£" value={rent} onChange={setRent} />
      <Field
        label="Stress rate"
        unit="%"
        note="pay rate + 2 typical"
        value={rate}
        onChange={setRate}
      />
      <Field
        label="Required ICR"
        unit="%"
        note="125 personal / 145 co."
        value={icr}
        onChange={setIcr}
      />
      <Field label="Loan wanted" unit="£" value={loan} onChange={setLoan} />
      <div className="mt-4 border-t pt-2 hairline">
        <Result label="Max supportable loan" value={fmtMoney(maxLoan)} strong />
        <Result label="ICR on your loan" value={fmtPct(actualIcr)} />
        <div className="flex items-baseline justify-between gap-4 py-2">
          <span className="text-[0.9375rem] muted">Verdict</span>
          <span className={`annot ${passes ? "v-excellent" : "v-poor"}`}>
            {passes ? "Passes" : "Falls short"}
          </span>
        </div>
      </div>
    </Card>
  );
}

/* ---- development margin ---- */

function DevMargin() {
  const [gdv, setGdv] = useState("245000");
  const [purchase, setPurchase] = useState("160000");
  const [works, setWorks] = useState("35000");
  const [fees, setFees] = useState("20000");
  const total = num(purchase) + num(works) + num(fees);
  const profit = num(gdv) - total;
  const onCost = total > 0 ? (profit / total) * 100 : 0;
  const onGdv = num(gdv) > 0 ? (profit / num(gdv)) * 100 : 0;
  return (
    <Card
      title="Development margin"
      tagline="The 20% bar, checked in seconds"
    >
      <Field label="GDV / sale price" unit="£" value={gdv} onChange={setGdv} />
      <Field
        label="Purchase"
        unit="£"
        value={purchase}
        onChange={setPurchase}
      />
      <Field label="Works" unit="£" value={works} onChange={setWorks} />
      <Field
        label="Fees & finance"
        unit="£"
        note="all other costs"
        value={fees}
        onChange={setFees}
      />
      <div className="mt-4 border-t pt-2 hairline">
        <Result label="Profit" value={fmtMoney(profit)} strong />
        <Result label="Margin on cost" value={fmtPct(onCost)} />
        <Result label="Margin on GDV" value={fmtPct(onGdv)} />
        <div className="flex items-baseline justify-between gap-4 py-2">
          <span className="text-[0.9375rem] muted">Reading</span>
          <span
            className={`annot ${onCost >= 20 ? "v-excellent" : onCost >= 12 ? "v-good" : onCost >= 8 ? "v-average" : "v-poor"}`}
          >
            {onCost >= 20
              ? "Developer's margin"
              : onCost >= 12
                ? "Workable"
                : onCost >= 8
                  ? "Thin"
                  : "Walk away"}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default function QuickCalculators() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <StampDuty />
      <RentalYield />
      <StressTest />
      <DevMargin />
    </div>
  );
}
