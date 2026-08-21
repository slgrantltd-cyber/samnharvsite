import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import AccessForm from "@/components/access-form";
import LogoMarquee from "@/components/dubai/logo-marquee";
import DuskLight from "@/components/dubai/dusk-light";
import CountUp from "@/components/dubai/count-up";
import TiltCard from "@/components/dubai/tilt-card";
import ProcessRail from "@/components/dubai/process-rail";

export const metadata: Metadata = {
  title: "Dubai Property Investment for UK Investors — Developer-Direct",
  description:
    "Developer-direct Dubai residences for UK investors — launch allocations from Binghatti, Danube, Sobha, Emaar, Damac and more, on developer payment plans, underwritten by a UK desk. No fee to you: the developer pays our commission.",
  alternates: { canonical: "/dubai" },
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
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24 [contain:paint]">
        <DuskLight />
        <div className="relative mx-auto max-w-6xl">
          <p className="annot muted">Dubai · for UK investors</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Developer-direct Dubai,</Line>
            <Line>
              underwritten by a <span className="display-it">UK desk.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Launch allocations from Dubai&rsquo;s leading developers —
            Binghatti, Danube, Sobha, Emaar, Damac and more — at developer
            price, on developer payment plans. We pick the unit, run the
            numbers net of every cost, and tell you when not to buy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="https://wa.me/447444551241?text=Dubai%20%E2%80%94%20I%27d%20like%20to%20talk" className="btn btn-ink">
              WhatsApp Samuel about Dubai
            </a>
            <Link href="/call" className="annot inline-flex min-h-11 items-center gap-3 text-ink hover:text-bronze">
              Book a 15-minute intro call <span aria-hidden="true">→</span>
            </Link>
          </div>
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

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-px border bg-[var(--line)] hairline md:grid-cols-4">
            {[
              { to: 0, suffix: "%", l: "UAE income & capital gains tax" },
              { to: 4, suffix: "%", l: "DLD transfer fee — often split on launches" },
              { to: 10, suffix: " yr", l: "Golden Visa at AED 2m+" },
              { to: 20, prefix: "from ", suffix: "%", l: "Typical deposit to reserve" },
            ].map((c) => (
              <div key={c.l} className="bg-[var(--plaster)] p-6 md:p-8">
                <p className="display text-4xl md:text-5xl"><CountUp to={c.to} prefix={c.prefix} suffix={c.suffix} className="gold-text" /></p>
                <p className="annot mt-3 muted">{c.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="allocations" className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">Current allocations</p>
          <h2 className="display mt-3 max-w-3xl text-3xl leading-snug md:text-4xl">
            Live launches, with the numbers — <span className="display-it">on request.</span>
          </h2>
          <p className="muted mt-5 max-w-2xl leading-relaxed">
            We hold current allocations and price lists across the developers
            above. Launch pricing changes weekly and is shared with qualified
            investors directly, not published — ask and you&rsquo;ll have the
            current sheet the same day: price from, payment plan, handover,
            projected net yield, service charge.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {[
              ["Studios & 1-beds", "Income-led", "Highest yield per pound; the rental engine of the city. Typical entry from the low £100ks."],
              ["2 & 3-beds", "Balanced", "Family and long-stay demand, stronger resale. Mid-hundreds of thousands upward."],
              ["Villas & branded", "Growth-led", "Scarcer product, larger tickets, the strongest capital appreciation story. £1m+."],
            ].map(([h, k, b]) => (
              <Lift key={h} className="bg-[var(--plaster)]">
                <TiltCard className="glow-gold h-full bg-[var(--plaster)]">
                  <div className="relative flex h-full flex-col p-6 md:p-7">
                    <p className="annot text-bronze">{k}</p>
                    <h3 className="display mt-2 text-2xl">{h}</h3>
                    <p className="muted mt-3 text-[0.9375rem] leading-relaxed">{b}</p>
                  </div>
                </TiltCard>
              </Lift>
            ))}
          </div>
          <p className="annot mt-6 muted">Figures indicative of current launches; sterling at prevailing rates. Current price sheets on request.</p>
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

      <section id="access" className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="annot muted">Request the current sheet</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">
                Tell us your capital. <span className="display-it">We&rsquo;ll send what fits.</span>
              </h2>
              <p className="muted mt-4 leading-relaxed">
                Current allocations and price lists, the same day, with our
                view on each. Identity and proof of funds before particulars — always.
              </p>
            </div>
            <div className="lg:col-span-3">
              <AccessForm mandate="Dubai residences" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
