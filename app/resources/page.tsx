import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line } from "@/components/reveal";
import { CATEGORIES, RESOURCES } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Investor Resources — Templates, Checklists & Guides",
  description:
    "Free property investment templates, due diligence checklists, call scripts and planners — the working documents Sam n Harv use on real deals, free to download as PDFs.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The Resource Library</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Our working</Line>
            <Line>
              documents. <span className="display-it">Free.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            These aren&rsquo;t marketing PDFs — they&rsquo;re the checklists,
            scripts and planners we use on our own deals, written up properly.
            Read them here or take the PDF with you. No email gate.
          </p>
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const docs = RESOURCES.filter((r) => r.category === cat.name);
        if (docs.length === 0) return null;
        return (
          <section key={cat.name} className="px-5 pb-14 md:px-10 md:pb-20">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b pb-4 hairline">
                <h2 className="display text-2xl md:text-3xl">{cat.name}</h2>
                <p className="annot muted">{cat.blurb}</p>
              </div>
              <ul>
                {docs.map((doc) => (
                  <li key={doc.slug} className="border-b hairline">
                    <Link
                      href={`/resources/${doc.slug}`}
                      className="group flex flex-col gap-2 py-5 transition-colors hover:bg-[var(--limestone)] md:flex-row md:items-baseline md:gap-8 md:px-4 md:py-6"
                    >
                      <span className="display text-xl group-hover:text-[var(--bronze)] md:w-80 md:shrink-0 md:text-2xl">
                        {doc.title}
                      </span>
                      <span className="flex-1 text-[0.9375rem] leading-relaxed muted">
                        {doc.description}
                      </span>
                      <span className="annot shrink-0 muted">
                        {doc.readMinutes} min · PDF
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">Next step</p>
            <p className="display mt-4 max-w-2xl text-3xl md:text-4xl">
              Put the numbers to work in the{" "}
              <span className="display-it">Deal Analyzer.</span>
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-[var(--plaster)]/82">
              Every checklist here feeds one decision: buy or walk. Run your
              figures through Deal Intelligence and see the verdict we&rsquo;d
              reach.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/deal-intelligence" className="btn btn-ghost">
                Analyse a deal →
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
