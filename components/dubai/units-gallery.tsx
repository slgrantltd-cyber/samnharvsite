"use client";

import { useEffect, useRef, useState } from "react";
import { COLLECTIONS, PLANS_NOTE, UNITS, type DubaiUnit, type MixRow } from "@/lib/dubai-units";

const TONE: Record<DubaiUnit["tone"], string> = { income: "Income-led", balanced: "Balanced", growth: "Growth-led", trophy: "Trophy asset" };
const WA = (text: string) => `https://wa.me/447444551241?text=${encodeURIComponent(text)}`;
const waEnquiry = (u: DubaiUnit, type?: string) =>
  WA(`Hi Samuel — ${u.name} (${u.developer}, ${u.area}, ${u.city})${type ? ` · ${type}` : ""}. Could you send me the current price sheet and payment plan? From ${u.priceFrom}, handover ${u.handover}.`);
const AV_STYLE: Record<string, string> = { "Limited stock": "bg-[#1a1a1a] text-[#ead8ab]", "Selling fast": "bg-[#8a6a35] text-[var(--plaster)]", "Final units": "bg-[#6b1f1f] text-[var(--plaster)]", "New release": "bg-[var(--plaster)] text-ink" };

/**
 * The collection — branded, Abu Dhabi, Dubai launches. Desktop: grids.
 * Phone: each collection is a swipe rail of full-width cards. Every card
 * opens a detail sheet (gallery, facts, unit-by-unit table with an Enquire
 * on every row, floor plans, virtual tour) and has its own Enquire.
 */
export default function UnitsGallery() {
  const [active, setActive] = useState<{ unit: DubaiUnit; type?: string; mode: "view" | "enquire" } | null>(null);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [active]);

  return (
    <>
      <p className="annot mb-2 inline-flex items-center gap-2 rounded-full border border-[#c9ab7c]/60 px-3 py-1.5 text-[#8a6a35]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9ab7c]" aria-hidden="true" /> Exclusive payment plans available
      </p>
      <p className="muted mb-2 max-w-2xl text-sm leading-relaxed">{PLANS_NOTE}</p>
      {COLLECTIONS.map((c) => {
        const items = UNITS.filter((u) => u.collection === c.key);
        return (
          <section key={c.key} id={`collection-${c.key}`} className="mt-14 first:mt-0">
            <p className="annot text-bronze">{c.label}</p>
            <h3 className="display mt-2 text-2xl md:text-3xl">{c.title}</h3>
            <p className="muted mt-2 max-w-2xl text-[0.9375rem] leading-relaxed">{c.body}</p>
            {/* phone: swipe rail · desktop: grid */}
            <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:gap-px md:overflow-visible md:border md:bg-[var(--line)] md:hairline md:px-0 md:pb-0 md:grid-cols-2 lg:grid-cols-4">
              {items.map((u) => (
                <article key={u.slug} className="group glow-gold z-0 flex w-[84vw] max-w-[22rem] shrink-0 snap-start flex-col border hairline bg-[var(--plaster)] hover:z-10 md:w-auto md:max-w-none md:border-0">
                  <button type="button" onClick={() => setActive({ unit: u, mode: "view" })} className="relative block aspect-[3/2] w-full overflow-hidden text-left" aria-label={`View ${u.name}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u.image} alt={`${u.name} — developer render`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                    <p className="annot absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[var(--plaster)] backdrop-blur-[2px]">{u.brand ? `${u.brand} · ${u.developer}` : u.developer}</p>
                    <p className="annot absolute bottom-4 left-4 text-[var(--plaster)]/85">{TONE[u.tone]}</p>
                    {u.availability && <p className={`annot absolute right-4 top-4 rounded-full px-3 py-1 ${AV_STYLE[u.availability]}`}>{u.availability}</p>}
                    <span className="annot absolute bottom-4 right-4 text-[var(--bronze-bright)] opacity-0 transition-opacity group-hover:opacity-100">View →</span>
                  </button>
                  <div className="relative flex flex-1 flex-col p-5">
                    <h4 className="display text-xl leading-tight">{u.name}</h4>
                    <p className="annot mt-1 muted">{u.area} · {u.city}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div><dt className="annot muted">From</dt><dd className="mt-0.5 font-medium">{u.priceFrom}</dd></div>
                      <div><dt className="annot muted">Handover</dt><dd className={`mt-0.5 font-medium ${u.handover === "On enquiry" ? "muted" : ""}`}>{u.handover}</dd></div>
                      <div><dt className="annot muted">Units</dt><dd className="mt-0.5">{u.beds}</dd></div>
                      <div><dt className="annot muted">Plan</dt><dd className="mt-0.5 truncate" title={u.plan}>{u.plan.replace("Developer payment plan", "Developer plan")}</dd></div>
                    </dl>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <a href={waEnquiry(u)} target="_blank" rel="noopener noreferrer" className="btn btn-ink">Enquire</a>
                      <button type="button" onClick={() => setActive({ unit: u, mode: "view" })} className="annot text-bronze hover:text-ink">Units &amp; plans →</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      <p className="annot mt-8 max-w-3xl leading-relaxed muted">
        Prices, unit mix, sizes, payment plans and completion dates as published by each developer on 21 Aug 2026; sterling at the developer&rsquo;s own conversion where given. Launch pricing moves weekly — every enquiry gets the current sheet. Renders are the developers&rsquo;.
      </p>

      {active && <UnitSheet unit={active.unit} initialType={active.type} initialMode={active.mode} onClose={() => setActive(null)} />}
    </>
  );
}

function UnitSheet({ unit, initialType, initialMode, onClose }: { unit: DubaiUnit; initialType?: string; initialMode: "view" | "enquire"; onClose: () => void }) {
  const [mode, setMode] = useState<"view" | "enquire">(initialMode);
  const [type, setType] = useState<string | undefined>(initialType);
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);
  const gallery = unit.gallery.length ? unit.gallery : [unit.image];
  const enquire = (t?: string) => { setType(t); setMode("enquire"); setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"), email: f.get("email"), phone: f.get("phone"),
        subject: `UAE ENQUIRY — ${unit.name}${type ? ` · ${type}` : ""} · ${f.get("name")}`,
        message: `UAE UNIT ENQUIRY\nProject: ${unit.name} — ${unit.developer}, ${unit.area}, ${unit.city}\nUnit type: ${type || "Any"}\nFrom: ${unit.priceFrom} · ${unit.beds} · Handover ${unit.handover}\nBudget: ${f.get("budget")}\nBuying as: ${f.get("entity")}\nPhone: ${f.get("phone")}\n\n${f.get("note") || ""}`,
        tag: "dubai-unit",
      }),
    }).then((r) => (r.ok ? setState("done") : setState("error"))).catch(() => setState("error"));
    // and straight to Samuel's WhatsApp with the same detail
    window.open(WA(`Hi Samuel — ${f.get("name")} here. ${unit.name} (${unit.developer}, ${unit.city})${type ? ` · ${type}` : ""}. Budget ${f.get("budget")}, buying as ${f.get("entity")}. ${f.get("note") || ""}`), "_blank", "noopener");
  };
  const field = "mt-2 w-full border-b hairline bg-transparent py-2 text-[0.9375rem] outline-none focus:border-ink";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden bg-[var(--plaster)] shadow-daylight md:max-h-[90vh] md:border md:hairline" data-lenis-prevent>
        {/* gallery */}
        <div className="relative aspect-[16/9] max-h-[46vh] w-full shrink-0 bg-black md:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={gallery[idx]} src={gallery[idx]} alt={`${unit.name} — render ${idx + 1}`} className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-[var(--plaster)] md:left-8 md:right-8">
            <div>
              <p className="annot text-[var(--bronze-bright)]">{unit.brand ? `${unit.brand} · ${unit.developer}` : unit.developer} · {unit.area}, {unit.city}</p>
              <h3 id="sheet-title" className="display mt-1 text-2xl md:text-4xl">{unit.name}</h3>
              {unit.availability && <p className={`annot mt-2 inline-block rounded-full px-3 py-1 ${AV_STYLE[unit.availability]}`}>{unit.availability}</p>}
            </div>
            {gallery.length > 1 && (
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setIdx((i) => (i - 1 + gallery.length) % gallery.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--plaster)]/40 bg-black/30 text-[var(--plaster)] backdrop-blur-[2px] transition-colors hover:border-[var(--bronze-bright)] hover:text-[var(--bronze-bright)]" aria-label="Previous image">←</button>
                <span className="annot text-[var(--plaster)]/75">{idx + 1} / {gallery.length}</span>
                <button type="button" onClick={() => setIdx((i) => (i + 1) % gallery.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--plaster)]/40 bg-black/30 text-[var(--plaster)] backdrop-blur-[2px] transition-colors hover:border-[var(--bronze-bright)] hover:text-[var(--bronze-bright)]" aria-label="Next image">→</button>
              </div>
            )}
          </div>
          <button type="button" onClick={onClose} className="annot absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-[var(--plaster)] backdrop-blur-[2px]">Close</button>
        </div>
        {gallery.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto bg-black px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((g, i) => (
              <button key={g} type="button" onClick={() => setIdx(i)} className={`h-12 w-20 shrink-0 overflow-hidden border ${i === idx ? "border-[var(--bronze-bright)]" : "border-transparent opacity-60"}`} aria-label={`Image ${i + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="overflow-y-auto p-5 md:p-8">
          <p className="max-w-2xl leading-relaxed">{unit.line}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-4">
            <div><dt className="annot muted">From</dt><dd className="mt-0.5 font-medium">{unit.priceFrom}{unit.priceNote && <span className="muted"> · {unit.priceNote}</span>}</dd></div>
            <div><dt className="annot muted">Handover</dt><dd className="mt-0.5 font-medium">{unit.handover}</dd></div>
            <div><dt className="annot muted">Payment plan</dt><dd className="mt-0.5">{unit.plan}</dd></div>
            <div><dt className="annot muted">Type</dt><dd className="mt-0.5">{unit.type}</dd></div>
          </dl>

          {/* unit-by-unit table — Enquire on every row */}
          <div className="mt-8">
            <p className="annot text-bronze">Units</p>
            <ul className="mt-3 border-t hairline">
              {unit.mix.map((m: MixRow) => (
                <li key={m.type} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b hairline py-3 md:grid-cols-[10rem_1fr_1fr_auto]">
                  <span className="display text-lg">{m.type}</span>
                  <span className="hidden text-sm md:block">{m.from || <span className="muted">Price on enquiry</span>}</span>
                  <span className="hidden text-sm muted md:block">{m.size || m.note || ""}</span>
                  <div className="flex items-center gap-3">
                    <a href={waEnquiry(unit, m.type)} target="_blank" rel="noopener noreferrer" className="btn btn-ink px-4 py-2 text-sm">Enquire</a>
                  </div>
                  <span className="col-span-2 -mt-1 text-sm muted md:hidden">{m.from || "Price on enquiry"}{(m.size || m.note) ? ` · ${m.size || m.note}` : ""}</span>
                </li>
              ))}
            </ul>
          </div>

          {unit.plans && (
            <div className="mt-8">
              <p className="annot text-bronze">Floor plans</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {unit.plans.map((p) => (
                  <a key={p.label} href={p.image} target="_blank" rel="noopener noreferrer" className="group/plan block border hairline bg-white p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={`${unit.name} ${p.label} floor plan`} loading="lazy" className="aspect-square w-full object-contain" />
                    <span className="annot mt-2 block text-center muted group-hover/plan:text-bronze">{p.label} plan ↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {unit.tour && <a href={unit.tour} target="_blank" rel="noopener noreferrer" className="annot text-bronze hover:text-ink">Virtual tour ↗</a>}
            <a href={WA(`${unit.city} — ${unit.name} (${unit.developer})${type ? `, ${type}` : ""}: I'd like the current price sheet`)} target="_blank" rel="noopener noreferrer" className="annot text-bronze hover:text-ink">WhatsApp Samuel about this →</a>
            <span className="annot muted">Source: {unit.source}</span>
          </div>

          {/* enquiry */}
          <div ref={formRef} className="mt-8 border-t hairline pt-8">
            <p className="annot text-bronze">Enquire{type ? ` — ${type}` : ""}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <a href={waEnquiry(unit, type)} target="_blank" rel="noopener noreferrer" className="btn btn-ink">Enquire on WhatsApp</a>
              {unit.availability && <span className={`annot rounded-full px-3 py-1 ${AV_STYLE[unit.availability]}`}>{unit.availability}</span>}
              <span className="annot muted">Exclusive payment plans on request</span>
            </div>
            {mode === "view" && (
              <button type="button" onClick={() => enquire(undefined)} className="annot mt-4 text-bronze hover:text-ink">Prefer email? Send a written enquiry →</button>
            )}
            {mode === "enquire" && (state === "done" ? (
              <div className="mt-4 border hairline p-6">
                <p className="display text-2xl">Received — we&rsquo;ll send the current sheet for {unit.name}{type ? `, ${type}` : ""}.</p>
                <p className="muted mt-2 text-sm">Usually the same day, with our view on it. Identity and proof of funds before particulars — always.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block"><span className="annot muted">Name</span><input name="name" required autoComplete="name" className={field} /></label>
                <label className="block"><span className="annot muted">Email</span><input name="email" type="email" required autoComplete="email" className={field} /></label>
                <label className="block"><span className="annot muted">Phone / WhatsApp</span><input name="phone" autoComplete="tel" className={field} /></label>
                <label className="block"><span className="annot muted">Unit type</span>
                  <select name="type" value={type || ""} onChange={(e) => setType(e.target.value || undefined)} className={field}><option value="">Any</option>{unit.mix.map((m) => <option key={m.type}>{m.type}</option>)}</select></label>
                <label className="block"><span className="annot muted">Budget</span>
                  <select name="budget" className={field}><option>£150k – £400k</option><option>£400k – £750k</option><option>£750k – £1.5m</option><option>£1.5m – £4m</option><option>£4m +</option></select></label>
                <label className="block"><span className="annot muted">Buying as</span>
                  <select name="entity" className={field}><option>Individual</option><option>Company</option><option>Family office / fund</option></select></label>
                <label className="block md:col-span-2"><span className="annot muted">Anything specific — floor, view, timing (optional)</span><input name="note" className={field} /></label>
                <div className="flex flex-wrap items-center gap-5 md:col-span-2">
                  <button type="submit" disabled={state === "sending"} className="btn btn-ink">{state === "sending" ? "Sending…" : "Send enquiry"}</button>
                  {state === "error" && <p className="annot text-bronze">Something went wrong — WhatsApp 07444 551241</p>}
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
