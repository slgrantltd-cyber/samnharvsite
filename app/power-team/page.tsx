import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import { POWER_TEAM } from "@/lib/power-team";

export const metadata: Metadata = {
  title: "The Complete Package — Every Part of the Deal, One Roof",
  description:
    "Sam n Harv is a complete hub for property investment — sourcing, bridging finance with LendHub, architecture and planning, build, furnishing by Base Furnishings, and operation. Plus the full professional bench, introduced per deal.",
  alternates: { canonical: "/power-team" },
};

const CHAIN = [
  {
    stage: "Source",
    who: "Sam n Harv",
    body: "The deal itself — found, negotiated and underwritten by us, to the same standard we buy at. Numbers you can hold us to.",
  },
  {
    stage: "Fund",
    who: "Lendhub",
    brand: "lendhub",
    site: "lendhub.co.uk",
    body: "Specialist bridging, refurbishment and development lending from £100k to £10m — terms discussed before you commit, so the finance is shaped around the deal, not the other way round.",
  },
  {
    stage: "Design & planning",
    who: "Architect & planner",
    body: "Drawings, permitted development and planning applications from the team on our own conversions — so the scheme that gets priced is the scheme that gets approved.",
  },
  {
    stage: "Build",
    who: "Our builder",
    body: "The refurbishment and conversion work, itemised against a defined spec with staged payments — priced by the people who deliver our own projects.",
  },
  {
    stage: "Furnish",
    who: "Base Furnishings",
    brand: "base",
    site: "basefurnishings.co.uk",
    body: "Design-led furniture packages installed, not flat-packed — over 10,000 apartments delivered since 2010, from a single unit to a whole block inside a fortnight.",
  },
  {
    stage: "Manage",
    who: "Management partner",
    body: "Day-to-day management sits with a dedicated specialist — lettings, guests, maintenance, compliance — held to the standard we run our own properties at. You own an investment, not a job.",
  },
];

/* Partner brand plates — each partner shown in their own colours, not ours. */
const PLATES: Record<string, ReactNode> = {
  lendhub: (
    <div
      className="relative overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(115deg, #0e1430 0%, #1a2348 55%, #25315e 100%)" }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(122,142,255,0.28), transparent)" }}
        aria-hidden="true"
      />
      <p className="font-sans text-[1.55rem] font-semibold tracking-tight text-white">
        lendhub<span style={{ color: "#7a8eff" }}>.</span>
      </p>
      <p className="annot mt-1 text-white/60">Flexible · Trusted · Innovative</p>
    </div>
  ),
  base: (
    <div
      className="relative overflow-hidden px-6 py-6 md:px-7"
      style={{ background: "linear-gradient(120deg, #16130f 0%, #241f18 60%, #2f2820 100%)" }}
    >
      <div
        className="pointer-events-none absolute -left-14 -bottom-24 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(214,188,150,0.16), transparent)" }}
        aria-hidden="true"
      />
      <p className="font-sans text-[1.35rem] font-semibold tracking-[0.02em] text-[#f5f1ea]">
        BASE <span className="font-normal tracking-[0.18em] text-[#cbb69a]">FURNISHINGS</span>
      </p>
      <p className="annot mt-1 text-[#f5f1ea]/55">Complete furnishing solutions · since 2010</p>
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
            Most investments die in the gaps between professionals. We&rsquo;ve
            closed the gaps: every stage of a deal now has a partner who already
            works alongside us, on terms we&rsquo;d take ourselves.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2 lg:grid-cols-3">
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
          <p className="annot mt-6 max-w-3xl leading-relaxed muted">
            Partners are independent businesses — you deal with each directly,
            on their normal terms. We put them here for one reason: they
            already work on deals like ours, and they&rsquo;ve agreed to look
            after people we send properly.
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
