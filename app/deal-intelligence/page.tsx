import type { Metadata } from "next";
import { Rise, Line } from "@/components/reveal";
import DealAnalyzer from "@/components/deal-analyzer";

export const metadata: Metadata = {
  title: "Deal Intelligence — Investment Deal Analyzer",
  description:
    "Free investment deal analyzer for UK property investors: BRRR deals, buy to let investments, rent to rent, HMO investment, lease options and flips. Live cash flow, ROI and our honest verdict.",
  alternates: { canonical: "/deal-intelligence" },
};

export default function DealIntelligencePage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Deal Intelligence</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Investment</Line>
            <Line>
              Deal <span className="display-it">Analyzer.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Analyse any investment strategy in seconds. Put a deal&rsquo;s
            figures on the desk and see what we would see — the cash flow, the
            return, and whether we would buy it.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <DealAnalyzer />
        </div>
      </section>
    </main>
  );
}
