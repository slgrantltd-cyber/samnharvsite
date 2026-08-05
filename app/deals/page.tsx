import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import { DEALS, STATUS_LABEL } from "@/lib/deals";

export const metadata: Metadata = {
  title: "Current Deals — Sourced Property Investments",
  description:
    "Live, anonymised property deals sourced by Sam n Harv — BRRR, BTL and serviced accommodation opportunities across the South West. Full packs, postcodes and photos shared after NDA.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
  const live = DEALS.filter((d) => !d.example);
  const shown = live.length > 0 ? live : DEALS;

  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The deal board</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Current</Line>
            <Line>
              <span className="display-it">deals.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Every deal below is real, sourced and negotiated by us. We publish
            the area and the numbers — never the address, postcode or photos.
            The full pack is shared once an NDA is signed, so a deal
            can&rsquo;t be taken to the seller behind our investors&rsquo;
            backs.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-6xl">
          {live.length === 0 && (
            <p className="annot muted mb-6">
              The next deals are in negotiation — the example below shows how
              every deal is presented. Join the list to hear first.
            </p>
          )}
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2">
            {shown.map((deal) => (
              <Lift key={deal.ref} className="bg-[var(--plaster)]">
                <article className="flex h-full flex-col p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="annot text-bronze">{deal.strategy}</span>
                    <span className="annot muted">· {deal.area}</span>
                    <span className="annot muted">· {deal.ref}</span>
                    <span
                      className={`annot ml-auto border px-2.5 py-1 ${
                        deal.status === "available"
                          ? "border-[var(--bronze)] text-bronze"
                          : "hairline text-[var(--stone-dark)]"
                      }`}
                    >
                      {deal.example ? "Illustrative example" : STATUS_LABEL[deal.status]}
                    </span>
                  </div>

                  <h2 className="display mt-5 text-2xl leading-snug md:text-3xl">
                    {deal.headline}
                  </h2>
                  <p className="muted mt-4 text-[0.9375rem] leading-relaxed">
                    {deal.summary}
                  </p>

                  <dl className="mt-6 grid grid-cols-2 gap-px border bg-[var(--line)] hairline sm:grid-cols-3">
                    {deal.numbers.map((n) => (
                      <div key={n.label} className="bg-[var(--plaster)] p-3.5">
                        <dt className="annot muted">{n.label}</dt>
                        <dd className="display mt-1.5 text-lg">{n.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                    {deal.status === "available" && !deal.example ? (
                      <Link href={`/contact?subject=Deal ${deal.ref}`} className="btn btn-ink">
                        Request the full pack
                      </Link>
                    ) : (
                      <Link href="/join" className="btn btn-ink">
                        Hear about the next one first
                      </Link>
                    )}
                    <p className="annot muted">
                      Postcode, photos &amp; full analysis after NDA
                    </p>
                  </div>
                </article>
              </Lift>
            ))}
          </div>

          <div className="mt-14 border-t hairline pt-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="muted max-w-xl leading-relaxed">
                Deals go to the list before they go on this page — most are
                reserved within days. Every deal comes with introductions to{" "}
                <Link href="/power-team" className="text-bronze hover:text-ink">
                  the power team →
                </Link>{" "}
                and you can analyse it yourself with the{" "}
                <Link href="/toolkit" className="text-bronze hover:text-ink">
                  Deal Intelligence toolkit →
                </Link>
              </p>
              <Link href="/join" className="btn btn-ghost shrink-0">
                Join the deal list
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
