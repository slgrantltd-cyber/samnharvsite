/*
DIRECTION CONTRACT — "The Surveyor's Mark"
THESIS: Two brothers who read the land properly. Refuses the category default
(hero photo of a skyline + metric strip + testimonial carousel).
OWN-WORLD: Architectural materials — lime plaster ground, limestone, paper,
smoked stone, concrete — with ink Caslon display, bronze chips and tabs,
Fragment Mono annotations, ruler-drawn cartography, and a living daylight
wash that follows the cursor. Recognisable with all content removed.
STORY: Visitor lands on the name, reads one honest manifesto, watches the
territory get surveyed, opens the ledger of strategies, meets the brothers,
sees only real proof, and leaves through one of three doors.
FIRST VIEWPORT: No imagery. The benchmark mark itself, drawn large in
hairline ink, slowly surveying itself into a house and back — levelling
line to ground, stem to walls, broad arrow to roof, centre leg to door —
above the retained headline. The mark is the argument: we measure, and
it becomes home.
FORM: Pinned by user references. Signature stagings: the morphing mark;
the survey map.
*/

import Image from "next/image";
import Link from "next/link";
import { Rise, Line, Lift, ScrubWords } from "@/components/reveal";
import MarkMorph from "@/components/mark-morph";
import MandateLight from "@/components/mandate-light";
import MandateGlobe from "@/components/mandate-globe";
import StrategyLedger from "@/components/strategy-ledger";
import { photoPath } from "@/lib/photos";

export default function Home() {
  const brothersPhoto = photoPath("brothers.jpg");
  return (
    <main id="main">
      {/* 01 — THE MARK BECOMES A HOUSE
          Staged as a sheet on the drawing board: warmer paper with fibre
          grain, raised above the plaster page on a daylight shadow; the
          next section slides in beneath its bottom edge. */}
      <section className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28 text-center [contain:paint] md:pt-32">
        <MandateLight />
        {/* the hero's light bleeds out into the page — no edge, no shadow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--plaster)]" aria-hidden="true" />
        <p className="annot muted relative">Private investment · UK &amp; international</p>
        <p className="display relative mt-6 text-3xl tracking-tight md:text-4xl">
          SAM <span className="display-it lowercase">n</span> HARV
        </p>
        <MarkMorph className="relative mt-9 h-36 w-36 text-ink md:mt-10 md:h-48 md:w-48" />
        <Rise as="h1" className="display relative mt-10 text-4xl leading-tight md:mt-12 md:text-7xl">
          <Line>We only bring you</Line>
          <Line>
            what we&rsquo;d <span className="display-it">run ourselves.</span>
          </Line>
        </Rise>
        <p className="relative mx-auto mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
          A small number of mandates at any one time — UK cash-flow,
          developer-direct Dubai residences, an operating resort in Thailand —
          released quietly to a few qualified investors. Every one
          underwritten to a return we&rsquo;d put our own name to.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link href="/opportunities" className="btn btn-ink">
            Opportunities
          </Link>
          <Link
            href="/about"
            className="annot inline-flex min-h-11 items-center gap-3 text-ink"
          >
            The two of us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 01.4 — THE RECORD (authority) */}
      <section className="px-5 pt-4 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Track record — before anything else</p>
          <div className="mt-6 grid grid-cols-2 gap-px border bg-[var(--line)] hairline md:grid-cols-4">
            {[
              ["Six figures", "Revenue a client credits to our deals", "In his words — below"],
              ["★★★★★", "On Google", "Reviews we can't edit"],
              ["3 markets", "UK · Dubai · Thailand", "One desk, three currencies of return"],
              ["£100k +", "Entry capital, no ceiling", "Single units to whole assets"],
            ].map(([v, l, s]) => (
              <Lift key={l} className="bg-[var(--plaster)] p-6 md:p-8">
                <p className="display text-4xl md:text-5xl">{v}</p>
                <p className="annot mt-3 text-bronze">{l}</p>
                <p className="muted mt-1 text-sm">{s}</p>
              </Lift>
            ))}
          </div>
          <p className="annot mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 muted">
            <span>Every review below is live on our Google Business profile.</span>
            <a href="https://share.google/lsd2TlaWo3OpRFqhO" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink hover:text-bronze">
              Verify them on Google <span aria-hidden="true">↗</span>
            </a>
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Lift className="border hairline p-7 md:p-9">
              <p className="display text-xl leading-snug md:text-2xl">
                &ldquo;Through his expertise, we&rsquo;ve secured some fantastic
                deals that have directly contributed to the growth of our
                business, <span className="display-it">adding six figures in revenue.</span>&rdquo;
              </p>
              <p className="annot mt-5 muted">Stephen McLaughlin — director, serviced accommodation company · <a href="https://share.google/lsd2TlaWo3OpRFqhO" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-bronze">on Google ↗</a></p>
            </Lift>
            <Lift className="border hairline p-7 md:p-9">
              <p className="display text-xl leading-snug md:text-2xl">
                &ldquo;I have dealt with Sam on a professional basis for over a
                year now. Very professional, genuine and very hard working.
                <span className="display-it"> I would highly recommend him and his company.</span>&rdquo;
              </p>
              <p className="annot mt-5 muted">Jonathan Thompson — landlord on two of our houses · <a href="https://share.google/lsd2TlaWo3OpRFqhO" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-bronze">on Google ↗</a></p>
            </Lift>
          </div>
        </div>
      </section>

      {/* 01.25 — THE THREE DOORS */}
      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Who you are, and what's been getting in the way</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {[
              {
                who: "For investors",
                pain: "Every sourcer in the country is sending you the same Rightmove listing with a fee stapled to it.",
                head: "Four mandates. Not forty.",
                body: "An island resort. Dubai residences, direct from the developer. UK houses bought below the street. Released after a conversation, identity and proof of funds.",
                href: "/opportunities",
                cta: "Request access",
              },
              {
                who: "For owners",
                pain: "Void months, tenant churn, and an agent who rings you for every lightbulb.",
                head: "Your asset, our covenant.",
                body: "A company tenancy on a multi-year term — the rent arrives whether the property is occupied or not, and it comes back in the condition we agreed.",
                href: "/landlords",
                cta: "Talk to us",
              },
              {
                who: "For institutions",
                pain: "Placements that collapse because the provider is never actually on site.",
                head: "Placements, run properly.",
                body: "Supported accommodation for a local authority — over a year of placements, inspection-ready as standard. The operating discipline behind everything else.",
                href: "/councils",
                cta: "The standard",
              },
            ].map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group bg-[var(--plaster)] p-6 transition-colors duration-300 hover:bg-[var(--limestone)] md:p-8"
              >
                <span className="annot muted group-hover:text-[var(--bronze)]">
                  {d.who}
                </span>
                <span className="mt-3 block text-[0.9375rem] leading-relaxed text-ink">
                  {d.pain}
                </span>
                <span className="display mt-5 block text-2xl">{d.head}</span>
                <span className="mt-3 block text-[0.9375rem] leading-relaxed muted">
                  {d.body}
                </span>
                <span className="annot mt-5 inline-flex items-center gap-2 text-ink">
                  {d.cta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="annot mt-6 flex flex-wrap gap-x-8 gap-y-2 muted">
            <span>Finance, build, furnishing &amp; operation under one roof — <Link href="/power-team" className="text-ink hover:text-bronze">the complete package →</Link></span>
            <span>We operate what we place</span>
            <span>Every deal underwritten to our own standard</span>
            <span>Two names on everything</span>
          </p>
        </div>
      </section>


      {/* 01.45 — WHO WE WORK WITH (qualification) */}
      <section className="on-stone px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="annot text-[var(--bronze-bright)]">Who we work with</p>
              <Rise as="h2" className="display mt-3 text-4xl md:text-5xl">
                <Line>Not everyone.</Line>
                <Line>
                  <span className="display-it">Deliberately.</span>
                </Line>
              </Rise>
              <p className="mt-6 max-w-md leading-relaxed text-[var(--plaster)]/80">
                We don&rsquo;t sell to whoever asks. Every buyer is qualified
                before a single particular is shared, and every mandate is
                matched to the person — not the other way round. If it
                doesn&rsquo;t fit, we say so on the first call.
              </p>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10 md:grid-cols-3">
                {[
                  ["Serious", "Ready to transact, with capital available and a timescale — not browsing."],
                  ["Clear-eyed", "Understands that property carries real risk, and wants it stated plainly rather than sold around."],
                  ["Hands-on the decision", "Willing to engage with the numbers, the process and the work — we underwrite; you decide."],
                ].map(([h, b]) => (
                  <div key={h} className="p-6 md:p-7">
                    <p className="display text-2xl">{h}</p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--plaster)]/80">{b}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
                <span className="annot text-[var(--bronze-bright)]">Conversation → identity &amp; funds → NDA → particulars</span>
                <Link href="/opportunities#access" className="annot text-[var(--plaster)] hover:text-[var(--bronze-bright)]">Request access →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 01.47 — OUR WORD (trust) */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="annot muted">Our word</p>
              <Rise as="h2" className="display mt-3 text-4xl md:text-5xl">
                <Line>Investment carries risk.</Line>
                <Line>
                  We won&rsquo;t <span className="display-it">pretend otherwise.</span>
                </Line>
              </Rise>
              <p className="muted mt-6 max-w-md leading-relaxed">
                We don&rsquo;t make our money on the sale — we make it on the
                second deal, and the third. There is no second deal with
                someone we let down. So the rules below aren&rsquo;t
                marketing; they&rsquo;re the business model.
              </p>
              <Link href="/trust" className="annot mt-6 inline-flex items-center gap-2 text-ink hover:text-bronze">
                All nine rules, and how to check them <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline">
                {[
                  ["Worst case first", "Three scenarios on every mandate. We buy on likely; we never sell on best."],
                  ["Risk, stated plainly", "Planning, title, the railway line, the roof — first page, plain English."],
                  ["Nothing guaranteed", "Not returns, not occupancy, not values. Walk away from anyone who says otherwise."],
                  ["Our fee, in writing, up front", "Fixed, declared before you see a property, payable on exchange. No hidden margin."],
                  ["We say no", "If it doesn't fit you, or stops working mid-process, we tell you to walk — and walk with you."],
                ].map(([h, b]) => (
                  <div key={h} className="bg-[var(--plaster)] p-5 md:p-6">
                    <p className="display text-xl">{h}</p>
                    <p className="muted mt-1.5 text-[0.9375rem] leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01.5 — MANIFESTO */}
      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-4xl">
          <p className="annot muted mb-8">The position</p>
          <ScrubWords
            className="display text-3xl leading-tight md:text-5xl"
            text="We are not brokers of other people's ideas. We run property every day — the placements, the guests, the maintenance, the numbers — so every mandate we bring you has passed the only test we trust: would we put our own name to running it."
          />
        </div>
      </section>

      {/* 02 — THE TERRITORY (pinned globe: UK → Dubai → Thailand) */}
      <MandateGlobe />

      {/* 03 — THE LEDGER (natural limestone) */}
      <section className="m-limestone px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The ledger</p>
          <Rise as="h2" className="display mt-3 text-4xl md:text-6xl">
            <Line>How capital</Line>
            <Line>
              is put to <span className="display-it">work.</span>
            </Line>
          </Rise>
          <div className="mt-12">
            <StrategyLedger />
          </div>
        </div>
      </section>

      {/* 04 — THE BROTHERS */}
      <section className="on-stone px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The people</p>
          <Rise as="h2" className="display mt-3 text-4xl md:text-6xl">
            <Line>Two names.</Line>
            <Line>
              Not a <span className="display-it">call centre.</span>
            </Line>
          </Rise>

          {brothersPhoto && (
            <Lift className="shadow-daylight relative mt-14 aspect-[16/9] overflow-clip md:aspect-[21/9]">
              <Image
                src={brothersPhoto}
                alt="Samuel and Harvey together"
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover object-[50%_25%]"
              />
              <p className="annot absolute bottom-3 left-3 bg-smoked px-2 py-1 text-bronze-bright">
                The two of us
              </p>
            </Lift>
          )}

          <div className="mt-14 grid gap-px bg-[var(--line-light)] md:grid-cols-2">
            {[
              {
                name: "Samuel",
                role: "Deals & investor relations",
                wa: "https://wa.me/447444551241",
                tel: "07444 551241",
              },
              {
                name: "Harvey",
                role: "Operations & delivery",
                wa: "https://wa.me/447753600183",
                tel: "07753 600183",
              },
            ].map((p) => (
              <Lift key={p.name} className="bg-smoked p-8 md:p-12">
                <p className="annot text-bronze-bright">{p.role}</p>
                <p className="display mt-3 text-5xl md:text-6xl">{p.name}</p>
                <p className="muted mt-4 max-w-sm leading-relaxed">
                  Direct line. The person who answers is the person
                  responsible.
                </p>
                <a href={p.wa} className="btn btn-ghost mt-8" rel="noopener">
                  WhatsApp {p.name} · {p.tel}
                </a>
              </Lift>
            ))}
          </div>

          <p className="muted mt-10 max-w-2xl leading-relaxed">
            Brothers, not a partnership of convenience. One of us finds and
            structures; the other makes the works, the occupancy and the
            numbers behave. There is no account manager between you and the
            people responsible.
          </p>
        </div>
      </section>

      {/* 06 — THE DOORS */}
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto max-w-6xl border-t hairline pt-16">
          <Rise as="h2" className="display max-w-3xl text-4xl md:text-6xl">
            <Line>Start with a</Line>
            <Line>
              <span className="display-it">conversation.</span>
            </Line>
          </Rise>
          <div className="mt-12 grid gap-px bg-[var(--line)] md:grid-cols-3">
            <a
              href="https://wa.me/447444551241"
              rel="noopener"
              className="group bg-plaster p-7 transition-colors hover:bg-smoked hover:text-plaster"
            >
              <p className="annot muted group-hover:text-bronze-bright">Direct</p>
              <p className="display mt-3 text-2xl">Speak to Samuel</p>
              <p className="muted mt-2 text-sm group-hover:text-stone-dark">
                07444 551241 · WhatsApp or call
              </p>
            </a>
            <Link
              href="/opportunities#access"
              className="group bg-plaster p-7 transition-colors hover:bg-smoked hover:text-plaster"
            >
              <p className="annot muted group-hover:text-bronze-bright">Opportunities</p>
              <p className="display mt-3 text-2xl">Request access</p>
              <p className="muted mt-2 text-sm group-hover:text-stone-dark">
                Identity and proof of funds, then the particulars
              </p>
            </Link>
            <a
              href="mailto:contact@samnharv.com"
              className="group bg-plaster p-7 transition-colors hover:bg-smoked hover:text-plaster"
            >
              <p className="annot muted group-hover:text-bronze-bright">In writing</p>
              <p className="display mt-3 text-2xl">Email the office</p>
              <p className="muted mt-2 text-sm group-hover:text-stone-dark">
                contact@samnharv.com
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
