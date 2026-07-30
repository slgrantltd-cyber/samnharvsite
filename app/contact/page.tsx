import type { Metadata } from "next";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import DealListForm from "@/components/deal-list-form";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Samuel or Harvey directly on WhatsApp, register as an investor on the deal list for off market property deals, or email the office at contact@samnharv.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" className="m-linen pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Contact</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>You&rsquo;ll get a</Line>
            <Line>
              brother, not a <span className="display-it">bot.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Whichever door you pick, it opens on Samuel or Harvey. Say what
            you&rsquo;re trying to do — invest, sell, hand over a property, or
            just ask a question — and we&rsquo;ll answer properly.
          </p>
          <Link
            href="/faq"
            className="annot mt-6 inline-flex min-h-11 items-center gap-3 text-ink"
          >
            Short answers first? Read the FAQs{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <ContactForm />
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-2">
            <Lift className="bg-plaster p-8 md:p-12">
              <p className="annot muted">Door one — WhatsApp</p>
              <p className="display mt-3 text-4xl">Samuel</p>
              <p className="muted mt-2">Deals &amp; investor relations</p>
              <a
                href="https://wa.me/447444551241"
                className="btn btn-ink mt-6"
                rel="noopener"
              >
                WhatsApp Samuel · 07444 551241
              </a>
            </Lift>
            <Lift className="bg-plaster p-8 md:p-12">
              <p className="annot muted">Door one — WhatsApp</p>
              <p className="display mt-3 text-4xl">Harvey</p>
              <p className="muted mt-2">Operations, delivery &amp; stays</p>
              <a
                href="https://wa.me/447753600183"
                className="btn btn-ink mt-6"
                rel="noopener"
              >
                WhatsApp Harvey · 07753 600183
              </a>
            </Lift>
          </div>
        </div>
      </section>

      <section id="investor-list" className="on-stone px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Door two — for investors</p>
          <Rise as="h2" className="display mt-3 text-4xl md:text-6xl">
            <Line>Hear about deals</Line>
            <Line>
              while they&rsquo;re still <span className="display-it">deals.</span>
            </Line>
          </Rise>
          <p className="muted mt-6 max-w-xl leading-relaxed">
            Tell us what you&rsquo;re looking for and we&rsquo;ll add you to
            the list. When something crosses our desk that fits, you&rsquo;ll
            hear about it directly — no newsletter padding.
          </p>
          <DealListForm />
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="annot muted">Door three — on paper</p>
              <p className="display mt-3 text-4xl md:text-5xl">
                contact@samnharv.com
              </p>
              <p className="muted mt-3 max-w-md leading-relaxed">
                For anything longer, formal, or with documents attached. It
                reaches both of us.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@samnharv.com" className="btn btn-ink">
                Email the office
              </a>
              <a
                href="https://share.google/lsd2TlaWo3OpRFqhO"
                className="btn btn-ghost"
                rel="noopener"
              >
                Find us on Google
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
