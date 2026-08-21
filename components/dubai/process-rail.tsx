"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The buying process as a rail: on wide screens the section pins and the six
 * steps slide across as you scroll, a gold line drawing beneath them. On
 * phones it's a plain stack. One ScrollTrigger, transform-only.
 */
export default function ProcessRail({ steps }: { steps: [string, string][] }) {
  const sec = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current, t = track.current, l = line.current; if (!s || !t || !l) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => t.scrollWidth - s.clientWidth + 80;
      const tl = gsap.timeline({ scrollTrigger: { trigger: s, start: "top top+=80", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } });
      tl.to(t, { x: () => -dist(), ease: "none" }, 0).fromTo(l, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      return () => { tl.scrollTrigger?.kill(); tl.kill(); };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={sec} className="relative overflow-hidden py-10 lg:py-16">
      <div ref={track} className="flex flex-col gap-px lg:flex-row lg:gap-0 lg:will-change-transform">
        {steps.map(([h, b], i) => (
          <div key={h} className="relative border-b hairline bg-[var(--plaster)] p-6 lg:w-[26rem] lg:shrink-0 lg:border-b-0 lg:border-r lg:p-8">
            <p className="annot text-bronze">{i === 0 ? "Start" : i === steps.length - 1 ? "Finish" : "Then"}</p>
            <h3 className="display mt-2 text-2xl lg:text-3xl">{h}</h3>
            <p className="muted mt-3 max-w-sm leading-relaxed">{b}</p>
            <span className="absolute left-6 top-0 hidden h-px w-10 lg:block" style={{ background: "linear-gradient(90deg,#a98a52,#ead8ab,#a98a52)" }} aria-hidden="true" />
          </div>
        ))}
      </div>
      <div ref={line} className="mt-6 hidden h-px origin-left lg:block" style={{ background: "linear-gradient(90deg,#a98a52,#ead8ab 50%,#a98a52)" }} aria-hidden="true" />
    </div>
  );
}
