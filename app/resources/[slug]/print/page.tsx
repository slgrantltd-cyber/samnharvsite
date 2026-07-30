import { notFound } from "next/navigation";
import { RESOURCES, getResource } from "@/lib/resources";

/**
 * Print-clean rendering used by scripts/generate-pdfs.sh to produce the
 * branded PDFs in public/downloads. Site chrome is hidden by the inline
 * style block; everything else is plain ink-on-paper.
 */

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export const metadata = { robots: { index: false } };

export default async function ResourcePrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const doc = getResource((await params).slug);
  if (!doc) notFound();

  return (
    <main className="bg-[#f7f5ef] px-12 py-10 text-[#1a1a1a]">
      <style>{`
        body > header, body > footer, .material-light-frame, body > a { display: none !important; }
        body { background: #f7f5ef !important; }
        @page { margin: 14mm; }
      `}</style>
      <header className="flex items-baseline justify-between border-b border-[rgba(26,26,26,0.3)] pb-4">
        <span
          className="text-lg tracking-[0.06em]"
          style={{ fontFamily: "var(--font-caslon), Georgia, serif" }}
        >
          SAM <i style={{ color: "#8c7b65" }}>n</i> HARV
        </span>
        <span className="annot muted">samnharv.com — {doc.category}</span>
      </header>

      <h1
        className="mt-8 text-4xl leading-tight"
        style={{ fontFamily: "var(--font-caslon), Georgia, serif" }}
      >
        {doc.title}
      </h1>
      <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[#5c5952]">
        {doc.intro}
      </p>
      <div className="mt-5 border-y border-[rgba(26,26,26,0.3)] py-3">
        <span className="annot" style={{ color: "#8c7b65" }}>
          How to use this —{" "}
        </span>
        <span className="text-[0.875rem] leading-relaxed">{doc.use}</span>
      </div>

      {doc.sections.map((section, i) => (
        <section key={section.heading} className="mt-8 break-inside-avoid-page">
          <div className="flex items-baseline gap-3 border-b border-[rgba(26,26,26,0.3)] pb-2">
            <span className="annot" style={{ color: "#8c7b65" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--font-caslon), Georgia, serif" }}
            >
              {section.heading}
            </h2>
          </div>
          <ul>
            {section.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-[rgba(26,26,26,0.14)] py-2.5 text-[0.875rem] leading-relaxed"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 border border-[#5c5952]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className="mt-10 flex items-baseline justify-between border-t border-[rgba(26,26,26,0.3)] pt-4">
        <span className="annot text-[#5c5952]">
          © S L Grants Ltd, trading as Sam n Harv
        </span>
        <span className="annot text-[#5c5952]">
          Working documents, not advice
        </span>
      </footer>
    </main>
  );
}
