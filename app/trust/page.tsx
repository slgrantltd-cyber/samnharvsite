import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Our Word — How We Underwrite, Disclose and Behave",
  description:
    "The rules we hold ourselves to on every mandate: worst case stays positive, risk stated plainly, the same numbers to every buyer, no return guaranteed, and we stay after completion. Investment carries risk — we'd rather lose a sale than your trust.",
  alternates: { canonical: "/trust" },
};

/* Every commitment below is a rule, not an adjective — something a buyer
   can hold us to, and can check against the deal pack in front of them. */
const RULES = [
  {
    n: "01",
    head: "Worst case first.",
    body: "Every mandate is shown at a poor case, a likely case and a best case — and we don't bring it to you unless the poor case still stands up. We buy on likely. We never sell on best.",
    check: "Check it: every pack carries all three scenarios on one page.",
  },
  {
    n: "02",
    head: "Underwritten as the boring version.",
    body: "A serviced-accommodation deal must work as a plain let. A council-placement deal must work without the council. The upside is upside — it is never the thing the deal depends on.",
    check: "Check it: the fallback case is printed under the headline numbers.",
  },
  {
    n: "03",
    head: "Risk, stated plainly.",
    body: "Planning risk, title defects, a railway line, spray foam in the roof — it goes in the pack in plain English, on the first page where it belongs, not in a footnote. If we found it, you'll read it.",
    check: "Check it: a 'risks, stated plainly' section in every pack.",
  },
  {
    n: "04",
    head: "Nothing guaranteed. Ever.",
    body: "Property carries real risk and we won't pretend otherwise. We do not guarantee returns, occupancy, values or council demand — and we'd ask you to walk away from anyone who does.",
    check: "Check it: no figure on this site or in any pack is presented as a guarantee.",
  },
  {
    n: "05",
    head: "The same numbers to everyone.",
    body: "One underwriting, one set of numbers, every buyer. We don't improve a projection to close a sale, and we don't quietly move the purchase price for a better commission.",
    check: "Check it: our fee is a fixed figure, declared in the pack, payable on exchange.",
  },
  {
    n: "06",
    head: "Our fee is in writing, up front.",
    body: "A fixed sourcing fee, stated before you see a property, payable only when you exchange. No hidden margin, no kickback from the agent, no markup on the works.",
    check: "Check it: the fee line is in the heads of terms you sign before anything else.",
  },
  {
    n: "07",
    head: "We qualify you before we sell to you.",
    body: "A conversation, identity and proof of funds before any particulars. Not to be difficult — because a deal sold to the wrong person is a bad deal, however good the numbers.",
    check: "Check it: the paper gate precedes every viewing, without exception.",
  },
  {
    n: "08",
    head: "We stay after completion.",
    body: "Every deal we sell carries the option for us to take it on as tenant or operator once the works are done. We're not going anywhere — our next mandate depends on how this one performs for you.",
    check: "Check it: the aftercare provision is written into every sourcing agreement.",
  },
  {
    n: "09",
    head: "We say no.",
    body: "If it doesn't fit you, we say so on the first call. If the numbers stop working mid-process — survey, legal pack, a renegotiation that goes the wrong way — we tell you to walk, and we walk with you.",
    check: "Check it: ask us about the deals we've turned down. We'll tell you.",
  },
];

export default function TrustPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Our word</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>We&rsquo;d rather lose the sale</Line>
            <Line>
              than <span className="display-it">your trust.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Investment carries risk. Anyone who tells you otherwise is selling
            something. What we can promise is how we behave — and because
            promises are cheap, every one below is a rule you can check
            against the pack in front of you.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline">
            {RULES.map((r) => (
              <Lift key={r.n} className="bg-[var(--plaster)]">
                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-12 md:gap-8 md:p-8">
                  <p className="annot text-bronze md:col-span-1">{r.n}</p>
                  <h2 className="display text-2xl md:col-span-3 md:text-3xl">{r.head}</h2>
                  <div className="md:col-span-8">
                    <p className="leading-relaxed">{r.body}</p>
                    <p className="annot mt-3 muted">{r.check}</p>
                  </div>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">Why this is the business model, not the marketing</p>
            <p className="display mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">
              We don&rsquo;t make our money on the sale. We make it on the
              <span className="display-it"> second deal</span> — and the
              third. There is no second deal with someone we let down.
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--plaster)]/80">
              A sourcer who sells you something that underperforms has made
              one fee and lost a client. We operate the properties, we take
              the aftercare, we answer the phone when it goes wrong — so the
              only way this works for us is if it works for you.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">Where to verify us</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {[
              ["Companies House", "S L Grants Ltd · 16505504 — our accounts and filings are public.", "https://find-and-update.company-information.service.gov.uk/company/16505504", "View the record →"],
              ["Google reviews", "Written by clients, on a platform we can't edit.", "https://share.google/lsd2TlaWo3OpRFqhO", "Read them →"],
              ["Standards ledger", "Insurance, training and compliance — what's in force and what we're still working towards, labelled honestly.", "/standards", "See the ledger →"],
            ].map(([h, b, href, cta]) => (
              <Lift key={h} className="bg-[var(--plaster)] p-7 md:p-8">
                <p className="display text-2xl">{h}</p>
                <p className="muted mt-3 text-[0.9375rem] leading-relaxed">{b}</p>
                {href.startsWith("http") ? (
                  <a href={href} rel="noopener" className="annot mt-5 inline-flex items-center gap-2 text-ink hover:text-bronze">{cta}</a>
                ) : (
                  <Link href={href} className="annot mt-5 inline-flex items-center gap-2 text-ink hover:text-bronze">{cta}</Link>
                )}
              </Lift>
            ))}
          </div>
          <p className="muted mt-10 max-w-2xl leading-relaxed">
            Still have a question about how we work, who we&rsquo;ve said no
            to, or what went wrong on a deal and how we handled it? Ask. The
            answer will be a straight one.{" "}
            <a href="tel:+447444551241" className="text-bronze hover:text-ink">07444 551241</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
