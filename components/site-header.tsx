"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BenchmarkMark from "@/components/benchmark-mark";
import { SITE_MAP } from "@/lib/site-nav";

/* Primary nav stays minimal: three tabs + Enquire + Menu. The Menu opens
   the full grouped site map (lib/site-nav) on every screen size. */
const NAV = [
  { href: "/", label: "Home" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/trust", label: "Our word" },
  { href: "/about", label: "The brothers" },
];


export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between bg-gradient-to-b from-[var(--plaster)]/90 via-[var(--plaster)]/60 to-transparent px-5 py-3 md:px-10">
        <Link
          href="/"
          aria-label="Sam n Harv — home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 py-1"
        >
          <BenchmarkMark className="h-6 w-6 text-ink" />
          <span className="display text-lg leading-none tracking-tight">
            SAM <span className="display-it lowercase gold-text">n</span> HARV
          </span>
        </Link>

        {/* desktop: flat primary nav — Opportunities leads */}
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`font-sans text-[0.9375rem] tracking-[0.01em] transition-colors hover:text-bronze ${
                pathname === item.href ? "text-ink" : "text-stone"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="font-sans text-[0.9375rem] tracking-[0.01em] border-b border-ink/30 pb-0.5 text-ink transition-colors hover:border-bronze hover:text-bronze"
          >
            Enquire
          </Link>
          <button
            type="button"
            className="font-sans text-[0.9375rem] tracking-[0.01em] text-ink transition-colors hover:text-bronze"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>

        <div className="flex items-center gap-6 lg:hidden">
          <Link href="/contact" onClick={() => setOpen(false)} className="font-sans text-[0.9375rem] tracking-[0.01em] text-ink transition-colors hover:text-bronze">
            Enquire
          </Link>
          <button
            type="button"
            className="font-sans text-[0.9375rem] tracking-[0.01em] min-h-11 text-ink transition-colors hover:text-bronze"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* the menu — every page, grouped; all screen sizes */}
      <div
        id="site-menu"
        inert={!open}
        data-lenis-prevent
        className={`on-stone fixed inset-0 -z-10 flex flex-col overflow-y-auto overscroll-contain px-5 pb-12 pt-24 transition-[clip-path] duration-500 ease-out md:px-10 md:pt-28 ${
          open
            ? "[clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Site" className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {SITE_MAP.map((g) => (
              <div key={g.label}>
                <p className="annot text-[var(--bronze-bright)]">{g.label}</p>
                <ul className="mt-4 border-t hairline">
                  {g.items.map((item) =>
                    item.external ? (
                      <li key={item.href} className="border-b hairline">
                        <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block py-3 transition-colors hover:text-[var(--bronze-bright)]">
                          <span className="display text-xl">{item.label} ↗</span>
                        </a>
                      </li>
                    ) : (
                      <li key={item.href} className="border-b hairline">
                        <Link
                          href={item.href}
                          aria-current={pathname === item.href ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className="block py-3 transition-colors hover:text-[var(--bronze-bright)]"
                        >
                          <span className="display text-xl">{item.label}</span>
                          {item.note && <span className="mt-0.5 block text-sm text-[var(--plaster)]/60">{item.note}</span>}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/" onClick={() => setOpen(false)} className="annot text-[var(--plaster)]/70 hover:text-[var(--bronze-bright)]">Home</Link>
            <a href="https://wa.me/447444551241" className="annot text-[var(--plaster)]/70 hover:text-[var(--bronze-bright)]">WhatsApp Samuel</a>
            <a href="https://wa.me/447753600183" className="annot text-[var(--plaster)]/70 hover:text-[var(--bronze-bright)]">WhatsApp Harvey</a>
            <a href="mailto:contact@samnharv.com" className="annot text-[var(--plaster)]/70 hover:text-[var(--bronze-bright)]">contact@samnharv.com</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
