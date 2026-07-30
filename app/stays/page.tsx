import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rise, Line, Lift } from "@/components/reveal";
import BookingCalendar from "@/components/booking-calendar";

export const metadata: Metadata = {
  title: "Stays — Serviced Accommodation",
  description:
    "The Barrows and Cheddar — two serviced accommodation stays operated day-to-day by Sam n Harv, the proof behind our serviced accommodation investment strategy. Pick your dates and enquire directly.",
  alternates: { canonical: "/stays" },
};

const PLACES = [
  {
    name: "The Barrows",
    tag: "Place 01",
    blurb:
      "Fresh, calm and made up properly between every stay — run by us, not an agency, and it shows in the details.",
    photos: [
      { src: "/photos/barrows-1.jpg", alt: "The Barrows — twin bedroom with lamplight and seaside artwork" },
      { src: "/photos/barrows-2.jpg", alt: "The Barrows — folded towels on a made-up bed" },
      { src: "/photos/barrows-3.jpg", alt: "The Barrows — single bedroom by the window" },
    ],
  },
  {
    name: "Cheddar",
    tag: "Place 02",
    blurb:
      "A characterful top-floor place with angular windows and hills beyond the glass — warm lamps, real books, room to breathe.",
    photos: [
      { src: "/photos/cheddar-1.jpg", alt: "Cheddar — dining table beneath a triangular window with hills beyond" },
      { src: "/photos/cheddar-2.jpg", alt: "Cheddar — lounge with tan leather sofa" },
      { src: "/photos/cheddar-3.jpg", alt: "Cheddar — double bedroom with floral cushions" },
    ],
  },
];

export default function StaysPage() {
  return (
    <main id="main" className="m-limestone pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="annot muted">Stays</p>
          <Rise as="h1" className="display mt-3 text-5xl md:text-8xl">
            <Line>Run by the</Line>
            <Line>
              people who <span className="display-it">own it.</span>
            </Line>
          </Rise>
          <p className="mt-8 max-w-xl text-lg leading-relaxed md:text-xl">
            Two serviced accommodation places, live and trading, managed
            day-to-day by Harvey. They&rsquo;re why our advice on short-stay
            strategy comes from operating, not theory.
          </p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-20">
            {PLACES.map((place) => (
              <article key={place.name}>
                <Lift className="shadow-daylight relative aspect-[16/10] overflow-clip md:aspect-[21/10]">
                  <Image
                    src={place.photos[0].src}
                    alt={place.photos[0].alt}
                    fill
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    className="object-cover"
                  />
                  <p className="annot absolute bottom-3 left-3 bg-smoked px-2 py-1 text-bronze-bright">
                    {place.tag} — {place.name}
                  </p>
                </Lift>

                <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr_1.2fr] md:items-start">
                  {place.photos.slice(1).map((photo) => (
                    <Lift key={photo.src} className="relative aspect-[4/3] overflow-clip">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 768px) 30vw, 90vw"
                        className="object-cover"
                      />
                    </Lift>
                  ))}
                  <div className="md:pl-4">
                    <p className="display text-3xl">{place.name}</p>
                    <p className="muted mt-3 leading-relaxed">{place.blurb}</p>
                    <a href="#book" className="btn btn-ink mt-6">
                      Check dates
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div id="book" className="mt-24 scroll-mt-28 border-t hairline pt-12">
            <p className="annot muted">Request a stay</p>
            <Rise as="h2" className="display mt-3 text-4xl md:text-5xl">
              <Line>Pick your dates,</Line>
              <Line>
                we&rsquo;ll do the <span className="display-it">rest.</span>
              </Line>
            </Rise>
            <div className="mt-10">
              <BookingCalendar />
            </div>
            <Link
              href="/faq"
              className="annot mt-8 inline-flex min-h-11 items-center gap-3 text-ink"
            >
              Questions about staying? Read the FAQs{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-16 border-t hairline pt-10">
            <p className="max-w-2xl text-lg leading-relaxed">
              Own a property that could work harder as a short-stay unit?
              That&rsquo;s our rent-to-rent conversation.
            </p>
            <Link href="/services" className="btn btn-ghost mt-6">
              See how rent to rent works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
