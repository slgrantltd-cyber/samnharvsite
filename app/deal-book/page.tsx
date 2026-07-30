import type { Metadata } from "next";
import DealBook from "@/components/deal-book";

export const metadata: Metadata = {
  title: "The Deal Book",
  robots: { index: false, follow: false },
};

export default function DealBookPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="annot muted">Private — the desk only</p>
          <h1 className="display mt-3 text-5xl md:text-7xl">
            The Deal <span className="display-it">Book.</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed muted">
            Contacts, deals and follow-ups — qualified, tagged and colour
            coded. Works privately in this browser; enable Sync with the
            shared passphrase and you and Harv share one live book.
          </p>
          <div className="mt-10">
            <DealBook />
          </div>
        </div>
      </section>
    </main>
  );
}
