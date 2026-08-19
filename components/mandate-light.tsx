"use client";

import { useEffect, useRef } from "react";

/**
 * The mandate light: a soft colour wash that lives on the homepage hero
 * and follows the cursor — leaf-green toward the left, dusk-amber toward
 * the right, plaster between. The same two palettes as the island and
 * desert mandate pages, so the home page quietly carries the world of
 * the Opportunities page. Composited translate only; pointer-fine devices;
 * reduced-motion and touch keep a still, centred wash.
 */
export default function MandateLight() {
  const green = useRef<HTMLDivElement | null>(null);
  const amber = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const g = green.current, a = amber.current;
    if (!fine || reduced || !g || !a) return;

    let tx = 0.5, ty = 0.5, x = tx, y = ty, raf = 0, settled = true;
    const paint = () => {
      x += (tx - x) * 0.05; y += (ty - y) * 0.05;
      // green sits where the cursor is; amber mirrors it — so the two
      // lights pass through each other as you cross the page.
      g.style.transform = `translate3d(${(x * 100 - 50).toFixed(2)}%, ${(y * 60 - 30).toFixed(2)}%, 0)`;
      a.style.transform = `translate3d(${((1 - x) * 100 - 50).toFixed(2)}%, ${((1 - y) * 60 - 30).toFixed(2)}%, 0)`;
      g.style.opacity = String(0.35 + (1 - x) * 0.45);
      a.style.opacity = String(0.35 + x * 0.45);
      if (Math.abs(tx - x) < 0.001 && Math.abs(ty - y) < 0.001) { settled = true; return; }
      raf = requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth; ty = e.clientY / window.innerHeight;
      if (settled) { settled = false; raf = requestAnimationFrame(paint); }
    };
    window.addEventListener("pointermove", move, { passive: true });
    paint();
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        ref={green}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-multiply will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgba(43,74,53,0.55) 0%, rgba(43,74,53,0.18) 35%, rgba(43,74,53,0) 62%)" }}
      />
      <div
        ref={amber}
        className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-multiply will-change-transform"
        style={{ background: "radial-gradient(closest-side, rgba(226,150,90,0.55) 0%, rgba(226,150,90,0.18) 35%, rgba(226,150,90,0) 62%)" }}
      />
    </div>
  );
}
