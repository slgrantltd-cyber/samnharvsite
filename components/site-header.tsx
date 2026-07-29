"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BenchmarkMark from "@/components/benchmark-mark";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "What we do" },
  { href: "/about", label: "The brothers" },
  { href: "/stays", label: "Stays" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between border-b hairline bg-plaster/90 px-5 py-3 backdrop-blur-sm md:px-10">
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

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
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

        <div className="flex items-center gap-2 md:hidden">
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
      <div
        id="site-menu"
        inert={!open}
        className={`on-stone fixed inset-0 -z-10 flex flex-col justify-end px-5 pb-10 pt-24 transition-[clip-path] duration-500 ease-out md:hidden ${
          open
            ? "[clip-path:inset(0_0_0%_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="group flex items-baseline justify-between border-b hairline py-4"
            >
              <span className="display text-4xl">{item.label}</span>
              <span className="annot text-bronze-bright">0{i + 1}</span>
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
