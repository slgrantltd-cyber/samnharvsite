import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  RESOURCES,
  getResource,
  relatedResources,
} from "@/lib/resources";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const doc = getResource((await params).slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Free Download`,
    description: doc.description,
    alternates: { canonical: `/resources/${doc.slug}` },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const doc = getResource((await params).slug);
  if (!doc) notFound();
  const related = relatedResources(doc.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.samnharv.com" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.samnharv.com/resources" },
      { "@type": "ListItem", position: 3, name: doc.title, item: `https://www.samnharv.com/resources/${doc.slug}` },
    ],
  };

  return (
    <main id="main" className="m-paper pt-24 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="annot muted">
            <Link href="/resources" className="hover:text-ink">
              Resources
            </Link>{" "}
            — {doc.category} · {doc.readMinutes} min
          </p>
          <h1 className="display mt-4 text-4xl md:text-6xl">{doc.title}</h1>
          <p className="mt-6 text-lg leading-relaxed muted">{doc.intro}</p>

          <div className="mt-7 border-y py-4 hairline">
            <p className="annot text-bronze">How to use this</p>
            <p className="mt-2 leading-relaxed">{doc.use}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`/downloads/${doc.slug}.pdf`}
              className="btn btn-ink"
              download
            >
              Download the PDF
            </a>
            <Link href="/deal-intelligence" className="btn btn-ghost">
              Run the numbers →
            </Link>
          </div>

          {doc.sections.map((section, i) => (
            <section key={section.heading} className="mt-12">
              <div className="flex items-baseline gap-4 border-b pb-3 hairline">
                <span className="annot text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display text-2xl md:text-3xl">
                  {section.heading}
                </h2>
              </div>
              {section.intro && (
                <p className="mt-4 leading-relaxed muted">{section.intro}</p>
              )}
              <ul className="mt-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b py-3.5 leading-relaxed hairline"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 border border-[var(--stone)]"
                    />
                    <span className="text-[0.9688rem] md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="mt-14 border-t pt-8 hairline">
            <p className="annot muted">Related documents</p>
            <ul className="mt-2">
              {related.map((r) => (
                <li key={r.slug} className="border-b hairline">
                  <Link
                    href={`/resources/${r.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="display text-lg group-hover:text-[var(--bronze)] md:text-xl">
                      {r.title}
                    </span>
                    <span className="annot shrink-0 muted">
                      {r.readMinutes} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="annot mt-10 muted">
            Working documents, not advice — take professional advice where your
            situation needs it.
          </p>
        </div>
      </article>
    </main>
  );
}
