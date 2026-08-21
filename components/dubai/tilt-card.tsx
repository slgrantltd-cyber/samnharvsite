"use client";

import { useRef } from "react";

/** A card that tilts toward the cursor with a gold sheen that tracks it. Transform-only; still on touch/reduced-motion. */
export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 6).toFixed(2)}deg) rotateY(${((px - 0.5) * 8).toFixed(2)}deg) translateY(-2px)`;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };
  const leave = () => { const el = ref.current; if (el) el.style.transform = ""; };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt relative transition-transform duration-300 ease-out motion-reduce:transform-none ${className}`}>
      <div className="tilt-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500" aria-hidden="true" />
      {children}
    </div>
  );
}
