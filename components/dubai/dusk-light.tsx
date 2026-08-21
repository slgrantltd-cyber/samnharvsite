"use client";

import { useEffect, useRef } from "react";

/** Cursor-following light for the Dubai hero — gold and desert dusk. Transform-only, pointer-fine devices. */
export default function DuskLight() {
  const gold = useRef<HTMLDivElement | null>(null);
  const dusk = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const g = gold.current, d = dusk.current;
    if (!fine || reduced || !g || !d) return;
    let tx = 0.5, ty = 0.4, x = tx, y = ty, raf = 0, settled = true;
    const paint = () => {
      x += (tx - x) * 0.06; y += (ty - y) * 0.06;
      g.style.transform = `translate3d(${(x * 100 - 50).toFixed(2)}%, ${(y * 60 - 30).toFixed(2)}%, 0)`;
      d.style.transform = `translate3d(${((1 - x) * 100 - 50).toFixed(2)}%, ${((1 - y) * 60 - 30).toFixed(2)}%, 0)`;
      if (Math.abs(tx - x) < 0.001 && Math.abs(ty - y) < 0.001) { settled = true; return; }
      raf = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => { tx = e.clientX / window.innerWidth; ty = e.clientY / window.innerHeight; if (settled) { settled = false; raf = requestAnimationFrame(paint); } };
    window.addEventListener("pointermove", move, { passive: true }); paint();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={gold} className="absolute left-1/2 top-1/2 h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/2 will-change-transform" style={{ background: "radial-gradient(closest-side, rgba(201,171,124,0.26) 0%, rgba(201,171,124,0.08) 35%, rgba(201,171,124,0) 62%)" }} />
      <div ref={dusk} className="absolute left-1/2 top-1/2 h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/2 will-change-transform" style={{ background: "radial-gradient(closest-side, rgba(196,112,86,0.18) 0%, rgba(196,112,86,0.06) 35%, rgba(196,112,86,0) 62%)" }} />
    </div>
  );
}
