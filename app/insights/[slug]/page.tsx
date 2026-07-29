import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Rise, Line } from "@/components/reveal";
import { INSIGHTS, getInsight } from "@/lib/insights";

export function generateStaticParams() {
  return INSIGHTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getInsight((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — Sam n Harv`,
    description: post.standfirst,
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getInsight((await params).slug);
  if (!post) notFound();

  return (
    <main id="main" className="m-paper pt-24 md:pt-28">
      <article className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="annot muted">
            <Link href="/insights" className="hover:text-ink">
              Insights
            </Link>{" "}
            · {post.tag} · {formatDate(post.date)} · {post.readMinutes} min
          </p>
          <Rise as="h1" className="display mt-4 text-4xl md:text-6xl">
            <Line>{post.title}</Line>
          </Rise>
          <p className="mt-6 text-xl leading-relaxed md:text-2xl">
            {post.standfirst}
          </p>

          <div className="mt-12 border-t hairline pt-10">
            {post.body.map((section, i) => (
              <section key={i} className={i > 0 ? "mt-10" : undefined}>
                {section.heading && (
                  <h2 className="display mb-4 text-2xl md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="mt-4 text-base leading-relaxed md:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <footer className="mt-14 border-t hairline pt-8">
            <p className="annot muted">
              Written by Samuel &amp; Harvey — the people running the deals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-ink">
                Talk a deal through
              </Link>
              <Link href="/insights" className="btn btn-ghost">
                More insights
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
