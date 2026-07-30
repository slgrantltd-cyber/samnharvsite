import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line } from "@/components/reveal";
import FaqLedger, { type Faq } from "@/components/faq-ledger";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Straight answers for property investors, landlords and guests — how property deal sourcing works, what it costs, rent to rent agreements and our serviced accommodation stays.",
  alternates: { canonical: "/faq" },
};

const INVESTOR_FAQS: Faq[] = [
  {
    q: "What does “deal sourcing” actually mean?",
    a: "We find and negotiate property deals — BRRR, flips, blocks, land, buy-to-SA — then offer them to investors we work with. You buy the deal; we've done the finding, the numbers and the legwork, and we stay involved after completion.",
  },
  {
    q: "What do you charge?",
    a: "It depends on the deal and the work involved, so we don't publish a rate card. What we do promise: the fee is agreed in writing before anything is committed, every time, with no surprises later.",
  },
  {
    q: "Where do you operate?",
    a: "We're based in the UK South West and work deals across the country. If the numbers work and we can stand behind it, geography isn't the constraint.",
  },
  {
    q: "How do I hear about deals first?",
    a: "Join the deal list. Tell us your strategy, budget and areas, and when something crosses our desk that fits, you hear about it directly — there's no newsletter padding.",
  },
  {
    q: "Are you financial advisers?",
    a: "No. We source and structure property deals; we don't give regulated financial advice. Do your own due diligence, and take independent advice where you need it — we'll happily work alongside your advisers.",
  },
];

const LANDLORD_FAQS: Faq[] = [
  {
    q: "How does rent to rent work for me as a landlord?",
    a: "We take your property on at a guaranteed rent and operate it ourselves — including as serviced accommodation where it suits. You get certainty and a single point of contact; we handle the guests, the turnovers and the upkeep, and everything is agreed in writing first.",
  },
  {
    q: "Who actually looks after the property?",
    a: "Harvey runs operations day to day. The person who answers your message is the person doing the work — no call centre, no account managers.",
  },
  {
    q: "You work with councils?",
    a: "Yes — we work with local councils on housing placements, which gives some of our units steady, managed occupancy alongside short stays.",
  },
  {
    q: "I might want to sell instead. Do you buy?",
    a: "We do — directly, or through investors we work with. Tell us about the property and we'll give you an honest read on what it's worth to us, with no obligation.",
  },
];

const STAY_FAQS: Faq[] = [
  {
    q: "How do I book a stay?",
    a: "Pick your dates on the stays page and send the request — it goes straight to Harvey on WhatsApp or email, and availability and price are confirmed personally.",
  },
  {
    q: "Do you do discounts for longer stays?",
    a: "Yes. Stays of seven nights or more get a long-stay quote — the calendar flags it automatically when your dates qualify.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...INVESTOR_FAQS, ...LANDLORD_FAQS, ...STAY_FAQS].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">FAQs</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Asked often.</Line>
            <Line>
              Answered <span className="display-it">straight.</span>
            </Line>
          </Rise>
        </div>
      </section>

      <section className="px-5 pb-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="annot muted mb-4">For investors</h2>
          <FaqLedger faqs={INVESTOR_FAQS} />
        </div>
      </section>

      <section className="px-5 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="annot muted mb-4">For landlords &amp; sellers</h2>
          <FaqLedger faqs={LANDLORD_FAQS} />
        </div>
      </section>

      <section className="px-5 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="annot muted mb-4">For guests</h2>
          <FaqLedger faqs={STAY_FAQS} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border-t hairline pt-10 md:flex-row md:items-center">
          <p className="max-w-xl text-lg leading-relaxed">
            Question not here? That&rsquo;s what the doors are for.
          </p>
          <Link href="/contact" className="btn btn-ink shrink-0">
            Ask us directly
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
