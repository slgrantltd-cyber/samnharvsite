"use client";

import { useEffect } from "react";

/**
 * The living light: a fixed veil of warm daylight whose centre drifts
 * toward the cursor. The position is lerped on rAF so the light moves like
 * sun through a window, never like a torch strapped to the pointer.
 * Pointer-fine devices only; touch and reduced-motion get the static
 * ambient wash baked into the CSS defaults.
 */
export default function MaterialLight() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    let targetX = 32;
    let targetY = 22;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let settled = true;

    const tick = () => {
      x += (targetX - x) * 0.055;
      y += (targetY - y) * 0.055;
      root.style.setProperty("--lx", `${x.toFixed(2)}%`);
      root.style.setProperty("--ly", `${y.toFixed(2)}%`);
      if (Math.abs(targetX - x) < 0.05 && Math.abs(targetY - y) < 0.05) {
        settled = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
      if (settled) {
        settled = false;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="material-light" aria-hidden="true" />
      {/* on pale materials the warm glow alone is invisible; this faint
          shade AROUND the light makes the lit area read brighter there,
          while multiply at 5% vanishes on the dark surfaces */}
      <div className="material-light-shade" aria-hidden="true" />
    </>
  );
}
