import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";

export const metadata: Metadata = {
  title: "For Estate & Letting Agents — We're Your Best Tenant",
  description:
    "How company lets with Sam n Harv work alongside letting agents — you keep the landlord, you keep the management, you keep the fee. We're simply the tenant: one professional company let instead of churn, voids and arrears.",
  alternates: { canonical: "/agents" },
};

const STEPS = [
  {
    head: "You spot the fit",
    body: "A tired landlord. A property that keeps sticking. A void that's dragging. Anywhere a landlord is losing patience — that's where we're useful to you.",
  },
  {
    head: "We become the tenant — through you",
    body: "A company let, signed on your paperwork or ours, on terms your landlord approves. Typically 3–5 years. Nothing about your chain changes: landlord, agent, tenant. We're simply the tenant.",
  },
  {
    head: "We furnish and occupy it",
    body: "We furnish the property and place vetted working professionals — contractors, relocations, professionals on placement. Managed hands-on by us, every day.",
  },
  {
    head: "You manage as normal",
    body: "Your instruction, your management, your fee — untouched. The difference is who you're managing: one professional company that answers the phone, instead of a new tenancy to re-let every twelve months.",
  },
  {
    head: "Everyone gets paid",
    body: "The landlord gets full rent by standing order, every month, occupied or empty. You keep your management and renewal fees for years without re-letting costs. We make our margin on the operation — never out of yours.",
  },
];

const WINS = [
  {
    head: "Voids stop being your problem",
    body: "The rent runs from day one of the agreement — your landlord stops calling about empty weeks, and you stop discounting to fill them.",
  },
  {
    head: "Arrears effectively end",
    body: "Rent comes from a company standing order, not a payslip. No chasing, no Section 8 conversations, no awkward calls.",
  },
  {
    head: "One tenancy instead of five",
    body: "A 3–5 year company let replaces the annual cycle of check-outs, re-lets, references and inventory disputes — while your fees continue.",
  },
  {
    head: "A new pitch that wins instructions",
    body: "“We can offer you guaranteed rent” is the strongest sentence a valuer can say to a tired landlord in 2026. Offer it through us and it's your differentiator, not ours.",
  },
];

export default function AgentsPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">For estate &amp; letting agents</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>We&rsquo;re not your competition.</Line>
            <Line>
              We&rsquo;re your <span className="display-it">best tenant.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Company lets are unfamiliar territory for a lot of agents, so
            here it is broken down properly — what we do, where you fit,
            and why nothing about your instruction, your management or your
            fee changes.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">
              The worry, answered first
            </p>
            <p className="display mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">
              &ldquo;Doesn&rsquo;t this cut us out?&rdquo; No — the chain
              stays exactly as it is: landlord, agent, tenant.{" "}
              <span className="display-it">We&rsquo;re the tenant.</span>
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-[var(--stone-dark)]">
              You keep the landlord relationship. You keep the management.
              You keep the fee. What changes is the quality of the tenancy:
              one professional company on a multi-year agreement, instead of
              churn, voids and arrears. We don&rsquo;t approach your
              landlords, and we don&rsquo;t take instructions — we take
              tenancies.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">How it works — step by step</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-5">
            {STEPS.map((s, i) => (
              <Lift key={s.head} className="bg-[var(--plaster)]">
                <div className="flex h-full flex-col p-6">
                  <p className="annot text-bronze">0{i + 1}</p>
                  <h2 className="display mt-3 text-xl leading-snug">{s.head}</h2>
                  <p className="muted mt-3 text-[0.875rem] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="annot text-bronze">What&rsquo;s in it for your branch</p>
          <div className="mt-6 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-2">
            {WINS.map((w) => (
              <Lift key={w.head} className="bg-[var(--plaster)]">
                <div className="p-7 md:p-8">
                  <h2 className="display text-2xl">{w.head}</h2>
                  <p className="muted mt-3 max-w-md text-[0.9375rem] leading-relaxed">
                    {w.body}
                  </p>
                </div>
              </Lift>
            ))}
          </div>
          <p className="annot mt-6 muted">
            Also worth knowing: we buy for cash too — if you have a sale
            that needs a fast, chain-free buyer,{" "}
            <Link href="/contact" className="text-bronze hover:text-ink">
              talk to us →
            </Link>
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="border hairline p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="display text-3xl md:text-4xl">
                  Try it on <span className="display-it">one property.</span>
                </h2>
                <p className="muted mt-4 leading-relaxed">
                  Pick the instruction that&rsquo;s giving you the most
                  grief — the sticky one, the void, the landlord threatening
                  to sell. One conversation, and if it&rsquo;s not a fit we
                  say so the same day. We operate our own properties and
                  house council placements — the standard we run is public
                  on our{" "}
                  <Link href="/standards" className="text-bronze hover:text-ink">
                    standards ledger
                  </Link>
                  .
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <a href="tel:+447444551241" className="btn btn-ink">
                  Call Samuel — 07444 551241
                </a>
                <a href="mailto:contact@samnharv.com" className="btn btn-ghost">
                  contact@samnharv.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
