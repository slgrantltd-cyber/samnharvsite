"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The territory, now the world: a surveyor's globe — hairline graticule,
 * simplified land outlines, no textures — pinned while it turns on scroll
 * so each mandate rotates to the front in turn: UK → Dubai → Thailand.
 * Orthographic projection drawn by hand in SVG; one re-render per frame
 * on a scrubbed timeline. Stylised on purpose: a plan, not an atlas.
 */

type LonLat = [number, number];
const R = 230; // globe radius in SVG units
const CX = 300, CY = 300;

// Very low-poly land outlines (lon,lat) — enough to read as the world.
const LAND: LonLat[][] = [
  // Europe + Africa (one loose outline)
  [[-10,36],[-9,43],[-2,48],[2,51],[5,53],[8,57],[11,56],[10,59],[5,62],[15,68],[25,71],[30,70],[40,66],[45,62],[42,58],[36,54],[28,52],[24,48],[30,45],[38,46],[40,41],[36,36],[28,36],[24,35],[18,40],[15,38],[12,44],[6,44],[3,42],[-1,37],[-6,36],[-10,36]],
  [[-17,21],[-17,15],[-12,8],[-5,5],[5,4],[10,4],[9,-1],[12,-5],[13,-12],[12,-17],[18,-34],[26,-34],[32,-27],[35,-20],[40,-12],[42,-2],[51,12],[43,12],[39,20],[33,28],[32,31],[25,32],[20,31],[10,34],[-2,35],[-9,32],[-17,21]],
  // Arabia + Middle East
  [[34,28],[36,30],[40,36],[45,38],[50,37],[56,37],[60,32],[57,25],[56,23],[51,24],[52,19],[55,17],[52,15],[45,13],[43,16],[39,21],[34,28]],
  // Asia (loose)
  [[60,32],[62,38],[66,42],[72,44],[75,40],[70,37],[75,30],[68,24],[72,20],[77,8],[80,15],[87,22],[92,22],[98,16],[98,8],[102,2],[104,2],[104,10],[109,12],[109,20],[118,22],[122,30],[122,37],[127,40],[131,44],[136,50],[141,54],[150,59],[156,62],[165,65],[178,66],[180,68],[160,70],[140,72],[110,73],[80,72],[60,68],[50,58],[47,48],[52,42],[60,32]],
  // India
  [[68,24],[72,20],[77,8],[80,15],[87,22],[77,30],[68,24]],
  // SE Asia / Indonesia (loose)
  [[95,6],[100,-2],[106,-6],[115,-8],[122,-9],[130,-8],[141,-2],[140,-9],[132,-10],[125,-5],[118,0],[114,4],[108,2],[103,2],[100,6],[98,8],[95,6]],
  // Australia
  [[114,-22],[122,-18],[132,-12],[137,-15],[142,-11],[146,-18],[153,-26],[150,-36],[140,-38],[132,-32],[124,-34],[115,-34],[114,-22]],
  // Japan
  [[130,31],[134,34],[140,36],[142,41],[141,45],[139,38],[133,35],[130,31]],
  // UK + Ireland
  [[-5,50],[1,51],[2,53],[-1,55],[-2,58],[-5,59],[-6,56],[-3,54],[-5,53],[-5,50]],
  [[-10,52],[-6,52],[-6,55],[-8,55],[-10,52]],
  // Americas (loose)
  [[-70,-54],[-75,-45],[-71,-30],[-70,-18],[-77,-12],[-81,-5],[-80,2],[-78,8],[-84,10],[-88,16],[-97,18],[-105,22],[-115,30],[-120,34],[-124,40],[-124,48],[-135,58],[-150,60],[-165,62],[-165,66],[-140,70],[-110,70],[-95,68],[-80,65],[-65,60],[-58,52],[-65,46],[-70,43],[-75,36],[-81,31],[-80,26],[-90,30],[-97,28],[-98,22],[-87,21],[-84,18],[-78,8],[-62,10],[-52,5],[-50,0],[-35,-8],[-40,-22],[-48,-28],[-53,-34],[-62,-40],[-65,-48],[-70,-54]],
  // Greenland
  [[-45,60],[-40,65],[-25,70],[-20,75],[-30,82],[-55,82],[-70,78],[-60,70],[-53,65],[-45,60]],
  // NZ
  [[166,-46],[170,-44],[174,-40],[178,-38],[176,-40],[172,-43],[168,-47],[166,-46]],
];

const MANDATES = [
  { label: "United Kingdom", lon: -2.9, lat: 51.3, kicker: "Somerset · Bristol corridor", line: "Cash-flowing houses and conversions — operated by us." },
  { label: "Dubai", lon: 55.3, lat: 25.2, kicker: "United Arab Emirates", line: "Residences, direct from the developer." },
  { label: "Thailand", lon: 100.5, lat: 12.0, kicker: "One of its premier island destinations", line: "A resort, operating — off-market." },
];

const d2r = Math.PI / 180;

/** Orthographic projection with rotation (lambda = centre lon, phi = centre lat). */
function project(lon: number, lat: number, lam: number, phi: number) {
  const λ = (lon - lam) * d2r, φ = lat * d2r, φ0 = phi * d2r;
  const cosc = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ);
  const x = R * Math.cos(φ) * Math.sin(λ);
  const y = R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ));
  return { x: CX + x, y: CY - y, visible: cosc > 0, depth: cosc };
}

function pathFor(poly: LonLat[], lam: number, phi: number) {
  // Clip to the visible hemisphere by breaking the path at horizon crossings.
  let d = ""; let pen = false;
  for (const [lon, lat] of poly) {
    const p = project(lon, lat, lam, phi);
    if (p.visible) { d += (pen ? "L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1) + " "; pen = true; }
    else pen = false;
  }
  return d;
}

function graticule(lam: number, phi: number) {
  let d = "";
  for (let lon = -180; lon < 180; lon += 30) {
    let pen = false;
    for (let lat = -90; lat <= 90; lat += 5) {
      const p = project(lon, lat, lam, phi);
      if (p.visible) { d += (pen ? "L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1) + " "; pen = true; } else pen = false;
    }
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    let pen = false;
    for (let lon = -180; lon <= 180; lon += 5) {
      const p = project(lon, lat, lam, phi);
      if (p.visible) { d += (pen ? "L" : "M") + p.x.toFixed(1) + " " + p.y.toFixed(1) + " "; pen = true; } else pen = false;
    }
  }
  return d;
}

export default function MandateGlobe() {
  const section = useRef<HTMLDivElement>(null);
  const landRef = useRef<SVGPathElement>(null);
  const gratRef = useRef<SVGPathElement>(null);
  const pinRefs = useRef<(SVGGElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const initial = useMemo(() => ({ lam: MANDATES[0].lon, phi: MANDATES[0].lat - 15 }), []);

  useEffect(() => {
    const sec = section.current; if (!sec) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { lam: initial.lam, phi: initial.phi };

    const render = () => {
      landRef.current?.setAttribute("d", LAND.map((p) => pathFor(p, state.lam, state.phi)).join(" "));
      gratRef.current?.setAttribute("d", graticule(state.lam, state.phi));
      MANDATES.forEach((m, i) => {
        const p = project(m.lon, m.lat, state.lam, state.phi);
        const g = pinRefs.current[i]; if (!g) return;
        g.setAttribute("transform", `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        g.style.opacity = p.visible ? String(0.35 + p.depth * 0.65) : "0";
      });
    };
    render();
    if (reduced) return;

    gsap.set(captionRefs.current.slice(1), { autoAlpha: 0, y: 24 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: "top top", end: "+=260%", pin: true, scrub: 0.6 },
      defaults: { ease: "none" },
    });
    // UK (rest) → Dubai → Thailand, captions swapping as the globe turns
    tl.to({}, { duration: 0.6 })
      .to(state, { lam: MANDATES[1].lon, phi: MANDATES[1].lat - 10, duration: 1.2, onUpdate: render })
      .to(captionRefs.current[0], { autoAlpha: 0, y: -24, duration: 0.4 }, "<0.2")
      .to(captionRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.25")
      .to({}, { duration: 0.5 })
      .to(state, { lam: MANDATES[2].lon, phi: MANDATES[2].lat - 4, duration: 1.2, onUpdate: render })
      .to(captionRefs.current[1], { autoAlpha: 0, y: -24, duration: 0.4 }, "<0.2")
      .to(captionRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.25")
      .to({}, { duration: 0.6 });

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, [initial]);

  return (
    <section ref={section} className="m-limestone relative h-[100svh] overflow-hidden">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-6 px-5 pt-24 md:grid-cols-5 md:gap-8 md:px-10 md:pt-20">
        <div className="relative z-10 md:col-span-2">
          <div className="relative h-44 md:h-56">
            {MANDATES.map((m, i) => (
              <div key={m.label} ref={(el) => { captionRefs.current[i] = el; }} className="absolute inset-x-0">
                <p className="annot muted">02 — The territory</p>
                <h2 className="display mt-2 text-4xl md:text-6xl">
                  {m.label.split(" ")[0]}{" "}
                  <span className="display-it">{m.label.split(" ").slice(1).join(" ") || ""}</span>
                </h2>
                <p className="annot mt-3 text-bronze">{m.kicker}</p>
                <p className="muted mt-2 max-w-sm">{m.line}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <svg viewBox="0 0 600 600" className="mx-auto h-auto w-full max-w-[420px] md:max-w-[560px]" aria-label="A globe turning between the United Kingdom, Dubai and Thailand">
            <circle cx={CX} cy={CY} r={R} fill="rgba(255,252,244,0.35)" stroke="var(--ink)" strokeWidth="1.2" />
            <path ref={gratRef} fill="none" stroke="var(--ink)" strokeOpacity="0.14" strokeWidth="0.6" />
            <path ref={landRef} fill="rgba(26,26,26,0.06)" stroke="var(--ink)" strokeWidth="1" strokeLinejoin="round" />
            {MANDATES.map((m, i) => (
              <g key={m.label} ref={(el) => { pinRefs.current[i] = el; }}>
                <circle r="10" fill="none" stroke="var(--bronze)" strokeWidth="1" opacity=".6" />
                <circle r="3.2" fill="var(--bronze)" />
                <line x1="0" y1="-14" x2="0" y2="-34" stroke="var(--ink)" strokeWidth="0.8" />
                <text y="-40" textAnchor="middle" className="fill-[var(--ink)]" style={{ font: "500 9.5px var(--font-fragment), monospace", letterSpacing: ".16em" }}>
                  {m.label.toUpperCase()}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <p className="annot muted absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Scroll to turn the globe</p>
    </section>
  );
}
