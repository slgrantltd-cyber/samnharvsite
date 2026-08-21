"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/**
 * The territory, as a globe: a dot-matrix sphere — land rendered as a
 * field of fine ink points on plaster, lit by a gold rim and a sheen that
 * travels with the page. Pinned while it turns on scroll (UK → Dubai →
 * Thailand); drag to turn it yourself, it springs back. All geometry is
 * precomputed once into typed arrays; each frame is one rotation pass and
 * a few thousand tiny arcs — fast on a phone, no WebGL, no textures.
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
  { label: "United Kingdom", href: "/opportunities#uk", cta: "See the UK mandates", lon: -2.9, lat: 51.3, kicker: "Cash-flowing · long term", line: "Houses bought below the street, refinanced at value, professionally managed — income from month one." },
  { label: "Dubai", href: "/opportunities#dubai", cta: "See the Dubai mandate", lon: 55.3, lat: 25.2, kicker: "Capital appreciation · short to medium term", line: "Launch allocations at developer price, on developer payment plans — growth over the build, yield at handover." },
  { label: "Thailand", href: "/opportunities#thailand", cta: "See the resort mandate", lon: 100.5, lat: 12.0, kicker: "Operating asset · long term", line: "A trading resort, off-market — income and appreciation in one complete operation." },
];

const d2r = Math.PI / 180;
const GOLD = { deep: "#a98a52", mid: "#c9ab7c", hi: "#f3e3b4" };

/* ---------- geometry ---------- */
function inPoly(lon: number, lat: number, poly: LonLat[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
/** Even-density dot field over land: lat rows, lon spacing widened by 1/cos(lat). */
function buildDots(stepDeg: number): Float32Array {
  const out: number[] = [];
  for (let lat = -84; lat <= 84; lat += stepDeg) {
    const step = stepDeg / Math.max(0.18, Math.cos(lat * d2r));
    for (let lon = -180; lon < 180; lon += step) {
      let land = false;
      for (const p of LAND) if (inPoly(lon, lat, p)) { land = true; break; }
      if (!land) continue;
      const λ = lon * d2r, φ = lat * d2r;
      out.push(Math.cos(φ) * Math.cos(λ), Math.cos(φ) * Math.sin(λ), Math.sin(φ));
    }
  }
  return new Float32Array(out);
}

export default function MandateGlobe() {
  const section = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useMemo(() => buildDots(1.5), []);
  const initial = useMemo(() => ({ lam: MANDATES[0].lon, phi: MANDATES[0].lat - 12 }), []);

  useEffect(() => {
    const sec = section.current, cv = canvas.current; if (!sec || !cv) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { lam: initial.lam, phi: initial.phi };   // scroll-driven
    const drag = { lam: 0, phi: 0 };                         // hand-driven offset, springs back
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, R = 0, CX = 0, CY = 0, dpr = 1;
    const N = dots.length / 3;
    const rx = new Float32Array(N), ry = new Float32Array(N), rz = new Float32Array(N);

    const resize = () => {
      const rect = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * 0.45; CX = W / 2; CY = H / 2;
      draw();
    };

    const sheen = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sheen")) || 0.5;

    let queued = false;
    const draw = () => {
      queued = false;
      const lam = state.lam + drag.lam, phi = state.phi + drag.phi;
      const a = -lam * d2r, ca = Math.cos(a), sa = Math.sin(a);
      const b = phi * d2r, cb = Math.cos(b), sb = Math.sin(b);
      // rotate every dot: yaw about polar axis, then pitch toward viewer
      for (let i = 0; i < N; i++) {
        const x = dots[i * 3], y = dots[i * 3 + 1], z = dots[i * 3 + 2];
        const x1 = x * ca - y * sa, y1 = x * sa + y * ca;
        rx[i] = x1 * cb + z * sb;           // depth toward viewer
        ry[i] = y1;                          // screen right
        rz[i] = -x1 * sb + z * cb;           // screen up
      }

      ctx.clearRect(0, 0, W, H);

      // ground: plaster sphere with a soft inner glow, gold at the rim
      const ground = ctx.createRadialGradient(CX - R * 0.25, CY - R * 0.3, R * 0.1, CX, CY, R);
      ground.addColorStop(0, "#faf8f3"); ground.addColorStop(0.7, "#f1ede4"); ground.addColorStop(1, "#e6e0d3");
      ctx.fillStyle = ground; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();

      // dots — size and weight by depth so the sphere reads as round
      ctx.fillStyle = "#1a1a1a";
      for (let i = 0; i < N; i++) {
        const d = rx[i]; if (d <= 0.02) continue;
        const px = CX + ry[i] * R, py = CY - rz[i] * R;
        const r = R * (0.0034 + d * 0.0036);
        ctx.globalAlpha = 0.22 + d * 0.6;
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // gold rim light + a travelling sheen tied to the page's --sheen
      ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      const rim = ctx.createRadialGradient(CX, CY, R * 0.78, CX, CY, R);
      rim.addColorStop(0, "rgba(201,171,124,0)"); rim.addColorStop(0.75, "rgba(201,171,124,0.12)"); rim.addColorStop(1, "rgba(169,138,82,0.42)");
      ctx.fillStyle = rim; ctx.fillRect(0, 0, W, H);
      const s = sheen();
      const sx = CX + (s * 2 - 1) * R * 1.2, sy = CY - R * 0.55;
      const glint = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * 0.9);
      glint.addColorStop(0, "rgba(243,227,180,0.16)"); glint.addColorStop(0.45, "rgba(243,227,180,0.04)"); glint.addColorStop(1, "rgba(243,227,180,0)");
      ctx.fillStyle = glint; ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // rim line — gold, fine
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(169,138,82,0.55)";
      ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();

      // pins (HTML overlays)
      MANDATES.forEach((m, i) => {
        const λ = m.lon * d2r, φ = m.lat * d2r;
        const x = Math.cos(φ) * Math.cos(λ), y = Math.cos(φ) * Math.sin(λ), z = Math.sin(φ);
        const x1 = x * ca - y * sa, y1 = x * sa + y * ca;
        const d = x1 * cb + z * sb, sr = y1, su = -x1 * sb + z * cb;
        const el = pinRefs.current[i]; if (!el) return;
        el.style.transform = `translate(${(CX + sr * R).toFixed(1)}px, ${(CY - su * R).toFixed(1)}px)`;
        el.style.opacity = d > 0.02 ? String(0.2 + d * 0.8) : "0"; el.style.pointerEvents = d > 0.1 ? "auto" : "none";
      });
    };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(draw); } };

    const ro = new ResizeObserver(resize); ro.observe(cv); resize();
    // only spend frames while the globe is actually on screen
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) request(); }, { threshold: 0.05 });
    io.observe(sec);
    const onSheen = () => { if (visible) request(); };
    window.addEventListener("scroll", onSheen, { passive: true });

    // drag to turn, spring back
    let down = false, lx = 0, ly = 0;
    const pd = (e: PointerEvent) => { down = true; lx = e.clientX; ly = e.clientY; gsap.killTweensOf(drag); cv.setPointerCapture(e.pointerId); };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      drag.lam -= (e.clientX - lx) * 0.25; drag.phi += (e.clientY - ly) * 0.18;
      drag.phi = Math.max(-40, Math.min(40, drag.phi));
      lx = e.clientX; ly = e.clientY; request();
    };
    const pu = () => { if (!down) return; down = false; gsap.to(drag, { lam: 0, phi: 0, duration: 1.6, ease: "elastic.out(1, 0.7)", onUpdate: request }); };
    cv.addEventListener("pointerdown", pd); cv.addEventListener("pointermove", pm);
    cv.addEventListener("pointerup", pu); cv.addEventListener("pointercancel", pu);

    if (reduced) return () => { ro.disconnect(); io.disconnect(); window.removeEventListener("scroll", onSheen); };

    gsap.set(captionRefs.current.slice(1), { autoAlpha: 0, y: 24 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: "top top", end: "+=260%", pin: true, scrub: 1.1 },
      defaults: { ease: "power1.inOut" },
    });
    tl.to({}, { duration: 0.6 })
      .to(state, { lam: MANDATES[1].lon, phi: MANDATES[1].lat - 12, duration: 1.2, onUpdate: request })
      .to(captionRefs.current[0], { autoAlpha: 0, y: -24, duration: 0.4, ease: "none" }, "<0.2")
      .to(captionRefs.current[1], { autoAlpha: 1, y: 0, duration: 0.4, ease: "none" }, "<0.25")
      .to({}, { duration: 0.5 })
      .to(state, { lam: MANDATES[2].lon, phi: MANDATES[2].lat - 6, duration: 1.2, onUpdate: request })
      .to(captionRefs.current[1], { autoAlpha: 0, y: -24, duration: 0.4, ease: "none" }, "<0.2")
      .to(captionRefs.current[2], { autoAlpha: 1, y: 0, duration: 0.4, ease: "none" }, "<0.25")
      .to({}, { duration: 0.6 });

    return () => {
      ro.disconnect(); io.disconnect(); window.removeEventListener("scroll", onSheen);
      cv.removeEventListener("pointerdown", pd); cv.removeEventListener("pointermove", pm);
      cv.removeEventListener("pointerup", pu); cv.removeEventListener("pointercancel", pu);
      tl.scrollTrigger?.kill(); tl.kill();
    };
  }, [initial, dots]);

  return (
    <section ref={section} className="relative h-[100svh] overflow-hidden">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center px-5 pb-16 pt-24 text-center md:px-10 md:pt-28">
        {/* caption — stacked captions crossfade in a fixed-height block above the globe */}
        <div className="relative z-10 h-44 w-full max-w-2xl md:h-40">
          {MANDATES.map((m, i) => (
            <div key={m.label} ref={(el) => { captionRefs.current[i] = el; }} className="absolute inset-x-0">
              <p className="annot muted">The territory</p>
              <h2 className="display mt-2 text-4xl md:text-6xl">
                {m.label.split(" ")[0]}{" "}
                <span className="display-it">{m.label.split(" ").slice(1).join(" ") || ""}</span>
              </h2>
              <p className="annot mt-3 text-bronze">{m.kicker}</p>
              <p className="muted mx-auto mt-2 max-w-md">{m.line}</p>
              <Link href={m.href} className="annot mt-3 inline-flex items-center gap-2 text-ink transition-colors hover:text-bronze">
                {m.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="relative mt-4 flex min-h-0 w-full flex-1 justify-center md:mt-6">
          <div className="relative aspect-square h-full max-h-[640px] max-w-full">
            <canvas ref={canvas} className="absolute inset-0 h-full w-full cursor-grab touch-pan-y active:cursor-grabbing" aria-label="A globe turning between the United Kingdom, Dubai and Thailand" />
            {MANDATES.map((m, i) => (
              <div key={m.label} ref={(el) => { pinRefs.current[i] = el; }} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
                <Link href={m.href} aria-label={m.cta} className="group/pin relative block h-12 w-12 -translate-x-1/2 -translate-y-1/2">
                  <span className="globe-pulse absolute left-1/2 top-1/2 h-[26px] w-[26px] rounded-full" style={{ border: `1px solid ${GOLD.mid}` }} />
                  <span className="absolute left-1/2 top-1/2 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, ${GOLD.hi}, ${GOLD.deep})`, boxShadow: `0 0 10px rgba(201,171,124,.55)` }} />
                  <span className="absolute left-1/2 top-[-6px] h-[22px] w-px -translate-x-1/2" style={{ background: `linear-gradient(${GOLD.deep}, rgba(169,138,82,0))` }} />
                  <span className="annot absolute left-1/2 top-[-20px] -translate-x-1/2 whitespace-nowrap text-ink/85 transition-colors group-hover/pin:text-bronze">{m.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="annot muted absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">Scroll to turn · drag to explore</p>
    </section>
  );
}
