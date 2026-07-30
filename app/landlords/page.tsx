import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line } from "@/components/reveal";
import JoinForm from "@/components/join-form";

export const metadata: Metadata = {
  title: "Landlords — Guaranteed Rent, Fully Managed",
  description:
    "Hand your property to Sam n Harv: guaranteed rent paid every month, tenants, maintenance and compliance all handled. We operate our own serviced properties — we run yours the way we run ours.",
  alternates: { canonical: "/landlords" },
};

const PROMISES = [
  {
    head: "Guaranteed rent",
    body: "A fixed monthly figure agreed with you in writing before anything moves — paid whether the property is occupied or not.",
  },
  {
    head: "Everything handled",
    body: "Tenants, cleaning, maintenance, certificates, compliance. Your involvement ends at receiving the payment.",
  },
  {
    head: "Run like our own",
    body: "We operate our own serviced properties day to day. Yours gets the same standard — because our name is on it too.",
  },
  {
    head: "No surprises",
    body: "Terms, responsibilities and who carries which risk — on paper before a penny moves. That promise is the whole service.",
  },
];

export default async function LandlordsPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const src = (await searchParams).src;
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">For landlords</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Your rent, paid.</Line>
            <Line>
              Every <span className="display-it">month.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Hand us the keys and we handle everything — tenants, upkeep,
            compliance — while you receive a guaranteed rent whether the
            property is occupied or not.
          </p>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2">
            {PROMISES.map((p) => (
              <div key={p.head} className="bg-[var(--plaster)] p-6 md:p-8">
                <h2 className="display text-2xl">{p.head}</h2>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <p className="annot mt-6 muted">
            Proof we do this ourselves:{" "}
            <Link href="/stays" className="text-bronze hover:text-ink">
              the serviced properties we operate →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="display text-3xl md:text-4xl">
            Tell us about your <span className="display-it">property.</span>
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed muted">
            Straight answers, usually the same day. No obligation, no hard
            sell — if it&rsquo;s not right for both sides, we&rsquo;ll say so.
          </p>
          <div className="mt-8">
            <JoinForm kind="landlord" source={src ? `qr-${src}`.slice(0, 30) : "landlords-page"} />
          </div>
        </div>
      </section>
    </main>
  );
}
