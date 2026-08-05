import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import { POWER_TEAM } from "@/lib/power-team";

export const metadata: Metadata = {
  title: "The Power Team — Introductions With Every Deal",
  description:
    "Buy a deal from Sam n Harv and inherit the bench that runs our own projects — auction solicitor, independent surveyor, builder, SA-specialist broker, accountant and more. Introductions on request, per deal.",
  alternates: { canonical: "/power-team" },
};

export default function PowerTeamPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">The power team</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>You buy the deal.</Line>
            <Line>
              You inherit <span className="display-it">our people.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            A deal is only as good as the team that executes it. Every
            professional below works on our own projects — and when you buy
            a deal through us, the introductions come with it. No directories,
            no strangers: the same people, warmed up, expecting your call.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {POWER_TEAM.map((p, i) => (
              <Lift key={p.role} className="bg-[var(--plaster)]">
                <div className="flex h-full flex-col p-6 md:p-7">
                  <p className="annot text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="display mt-3 text-2xl">{p.role}</h2>
                  <p className="muted mt-3 text-[0.9375rem] leading-relaxed">
                    {p.why}
                  </p>
                  <p className="annot muted mt-auto pt-5">{p.proof}</p>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">How it works</p>
            <p className="display mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">
              Introductions are made per deal, personally — because a
              recommendation is our name on{" "}
              <span className="display-it">someone else&rsquo;s work.</span>
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--stone-dark)]">
              We don&rsquo;t publish names and numbers, and we introduce you
              to who the deal actually needs — an auction purchase needs the
              solicitor first; a heavy refurb starts with the builder and the
              surveyor. You remain free to use anyone you like; ours are
              simply the people we trust with our own money.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-[var(--stone-dark)]">
              And to be clear: <span className="text-bronze">introductions
              are recommendations, not a charged service.</span> We make
              nothing from them — you deal with each professional directly,
              on their normal terms. We recommend them for one reason: they
              make our deals go well, and we&rsquo;d like yours to go the
              same way.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/deals" className="btn btn-ink">
                See the current deals
              </Link>
              <Link href="/join" className="btn btn-ghost">
                Join the deal list
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
