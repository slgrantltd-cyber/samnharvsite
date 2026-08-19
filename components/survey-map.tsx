"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The signature moment: a surveyor's sketch of Great Britain, ruler-drawn.
 * The coastline draws itself, then survey lines extend from the South West
 * benchmark to working locations, each tagged with a strategy chip.
 * Deliberately stylised — a plan, not an atlas.
 */

const ORIGIN = { x: 315, y: 584.5 }; // Bristol — the South West benchmark

const STATIONS: {
  x: number;
  y: number;
  label: string;
  tag: string;
  gridRef: string;
}[] = [
  { x: 329.7, y: 433.5, label: "NORTH WEST", tag: "BRRR", gridRef: "SJ 89" },
  { x: 288.9, y: 582.3, label: "S. WALES", tag: "RENT TO RENT", gridRef: "ST 17" },
  { x: 344.5, y: 507.9, label: "MIDLANDS", tag: "FLIPS", gridRef: "SP 08" },
  { x: 359.7, y: 409.7, label: "YORKSHIRE", tag: "BLOCKS", gridRef: "SE 33" },
  { x: 273.7, y: 638.8, label: "SOUTH WEST", tag: "LAND", gridRef: "SX 99" },
  { x: 421.8, y: 580.8, label: "SOUTH EAST", tag: "SOURCING", gridRef: "TQ 38" },
];

// Great Britain's coastline, projected from public GeoJSON (low-poly on
// purpose — a surveyor's sketch, not an atlas).
const COAST = `M 296.5 50 L 250.1 130.5 L 294.4 120.3 L 341.9 120.7 L 330.6 181.3
L 291.6 248 L 336.5 252.7 L 339.9 260.5 L 378.6 348.3 L 408.3 360.3 L 435 445
L 447.4 474.4 L 500 488.6 L 494.7 536.2 L 472.6 558 L 489.9 596.5 L 450.9 635.4
L 392.8 634.7 L 318.9 655.2 L 298.7 640.5 L 269.9 675.4 L 229.8 667 L 199.3 695.4
L 176.2 680.5 L 239.9 602.4 L 278.7 586.3 L 210.6 573.8 L 198.3 544.2 L 243.7 521.2
L 219.9 481.1 L 228.2 432.4 L 292.7 439.1 L 299.1 395.9 L 270.1 350.1 L 216.7 336
L 206.3 315.8 L 222.1 282.6 L 207.8 262.1 L 184.5 297.3 L 181.9 225.6 L 160 187.6
L 175.8 110.7 L 209.5 50.4 L 244.2 56.3 L 296.5 50 Z`;

export default function SurveyMap() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const coast = section.querySelector<SVGPathElement>("[data-coast]");
    const lines = section.querySelectorAll<SVGLineElement>("[data-survey]");
    const chips = section.querySelectorAll<SVGGElement>("[data-station]");
    const captions = section.querySelectorAll<HTMLElement>("[data-caption]");
    if (!coast) return;

    const coastLen = coast.getTotalLength();
    coast.style.strokeDasharray = `${coastLen}`;

    if (reduced) {
      coast.style.strokeDashoffset = "0";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(coast, { strokeDashoffset: coastLen });
      lines.forEach((l) => {
        const len = Math.hypot(
          +l.getAttribute("x2")! - +l.getAttribute("x1")!,
          +l.getAttribute("y2")! - +l.getAttribute("y1")!,
        );
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(chips, { autoAlpha: 0, scale: 0.85, transformOrigin: "center" });
      gsap.set(captions[1], { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.6,
        },
      });

      tl.to(coast, { strokeDashoffset: 0, duration: 3 })
        .to(captions[0], { autoAlpha: 0, y: -24, duration: 0.5 }, ">-0.4")
        .to(captions[1], { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.2");

      lines.forEach((l, i) => {
        tl.to(l, { strokeDashoffset: 0, duration: 0.7 }, 3.2 + i * 0.55).to(
          chips[i],
          { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" },
          3.6 + i * 0.55,
        );
      });

      tl.to({}, { duration: 0.8 }); // settle beat at the end of the pin
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Where we work — a sketch map of Great Britain"
      className="relative flex h-svh flex-col overflow-clip"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-24 md:px-10 md:pt-28">
        <div className="relative h-28 md:h-32">
          <div data-caption className="absolute inset-x-0">
            <p className="annot muted">The territory</p>
            <h2 className="display mt-2 text-4xl md:text-6xl">
              Based in the <span className="display-it">South&nbsp;West.</span>
            </h2>
          </div>
          {/* hidden by default so reduced-motion never shows both at once */}
          <div data-caption className="absolute inset-x-0 opacity-0">
            <p className="annot muted">The territory</p>
            <h2 className="display mt-2 text-4xl md:text-6xl" aria-hidden="true">
              Working the <span className="display-it">whole&nbsp;map.</span>
            </h2>
          </div>
        </div>
      </div>

      <svg
        viewBox="140 30 380 700"
        className="mx-auto h-full w-auto max-w-full"
        role="img"
        aria-label="Stylised map with survey lines from the South West to regions across Britain"
      >
        <path
          data-coast
          d={COAST}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {STATIONS.map((s) => (
          <line
            key={s.tag}
            data-survey
            x1={ORIGIN.x}
            y1={ORIGIN.y}
            x2={s.x}
            y2={s.y}
            stroke="var(--ink)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.55"
          />
        ))}

        {STATIONS.map((s) => {
          const w = 14 + s.tag.length * 7.2;
          const left = s.x < ORIGIN.x;
          const rx = left ? s.x - w - 10 : s.x + 10;
          return (
            <g key={s.tag} data-station>
              <circle cx={s.x} cy={s.y} r="3.4" fill="var(--ink)" />
              <rect
                x={rx}
                y={s.y - 11}
                width={w}
                height={22}
                fill="var(--ink)"
              />
              <text
                x={rx + w / 2}
                y={s.y + 4}
                textAnchor="middle"
                fill="var(--bronze-bright)"
                fontFamily="var(--font-fragment)"
                fontSize="11"
                letterSpacing="0.08em"
              >
                {s.tag}
              </text>
              <text
                x={rx}
                y={s.y + 24}
                fill="var(--ink)"
                fillOpacity="0.55"
                fontFamily="var(--font-fragment)"
                fontSize="7.5"
                letterSpacing="0.1em"
              >
                {s.label} · {s.gridRef}
              </text>
            </g>
          );
        })}

        {/* the origin benchmark */}
        <g transform={`translate(${ORIGIN.x - 16} ${ORIGIN.y - 16})`}>
          <rect x="-4" y="-4" width="40" height="40" fill="var(--bronze-chip)" />
          <g
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinecap="square"
            fill="none"
          >
            <line x1="4" y1="7" x2="28" y2="7" />
            <line x1="16" y1="7" x2="16" y2="14" />
            <path d="M16 14 L7 27 M16 14 L25 27 M16 14 L16 27" />
          </g>
          <text
            x="-4"
            y="52"
            fill="var(--ink)"
            fillOpacity="0.55"
            fontFamily="var(--font-fragment)"
            fontSize="7.5"
            letterSpacing="0.1em"
          >
            HOME · ST 58
          </text>
        </g>
      </svg>

      <p className="annot muted absolute bottom-6 left-1/2 -translate-x-1/2">
        Fig. 1 — not to scale
      </p>
    </section>
  );
}
