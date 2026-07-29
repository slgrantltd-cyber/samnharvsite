"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export type Strategy = {
  tag: string;
  name: string;
  body: string;
  forWho: string;
};

export const STRATEGIES: Strategy[] = [
  {
    tag: "BRRR",
    name: "BRRR Investments",
    body: "Buy, refurbish, refinance, rent. We find properties whose value is hiding under a dated kitchen or a bad floor plan, do the works properly, then refinance to pull capital back out while the property rents.",
    forWho: "For investors who want their money recycled, not parked.",
  },
  {
    tag: "R2R",
    name: "Rent to Rent",
    body: "We take on a landlord's property at a guaranteed rent, then manage and operate it ourselves — including as serviced accommodation. The landlord gets certainty; we do the work.",
    forWho: "For landlords who want the income without the phone calls.",
  },
  {
    tag: "FLIP",
    name: "Flips",
    body: "Buy well, refurbish hard, sell on. Short-hold projects where the profit is made on the purchase and protected by disciplined build costs.",
    forWho: "For investors who want defined projects with a clear exit.",
  },
  {
    tag: "BLOCK",
    name: "Blocks",
    body: "Multi-unit freeholds and small apartment blocks — bigger deals, title splits, and economies of scale that single houses can't offer.",
    forWho: "For investors ready to move beyond single units.",
  },
  {
    tag: "LAND",
    name: "Land Deals",
    body: "Sites with planning angles — from garden plots to development land. Slower, chunkier, and where knowing the local picture matters most.",
    forWho: "For investors with patience and appetite for planning gain.",
  },
  {
    tag: "SA",
    name: "Serviced Accommodation",
    body: "We currently operate two serviced accommodation units ourselves. Short-stay lets, run like hotels — the strategy we know from the inside, not from a course.",
    forWho: "Proof we run what we recommend.",
  },
];

function Row({
  s,
  index,
  open,
  onToggle,
}: {
  s: Strategy;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const id = useId();

  // Every row animates its own open/close from state, so switching rows
  // animates the closing row too instead of snapping it shut.
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
        <span className="display flex-1 text-2xl md:text-4xl">
          {open ? <span className="text-bronze-bright">{s.name}</span> : s.name}
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
          <div className="md:ml-[4.5rem] md:max-w-2xl">
            <p className="text-base leading-relaxed md:text-lg">{s.body}</p>
            <p className="annot mt-4 text-bronze-bright">{s.forWho}</p>
            <Link
              href="/contact"
              className="btn btn-ghost mt-6"
            >
              Talk to us about {s.tag}
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function StrategyLedger() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="border-t hairline">
      {STRATEGIES.map((s, i) => (
        <Row
          key={s.tag}
          s={s}
          index={i}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </ul>
  );
}
