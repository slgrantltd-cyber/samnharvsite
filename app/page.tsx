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
import SurveyMap from "@/components/survey-map";
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
      <section className="m-paper relative z-10 flex min-h-[92svh] flex-col items-center justify-center border-b hairline px-5 pb-20 pt-28 text-center shadow-[0_36px_70px_-24px_rgba(31,30,28,0.35),0_10px_24px_-14px_rgba(31,30,28,0.22)] md:pt-32">
        <p className="annot muted">Property investment · UK South West</p>
        <p className="display mt-6 text-3xl tracking-tight md:text-4xl">
          SAM <span className="display-it lowercase">n</span> HARV
        </p>
        <MarkMorph className="mt-9 h-36 w-36 text-ink md:mt-10 md:h-48 md:w-48" />
        <Rise as="h1" className="display mt-10 text-4xl leading-tight md:mt-12 md:text-7xl">
          <Line>The best opportunities</Line>
          <Line>
            rarely arrive <span className="display-it">by accident.</span>
          </Line>
        </Rise>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
          We partner with landlords, investors and organisations to unlock
          the full potential of property — through guaranteed rent,
          investment sourcing, serviced accommodation, management and
          bespoke property solutions.
        </p>
        <Link
          href="/services"
          className="annot mt-8 inline-flex min-h-11 items-center gap-3 text-ink"
        >
          Explore our work <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* 01.25 — THE THREE DOORS */}
      <section className="px-5 pt-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {[
              {
                who: "For investors",
                head: "Deals we'd do ourselves.",
                body: "Analysed opportunities with our own money in first — hear about them before anyone else.",
                href: "/join",
                cta: "Join the deal list",
              },
              {
                who: "For landlords",
                head: "Your rent, guaranteed.",
                body: "A fixed monthly rent in writing, paid occupied or not — tenants, upkeep and compliance all handled.",
                href: "/landlords",
                cta: "Get your answer",
              },
              {
                who: "For councils",
                head: "Placements done properly.",
                body: "Safe supported accommodation for young people — over a year of placements with our local authority.",
                href: "/councils",
                cta: "Request a placement",
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
                <span className="display mt-2 block text-2xl">{d.head}</span>
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
            <span>We operate our own properties</span>
            <span>★★★★★ on Google</span>
            <span>Two names on everything</span>
          </p>
        </div>
      </section>

      {/* 01.5 — MANIFESTO */}
      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-4xl">
          <p className="annot muted mb-8">01 — The position</p>
          <ScrubWords
            className="display text-3xl leading-tight md:text-5xl"
            text="Most sourcing companies sell you a deal and disappear. We buy, refurbish and operate property with our own money first — so when we bring you something, it has already survived the only test that matters: would we do it ourselves."
          />
        </div>
      </section>

      {/* 02 — THE TERRITORY (pinned map) */}
      <SurveyMap />

      {/* 03 — THE LEDGER (natural limestone) */}
      <section className="m-limestone px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">03 — The ledger</p>
          <Rise as="h2" className="display mt-3 text-4xl md:text-6xl">
            <Line>Six ways we</Line>
            <Line>
              put money to <span className="display-it">work.</span>
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
          <p className="annot muted">04 — The people</p>
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
                  Message him directly — the person who answers is the person
                  who does the work.
                </p>
                <a href={p.wa} className="btn btn-ghost mt-8" rel="noopener">
                  WhatsApp {p.name} · {p.tel}
                </a>
              </Lift>
            ))}
          </div>

          <p className="muted mt-10 max-w-2xl leading-relaxed">
            Brothers, not business partners who met at a networking event. One
            of us finds and structures the deals; the other makes sure the
            works, the tenants and the numbers behave. You always know who
            you&rsquo;re dealing with.
          </p>
        </div>
      </section>

      {/* 05 — PROOF (handmade paper — the records) */}
      <section className="m-paper px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">05 — On the record</p>
          <Rise as="h2" className="display mt-3 max-w-3xl text-4xl md:text-6xl">
            <Line>We&rsquo;d rather show</Line>
            <Line>
              less and <span className="display-it">mean it.</span>
            </Line>
          </Rise>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Lift className="border hairline p-7 md:p-9">
              <p className="annot muted">★★★★★ — Google review</p>
              <blockquote className="mt-5">
                <p className="display text-xl leading-snug md:text-2xl">
                  &ldquo;Through his expertise, we&rsquo;ve secured some
                  fantastic deals that have directly contributed to the growth
                  of our business, adding six figures in revenue. His
                  knowledge, integrity, attention to detail, and ability to
                  create opportunities have been invaluable.&rdquo;
                </p>
                <footer className="annot muted mt-5">
                  Stephen McLaughlin — director, serviced accommodation
                  company
                </footer>
              </blockquote>
            </Lift>

            <Lift className="border hairline p-7 md:p-9">
              <p className="annot muted">★★★★★ — Google review</p>
              <blockquote className="mt-5">
                <p className="display text-xl leading-snug md:text-2xl">
                  &ldquo;I have dealt with Sam on a professional basis for
                  over a year now. I have found him very professional, genuine
                  and very hard working. I would highly recommend him and his
                  company.&rdquo;
                </p>
                <footer className="annot muted mt-5">
                  Jonathan Thompson — landlord on two of our rent-to-rent
                  houses
                </footer>
              </blockquote>
            </Lift>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Lift className="border hairline p-7">
              <p className="annot muted">Councils</p>
              <p className="mt-4 leading-relaxed">
                We work with local councils on housing placements — young
                people and staff — the demand behind our buy-to-SA deals.
              </p>
            </Lift>
            <Lift className="border hairline p-7">
              <p className="annot muted">Operating proof</p>
              <p className="mt-4 leading-relaxed">
                Two serviced accommodation units, live and trading, run by us
                day to day.
              </p>
              <Link href="/stays" className="btn btn-ghost mt-5">
                See the stays
              </Link>
            </Lift>
            <Lift className="border hairline p-7">
              <p className="annot muted">On the record</p>
              <p className="mt-4 leading-relaxed">
                Our reviews live on Google, where we can&rsquo;t edit them.
              </p>
              <a
                href="https://share.google/lsd2TlaWo3OpRFqhO"
                className="btn btn-ghost mt-5"
                rel="noopener"
              >
                Read them all
              </a>
            </Lift>
          </div>
        </div>
      </section>

      {/* 06 — THE DOORS */}
      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto max-w-6xl border-t hairline pt-16">
          <Rise as="h2" className="display max-w-3xl text-4xl md:text-6xl">
            <Line>Three doors.</Line>
            <Line>
              All of them <span className="display-it">open.</span>
            </Line>
          </Rise>
          <div className="mt-12 grid gap-px bg-[var(--line)] md:grid-cols-3">
            <a
              href="https://wa.me/447444551241"
              rel="noopener"
              className="group bg-plaster p-7 transition-colors hover:bg-smoked hover:text-plaster"
            >
              <p className="annot muted group-hover:text-bronze-bright">Fastest</p>
              <p className="display mt-3 text-2xl">WhatsApp the brothers</p>
              <p className="muted mt-2 text-sm group-hover:text-stone-dark">
                Straight to Samuel · 07444 551241
              </p>
            </a>
            <Link
              href="/contact#investor-list"
              className="group bg-plaster p-7 transition-colors hover:bg-smoked hover:text-plaster"
            >
              <p className="annot muted group-hover:text-bronze-bright">For investors</p>
              <p className="display mt-3 text-2xl">Join the deal list</p>
              <p className="muted mt-2 text-sm group-hover:text-stone-dark">
                Hear about opportunities as they land
              </p>
            </Link>
            <a
              href="mailto:contact@samnharv.com"
              className="group bg-plaster p-7 transition-colors hover:bg-smoked hover:text-plaster"
            >
              <p className="annot muted group-hover:text-bronze-bright">On paper</p>
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
