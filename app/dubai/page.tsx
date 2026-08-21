import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import UnitsGallery from "@/components/dubai/units-gallery";
import LogoMarquee from "@/components/dubai/logo-marquee";
import DuskLight from "@/components/dubai/dusk-light";
import GoldDust from "@/components/dubai/gold-dust";
import MarkMorph from "@/components/mark-morph";
import TiltCard from "@/components/dubai/tilt-card";
import ProcessRail from "@/components/dubai/process-rail";
import { PsfLines, VolumeBars, YieldBars, DeveloperBars } from "@/components/dubai/market-charts";
import { HEADLINES, SOURCE } from "@/lib/dubai-data";
import { INSIGHTS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Dubai Property Investment for UK Investors — Developer-Direct",
  description:
    "Developer-direct Dubai residences for UK investors — launch allocations from Binghatti, Danube, Sobha, Emaar, Damac and more, on developer payment plans, underwritten by a UK desk. No fee to you: the developer pays our commission.",
  alternates: { canonical: "/dubai" },
  openGraph: {
    title: "Sam n Harv — Dubai",
    description: "Developer-direct Dubai for UK investors — Binghatti, Danube, Sobha, Emaar, Damac — at developer price, on developer payment plans.",
    url: "/dubai",
    images: [{ url: "/og/dubai.png", width: 1200, height: 630, alt: "Sam n Harv — Dubai, developer-direct" }],
  },
  twitter: { card: "summary_large_image", title: "Sam n Harv — Dubai", images: ["/og/dubai.png"] },
};

const FACTS = [
  ["No fee to you", "The developer pays our commission. You pay developer price — the same price as walking into their sales centre, with our underwriting on top."],
  ["No UK stamp duty", "A Dubai purchase carries no UK SDLT. Dubai Land Department charges a 4% transfer fee, often split or absorbed on launches."],
  ["Payment plans", "Typically 10–20% to reserve, then monthly or milestone instalments through the build — 60/40 and 70/30 plans are common, some run past handover."],
  ["A dollar asset", "The dirham is pegged to the US dollar. For a sterling investor that's currency diversification, not just a property."],
  ["Tax, plainly", "0% income and capital gains tax in the UAE. If you're UK tax-resident, UK tax still applies to your worldwide income — we'll say so every time, and you should take advice."],
  ["Residency", "Property of AED 2m+ can qualify for a 10-year Golden Visa. Worth knowing; never the reason to buy."],
];

const PROCESS = [
  ["Brief", "Capital, timeframe, income or growth, personal or company. Fifteen minutes."],
  ["Shortlist", "Two or three units across developers that fit — floor, view, layout and price per sq ft called by us, not the sales floor."],
  ["Reserve", "Expression of interest and booking deposit direct with the developer. You're buying from them; we're beside you."],
  ["SPA & plan", "Sale and purchase agreement, DLD registration (Oqood), payment schedule locked in writing."],
  ["Build", "Milestone updates through construction. Escrow-protected payments under UAE law."],
  ["Handover & let", "Snagging, title, then furnished and let — short- or long-term — through a management partner if you want it hands-off."],
];

const RISKS = [
  ["Delivery", "Off-plan completes late more often than on time. Buy from developers with a delivery record, and plan for a delay."],
  ["Supply", "Dubai builds fast. Location, developer and product matter more than the headline yield in a brochure."],
  ["Exit", "Resale before handover is possible but not guaranteed liquid. Buy what you'd be happy to hold."],
  ["Costs after", "Service charges (per sq ft, annually), management fees and furnishing all come off the gross yield. We underwrite net."],
];

export default function DubaiPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section data-hero="dark" className="relative -mt-24 overflow-hidden px-5 pb-20 pt-40 text-[var(--plaster)] md:-mt-28 md:pb-28 md:pt-52 [contain:paint]" style={{ background: "linear-gradient(160deg, #17110d 0%, #241811 40%, #3a2418 75%, #4a2f1d 100%)" }}>
        <DuskLight />
        <GoldDust />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--plaster)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <MarkMorph className="mb-8 h-24 w-24 text-[var(--plaster)] md:mb-10 md:h-32 md:w-32" />
          <p className="annot text-[var(--bronze-bright)]">Dubai · for UK investors</p>
          <Rise as="h1" className="display mt-4 text-5xl leading-[0.95] md:text-8xl">
            <Line>Developer-direct Dubai,</Line>
            <Line>
              underwritten by a <span className="display-it gold-text">UK desk.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--plaster)]/85 md:text-xl">
            Launch allocations from Binghatti, Danube, Sobha, Emaar, Damac and
            more — at developer price, on developer payment plans. We pick the
            unit, run the numbers against the transaction record, and tell you
            when not to buy.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="https://wa.me/447444551241?text=Dubai%20%E2%80%94%20I%27d%20like%20to%20talk" className="btn-gold">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24m4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28"/></svg>
              <span>WhatsApp Samuel</span>
            </a>
            <Link href="/call" className="annot inline-flex min-h-11 items-center gap-3 text-[var(--plaster)]/85 hover:text-[var(--bronze-bright)]">
              Book a 15-minute intro call <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-px border border-[var(--plaster)]/15 bg-[var(--plaster)]/15 md:grid-cols-4">
            {[
              [HEADLINES.tx2025.toLocaleString("en-GB"), "Sales in 2025"],
              [`AED ${HEADLINES.valueBn2025}bn`, "Transacted in 2025"],
              [`${HEADLINES.offplanShare2026}%`, "Off-plan share, 2026"],
              [`+${HEADLINES.readyPsfFromFloor}%`, "Ready price/sq ft since 2020"],
            ].map(([v, l]) => (
              <div key={l} className="p-4 md:p-5" style={{ background: "rgba(23,17,13,.55)" }}>
                <p className="display text-2xl md:text-3xl">{v}</p>
                <p className="annot mt-2 text-[var(--bronze-bright)]">{l}</p>
              </div>
            ))}
          </div>
          <p className="annot mt-3 text-[var(--plaster)]/45">{SOURCE.short}</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">Access</p>
            <p className="display mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">
              One conversation, every developer that matters — so the unit
              is chosen for you, <span className="display-it">not for the developer.</span>
            </p>
            <div className="mt-8 -mx-8 md:-mx-12">
              <LogoMarquee />
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--plaster)]/70">
              Each developer sells its own stock at its own price. Our job is
              the comparison across them — price per square foot, payment
              plan, delivery record, service charge, rental evidence — and the
              honest call on which one, or none.
            </p>
          </div>
        </div>
      </section>

      <section id="units" className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">The collection</p>
          <h2 className="display mt-3 max-w-3xl text-3xl leading-snug md:text-4xl">
            Branded, Abu Dhabi, Dubai — <span className="display-it">every unit, every price, an Enquire on each.</span>
          </h2>
          <p className="muted mt-5 max-w-2xl leading-relaxed">
            Tap any card for the gallery, the unit-by-unit table, floor plans and
            tours. Enquire on a project or on a single unit type — the current
            price sheet comes back the same day, with our view.
          </p>
          <div className="mt-8">
            <UnitsGallery />
          </div>
        </div>
      </section>

      <section id="market" className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">The market, in numbers</p>
          <h2 className="display mt-3 max-w-3xl text-3xl leading-snug md:text-4xl">
            Sixteen years of Land Department data — <span className="display-it">read without the brochure.</span>
          </h2>
          <p className="muted mt-5 max-w-2xl leading-relaxed">
            Every figure below is a registered transaction, not a forecast. The
            same series sit behind each unit we underwrite. Hover for values; each
            chart has a table view.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PsfLines />
            <VolumeBars />
            <YieldBars />
            <DeveloperBars />
          </div>
          <p className="annot mt-6 max-w-3xl leading-relaxed muted">{SOURCE.label} Past performance is not a guide to future returns.</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">Dubai desk notes</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2 lg:grid-cols-4">
            {INSIGHTS.filter((i) => i.tag === "Dubai").map((i) => (
              <Link key={i.slug} href={`/insights/${i.slug}`} className="group glow-gold z-0 bg-[var(--plaster)] p-6 hover:z-10">
                <span className="annot muted">{i.readMinutes} min</span>
                <span className="display mt-3 block text-xl leading-snug">{i.title}</span>
                <span className="muted mt-3 block text-sm leading-relaxed">{i.standfirst}</span>
                <span className="annot mt-4 inline-flex items-center gap-2 text-ink transition-colors group-hover:text-bronze">Read <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">For a UK buyer, plainly</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2 lg:grid-cols-3">
            {FACTS.map(([h, b]) => (
              <Lift key={h} className="bg-[var(--plaster)]">
                <div className="p-6 md:p-7">
                  <h3 className="display text-xl">{h}</h3>
                  <p className="muted mt-3 text-[0.9375rem] leading-relaxed">{b}</p>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">How it runs</p>
          <h2 className="display mt-3 max-w-3xl text-3xl leading-snug md:text-4xl">
            Six steps from brief to <span className="display-it">keys and tenants.</span>
          </h2>
          <ProcessRail steps={PROCESS as [string, string][]} />
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">The risks, before the brochure</p>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              {RISKS.map(([h, b]) => (
                <div key={h}>
                  <h3 className="display text-xl">{h}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--plaster)]/80">{b}</p>
                </div>
              ))}
            </div>
            <p className="annot mt-8 text-[var(--plaster)]/60">
              We do not guarantee returns, values or rental income. Property carries risk; take independent tax and legal advice.{" "}
              <Link href="/trust" className="text-[var(--bronze-bright)]">How we behave →</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="border hairline p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="display text-3xl md:text-4xl">Nothing above quite right? <span className="display-it">Tell us the brief.</span></h2>
                <p className="muted mt-4 leading-relaxed">Allocations change weekly and we hold more than we show. One WhatsApp, or fifteen minutes on a call, and we&rsquo;ll send what fits.</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <a href="https://wa.me/447444551241?text=Dubai%20%E2%80%94%20here%27s%20my%20brief" className="btn-gold on-light"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24m4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28"/></svg><span>WhatsApp Samuel</span></a>
                <Link href="/call" className="btn btn-ghost">Book a 15-minute intro call</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
