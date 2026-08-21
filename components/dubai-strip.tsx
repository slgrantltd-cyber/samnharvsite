import Link from "next/link";
import LogoMarquee from "@/components/dubai/logo-marquee";
import { HEADLINES, SOURCE } from "@/lib/dubai-data";

/** Homepage: Dubai, unmistakably — a dusk-and-gold panel after the globe. */
export default function DubaiStrip() {
  const stats = [
    [HEADLINES.tx2025.toLocaleString("en-GB"), "Sales in 2025", "Seven times 2020"],
    [`AED ${HEADLINES.valueBn2025}bn`, "Transacted in 2025", "≈ £70bn"],
    [`${HEADLINES.offplanShare2026}%`, "Off-plan share, 2026", "Developer-direct is the market"],
    [`+${HEADLINES.readyPsfFromFloor}%`, "Ready price/sq ft since 2020", "Late cycle — underwrite flat"],
  ];
  return (
    <section className="px-5 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden shadow-daylight" style={{ background: "linear-gradient(130deg, #1c1410 0%, #2b1d16 45%, #3a2418 100%)" }}>
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(201,171,124,0.28), transparent)" }} aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(196,112,86,0.22), transparent)" }} aria-hidden="true" />
          <div className="relative p-8 md:p-12">
            <p className="annot text-[var(--bronze-bright)]">Dubai · developer-direct</p>
            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <h2 className="display text-3xl leading-tight text-[var(--plaster)] md:text-5xl">
                  Launch allocations from Binghatti, Danube, Sobha, Emaar, Damac —{" "}
                  <span className="display-it gold-text">at developer price.</span>
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-[var(--plaster)]/80">
                  Developer payment plans, no UK stamp duty, no fee to you — the
                  developer pays ours. Underwritten by a UK desk against the
                  actual transaction data, not the brochure.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <Link href="/dubai" className="btn btn-ink border border-[var(--plaster)]/30">See Dubai, developer-direct</Link>
                  <a href="https://wa.me/447444551241?text=Dubai%20%E2%80%94%20I%27d%20like%20to%20talk" className="annot text-[var(--plaster)]/80 hover:text-[var(--bronze-bright)]">WhatsApp Samuel →</a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px border border-[var(--plaster)]/15 bg-[var(--plaster)]/15 lg:col-span-2">
                {stats.map(([v, l, s]) => (
                  <div key={l} className="p-4 md:p-5" style={{ background: "rgba(28,20,16,.6)" }}>
                    <p className="display text-2xl text-[var(--plaster)] md:text-3xl">{v}</p>
                    <p className="annot mt-2 text-[var(--bronze-bright)]">{l}</p>
                    <p className="mt-1 text-xs text-[var(--plaster)]/60">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative border-t border-[var(--plaster)]/10">
            <LogoMarquee fade="#261912" />
          </div>
          <p className="annot relative px-8 pb-5 text-[var(--plaster)]/45 md:px-12">{SOURCE.short}</p>
        </div>
      </div>
    </section>
  );
}
