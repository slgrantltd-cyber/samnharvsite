import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line } from "@/components/reveal";
import QuickCalculators from "@/components/quick-calculators";

export const metadata: Metadata = {
  title: "Investment Toolkit — Property Calculators",
  description:
    "Free property investment calculators for UK investors: stamp duty, rental yield, mortgage stress test, development margin — plus the full Deal Intelligence analyzer covering BRRR, buy to let, rent to rent, HMO, lease options and flips.",
  alternates: { canonical: "/toolkit" },
};

export default function ToolkitPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The Toolkit</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Run the numbers</Line>
            <Line>
              like <span className="display-it">we do.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            The same instruments we use at our own desk — free, instant, no
            sign-up. Start with a quick check below, or take a deal through the
            full appraisal.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="annot text-[var(--bronze-bright)]">
                The flagship instrument
              </p>
              <p className="annot text-[var(--plaster)]/82">
                BTL · BRRR · R2R · HMO · LO · FLIP
              </p>
            </div>
            <h2 className="display mt-4 max-w-2xl text-3xl md:text-5xl">
              Deal Intelligence — the full{" "}
              <span className="display-it">appraisal.</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--plaster)]/82">
              Six strategies, live recalculation, graded scores on every
              measure, and an honest written verdict: would we buy this deal?
              It covers cash flow, ROI, yield, refinance and profit in one
              place.
            </p>
            <div className="mt-7">
              <Link href="/deal-intelligence" className="btn btn-ghost">
                Open the analyzer →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-4 hairline">
            <h2 className="display text-2xl md:text-3xl">
              Quick instruments
            </h2>
            <p className="annot muted">One question each, answered live</p>
          </div>
          <div className="mt-8">
            <QuickCalculators />
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="m-paper border p-8 hairline md:p-12">
            <p className="annot muted">Keep going</p>
            <p className="display mt-4 max-w-2xl text-3xl md:text-4xl">
              The paperwork behind the numbers lives in the{" "}
              <span className="display-it">Resource Library.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/resources" className="btn btn-ink">
                Browse the resources →
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Speak to Sam &amp; Harv →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
