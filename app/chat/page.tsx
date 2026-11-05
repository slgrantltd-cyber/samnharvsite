import type { Metadata } from "next";
import WhatsappLauncher from "@/components/whatsapp-launcher";

export const metadata: Metadata = {
  title: "Chat with Samuel — Dubai Property",
  description:
    "Came from a video? Tell me what you're after and it opens straight into a WhatsApp chat with me — Dubai property, developer-direct.",
  robots: { index: false, follow: false },
};

export default function ChatPage() {
  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-xl">
          <p className="annot muted">Samuel Grant · Dubai</p>
          <h1 className="display mt-3 text-4xl md:text-6xl">
            Let&rsquo;s <span className="display-it">talk.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed">
            If you&rsquo;ve come from one of my videos — good to have you.
            Two taps below and you&rsquo;re in my WhatsApp. I read and answer
            every message myself.
          </p>

          <div className="mt-10">
            <WhatsappLauncher />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px border bg-[var(--line)] hairline md:grid-cols-3">
            {[
              ["Developer-direct", "You pay developer price. The developer pays me, not you."],
              ["Numbers first", "Every project I talk about is checked against the records."],
              ["Straight answers", "If something's not worth buying, I'll say so."],
            ].map(([head, sub]) => (
              <div key={head} className="bg-[var(--plaster)] p-5">
                <p className="display text-xl">{head}</p>
                <p className="annot muted mt-2">{sub}</p>
              </div>
            ))}
          </div>

          <p className="annot muted mt-10 text-center">
            Or message me directly: +971 58 557 0551
          </p>
        </div>
      </section>
    </main>
  );
}
