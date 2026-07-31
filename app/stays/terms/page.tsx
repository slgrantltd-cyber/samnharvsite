import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Terms — Direct Stays",
  description:
    "Terms, cancellation and refund policy for booking a Sam n Harv stay directly.",
  alternates: { canonical: "/stays/terms" },
};

const TERMS: { head: string; body: string[] }[] = [
  {
    head: "Your booking",
    body: [
      "A direct booking is confirmed once we've accepted your request in writing (email or WhatsApp) and payment has been received. Until then, dates remain open to other guests.",
      "The lead guest must be 21 or over, and is responsible for the property and everyone staying during the booking. The number of guests must not exceed the number booked.",
      "We may ask the lead guest for photo ID before arrival, for insurance and security purposes. Details are held securely and never shared.",
    ],
  },
  {
    head: "Payment",
    body: [
      "Stays under 28 nights: full payment is due to confirm the booking.",
      "Stays of 28 nights or more: we invoice in advance in weekly or monthly instalments, as agreed at booking. The first instalment confirms the booking.",
      "Company bookings: we're happy to invoice — payment terms are agreed in writing before arrival.",
    ],
  },
  {
    head: "Cancellations & refunds",
    body: [
      "Cancel 14 or more days before check-in: full refund, no questions.",
      "Cancel 7–13 days before check-in: 50% refund.",
      "Cancel less than 7 days before check-in, or after check-in: no refund, unless we can re-let the nights — anything we re-let, we refund in full for those nights. We always try.",
      "Long stays (28+ nights): either side may end the stay with 14 days' written notice. Nights already paid but not stayed beyond the notice period are refunded.",
      "If we ever have to cancel your booking (serious damage, safety, events beyond our control), you receive a full refund of all unstayed nights — that's our responsibility, and we'll help you find somewhere else.",
    ],
  },
  {
    head: "During your stay",
    body: [
      "Check-in is from 3 PM and check-out by 10 AM, unless we've agreed otherwise in writing — we're flexible when we can be, just ask.",
      "No parties or events, and no smoking or vaping anywhere inside. A deep-clean fee applies if this is ignored.",
      "Pets only by prior written agreement.",
      "Please treat the property as you'd want your own home treated. Accidental damage happens — tell us straight away and we'll be fair. Damage that isn't reported, or goes beyond fair wear and tear, will be charged at cost.",
      "Lost keys are charged at £100 per key.",
      "We (or a contractor) may need access for urgent repairs — we'll always give you as much notice as possible.",
    ],
  },
  {
    head: "The boring-but-important bits",
    body: [
      "The property is provided as self-catering holiday/serviced accommodation. A booking does not create a tenancy, and the property remains ours throughout.",
      "Our liability is limited to the total value of your booking, except where the law says otherwise (we don't exclude liability for death or personal injury caused by our negligence).",
      "We look after your details in line with UK GDPR — we only use them to manage your booking, and we never sell them.",
      "These terms are governed by the law of England and Wales.",
    ],
  },
];

export default function StayTermsPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="annot muted">Direct bookings</p>
          <h1 className="display mt-3 text-4xl md:text-6xl">
            Booking terms, <span className="display-it">plainly.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed">
            No twenty-page contract — just the terms of staying with us,
            written the way we&rsquo;d want to read them. Book direct and
            these apply; book through a platform and their terms apply
            instead.
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {TERMS.map((t) => (
              <section key={t.head}>
                <h2 className="display text-2xl md:text-3xl">{t.head}</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {t.body.map((p, i) => (
                    <p key={i} className="leading-relaxed muted">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t hairline pt-8">
            <p className="muted leading-relaxed">
              Questions about any of this? Ask before you book —{" "}
              <a href="https://wa.me/447444551241" className="text-bronze hover:text-ink">
                WhatsApp Samuel
              </a>{" "}
              or email{" "}
              <a href="mailto:contact@samnharv.com" className="text-bronze hover:text-ink">
                contact@samnharv.com
              </a>
              .
            </p>
            <Link href="/stays" className="btn btn-ghost mt-6">
              ← Back to stays
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
