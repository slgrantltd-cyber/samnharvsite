import type { Metadata } from "next";
import { Rise, Line } from "@/components/reveal";
import DuskLight from "@/components/dubai/dusk-light";
import GoldDust from "@/components/dubai/gold-dust";
import MarkMorph from "@/components/mark-morph";
import WhatsappLauncher from "@/components/whatsapp-launcher";

export const metadata: Metadata = {
  title: "Chat with Samuel — Dubai & Abu Dhabi Property",
  description:
    "Came from a video? One tap and you're in a WhatsApp chat with me — Dubai and Abu Dhabi property, developer-direct.",
  robots: { index: false, follow: false },
};

export default function ChatPage() {
  return (
    <main
      id="main"
      className="relative min-h-dvh overflow-hidden px-5 pb-16 pt-16 text-[var(--plaster)] md:pt-24 [contain:paint]"
      style={{ background: "linear-gradient(160deg, #17110d 0%, #241811 40%, #3a2418 75%, #4a2f1d 100%)" }}
      data-hero="dark"
    >
      <DuskLight />
      <GoldDust />
      <div className="relative mx-auto max-w-xl">
        <MarkMorph className="h-16 w-16 text-[var(--plaster)] md:h-20 md:w-20" />

        <p className="annot mt-8 text-[var(--bronze-bright)]">Samuel Grant · Dubai &amp; Abu Dhabi</p>

        <Rise as="h1" className="display mt-4 text-6xl leading-[0.95] md:text-8xl">
          <Line>Let&rsquo;s</Line>
          <Line>
            <span className="display-it gold-text">talk.</span>
          </Line>
        </Rise>

        <p className="mt-8 max-w-md text-lg leading-relaxed text-[var(--plaster)]/85 md:text-xl">
          You&rsquo;ve seen the videos. One tap below and you&rsquo;re in my
          WhatsApp — me, not a call centre. I read and answer every message
          myself.
        </p>

        <div className="mt-12">
          <WhatsappLauncher />
        </div>

        <div className="mt-16 border-t border-[var(--line-light)] pt-6">
          <p className="annot text-[var(--stone-dark)]">
            Developer-direct — you pay developer price, the developer pays me.
            Every number I give you is checked against the records.
          </p>
          <p className="annot mt-3 text-[var(--stone-dark)]">
            Or message me directly: +971 58 557 0551
          </p>
        </div>
      </div>
    </main>
  );
}
