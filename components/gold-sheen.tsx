"use client";

import { useEffect } from "react";

/**
 * One light, moving with the page. Writes --sheen (0→1) to the root as the
 * page scrolls, and keeps the SVG gold gradients in step by sliding their
 * gradientTransform. Everything gold — the mark's levelling line, the n,
 * the globe's glint — reads the same value, so the whole site catches the
 * light together. A slow idle drift keeps it alive when the page is still.
 */
export default function GoldSheen() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = 0.5, cur = 0.5, idle = 0, raf = 0, last = performance.now();
    const apply = () => {
      root.style.setProperty("--sheen", cur.toFixed(4));
      const t = (cur * 2 - 1) * 26; // line spans x 4→28 in mark units
      document.querySelectorAll<SVGLinearGradientElement>('linearGradient[id^="sh-gold"]').forEach((g) => g.setAttribute("gradientTransform", `translate(${t.toFixed(2)} 0)`));
    };
    const tick = (now: number) => {
      const dt = Math.min(64, now - last); last = now;
      if (!reduced) idle += dt * 0.00004;
      const want = (target + (reduced ? 0 : Math.sin(idle) * 0.35) + 10) % 1;
      cur += (want - cur) * 0.08;
      apply();
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => { target = ((window.scrollY / 900) % 1 + 1) % 1; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
