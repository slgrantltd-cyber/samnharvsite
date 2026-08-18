import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rise, Line, Lift, ScrubWords } from "@/components/reveal";
import BenchmarkMark from "@/components/benchmark-mark";
import { photoPath } from "@/lib/photos";

export const metadata: Metadata = {
  title: "The brothers",
  description:
    "Samuel and Harvey Grant — the two brothers behind the property investment company, sourcing investment property deals from the UK South West. Who we are and how we work.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    name: "We run what we recommend",
    body: "We operate property every day — placements, guests, maintenance, the numbers. Advice from people who do the work is the only kind worth giving.",
  },
  {
    name: "The person who answers does the work",
    body: "No handovers to an account manager. You message Samuel or Harvey, and the brother who replies is the one on the deal.",
  },
  {
    name: "Bad news travels fastest",
    body: "If a deal wobbles, you hear it from us first, with the numbers. Trust is built in the uncomfortable phone calls.",
  },
  {
    name: "In writing, before anything moves",
    body: "Fees, roles, risks and timelines agreed on paper up front. If it's not written down, it isn't agreed.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="m-paper pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The brothers</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Same surname.</Line>
            <Line>
              Same <span className="display-it">standard.</span>
            </Line>
          </Rise>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10 md:pb-28">
        <div className="mx-auto max-w-4xl">
          <ScrubWords
            className="display text-3xl leading-tight md:text-5xl"
            text="Brothers can't hide from each other, and they can't walk away from a mess. That's the real structure of this company: two people whose names are on everything, doing deals they'll still be answering for at the family table in twenty years."
          />
        </div>
      </section>

      <section className="on-stone px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px bg-[var(--line-light)] md:grid-cols-2">
            {[
              {
                name: "Samuel",
                role: "Deals & investor relations",
                body: "Finds and structures the deals, runs the numbers, and looks after the people whose money is at work. The first voice you'll hear, and the one who says no to most of what we see.",
                wa: "https://wa.me/447444551241",
                tel: "07444 551241",
                photo: photoPath("samuel.jpg"),
              },
              {
                name: "Harvey",
                role: "Operations & delivery",
                body: "Runs the works, the units and the day-to-day — including our two serviced accommodation units. The reason the plan on paper becomes a property that performs.",
                wa: "https://wa.me/447753600183",
                tel: "07753 600183",
                photo: photoPath("harvey.jpg"),
              },
            ].map((p) => (
              <Lift key={p.name} className="bg-smoked p-8 md:p-12">
                {p.photo ? (
                  <div className="shadow-daylight relative aspect-[4/3] overflow-clip">
                    <Image
                      src={p.photo}
                      alt={`${p.name} — portrait`}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover object-[50%_20%]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center border border-[var(--line-light)]">
                    {/* PLACEHOLDER — drop portrait into public/photos to replace */}
                    <div className="text-center">
                      <BenchmarkMark className="mx-auto h-10 w-10 text-bronze-bright" />
                      <p className="annot muted mt-3">Portrait to follow</p>
                    </div>
                  </div>
                )}
                <p className="annot mt-8 text-bronze-bright">{p.role}</p>
                <p className="display mt-2 text-5xl">{p.name}</p>
                <p className="muted mt-4 leading-relaxed">{p.body}</p>
                <a href={p.wa} className="btn btn-ghost mt-8" rel="noopener">
                  WhatsApp {p.name} · {p.tel}
                </a>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">How we work</p>
          <Rise as="h2" className="display mt-3 text-4xl md:text-6xl">
            <Line>Four things we</Line>
            <Line>
              won&rsquo;t <span className="display-it">bend on.</span>
            </Line>
          </Rise>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Lift key={p.name} className="border hairline p-7 md:p-9">
                <span className="annot chip">{String(i + 1).padStart(2, "0")}</span>
                <p className="display mt-5 text-2xl md:text-3xl">{p.name}</p>
                <p className="muted mt-3 leading-relaxed">{p.body}</p>
              </Lift>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t hairline pt-10 md:flex-row md:items-center">
            <p className="max-w-xl text-lg leading-relaxed">
              The rest — where we grew up, why property, what we&rsquo;ve
              built so far — is better told in person.
            </p>
            <Link href="/contact" className="btn btn-ink shrink-0">
              Come and ask us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
