"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    /** shared smooth-scroll instance so scroll-capturing sections
     *  (e.g. the expansion hero) can pause and resume it */
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Always open at the top of the hero. Browsers restore the previous
    // scroll position on reload, and the pinned globe's spacer can nudge
    // the layout after hydration — both leave the page sitting a little
    // way down. Take restoration into our own hands (hash links still work).
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);

    // Native scrolling by default — the inertial layer read as lag. Set
    // NEXT_PUBLIC_SMOOTH_SCROLL=1 to bring Lenis back.
    if (process.env.NEXT_PUBLIC_SMOOTH_SCROLL !== "1") { ScrollTrigger.refresh(); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    if (!window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
      // once fonts and pinned sections have settled, make sure we're still at the top
      requestAnimationFrame(() => { if (window.scrollY !== 0) lenis.scrollTo(0, { immediate: true }); ScrollTrigger.refresh(); });
    }

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
