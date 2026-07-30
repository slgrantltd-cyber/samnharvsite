import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line } from "@/components/reveal";
import { INSIGHTS } from "@/lib/insights";
import { GLOSSARY } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Learning Centre — Property Investment Education",
  description:
    "Free property investment education for UK investors: strategy guides, a plain-English glossary of 40+ terms, working documents and calculators — from investors who do this daily, not course sellers.",
  alternates: { canonical: "/learn" },
};

const PATHS = [
  {
    title: "Read the guides",
    body: "Strategy explained properly — BRRR, rent to rent, serviced accommodation — written from deals we've actually done.",
    href: "/insights",
    label: "Insights",
  },
  {
    title: "Run the numbers",
    body: "The Deal Intelligence analyzer and quick calculators — the same instruments we use at our own desk.",
    href: "/toolkit",
    label: "Toolkit",
  },
  {
    title: "Take the documents",
    body: "Checklists, planners and scripts as free branded PDFs. Our working paperwork, not marketing bait.",
    href: "/resources",
    label: "Resources",
  },
  {
    title: "Get straight answers",
    body: "Fees, process, compliance and how working with us actually works — asked and answered without waffle.",
    href: "/faq",
    label: "FAQs",
  },
];

export default function LearnPage() {
  const glossaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "UK Property Investment Glossary",
    hasDefinedTerm: GLOSSARY.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };

  return (
    <main id="main" className="pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The Learning Centre</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Learn it the way</Line>
            <Line>
              we <span className="display-it">learned it.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            No courses, no seminars, no upsell at the end. Education here is
            free because informed investors make better partners — and because
            we&rsquo;d rather show our working than talk about it.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2">
            {PATHS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group bg-[var(--plaster)] p-6 transition-colors duration-300 hover:bg-[var(--limestone)] md:p-8"
              >
                <span className="annot muted group-hover:text-[var(--bronze)]">
                  {p.label}
                </span>
                <span className="display mt-2 block text-2xl md:text-[1.6rem]">
                  {p.title}
                </span>
                <span className="mt-3 block max-w-md text-[0.9375rem] leading-relaxed muted">
                  {p.body}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-4 hairline">
            <h2 className="display text-2xl md:text-3xl">Start here</h2>
            <p className="annot muted">Three guides worth your evening</p>
          </div>
          <ul>
            {INSIGHTS.map((post) => (
              <li key={post.slug} className="border-b hairline">
                <Link
                  href={`/insights/${post.slug}`}
                  className="group flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:gap-8 md:py-6"
                >
                  <span className="display text-xl group-hover:text-[var(--bronze)] md:w-96 md:shrink-0 md:text-2xl">
                    {post.title}
                  </span>
                  <span className="flex-1 text-[0.9375rem] leading-relaxed muted">
                    {post.standfirst}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20" id="glossary">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-4 hairline">
            <h2 className="display text-2xl md:text-3xl">The glossary</h2>
            <p className="annot muted">
              {GLOSSARY.length} terms, plain English
            </p>
          </div>
          <dl className="mt-2">
            {GLOSSARY.map((t) => (
              <div
                key={t.term}
                className="grid grid-cols-1 gap-1 border-b py-4 hairline md:grid-cols-[16rem_1fr] md:gap-8"
              >
                <dt className="font-medium">{t.term}</dt>
                <dd className="text-[0.9375rem] leading-relaxed muted">
                  {t.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">
              When you&rsquo;re ready
            </p>
            <p className="display mt-4 max-w-2xl text-3xl md:text-4xl">
              Join the deal list, or just{" "}
              <span className="display-it">talk to us.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-ghost">
                Speak to Sam &amp; Harv →
              </Link>
              <Link href="/deal-intelligence" className="btn btn-ghost">
                Analyse a deal first →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
