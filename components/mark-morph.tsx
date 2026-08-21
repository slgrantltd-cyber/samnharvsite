"use client";

/**
 * The benchmark mark, surveying itself into a house — driven by scroll.
 *
 * Same drawing, two readings: the levelling line settles to become the
 * ground; the stem splits into the two walls; the broad arrow closes
 * into the roof; the arrow's centre leg stays behind as the front door.
 * Scroll scrubs the morph: the mark at rest, a house by the time the
 * hero has been read. Reduced motion holds the static mark.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Pt = [number, number];
const lerp = (a: Pt, b: Pt, t: number): string =>
  `${(a[0] + (b[0] - a[0]) * t).toFixed(3)} ${(a[1] + (b[1] - a[1]) * t).toFixed(3)}`;

// [mark pose, house pose]
const GROUND: [Pt[], Pt[]] = [
  [[4, 7], [28, 7]],
  [[4, 27], [28, 27]],
];
const WALL_L: [Pt[], Pt[]] = [
  [[16, 7], [16, 14]],
  [[6, 13], [6, 27]],
];
const WALL_R: [Pt[], Pt[]] = [
  [[16, 7], [16, 14]],
  [[26, 13], [26, 27]],
];
const ARROW: [Pt[], Pt[]] = [
  [[16, 14], [7, 27], [16, 14], [25, 27], [16, 14], [16, 27]],
  [[16, 6], [6, 13], [16, 6], [26, 13], [16, 20], [16, 27]],
];

const seg = (pair: [Pt[], Pt[]], t: number) =>
  `M${lerp(pair[0][0], pair[1][0], t)} L${lerp(pair[0][1], pair[1][1], t)}`;
const arrowD = (t: number) => {
  const [m, h] = ARROW;
  return (
    `M${lerp(m[0], h[0], t)} L${lerp(m[1], h[1], t)} ` +
    `M${lerp(m[2], h[2], t)} L${lerp(m[3], h[3], t)} ` +
    `M${lerp(m[4], h[4], t)} L${lerp(m[5], h[5], t)}`
  );
};

export default function MarkMorph({ className }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const ground = useRef<SVGPathElement>(null);
  const glint = useRef<SVGPathElement>(null);
  const wl = useRef<SVGPathElement>(null);
  const wr = useRef<SVGPathElement>(null);
  const arrow = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !box.current
    )
      return;
    const ease = gsap.parseEase("power2.inOut");
    const proxy = { p: 0 };
    const apply = () => {
      const t = ease(proxy.p);
      const gd = seg(GROUND, t);
      ground.current?.setAttribute("d", gd);
      glint.current?.setAttribute("d", gd);
      wl.current?.setAttribute("d", seg(WALL_L, t));
      wr.current?.setAttribute("d", seg(WALL_R, t));
      arrow.current?.setAttribute("d", arrowD(t));
    };
    const morph = gsap.to(proxy, {
      p: 1,
      ease: "none",
      onUpdate: apply,
      scrollTrigger: {
        start: 0,
        end: () => window.innerHeight * 0.22,
        scrub: 0.25,
      },
    });
    const drift = gsap.to(box.current, {
      y: 40,
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: () => window.innerHeight * 0.6,
        scrub: 0.25,
      },
    });
    return () => {
      morph.scrollTrigger?.kill();
      morph.kill();
      drift.scrollTrigger?.kill();
      drift.kill();
    };
  }, []);

  return (
    <div ref={box} className={className} aria-hidden="true">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        className="h-full w-full [&_path]:[vector-effect:non-scaling-stroke]"
      >
        <defs>
          <linearGradient id="sh-gold-morph" gradientUnits="userSpaceOnUse" x1="4" y1="0" x2="28" y2="0">
            <stop offset="0" stopColor="#b8965c" />
            <stop offset="0.38" stopColor="#ead8ab" />
            <stop offset="0.58" stopColor="#e2c389" />
            <stop offset="1" stopColor="#a98a52" />
          </linearGradient>
        </defs>
        <path ref={ground} stroke="url(#sh-gold-morph)" strokeWidth="2.1" d="M4 7 L28 7" />
        {/* the twinkle: a short bright glint that travels the line */}
        <path ref={glint} className="mark-glint" stroke="#fff8e1" strokeWidth="1" strokeLinecap="round" d="M4 7 L28 7" pathLength="100" />
        <path ref={wl} d="M16 7 L16 14" />
        <path ref={wr} d="M16 7 L16 14" />
        <path ref={arrow} d="M16 14 L7 27 M16 14 L25 27 M16 14 L16 27" />
      </svg>
    </div>
  );
}
