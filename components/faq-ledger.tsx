"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export type Faq = { q: string; a: string };

function Row({
  f,
  index,
  open,
  onToggle,
}: {
  f: Faq;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const id = useId();

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!mounted.current || reduced) {
      mounted.current = true;
      gsap.set(panel, { height: open ? "auto" : 0 });
      return;
    }
    const inner = panel.firstElementChild;
    if (open) {
      gsap.fromTo(
        panel,
        { height: 0 },
        { height: "auto", duration: 0.7, ease: "power2.inOut", overwrite: true },
      );
      if (inner) {
        gsap.fromTo(
          inner,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55, delay: 0.18, ease: "power2.out", overwrite: true },
        );
      }
    } else {
      gsap.to(panel, { height: 0, duration: 0.55, ease: "power2.inOut", overwrite: true });
      if (inner) {
        gsap.to(inner, { autoAlpha: 0, duration: 0.25, ease: "power1.out", overwrite: true });
      }
    }
  }, [open]);

  return (
    <li className={`transition-colors duration-500 ${open ? "on-stone" : "border-b hairline"}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-5 text-left md:gap-8 md:px-8"
      >
        <span
          className={`annot flex h-7 w-10 shrink-0 items-center justify-center transition-colors duration-500 ${
            open ? "bg-bronze-chip text-ink" : "border hairline"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="display flex-1 text-xl md:text-2xl">
          {open ? <span className="text-bronze-bright">{f.q}</span> : f.q}
        </span>
        <span
          aria-hidden="true"
          className={`display text-2xl transition-[transform,color] duration-500 ${
            open ? "rotate-45 text-bronze-bright" : ""
          }`}
        >
          +
        </span>
      </button>
      <div id={id} ref={panelRef} className="overflow-clip">
        <div className="px-4 pb-7 pt-1 md:px-8 md:pb-9">
          <p className="text-base leading-relaxed md:ml-[4.5rem] md:max-w-2xl md:text-lg">
            {f.a}
          </p>
        </div>
      </div>
    </li>
  );
}

export default function FaqLedger({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="border-t hairline">
      {faqs.map((f, i) => (
        <Row
          key={f.q}
          f={f}
          index={i}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </ul>
  );
}
