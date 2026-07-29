import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import StrategyLedger from "@/components/strategy-ledger";

export const metadata: Metadata = {
  title: "What we do — Sam n Harv",
  description:
    "BRRR, rent to rent, flips, blocks, land and serviced accommodation. How Sam n Harv find, buy and operate property deals across the UK.",
};

const PROCESS = [
  {
    step: "Walk the ground",
    body: "Every deal starts with the area, not the brochure: sold prices, rental demand, who actually lives on that street and what they pay.",
  },
  {
    step: "Run the numbers cold",
    body: "Purchase, works, finance, exit — stress-tested before anyone gets excited. If the deal only works in the best case, it doesn't work.",
  },
  {
    step: "Agree everything in writing",
    body: "Fees, roles, timelines and who carries which risk — on paper before a penny moves. No surprises is the whole service.",
  },
  {
    step: "Stay after completion",
    body: "We operate property ourselves, so we don't vanish at exchange. The relationship is the product; the deal is just the first one.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">What we do</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Find the deal.</Line>
            <Line>
              Do the deal. <span className="display-it">Stay.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Six strategies, one standard: we only bring people deals we would
            put our own money into — and often already have.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <StrategyLedger />
        </div>
      </section>

      <section className="on-stone px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The method</p>
          <Rise as="h2" className="display mt-3 text-4xl md:text-6xl">
            <Line>How a deal earns</Line>
            <Line>
              its place on the <span className="display-it">map.</span>
            </Line>
          </Rise>

          <ol className="mt-14 grid gap-px bg-[var(--line-light)] md:grid-cols-2">
            {PROCESS.map((p, i) => (
              <Lift key={p.step} className="bg-smoked p-8 md:p-10">
                <p className="annot text-bronze-bright">Step {i + 1}</p>
                <p className="display mt-3 text-3xl">{p.step}</p>
                <p className="muted mt-4 leading-relaxed">{p.body}</p>
              </Lift>
            ))}
          </ol>

          <div className="mt-14 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="muted max-w-xl leading-relaxed">
              Fees depend on the deal and the work involved — so we put them in
              writing up front, before anything is committed, every time.
            </p>
            <Link href="/contact" className="btn btn-ghost shrink-0">
              Ask us about a deal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
