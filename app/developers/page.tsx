import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";

export const metadata: Metadata = {
  title: "For Property Developers — Income on Finished Stock",
  description:
    "Company lets for developers with Sam n Harv — guaranteed rent on unsold units from practical completion, single unit to whole block, with contractual hand-backs so your stock stays sellable. We buy for cash too.",
  alternates: { canonical: "/developers" },
};

const PAINS = [
  {
    pain: "Finished units, still unsold",
    detail:
      "Every empty unit keeps drawing development finance interest, council tax, insurance and security — the scheme is built, but it's still costing you money every month.",
    answer:
      "A company let starts guaranteed rent the month a unit is ready — one unit or the whole block, furnished and occupied by us.",
  },
  {
    pain: "Renting out kills the sale",
    detail:
      "Under the Renters' Rights Act an AST is periodic with no fixed end — so tenanted stock sells slower, values lower, and some buyers' lenders won't touch it.",
    answer:
      "A company let sits outside the assured-tenancy framework. Hand-back dates are contractual — you sell with vacant possession, on a schedule we agree up front.",
  },
  {
    pain: "The sales period is running long",
    detail:
      "Units shift slower than the appraisal said, and every extra month of carry eats the margin — the pressure is to discount just to get out.",
    answer:
      "Our rent covers the carry while you hold for the price the scheme deserves — instead of funding the wait out of your own margin.",
  },
  {
    pain: "Empty schemes go stale",
    detail:
      "Unoccupied stock means unheated rooms, insurance conditions, dead windows at viewings — and a scheme that photographs like nobody wants it.",
    answer:
      "We furnish, heat and occupy the units and keep them inspection-ready. A warm, lived-in scheme shows better and sells better.",
  },
  {
    pain: "The lender wants an exit at completion",
    detail:
      "Development finance is priced to end at practical completion — but refinancing onto cheaper term debt needs an income line the valuer can point to.",
    answer:
      "A multi-year company let with guaranteed rent gives the scheme exactly that — income in place while sales complete at your pace.",
  },
];

const STEPS = [
  {
    head: "Walk us round the scheme",
    body: "One unit or all of them — finished, near-finished, or a phase that's about to complete. We tell you the same week what we'd take and at what rent.",
  },
  {
    head: "Agree the shape",
    body: "Rent, term and hand-back mechanics, in writing. Selling through? We build break-on-sale terms in from day one — typically 3–5 years on whatever isn't sold.",
  },
  {
    head: "We furnish and occupy",
    body: "We furnish every unit and place vetted working professionals — contractors, relocations, professionals on placement. Managed hands-on by us, every day.",
  },
  {
    head: "You sell on your schedule",
    body: "As units sell, we hand them back with vacant possession on the agreed terms. The rest keep paying rent. No discounting to exit, no tenants in situ at completion.",
  },
  {
    head: "Keep, hand back — or sell to us",
    body: "At the end of the term: renew, take the units back, or talk to us about the ones you'd rather be rid of. We buy with cash, chain-free.",
  },
];

const WINS = [
  {
    head: "Income from practical completion",
    body: "Every finished unit starts earning instead of costing — guaranteed rent by company standing order, occupied or not.",
  },
  {
    head: "One covenant for the whole block",
    body: "One company, one agreement, one standing order — not twenty tenancies, twenty deposits and twenty sets of referencing.",
  },
  {
    head: "Your stock stays sellable",
    body: "Contractual hand-backs mean vacant possession is never in doubt — the units rent without ever becoming harder to sell.",
  },
  {
    head: "The scheme stays alive",
    body: "Furnished, heated, maintained and occupied — better viewings, easier insurance, and a development that looks like it's working. Because it is.",
  },
];

export default function DevelopersPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">For property developers</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Every empty unit is interest.</Line>
            <Line>
              We turn it into <span className="display-it">income.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Finished stock shouldn&rsquo;t sit there costing you money while
            the sales complete. We take unsold units on company lets —
            single unit to whole block — pay guaranteed rent from the day
            they&rsquo;re ready, and hand them back as you sell.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">
              The worry, answered first
            </p>
            <p className="display mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">
              &ldquo;Doesn&rsquo;t a tenant kill the sale?&rdquo; Not this
              kind. Hand-backs are in the contract —{" "}
              <span className="display-it">
                you sell with vacant possession.
              </span>
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--stone-dark)]">
              A let to a company sits outside the assured-tenancy framework
              the Renters&rsquo; Rights Act reshaped — so fixed terms,
              break-on-sale clauses and agreed hand-back dates all still
              exist here. Your units earn while they wait, and they&rsquo;re
              never harder to sell than the day we moved in.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">The carry, solved</p>
          <h2 className="display mt-3 max-w-3xl text-3xl leading-snug md:text-4xl">
            The scheme is built. The costs didn&rsquo;t stop.{" "}
            <span className="display-it">Here&rsquo;s what we do about each one.</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-px border bg-[var(--line)] hairline">
            {PAINS.map((p) => (
              <Lift key={p.pain} className="bg-[var(--plaster)]">
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 md:gap-10 md:p-7">
                  <div>
                    <h3 className="display text-xl md:text-2xl">{p.pain}</h3>
                    <p className="muted mt-2 text-[0.9375rem] leading-relaxed">
                      {p.detail}
                    </p>
                  </div>
                  <div className="border-t hairline pt-4 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                    <p className="annot text-bronze">With a company let</p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed">
                      {p.answer}
                    </p>
                  </div>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">How it works — step by step</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-5">
            {STEPS.map((s, i) => (
              <Lift key={s.head} className="bg-[var(--plaster)]">
                <div className="flex h-full flex-col p-6">
                  <p className="annot text-bronze">0{i + 1}</p>
                  <h2 className="display mt-3 text-xl leading-snug">{s.head}</h2>
                  <p className="muted mt-3 text-[0.875rem] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">What&rsquo;s in it for the scheme</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2">
            {WINS.map((w) => (
              <Lift key={w.head} className="bg-[var(--plaster)]">
                <div className="p-7 md:p-8">
                  <h2 className="display text-2xl">{w.head}</h2>
                  <p className="muted mt-3 max-w-md text-[0.9375rem] leading-relaxed">
                    {w.body}
                  </p>
                </div>
              </Lift>
            ))}
          </div>
          <p className="annot mt-6 muted">
            Also worth knowing: we buy units and small blocks for cash —
            chain-free, at a straight number, decided quickly.{" "}
            <Link href="/contact" className="text-bronze hover:text-ink">
              talk to us →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="border hairline p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="display text-3xl md:text-4xl">
                  Try it on <span className="display-it">one unit.</span>
                </h2>
                <p className="muted mt-4 leading-relaxed">
                  Pick the unit that&rsquo;s been finished the longest. One
                  conversation, a straight answer the same week — and if
                  it&rsquo;s not a fit we&rsquo;ll say so. We operate our
                  own properties and house council placements — the
                  standard we run is public on our{" "}
                  <Link href="/standards" className="text-bronze hover:text-ink">
                    standards ledger
                  </Link>
                  .
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <a href="tel:+447444551241" className="btn btn-ink">
                  Call Samuel — 07444 551241
                </a>
                <a href="mailto:contact@samnharv.com" className="btn btn-ghost">
                  contact@samnharv.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
