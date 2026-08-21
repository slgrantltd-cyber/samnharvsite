"use client";

import { useEffect, useState } from "react";
import { UNITS, type DubaiUnit } from "@/lib/dubai-units";

const TONE: Record<DubaiUnit["tone"], string> = { income: "Income-led", balanced: "Balanced", growth: "Growth-led" };

/** The product, seen: developer renders, price from, plan, handover — and an Enquire on every one. */
export default function UnitsGallery() {
  const [active, setActive] = useState<DubaiUnit | null>(null);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2 lg:grid-cols-4">
        {UNITS.map((u) => (
          <article key={u.slug} className="group glow-gold z-0 flex flex-col bg-[var(--plaster)] hover:z-10">
            <div className="relative aspect-[3/2] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.image} alt={`${u.name} by ${u.developer} — developer render`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
              <p className="annot absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[var(--plaster)] backdrop-blur-[2px]">{u.developer}</p>
              <p className="annot absolute bottom-4 left-4 text-[var(--plaster)]/85">{TONE[u.tone]}</p>
            </div>
            <div className="relative flex flex-1 flex-col p-5">
              <h3 className="display text-xl leading-tight">{u.name}</h3>
              <p className="annot mt-1 muted">{u.area}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div><dt className="annot muted">From</dt><dd className="mt-0.5 font-medium">{u.priceFrom}{u.priceNote && <span className="muted"> · {u.priceNote}</span>}</dd></div>
                <div><dt className="annot muted">Handover</dt><dd className={`mt-0.5 font-medium ${u.handover === "On enquiry" ? "muted" : ""}`}>{u.handover}</dd></div>
                <div><dt className="annot muted">Units</dt><dd className="mt-0.5">{u.beds}</dd></div>
                <div><dt className="annot muted">Type</dt><dd className="mt-0.5">{u.type}</dd></div>
                <div className="col-span-2"><dt className="annot muted">Payment plan</dt><dd className="mt-0.5">{u.plan}</dd></div>
              </dl>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <button type="button" onClick={() => setActive(u)} className="btn btn-ink">Enquire</button>
                <a href={`https://wa.me/447444551241?text=${encodeURIComponent(`Dubai — ${u.name} (${u.developer}): I'd like the current price sheet`)}`} target="_blank" rel="noopener noreferrer" className="annot text-bronze hover:text-ink">WhatsApp →</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="annot mt-5 max-w-3xl leading-relaxed muted">
        Prices, unit mix, payment plans and completion dates as published by each developer, 21 Aug 2026; sterling at the developer&rsquo;s own conversion where given. Launch pricing moves weekly — we confirm the current sheet on every enquiry. Renders are the developer&rsquo;s.
      </p>

      {active && <EnquiryDrawer unit={active} onClose={() => setActive(null)} />}
    </>
  );
}

function EnquiryDrawer({ unit, onClose }: { unit: DubaiUnit; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"), email: f.get("email"), phone: f.get("phone"),
        subject: `DUBAI ENQUIRY — ${unit.name} (${unit.developer}) · ${f.get("name")}`,
        message: `DUBAI UNIT ENQUIRY\nUnit: ${unit.name} — ${unit.developer}, ${unit.area}\nFrom: ${unit.priceFrom} · ${unit.beds} · Handover ${unit.handover}\nBudget: ${f.get("budget")}\nBuying as: ${f.get("entity")}\nPhone: ${f.get("phone")}\n\n${f.get("note") || ""}`,
        tag: "dubai-unit",
      }),
    }).then((r) => (r.ok ? setState("done") : setState("error"))).catch(() => setState("error"));
  };
  const field = "mt-2 w-full border-b hairline bg-transparent py-2 text-[0.9375rem] outline-none focus:border-ink";
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="enq-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-2xl overflow-hidden bg-[var(--plaster)] shadow-daylight md:border md:hairline">
        <div className="relative h-40 md:h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={unit.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-6 text-[var(--plaster)]">
            <p className="annot text-[var(--bronze-bright)]">{unit.developer} · {unit.area}</p>
            <h3 id="enq-title" className="display mt-1 text-2xl md:text-3xl">{unit.name}</h3>
          </div>
          <button type="button" onClick={onClose} className="annot absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[var(--plaster)]">Close</button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6 md:p-8" data-lenis-prevent>
          <p className="text-sm leading-relaxed muted">From <b className="text-ink">{unit.priceFrom}</b> · {unit.beds} · {unit.plan} · Handover <b className="text-ink">{unit.handover}</b></p>
          {state === "done" ? (
            <div className="mt-6 border hairline p-6">
              <p className="annot text-bronze">Received</p>
              <p className="display mt-2 text-2xl">We&rsquo;ll send the current sheet for {unit.name}.</p>
              <p className="muted mt-2 text-sm">Usually the same day, with our view on the unit. Identity and proof of funds before particulars — always.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block"><span className="annot muted">Name</span><input name="name" required autoComplete="name" className={field} /></label>
              <label className="block"><span className="annot muted">Email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
              <label className="block"><span className="annot muted">Phone / WhatsApp</span><input name="phone" autoComplete="tel" className={field} /></label>
              <label className="block"><span className="annot muted">Budget</span>
                <select name="budget" className={field}><option>£200k – £400k</option><option>£400k – £750k</option><option>£750k – £1.5m</option><option>£1.5m +</option></select></label>
              <label className="block"><span className="annot muted">Buying as</span>
                <select name="entity" className={field}><option>Individual</option><option>Company</option><option>Family office / fund</option></select></label>
              <label className="block md:col-span-2"><span className="annot muted">Anything specific — floor, view, unit size, timing (optional)</span><input name="note" className={field} /></label>
              <div className="flex flex-wrap items-center gap-5 md:col-span-2">
                <button type="submit" disabled={state === "sending"} className="btn btn-ink">{state === "sending" ? "Sending…" : `Send enquiry — ${unit.name}`}</button>
                <a href={`https://wa.me/447444551241?text=${encodeURIComponent(`Dubai — ${unit.name} (${unit.developer}): I'd like the current price sheet`)}`} target="_blank" rel="noopener noreferrer" className="annot text-bronze hover:text-ink">or WhatsApp Samuel →</a>
                {state === "error" && <p className="annot text-bronze">Something went wrong — WhatsApp 07444 551241</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
