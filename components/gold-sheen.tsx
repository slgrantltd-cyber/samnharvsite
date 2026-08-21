"use client";

import { useEffect } from "react";

/**
 * One light, moving with the page. Writes --sheen (0→1) to the root as the
 * page scrolls and slides the SVG gold gradients to match, so the mark's
 * line, the n and the globe's glint catch the light together. Work happens
 * only while scrolling (one rAF per scroll burst, no idle loop), gradient
 * nodes are cached, and nothing is written unless the value actually moved.
 */
export default function GoldSheen() {
  useEffect(() => {
    const root = document.documentElement;
    let grads: SVGLinearGradientElement[] = [];
    let lastScan = 0, cur = 0.5, target = 0.5, raf = 0, applied = -1;

    const scan = () => { grads = Array.from(document.querySelectorAll<SVGLinearGradientElement>('linearGradient[id^="sh-gold"]')); lastScan = performance.now(); };
    const apply = () => {
      raf = 0;
      cur += (target - cur) * 0.12;
      if (Math.abs(cur - applied) < 0.002) return;
      applied = cur;
      root.style.setProperty("--sheen", cur.toFixed(3));
      if (performance.now() - lastScan > 3000) scan();
      const t = ((cur * 2 - 1) * 26).toFixed(1);
      for (const g of grads) g.setAttribute("gradientTransform", `translate(${t} 0)`);
      if (Math.abs(target - cur) > 0.002) raf = requestAnimationFrame(apply);
    };
    const onScroll = () => { target = ((window.scrollY / 2600) % 1 + 1) % 1; if (!raf) raf = requestAnimationFrame(apply); };
    scan(); onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
