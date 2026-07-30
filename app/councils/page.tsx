import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line } from "@/components/reveal";
import PlacementForm from "@/components/placement-form";

export const metadata: Metadata = {
  title: "Councils — Supported Accommodation Placements",
  description:
    "Safe, well-run accommodation placements for children and young adults, in partnership with local authorities. Over a year working with our local council: ten-plus young people placed safely, many now settled in permanent homes. Placement requests answered same day.",
  alternates: { canonical: "/councils" },
};

const PROVIDE = [
  {
    head: "Safe, decent homes",
    body: "Clean, well-kept, properly maintained accommodation — the standard we hold for every property we operate, held here where it matters most.",
  },
  {
    head: "Fast, honest answers",
    body: "Placement requests answered the same working day. If we can't help, we say so immediately — we won't waste an officer's time.",
  },
  {
    head: "Two named people",
    body: "You deal with Samuel and Harvey directly — the owners, not a rota. One number, answered evenings and weekends for urgent placements.",
  },
  {
    head: "Paperwork in order",
    body: "Gas, electrical and safety certificates current and shared up front; clear agreements in writing; full cooperation with your safeguarding and inspection requirements. Samuel holds an Enhanced DBS check, available for inspection on request.",
  },
];

export default function CouncilsPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">For local authorities</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Placements done</Line>
            <Line>
              <span className="display-it">properly.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Supported accommodation for children and young adults, provided in
            partnership with local authorities — safe conditions, straight
            communication, and two named people who answer.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">The record so far</p>
            <p className="display mt-4 max-w-3xl text-3xl leading-tight md:text-4xl">
              Over a year working with our local authority — more than ten
              young people placed safely, many now moved on into{" "}
              <span className="display-it">permanent, settled homes.</span>
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--stone-dark)]">
              That partnership is our reference. We&rsquo;re now offering the
              same service to other councils across the country — references
              from our current authority available on request.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2">
            {PROVIDE.map((p) => (
              <div key={p.head} className="bg-[var(--plaster)] p-6 md:p-8">
                <h2 className="display text-2xl">{p.head}</h2>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="annot mt-6 muted">
            We operate our own accommodation day to day —{" "}
            <Link href="/stays" className="text-bronze hover:text-ink">
              see the standard we run →
            </Link>{" "}
            · Insurance, training &amp; standards —{" "}
            <Link href="/standards" className="text-bronze hover:text-ink">
              our compliance ledger →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="display text-3xl md:text-4xl">
            Request a <span className="display-it">placement.</span>
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed muted">
            Planned, urgent or ongoing capacity — tell us what you need and
            you&rsquo;ll have an answer the same working day. Urgent placements:
            call us directly, any day.
          </p>
          <div className="mt-8">
            <PlacementForm />
          </div>
        </div>
      </section>
    </main>
  );
}
