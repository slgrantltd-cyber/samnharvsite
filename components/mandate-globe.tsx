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

// Very low-poly land outlines (lon,lat) — enough to read as the world.
const LAND: LonLat[][] = [
  // Europe
  [[-9.5,43.5],[-8.9,42.0],[-9.2,39.0],[-8.8,37.0],[-6.0,36.0],[-2.1,36.7],[0.2,38.8],[3.2,41.9],[4.8,43.4],[7.5,43.8],[10.5,42.9],[12.4,41.7],[15.6,38.0],[16.2,39.5],[18.5,40.2],[15.0,41.9],[13.6,45.7],[14.5,45.2],[19.4,41.9],[21.8,37.0],[23.7,37.9],[26.4,40.9],[28.0,41.1],[29.0,41.0],[28.4,43.5],[30.7,46.5],[33.5,44.6],[37.4,47.0],[39.0,44.5],[41.6,41.6],[40.0,43.5],[47.7,45.3],[50.2,51.0],[44.6,55.0],[39.0,57.5],[35.0,64.5],[40.4,67.9],[33.0,69.4],[28.2,70.9],[19.0,69.8],[14.0,67.3],[10.5,63.5],[5.2,62.2],[5.5,58.9],[10.5,59.9],[12.0,56.0],[10.1,54.3],[8.6,53.5],[5.0,53.0],[3.2,51.3],[1.6,50.9],[-1.6,48.6],[-4.6,48.4],[-1.2,46.2],[-1.3,43.5],[-4.2,43.5],[-8.0,43.7],[-9.5,43.5]],
  // Africa
  [[-5.9,35.8],[-9.8,31.3],[-15.9,23.7],[-17.0,20.8],[-16.5,14.7],[-15.8,11.0],[-12.5,7.5],[-7.5,4.4],[-2.0,4.8],[3.3,6.4],[9.6,4.0],[8.8,0.5],[11.8,-4.8],[13.5,-12.3],[11.9,-17.3],[14.5,-22.9],[17.1,-29.6],[18.5,-34.3],[25.7,-33.9],[32.9,-28.3],[35.4,-23.9],[40.7,-14.9],[39.3,-6.9],[41.0,-1.9],[45.0,5.6],[51.2,11.8],[43.2,12.5],[39.0,19.5],[37.2,25.0],[33.4,27.6],[32.3,31.3],[29.0,31.0],[20.0,32.2],[15.2,32.4],[10.9,34.0],[8.4,36.9],[2.0,36.6],[-1.2,35.8],[-5.9,35.8]],
  // Arabia
  [[34.9,29.5],[36.8,30.0],[39.2,32.2],[41.0,37.1],[44.1,37.4],[48.0,30.0],[50.0,26.4],[51.5,25.3],[56.4,26.2],[56.4,24.0],[59.8,22.5],[57.0,19.0],[55.3,17.0],[52.2,16.0],[45.0,13.0],[43.2,13.0],[42.7,16.8],[39.0,21.5],[38.0,24.0],[34.9,29.5]],
  // Asia mainland
  [[44.1,37.4],[48.8,38.4],[54.8,37.0],[57.0,38.5],[61.2,36.5],[61.8,35.0],[66.3,37.3],[71.2,37.0],[74.9,37.2],[78.7,34.0],[80.0,30.0],[88.0,27.8],[91.9,27.7],[97.3,28.2],[98.9,24.0],[100.1,21.4],[101.2,17.3],[103.0,14.0],[102.5,12.1],[100.1,13.5],[99.2,9.3],[100.4,5.4],[103.4,1.3],[104.3,3.8],[103.4,10.5],[106.7,10.6],[109.3,13.4],[108.0,21.5],[110.3,21.0],[113.5,22.5],[118.0,24.5],[121.9,30.0],[119.3,34.5],[121.9,37.4],[117.8,39.0],[121.5,40.9],[126.5,37.7],[129.5,36.0],[129.4,42.4],[130.8,42.7],[135.2,43.9],[140.4,48.4],[141.5,52.3],[136.7,54.8],[141.3,58.1],[149.2,59.3],[153.3,59.1],[156.6,61.0],[160.3,60.9],[161.9,69.0],[170.1,69.9],[179.9,68.9],[180.0,71.5],[159.9,70.9],[150.8,71.8],[140.2,72.7],[127.9,73.4],[112.9,73.8],[104.1,77.7],[97.3,76.0],[86.4,75.2],[80.3,73.6],[73.5,68.4],[66.4,69.6],[59.9,70.6],[57.0,68.6],[52.4,68.3],[44.1,66.0],[40.4,67.9],[35.0,64.5],[39.0,57.5],[44.6,55.0],[50.2,51.0],[47.7,45.3],[46.5,42.0],[44.1,37.4]],
  // India
  [[66.3,25.5],[69.0,22.5],[72.8,19.0],[74.0,14.5],[76.4,9.0],[77.5,8.1],[80.2,13.0],[80.3,16.0],[84.1,18.7],[86.9,21.0],[89.0,22.0],[91.9,22.2],[92.4,25.0],[88.0,27.8],[80.0,30.0],[74.9,32.0],[68.9,28.0],[66.3,25.5]],
  // Sri Lanka
  [[79.8,8.5],[81.9,7.4],[81.2,6.0],[80.0,6.5],[79.8,8.5]],
  // Sumatra / Java / Borneo / Sulawesi
  [[95.3,5.6],[100.3,1.5],[104.4,-2.3],[106.0,-5.9],[104.5,-3.6],[101.2,-1.6],[96.3,2.8],[95.3,5.6]],
  [[105.5,-6.8],[110.0,-6.9],[114.5,-8.1],[112.0,-8.4],[106.5,-7.5],[105.5,-6.8]],
  [[109.0,1.5],[111.0,3.0],[115.5,5.5],[117.8,6.4],[119.3,4.8],[118.0,0.9],[116.5,-3.4],[112.6,-3.5],[110.2,-2.9],[109.0,1.5]],
  [[119.5,1.4],[120.8,0.8],[122.9,0.4],[125.0,1.5],[121.5,-3.9],[120.4,-5.5],[119.5,-3.0],[119.5,1.4]],
  // Philippines (loose)
  [[120.6,18.5],[122.2,16.0],[124.0,13.0],[126.5,8.0],[125.0,6.0],[122.0,7.0],[120.0,12.0],[119.9,16.0],[120.6,18.5]],
  // New Guinea
  [[131.0,-1.3],[134.5,-1.0],[138.0,-1.6],[141.0,-2.6],[147.0,-6.5],[150.0,-10.3],[147.0,-9.5],[143.5,-8.0],[141.0,-9.1],[138.0,-7.8],[135.0,-4.3],[132.5,-2.8],[131.0,-1.3]],
  // Australia
  [[113.7,-22.0],[114.2,-26.5],[115.0,-31.0],[116.0,-34.5],[121.0,-33.8],[125.0,-32.2],[131.0,-31.5],[135.5,-34.5],[138.6,-35.0],[140.0,-38.0],[144.0,-38.4],[147.0,-38.0],[150.0,-37.3],[151.3,-33.9],[153.2,-27.5],[151.0,-23.0],[146.0,-19.0],[145.5,-14.5],[142.5,-10.8],[141.5,-14.8],[137.0,-16.0],[135.5,-14.0],[132.0,-11.5],[129.5,-14.5],[127.0,-14.0],[124.0,-16.5],[122.0,-18.0],[120.0,-20.0],[116.5,-20.8],[113.7,-22.0]],
  // NZ
  [[172.8,-34.5],[175.9,-37.0],[178.0,-38.0],[176.0,-41.4],[174.8,-41.3],[172.8,-34.5]],
  [[172.7,-40.5],[174.4,-41.2],[173.5,-43.0],[171.2,-44.3],[168.5,-46.5],[166.5,-45.8],[168.5,-44.0],[171.0,-42.5],[172.7,-40.5]],
  // Japan
  [[130.0,31.5],[131.5,33.5],[135.0,33.8],[137.0,34.6],[139.8,35.0],[141.0,38.0],[141.5,41.0],[140.0,40.5],[139.5,38.0],[136.8,37.2],[133.0,35.5],[130.0,31.5]],
  [[140.0,42.0],[143.0,42.5],[145.5,43.5],[142.0,45.3],[140.0,42.0]],
  // UK + Ireland
  [[-5.7,50.0],[-3.5,50.4],[-1.0,50.7],[1.4,51.1],[1.6,52.9],[0.1,53.6],[-1.5,55.0],[-1.8,57.5],[-3.2,58.6],[-5.0,58.6],[-6.2,57.0],[-5.5,56.0],[-5.0,55.0],[-3.2,54.1],[-4.6,53.3],[-5.2,51.7],[-3.0,51.4],[-4.5,51.0],[-5.7,50.0]],
  [[-10.3,51.8],[-6.0,52.2],[-6.1,53.9],[-5.7,55.2],[-8.2,55.3],[-10.0,54.3],[-10.3,51.8]],
  // Iceland
  [[-24.5,65.0],[-22.0,66.5],[-15.0,66.0],[-13.5,65.0],[-18.0,63.4],[-22.5,63.8],[-24.5,65.0]],
  // Greenland
  [[-44.0,60.0],[-42.0,64.0],[-38.0,65.5],[-22.0,70.5],[-20.0,75.0],[-18.0,80.0],[-30.0,83.5],[-60.0,82.0],[-72.0,78.0],[-68.0,75.0],[-56.0,71.0],[-53.0,66.0],[-49.0,62.0],[-44.0,60.0]],
  // North America
  [[-165.0,66.0],[-162.0,61.0],[-152.0,58.0],[-145.0,60.5],[-135.0,58.0],[-128.0,50.0],[-124.5,48.5],[-124.0,40.0],[-120.5,34.5],[-117.0,32.5],[-112.0,28.5],[-109.5,23.0],[-105.5,20.0],[-97.5,17.0],[-92.0,15.5],[-87.5,13.5],[-84.0,10.0],[-79.0,8.5],[-77.0,8.0],[-81.5,9.5],[-83.5,15.5],[-88.0,16.5],[-87.5,21.5],[-91.0,19.0],[-97.5,22.0],[-97.5,27.5],[-93.0,29.8],[-89.0,29.5],[-85.0,30.0],[-82.5,28.0],[-80.0,25.0],[-81.5,31.0],[-76.0,35.0],[-75.0,39.0],[-70.5,42.0],[-67.0,44.5],[-61.0,45.5],[-64.0,48.0],[-58.0,51.0],[-55.5,53.0],[-60.0,56.0],[-64.5,60.0],[-78.0,62.5],[-81.0,66.0],[-91.0,69.5],[-105.0,68.5],[-115.0,70.0],[-128.0,70.5],[-140.0,69.5],[-156.0,71.0],[-162.0,69.0],[-165.0,66.0]],
  // Central America link + Caribbean (tiny)
  [[-84.5,22.0],[-81.0,23.0],[-74.5,20.5],[-77.0,20.0],[-84.5,22.0]],
  // South America
  [[-77.0,8.0],[-79.0,1.5],[-81.0,-3.0],[-77.5,-11.5],[-70.5,-18.5],[-70.8,-26.0],[-71.5,-33.0],[-73.5,-40.0],[-75.0,-48.0],[-71.5,-53.5],[-68.0,-54.5],[-65.5,-48.0],[-62.0,-40.0],[-58.0,-35.0],[-53.5,-33.5],[-48.5,-27.0],[-42.0,-23.0],[-39.0,-16.0],[-35.0,-9.0],[-39.0,-3.0],[-44.0,-1.5],[-50.0,0.5],[-52.0,5.0],[-60.0,8.5],[-64.0,10.5],[-71.5,12.0],[-75.5,10.5],[-77.0,8.0]],
];

const MANDATES = [
  { label: "United Kingdom", lon: -2.9, lat: 51.3, kicker: "Somerset · Bristol corridor", line: "Cash-flowing houses and conversions — operated by us." },
  { label: "Dubai", lon: 55.3, lat: 25.2, kicker: "United Arab Emirates", line: "Residences, direct from the developer." },
  { label: "Thailand", lon: 100.5, lat: 12.0, kicker: "One of its premier island destinations", line: "A resort, operating — off-market." },
];

const d2r = Math.PI / 180;

/* ---------- geometry ----------
   Orthographic projection of a unit sphere rotated to (lam, phi).
   We work in 3-D unit vectors so hemisphere clipping can be done
   geometrically: polygons are clipped against the great-circle plane
   z = 0 (the horizon) using Sutherland–Hodgman, so land stays a
   CLOSED shape as it crosses the limb — fills never drop. */
type V3 = [number, number, number];
function toVec(lon: number, lat: number): V3 {
  const λ = lon * d2r, φ = lat * d2r;
  return [Math.cos(φ) * Math.cos(λ), Math.cos(φ) * Math.sin(λ), Math.sin(φ)];
}
function rotate(v: V3, lam: number, phi: number): V3 {
  // 1) yaw about the polar (z) axis so longitude `lam` faces the viewer (+x)
  const a = -lam * d2r;
  const x1 = v[0] * Math.cos(a) - v[1] * Math.sin(a);
  const y1 = v[0] * Math.sin(a) + v[1] * Math.cos(a);
  const z1 = v[2];
  // 2) pitch about the horizontal screen axis (y) so latitude `phi` faces the viewer
  const b = phi * d2r;
  const x2 = x1 * Math.cos(b) + z1 * Math.sin(b);
  const z2 = -x1 * Math.sin(b) + z1 * Math.cos(b);
  return [x2, y1, z2]; // x2 = depth toward viewer, y1 = screen-right, z2 = screen-up
}
/** Clip a ring (rotated vectors) to the visible hemisphere (x > 0). */
function clipToFront(ring: V3[]): V3[] {
  const out: V3[] = [];
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const a = ring[i], b = ring[(i + 1) % n];
    const ina = a[0] > 0, inb = b[0] > 0;
    if (ina) out.push(a);
    if (ina !== inb) {
      const t = a[0] / (a[0] - b[0]);
      const m: V3 = [0, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      // push intersection onto the limb circle
      const l = Math.hypot(m[1], m[2]) || 1;
      out.push([0, m[1] / l, m[2] / l]);
    }
  }
  return out;
}

export default function MandateGlobe() {
  const section = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // pre-convert land to unit vectors once
  const landVec = useMemo(() => LAND.map((poly) => poly.map(([lo, la]) => toVec(lo, la))), []);
  const initial = useMemo(() => ({ lam: MANDATES[0].lon, phi: MANDATES[0].lat - 12 }), []);

  useEffect(() => {
    const sec = section.current, cv = canvas.current; if (!sec || !cv) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { lam: initial.lam, phi: initial.phi };
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, R = 0, CX = 0, CY = 0, dpr = 1;

    const resize = () => {
      const rect = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      W = rect.width; H = rect.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * 0.46; CX = W / 2; CY = H / 2;
      draw();
    };

    const proj = (v: V3) => ({ x: CX + v[1] * R, y: CY - v[2] * R, depth: v[0] });

    let queued = false;
    const draw = () => {
      queued = false;
      ctx.clearRect(0, 0, W, H);
      // soft drop shadow
      ctx.save();
      ctx.filter = "blur(10px)";
      ctx.fillStyle = "rgba(26,26,26,0.16)";
      ctx.beginPath(); ctx.ellipse(CX + R * 0.04, CY + R * 1.06, R * 0.78, R * 0.07, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      // atmosphere halo
      const halo = ctx.createRadialGradient(CX, CY, R * 0.98, CX, CY, R * 1.06);
      halo.addColorStop(0, "rgba(140,123,101,0.22)"); halo.addColorStop(1, "rgba(140,123,101,0)");
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(CX, CY, R * 1.06, 0, Math.PI * 2); ctx.fill();
      // ocean (lit sphere)
      const ocean = ctx.createRadialGradient(CX - R * 0.32, CY - R * 0.36, R * 0.05, CX, CY, R * 1.05);
      ocean.addColorStop(0, "#fbf8f1"); ocean.addColorStop(0.45, "#ebe4d6"); ocean.addColorStop(0.82, "#d1c6b1"); ocean.addColorStop(1, "#ad9f86");
      ctx.fillStyle = ocean; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();
      // clip everything else to the disc
      ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      // graticule
      ctx.lineWidth = 0.6; ctx.strokeStyle = "rgba(26,26,26,0.16)";
      ctx.beginPath();
      for (let lon = -180; lon < 180; lon += 15) {
        let pen = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const v = rotate(toVec(lon, lat), state.lam, state.phi);
          if (v[0] > 0) { const p = proj(v); if (pen) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); pen = true; } else pen = false;
        }
      }
      for (let lat = -75; lat <= 75; lat += 15) {
        let pen = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const v = rotate(toVec(lon, lat), state.lam, state.phi);
          if (v[0] > 0) { const p = proj(v); if (pen) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); pen = true; } else pen = false;
        }
      }
      ctx.stroke();
      // land — closed polygons clipped to the hemisphere; fills never drop
      ctx.lineJoin = "round"; ctx.lineWidth = 0.9;
      for (const poly of landVec) {
        const ring = clipToFront(poly.map((v) => rotate(v, state.lam, state.phi)));
        if (ring.length < 3) continue;
        ctx.beginPath();
        ring.forEach((v, i) => { const p = proj(v); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); });
        ctx.closePath();
        // shade land by depth: brighter facing the viewer, darker toward the limb
        const c = ring.reduce((s, v) => s + v[0], 0) / ring.length;
        const lum = 0.78 + c * 0.22;
        ctx.fillStyle = `rgba(${Math.round(201 * lum)},${Math.round(190 * lum)},${Math.round(165 * lum)},0.96)`;
        ctx.fill();
        ctx.strokeStyle = "rgba(26,26,26,0.75)"; ctx.stroke();
      }
      // limb shading + specular
      const limb = ctx.createRadialGradient(CX - R * 0.2, CY - R * 0.28, R * 0.55, CX, CY, R);
      limb.addColorStop(0, "rgba(26,26,26,0)"); limb.addColorStop(1, "rgba(26,26,26,0.30)");
      ctx.fillStyle = limb; ctx.fillRect(0, 0, W, H);
      const spec = ctx.createRadialGradient(CX - R * 0.4, CY - R * 0.48, 0, CX - R * 0.4, CY - R * 0.48, R * 0.5);
      spec.addColorStop(0, "rgba(255,255,255,0.5)"); spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec; ctx.fillRect(0, 0, W, H);
      ctx.restore();
      // rim
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(26,26,26,0.55)";
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();
      // pins (HTML overlays positioned over the canvas)
      MANDATES.forEach((m, i) => {
        const v = rotate(toVec(m.lon, m.lat), state.lam, state.phi);
        const el = pinRefs.current[i]; if (!el) return;
        const p = proj(v);
        el.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
        el.style.opacity = v[0] > 0.02 ? String(0.3 + v[0] * 0.7) : "0";
      });
    };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(draw); } };

    const ro = new ResizeObserver(resize); ro.observe(cv); resize();
    if (reduced) return () => ro.disconnect();

    gsap.set(captionRefs.current.slice(1), { autoAlpha: 0, y: 24 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: "top top", end: "+=260%", pin: true, scrub: 0.6 },
      defaults: { ease: "none" },
    });
    tl.to({}, { duration: 0.6 })
      .to(state, { lam: MANDATES[1].lon, phi: MANDATES[1].lat - 12, duration: 1.2, onUpdate: request })
      .to(captionRefs.current[0], { autoAlpha: 0, y: -24, duration: 0.4 }, "<0.2")
      .to(captionRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.25")
      .to({}, { duration: 0.5 })
      .to(state, { lam: MANDATES[2].lon, phi: MANDATES[2].lat - 6, duration: 1.2, onUpdate: request })
      .to(captionRefs.current[1], { autoAlpha: 0, y: -24, duration: 0.4 }, "<0.2")
      .to(captionRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.25")
      .to({}, { duration: 0.6 });

    return () => { ro.disconnect(); tl.scrollTrigger?.kill(); tl.kill(); };
  }, [initial, landVec]);

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
        <div className="relative mx-auto aspect-square w-full max-w-[520px] md:col-span-3 md:max-w-[700px]">
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-label="A globe turning between the United Kingdom, Dubai and Thailand" />
          {/* pins: HTML so the type stays crisp at any DPR */}
          {MANDATES.map((m, i) => (
            <div key={m.label} ref={(el) => { pinRefs.current[i] = el; }} className="pointer-events-none absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze/70" />
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze" />
                <span className="absolute left-1/2 top-[-34px] h-[22px] w-px -translate-x-1/2 bg-ink/70" />
                <span className="annot absolute left-1/2 top-[-46px] -translate-x-1/2 whitespace-nowrap text-ink">{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="annot muted absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Scroll to turn the globe</p>
    </section>
  );
}
