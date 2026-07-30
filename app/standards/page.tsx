import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, ScrubWords } from "@/components/reveal";
import StandardsLedger from "@/components/standards-ledger";

export const metadata: Metadata = {
  title: "Professional Standards & Compliance",
  description:
    "The insurance we hold, the professional training we've completed, and the industry standards we're working towards — stated plainly, kept current, and open to inspection.",
  alternates: { canonical: "/standards" },
};

export default function StandardsPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The standards ledger</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Professional standards</Line>
            <Line>
              <span className="display-it">&amp; compliance.</span>
            </Line>
          </Rise>
          <div className="mt-8 max-w-2xl">
            <ScrubWords
              className="text-lg leading-relaxed md:text-xl"
              text="Professionalism isn't just about delivering results — it's about operating with integrity, maintaining high standards and continually investing in what we know. We are committed to ongoing training, recognised industry standards and comprehensive insurance, so that every landlord, investor and tenant we work with is protected by more than good intentions."
            />
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-10">
            <p className="annot text-[var(--bronze-bright)]">How to read this page</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-[var(--stone-dark)]">
              Everything below is stated exactly as it stands. What we hold is
              marked as held. What we&rsquo;ve completed is marked as completed.
              And what we&rsquo;re still earning carries a{" "}
              <span className="text-bronze">working towards</span>{" "}mark until
              the day it&rsquo;s done — no borrowed badges, no implied
              memberships. Certificates are available to view as they&rsquo;re
              added, and on request at any time.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <StandardsLedger />
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl border-t hairline pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="muted max-w-xl leading-relaxed">
              Want to verify anything on this page, or need our documents for a
              placement, tenancy or deal? Ask — we&rsquo;ll send them the same
              working day.
            </p>
            <Link href="/contact" className="btn btn-ink shrink-0">
              Request our documents
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
