"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BenchmarkMark from "@/components/benchmark-mark";

const INVEST_MENU = [
  { href: "/join", label: "Join the deal list" },
  { href: "/deals", label: "Current deals" },
  { href: "/power-team", label: "The power team" },
  { href: "/toolkit", label: "Toolkit" },
];

const NAV = [
  { href: "/", label: "Home" },
  { href: "/landlords", label: "Landlords" },
  { href: "/councils", label: "Councils" },
  { href: "/agents", label: "Agents" },
  { href: "/developers", label: "Developers" },
  { href: "/resources", label: "Resources" },
  { href: "/stays", label: "Stays" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const investActive = INVEST_MENU.some((i) => pathname === i.href);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between border-b hairline bg-plaster/95 px-5 py-3 md:px-10">
        <Link
          href="/"
          aria-label="Sam n Harv — home"
          className="flex items-center gap-3 py-1"
        >
          <BenchmarkMark className="h-6 w-6 text-ink" />
          <span className="display text-lg leading-none tracking-tight">
            SAM <span className="display-it lowercase">n</span> HARV
          </span>
        </Link>

        {/* desktop: Invest carries a dropdown (list, deals, power team,
            toolkit); hover/focus-within keeps it keyboard-reachable */}
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-8">
          <div className="group relative">
            <Link
              href="/join"
              aria-current={investActive ? "page" : undefined}
              className={`annot flex items-center gap-1.5 py-2 transition-colors hover:text-ink ${
                investActive ? "text-ink" : "text-stone"
              }`}
            >
              Invest
              <span aria-hidden="true" className="text-[0.6em] translate-y-px">▾</span>
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-52 border hairline bg-plaster/95 shadow-daylight backdrop-blur">
                {INVEST_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`annot block border-b hairline px-4 py-3.5 transition-colors last:border-b-0 hover:bg-white/45 hover:text-ink ${
                      pathname === item.href ? "text-ink" : "text-stone"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {NAV.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`annot transition-colors hover:text-ink ${
                pathname === item.href ? "text-ink" : "text-stone"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-ink">
            Enquire
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/contact" className="btn btn-ink px-4">
            Enquire
          </Link>
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {/* scrollable (data-lenis-prevent keeps the smooth-scroller's hands
          off it); mt-auto on the nav keeps the bottom-anchored composition
          on screens tall enough to not need scrolling */}
      <div
        id="site-menu"
        inert={!open}
        data-lenis-prevent
        className={`on-stone fixed inset-0 -z-10 flex flex-col overflow-y-auto overscroll-contain px-5 pb-10 pt-24 transition-[clip-path] duration-500 ease-out lg:hidden ${
          open
            ? "[clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="mt-auto flex flex-col gap-1">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={() => setOpen(false)}
            className="group flex items-baseline justify-between border-b hairline py-4"
          >
            <span className="display text-4xl">Home</span>
            <span className="annot text-bronze-bright">01</span>
          </Link>

          <div className="border-b hairline py-4">
            <div className="flex items-baseline justify-between">
              <span className="display text-4xl">Invest</span>
              <span className="annot text-bronze-bright">02</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {INVEST_MENU.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="annot flex min-h-11 items-center text-[var(--line-light)] transition-colors hover:text-bronze-bright"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV.slice(1).map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b hairline py-4"
            >
              <span className="display text-4xl">{item.label}</span>
              <span className="annot text-bronze-bright">0{i + 3}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <a href="https://wa.me/447444551241" className="btn btn-ghost">
            WhatsApp Samuel
          </a>
          <a href="https://wa.me/447753600183" className="btn btn-ghost">
            WhatsApp Harvey
          </a>
          <a href="mailto:contact@samnharv.com" className="btn btn-ink border border-[var(--line-light)]">
            contact@samnharv.com
          </a>
        </div>
      </div>
    </header>
  );
}
