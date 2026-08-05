import type { Metadata } from "next";
import Link from "next/link";
import ConnectForm from "@/components/connect-form";

export const metadata: Metadata = {
  title: "Good to meet you — Samuel & Harvey Grant",
  description:
    "You met Sam n Harv. Save our contact, tell us what you're into, and let's talk property — guaranteed rent, deals, stays and placements.",
  robots: { index: false, follow: false },
};

export default function ConnectPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-xl">
          <p className="annot muted">Sam n Harv — property, Weston-super-Mare</p>
          <h1 className="display mt-3 text-4xl md:text-6xl">
            Good to <span className="display-it">meet you.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed">
            We&rsquo;re Samuel &amp; Harvey — two brothers who guarantee
            landlords&rsquo; rents, source deals for investors, run serviced
            stays and house council placements. Two names on everything.
          </p>

          <a href="/samuel.vcf" download className="btn btn-ink mt-8 w-full text-center">
            Save our contact ↓
          </a>
          <p className="annot muted mt-3 text-center">
            One tap — Samuel&rsquo;s number, email &amp; site into your phone
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px border bg-[var(--line)] hairline">
            {[
              ["Landlord?", "Your rent, paid monthly", "/landlords"],
              ["Investor?", "See the current deals", "/deals"],
              ["Need stays?", "Crew & long-stay houses", "/stays"],
              ["Council?", "Placements done properly", "/councils"],
            ].map(([head, sub, href]) => (
              <Link key={href} href={href} className="group bg-[var(--plaster)] p-5 transition-colors hover:bg-white/45">
                <p className="display text-xl">{head}</p>
                <p className="annot muted mt-2 group-hover:text-bronze">{sub} →</p>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <p className="annot muted mb-4">Or leave your number — we&rsquo;ll do the chasing</p>
            <ConnectForm />
          </div>

          <p className="annot muted mt-10 text-center">
            Samuel — 07444 551241 · contact@samnharv.com
          </p>
        </div>
      </section>
    </main>
  );
}
