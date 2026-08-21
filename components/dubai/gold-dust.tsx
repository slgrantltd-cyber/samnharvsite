"use client";

import { useEffect, useRef } from "react";

/**
 * Gold dust — a slow drift of fine motes across the Dubai hero that eddy
 * around the cursor as it moves. One canvas, ~110 particles, transform-free
 * arcs with a soft radial glow; draws only while on screen; still under
 * reduced-motion. Desert air, not confetti.
 */
export default function GoldDust({ count: countProp = 110 }: { count?: number }) {
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? Math.round(countProp * 0.5) : countProp;
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; ph: number; sp: number; hue: number };
    let ps: P[] = [];
    const gold = ["243,227,180", "226,195,137", "201,171,124", "169,138,82"];
    const seed = () => {
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.12, vy: -0.04 - Math.random() * 0.10,
        r: 0.6 + Math.random() * 1.9, a: 0.25 + Math.random() * 0.55,
        ph: Math.random() * Math.PI * 2, sp: 0.3 + Math.random() * 0.7, hue: Math.floor(Math.random() * gold.length),
      }));
    };
    const resize = () => {
      const rect = cv.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); if (!ps.length) seed();
    };
    const tick = (now: number) => {
      raf = 0; if (!visible) return;
      const dt = Math.min(40, now - last) / 16.67; last = now;
      ctx.clearRect(0, 0, W, H);
      // cursor flow: a soft swirl that decays
      mouse.vx *= 0.92; mouse.vy *= 0.92;
      for (const p of ps) {
        p.ph += 0.012 * p.sp * dt;
        // gentle thermal drift + sway
        p.vx += Math.cos(p.ph) * 0.004 * dt; p.vy += Math.sin(p.ph * 0.7) * 0.002 * dt;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy, R = 180;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / R);
          // carried along with the hand, and eddying around it
          p.vx += (mouse.vx * 0.06 + (-dy / d) * 0.05) * f * dt;
          p.vy += (mouse.vy * 0.06 + (dx / d) * 0.05) * f * dt;
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx * dt * 1.2; p.y += p.vy * dt * 1.2;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.y > H + 10) p.y = -10;
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        const tw = 0.6 + 0.4 * Math.sin(p.ph * 2.3);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.2);
        g.addColorStop(0, `rgba(${gold[p.hue]},${(p.a * tw).toFixed(3)})`);
        g.addColorStop(0.45, `rgba(${gold[p.hue]},${(p.a * tw * 0.35).toFixed(3)})`);
        g.addColorStop(1, `rgba(${gold[p.hue]},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
      if (mouse.px > -9000) { mouse.vx = x - mouse.px; mouse.vy = y - mouse.py; }
      mouse.x = x; mouse.y = y; mouse.px = x; mouse.py = y;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; mouse.px = -9999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0.02 });
    const ro = new ResizeObserver(resize); ro.observe(cv); resize(); io.observe(cv);
    const host = cv.parentElement || cv;
    host.addEventListener("pointermove", onMove, { passive: true }); host.addEventListener("pointerleave", onLeave);
    start();
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); };
  }, [count]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
