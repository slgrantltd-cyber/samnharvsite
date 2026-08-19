import type { Metadata } from "next";
import Link from "next/link";
import CallRequestForm from "@/components/call-request-form";
import { BOOKING_URL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Book a 15-minute intro call — Sam n Harv",
  description:
    "Fifteen minutes with Samuel or Harvey Grant. No pitch — a straight conversation about what you're trying to do with property, and whether we're the right people to do it with.",
  alternates: { canonical: "/call" },
};

const EXPECT = [
  ["Who you are", "Investor, owner, developer, agent or council — and what you're actually trying to get done."],
  ["What we'd do about it", "A straight answer on whether we're a fit. If we're not, we'll say so and point you somewhere better."],
  ["What happens next", "If it's worth a second conversation we book it there and then. If not, you've lost fifteen minutes and gained a view."],
];

export default function CallPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Sam n Harv — the intro call</p>
          <h1 className="display mt-3 text-4xl leading-tight md:text-6xl">
            Fifteen minutes. <span className="display-it">No pitch.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed">
            Pick a slot, and one of us — Samuel in the UK, Harvey in Thailand —
            rings you. We&rsquo;d rather find out in fifteen minutes whether
            there&rsquo;s something worth doing together than trade emails for a month.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {BOOKING_URL ? (
                <div className="border hairline bg-white/40">
                  <iframe
                    src={BOOKING_URL}
                    title="Book a 15-minute intro call"
                    className="h-[720px] w-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="border hairline p-6 md:p-8">
                  <p className="annot text-bronze">Request a slot</p>
                  <p className="muted mt-2 text-sm leading-relaxed">Tell us when suits and we ring you to fix the time.</p>
                  <div className="mt-6">
                    <CallRequestForm />
                  </div>
                </div>
              )}
              <p className="annot mt-4 flex flex-wrap gap-x-6 gap-y-2 muted">
                <span>Prefer to just talk?</span>
                <a href="https://wa.me/447444551241" className="text-ink hover:text-bronze">WhatsApp Samuel ↗</a>
                <a href="tel:+447444551241" className="text-ink hover:text-bronze">07444 551241</a>
              </p>
            </div>

            <aside className="lg:col-span-2">
              <p className="annot muted">What the fifteen minutes covers</p>
              <div className="mt-4 border-t hairline">
                {EXPECT.map(([h, b]) => (
                  <div key={h} className="border-b hairline py-5">
                    <p className="display text-xl">{h}</p>
                    <p className="muted mt-2 text-sm leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
              <p className="muted mt-6 text-sm leading-relaxed">
                Before you book, it&rsquo;s worth two minutes on{" "}
                <Link href="/trust" className="text-bronze hover:text-ink">how we work</Link>{" "}
                and what&rsquo;s currently in the{" "}
                <Link href="/opportunities" className="text-bronze hover:text-ink">opportunities</Link>.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
