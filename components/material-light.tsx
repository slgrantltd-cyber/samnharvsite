"use client";

import { useEffect, useRef } from "react";

/**
 * The living light: a fixed veil of warm daylight whose centre drifts
 * toward the cursor. The glow is painted ONCE as an oversized layer and
 * moved with transform: translate3d — repositioning a gradient via CSS
 * variables repaints the whole viewport every frame, which was a real
 * scroll cost; a composited translate is free. Pointer-fine devices only;
 * touch and reduced-motion keep the resting position.
 */
export default function MaterialLight() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const glow = glowRef.current;
    if (!fine || reduced || !glow) return;

    let targetX = window.innerWidth * 0.32;
    let targetY = window.innerHeight * 0.22;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let settled = true;

    const tick = () => {
      x += (targetX - x) * 0.055;
      y += (targetY - y) * 0.055;
      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      if (Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5) {
        settled = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
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
    <div className="material-light-frame" aria-hidden="true">
      <div
        ref={glowRef}
        className="material-light-glow"
        style={{ transform: "translate3d(32vw, 22vh, 0)" }}
      />
      <div className="material-light-shade" />
    </div>
  );
}
