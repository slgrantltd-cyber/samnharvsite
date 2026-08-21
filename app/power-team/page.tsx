import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import { POWER_TEAM } from "@/lib/power-team";
import BenchmarkMark from "@/components/benchmark-mark";

export const metadata: Metadata = {
  title: "The Complete Package — Every Part of the Deal, One Roof",
  description:
    "Sam n Harv is a complete hub for property investment — sourcing, bridging finance with Lendhub, whole-of-market commercial finance through Watts Commercial, architecture and planning, build, furnishing by Base Furnishings, and hands-off management by Summit Property Group. Plus the full professional bench, introduced per deal.",
  alternates: { canonical: "/power-team" },
};

const CHAIN = [
  {
    stage: "Source",
    who: "Sam n Harv",
    brand: "samnharv",
    body: "The deal — found, negotiated and underwritten by us, to the standard we buy at.",
  },
  {
    stage: "Fund · direct lender",
    who: "Lendhub",
    brand: "lendhub",
    site: "lendhub.co.uk",
    intro: true,
    body: "Bridging, refurbishment and development lending, £100k to £10m. Terms shaped around the deal before you commit.",
  },
  {
    stage: "Fund · whole of market",
    who: "Watts Commercial Finance",
    brand: "watts",
    site: "watts-commercial.co.uk",
    intro: true,
    body: "Independent commercial broker across an extensive lender panel — commercial mortgages, bridging, development, portfolios. FCA-regulated, NACFB member.",
  },
  {
    stage: "Design & planning",
    who: "Architect & planner",
    brand: "quiet",
    body: "Drawings, permitted development and planning applications from the team on our own conversions.",
  },
  {
    stage: "Build",
    who: "Our builder",
    brand: "quiet",
    body: "Refurbishment and conversion, itemised against a defined spec with staged payments — by the people who deliver our projects.",
  },
  {
    stage: "Furnish",
    who: "Base Furnishings",
    brand: "base",
    site: "basefurnishings.co.uk",
    intro: true,
    body: "Design-led furniture packages, installed not flat-packed. 10,000+ apartments delivered since 2010.",
  },
  {
    stage: "Manage · hands-off",
    who: "Summit Property Group",
    brand: "summit",
    site: "summit-propertygroup.co.uk",
    intro: true,
    body: "Maria Di Fonzo runs serviced accommodation hands-off for investors — listings, guests, housekeeping, maintenance, compliance. 15% management fee. You own an investment, not a job.",
  },
  {
    stage: "Then",
    who: "Your deal",
    brand: "samnharv",
    body: "One conversation starts the whole chain. Tell us your capital and what it's for.",
    cta: { href: "/call", label: "Book a 15-minute intro call" },
  },
];

/* Partner brand plates — real logos and palettes pulled from each partner's
   own site, rendered with the restraint of ours: deep grounds, small marks,
   one fine accent. Lendhub: #14062c / #813dff. Base: black / #fdd300. */
const PLATES: Record<string, ReactNode> = {
  lendhub: (
    <div
      className="relative flex min-h-[7rem] flex-col justify-center overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(120deg, #100522 0%, #14062c 55%, #1d0b3d 100%)" }}
    >
      <div
        className="pointer-events-none absolute -right-14 -top-24 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(129,61,255,0.32), transparent)" }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/partners/lendhub-white.svg" alt="Lendhub" className="relative h-7 w-auto self-start" />
      <p className="annot relative mt-3 text-white/55">Flexible · Trusted · Innovative</p>
    </div>
  ),
  base: (
    <div
      className="relative flex min-h-[7rem] flex-col justify-center overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(120deg, #0c0b0a 0%, #131211 60%, #1b1917 100%)" }}
    >
      <span className="absolute inset-x-0 top-0 h-px" style={{ background: "#fdd300", opacity: 0.75 }} aria-hidden="true" />
      <div className="relative flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/partners/base-mark-light.png" alt="" className="h-9 w-auto" />
        <div>
          <p className="font-sans text-[1.05rem] font-semibold tracking-[0.14em] text-[#f5f1ea]">BASE FURNISHINGS</p>
          <p className="annot mt-1 text-[#f5f1ea]/50">Complete furnishing solutions · <span style={{ color: "#fdd300", opacity: 0.85 }}>since 2010</span></p>
        </div>
      </div>
    </div>
  ),
  watts: (
    <div
      className="relative flex min-h-[7rem] flex-col justify-center overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(120deg, #ffffff 0%, #f4f7fb 60%, #eaf1f8 100%)" }}
    >
      <span className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, #003d73, #00adef)" }} aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-16 -bottom-20 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(0,173,239,0.16), transparent)" }}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/partners/watts-commercial.svg" alt="Watts Commercial Finance" className="relative h-14 w-auto self-start" />
      <p className="annot relative mt-2 text-[#253e6e]/70">Independent advice on commercial finance</p>
    </div>
  ),
  samnharv: (
    <div
      className="relative flex min-h-[7rem] flex-col justify-center overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(120deg, #141414 0%, #1a1a1a 60%, #232120 100%)" }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(201,171,124,0.22), transparent)" }}
        aria-hidden="true"
      />
      <div className="relative flex items-center gap-4">
        <BenchmarkMark className="h-9 w-9 text-[var(--plaster)]" />
        <p className="display text-xl tracking-tight text-[var(--plaster)]">
          SAM <span className="display-it lowercase gold-text">n</span> HARV
        </p>
      </div>
      <p className="annot relative mt-2 text-[var(--plaster)]/55">Character over commission</p>
    </div>
  ),
  summit: (
    <div
      className="relative flex min-h-[7rem] flex-col justify-center overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(120deg, #5f5946 0%, #736c57 60%, #847c66 100%)" }}
    >
      <div
        className="pointer-events-none absolute -left-14 -bottom-24 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(245,245,245,0.14), transparent)" }}
        aria-hidden="true"
      />
      <p className="display relative text-[1.35rem] tracking-[0.06em] text-[#f5f5f5]">SUMMIT</p>
      <p className="annot relative mt-1 text-[#f5f5f5]/70">Property Group · Maria Di Fonzo</p>
    </div>
  ),
  quiet: (
    <div className="relative flex min-h-[7rem] flex-col justify-center px-6 py-6 md:px-7" style={{ background: "var(--limestone)" }}>
      <span className="block h-px w-10" style={{ background: "linear-gradient(90deg, #a98a52, #ead8ab, #a98a52)" }} aria-hidden="true" />
      <p className="annot mt-3 muted">Introduced per deal</p>
    </div>
  ),
};


export default function PowerTeamPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The power team</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>You buy the deal.</Line>
            <Line>
              You inherit <span className="display-it">our people.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            A deal is only as good as the team that executes it — so
            we&rsquo;ve built the whole team under one roof. Finance,
            planning, build, furnishing, operation: partners who already work
            alongside us, plus a professional bench introduced per deal. One
            conversation starts all of it.
          </p>
        </div>
      </section>


      {/* THE COMPLETE PACKAGE — the deal chain, one roof */}
      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">The complete package</p>
          <h2 className="display mt-3 max-w-3xl text-3xl leading-snug md:text-4xl">
            Source, fund, design, build, furnish, manage —{" "}
            <span className="display-it">without leaving the room.</span>
          </h2>
          <p className="muted mt-5 max-w-2xl leading-relaxed">
            Every stage of a deal has a partner who already works alongside us.
            You deal with each directly, on their normal terms — introduced by name.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2 lg:grid-cols-4">
            {CHAIN.map((c) => (
              <Lift key={c.stage} className="bg-[var(--plaster)]">
                <div className="flex h-full flex-col">
                  {c.brand && PLATES[c.brand]}
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <p className="annot muted">{c.stage}</p>
                    <h3 className="display mt-2 text-2xl">{c.who}</h3>
                    <p className="muted mt-3 text-[0.9375rem] leading-relaxed">
                      {c.body}
                    </p>
                    {c.intro && (
                      <p className="annot mt-4 text-bronze">
                        Say Samuel Grant sent you — they&rsquo;ve agreed to look after you.
                      </p>
                    )}
                    {c.cta && (
                      <Link href={c.cta.href} className="btn btn-ink mt-auto self-start">
                        {c.cta.label}
                      </Link>
                    )}
                    {c.site && (
                      <a
                        href={`https://${c.site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="annot mt-auto inline-flex items-center gap-2 pt-5 text-bronze hover:text-ink"
                      >
                        {c.site} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </Lift>
            ))}
          </div>
          <p className="annot mt-6 muted">
            Independent businesses. We earn nothing from the introductions.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">And behind them — the bench</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {POWER_TEAM.map((p) => (
              <Lift key={p.role} className="bg-[var(--plaster)]">
                <div className="flex h-full flex-col p-6 md:p-7">
                  <span className="block h-px w-8 bg-bronze" aria-hidden="true" />
                  <h2 className="display mt-3 text-2xl">{p.role}</h2>
                  <p className="muted mt-3 text-[0.9375rem] leading-relaxed">
                    {p.why}
                  </p>
                  <p className="annot muted mt-auto pt-5">{p.proof}</p>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">How it works</p>
            <p className="display mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">
              Introductions are made per deal, personally — because a
              recommendation is our name on{" "}
              <span className="display-it">someone else&rsquo;s work.</span>
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--plaster)]/82">
              We don&rsquo;t publish names and numbers, and we introduce you
              to who the deal actually needs — an auction purchase needs the
              solicitor first; a heavy refurb starts with the builder and the
              surveyor. You remain free to use anyone you like; ours are
              simply the people we trust with our own operation.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--plaster)]/82">
              And to be clear: <span className="text-bronze">introductions
              are recommendations, not a charged service.</span> We make
              nothing from them — you deal with each professional directly,
              on their normal terms. We recommend them for one reason: they
              make our deals go well, and we&rsquo;d like yours to go the
              same way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/deals" className="btn btn-ink">
                See the current deals
              </Link>
              <Link href="/join" className="btn btn-ghost">
                Join the deal list
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
