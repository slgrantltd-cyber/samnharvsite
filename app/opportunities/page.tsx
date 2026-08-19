import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import AccessForm from "@/components/access-form";

export const metadata: Metadata = {
  title: "Opportunities — By Introduction",
  description:
    "A small number of opportunities at any one time — UK and international — held off-market and released to qualified buyers after a conversation, identity and proof of funds.",
  alternates: { canonical: "/opportunities" },
};

/* The shop window: never more than four. Each card is atmosphere + one
   line + "on application". Detail lives behind the gate. */
/* Gated pages: a mandate's page link is only rendered when its gate is
   released. Flip `released` to true the day the owner approves (TH) or
   the brokerage agreement is signed (AE) — and move the file from
   deals-held/ into public/deals/. Until then the card routes to #access. */
const RELEASED: Record<string, boolean> = {
  "int-th-001": false, // owner's written approval — Harvey
  "int-ae-001": false, // Binghatti brokerage agreement — signed?
};

const MANDATES = [
  {
    ref: "Mandate I",
    where: "Thailand",
    head: "A resort, operating.",
    line: "25+ keys on five-plus rai in one of Thailand's premier island destinations. Licensed, operating, sold whole. Guide on application.",
    tone: "island",
    status: "Off-market · under NDA",
    page: "int-th-001",
  },
  {
    ref: "Mandate II",
    where: "Dubai · UAE",
    head: "Residences, direct from the developer.",
    line: "Developer pricing and payment plans, with our judgement on the unit — first call to handover.",
    tone: "dusk",
    status: "By introduction",
    page: "int-ae-001",
  },
  {
    ref: "Mandate III",
    where: "Somerset · UK",
    head: "Cash-flowing houses, bought below the street.",
    line: "Two- and three-bedroom stock bought for cash by our buyers, refinanced at value, operated by us. Fully underwritten.",
    tone: "plaster",
    status: "Live",
    page: "",
  },
  {
    ref: "Mandate IV",
    where: "Weston-super-Mare · UK",
    head: "A three-storey conversion, subject to planning.",
    line: "Victorian terrace to three flats on a proven street. Architect engaged. Comparable evidence in hand.",
    tone: "stone",
    status: "Under review",
    page: "",
  },
];

const TONES: Record<string, string> = {
  island:
    "bg-[radial-gradient(90%_70%_at_50%_110%,rgba(19,44,30,.85)_0%,rgba(24,52,36,0)_65%),linear-gradient(180deg,#e6dcc6_0%,#c8bb98_50%,#2b4a35_100%)]",
  dusk:
    "bg-[radial-gradient(60%_45%_at_50%_60%,rgba(255,190,110,.75)_0%,rgba(255,170,90,0)_70%),linear-gradient(180deg,#f3d9c0_0%,#e0a07a_45%,#5a3350_100%)]",
  plaster:
    "bg-[radial-gradient(70%_60%_at_30%_20%,rgba(255,255,255,.7)_0%,rgba(255,255,255,0)_60%),linear-gradient(180deg,#efeae0_0%,#d9d1c0_100%)]",
  stone:
    "bg-[radial-gradient(60%_50%_at_70%_20%,rgba(201,171,124,.35)_0%,rgba(201,171,124,0)_60%),linear-gradient(180deg,#5c5952_0%,#3d3a35_100%)]",
};

export default function PrivateOfficePage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Opportunities</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>A few opportunities.</Line>
            <Line>
              Held <span className="display-it">quietly.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            We don&rsquo;t list what we hold. At any one time there are a
            handful of mandates — UK and international — released to qualified
            buyers after a conversation, identity and proof of funds. What
            follows is the shape of them, not the detail.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {MANDATES.map((m) => (
            <Lift key={m.ref}>
              <article className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden border hairline md:min-h-[520px]">
                <div className={`absolute inset-0 ${TONES[m.tone]} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]`} aria-hidden="true" />
                <div className={`absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t ${m.tone === "plaster" ? "from-[#2b2823]/85 via-[#2b2823]/45" : "from-black/75 via-black/35"} to-transparent`} aria-hidden="true" />
                <div className="relative p-7 text-[var(--plaster)] md:p-9">
                  <p className="annot text-[var(--bronze-bright)]">{m.ref} · {m.where}</p>
                  <h2 className="display mt-3 text-3xl leading-tight md:text-4xl">{m.head}</h2>
                  <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/85">{m.line}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="annot border border-white/40 px-3 py-1.5 text-white/90">{m.status}</span>
                    {m.page && (RELEASED[m.page] || process.env.NODE_ENV !== "production") ? (
                      <a href={`/deals/${m.page}.html`} className="annot text-white transition-colors hover:text-[var(--bronze-bright)]">View the mandate →</a>
                    ) : (
                      <a href="#access" className="annot text-white transition-colors hover:text-[var(--bronze-bright)]">Request access →</a>
                    )}
                  </div>
                </div>
              </article>
            </Lift>
          ))}
        </div>
        <p className="annot mx-auto mt-6 max-w-6xl muted">
          Particulars, addresses, photography and full numbers are released under NDA to qualified buyers only.
        </p>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="on-stone p-8 shadow-daylight md:p-12">
            <p className="annot text-[var(--bronze-bright)]">How access works</p>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                ["A conversation", "Twenty minutes. What you're looking for, what you have to deploy, your timescale."],
                ["Identity & funds", "Certified ID and proof of funds — the same standard we'd want from anyone we introduce."],
                ["NDA", "Then the address, the photography, the numbers and the pack."],
                ["Direct", "Viewings, the owner or developer, offer and diligence — supported end to end."],
              ].map(([h, b]) => (
                <div key={h}>
                  <span className="block h-px w-8 bg-[var(--bronze-bright)]" aria-hidden="true" />
                  <p className="display mt-3 text-xl">{h}</p>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--line-light)]">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="access" className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="annot text-bronze">Request access</p>
              <h2 className="display mt-3 text-3xl md:text-4xl">Tell us who you are.</h2>
              <p className="muted mt-4 leading-relaxed">
                We work with a small number of buyers at a time and answer
                personally. If we&rsquo;re not the right fit we&rsquo;ll say so
                on the call.
              </p>
              <p className="muted mt-6 leading-relaxed">
                Prefer to talk first?{" "}
                <a href="tel:+447444551241" className="text-bronze hover:text-ink">07444 551241</a>
                {" "}·{" "}
                <a href="mailto:contact@samnharv.com" className="text-bronze hover:text-ink">contact@samnharv.com</a>
              </p>
              <p className="annot mt-8 muted">
                We operate our own properties · placements for a local authority · standards published on the{" "}
                <Link href="/standards" className="text-bronze hover:text-ink">ledger</Link>
              </p>
            </div>
            <div className="md:col-span-3">
              <AccessForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
