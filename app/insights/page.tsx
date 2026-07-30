import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import { INSIGHTS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights — Property Investment Education",
  description:
    "Plain-English property education for UK property investors and landlords — BRRR deals, rent to rent, below market value buying, serviced accommodation and what actually makes investment property deals work.",
  alternates: { canonical: "/insights" },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function InsightsPage() {
  return (
    <main id="main" className="m-paper pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Insights</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>The market,</Line>
            <Line>
              in plain <span className="display-it">English.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            No hype, no jargon, no predictions we can&rsquo;t stand behind —
            just how the strategies actually work, written by the people
            running them.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <ul className="border-t hairline">
            {INSIGHTS.map((post) => (
              <li key={post.slug} className="border-b hairline">
                <Lift>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="group grid gap-4 py-8 md:grid-cols-[6rem_1fr_auto] md:items-baseline md:gap-8"
                  >
                    <span className="annot flex h-7 w-16 items-center justify-center bg-smoked text-bronze-bright">
                      {post.tag}
                    </span>
                    <span>
                      <span className="display block text-2xl transition-colors group-hover:text-stone md:text-4xl">
                        {post.title}
                      </span>
                      <span className="muted mt-2 block max-w-2xl leading-relaxed">
                        {post.standfirst}
                      </span>
                    </span>
                    <span className="annot muted whitespace-nowrap">
                      {formatDate(post.date)} · {post.readMinutes} min ·{" "}
                      {post.audience}
                    </span>
                  </Link>
                </Lift>
              </li>
            ))}
          </ul>

          <p className="annot muted mt-10">
            More published as it&rsquo;s written — join the deal list and
            you&rsquo;ll never need to check back.
          </p>
        </div>
      </section>
    </main>
  );
}
