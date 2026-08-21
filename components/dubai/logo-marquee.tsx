"use client";

/**
 * Developer logos on a slow, seamless belt. Pure CSS motion (one transform
 * animation on a duplicated track) — no JS, pauses under the hand, logos
 * brighten and warm to gold on hover.
 */
const LOGOS = [
  { src: "/partners/dubai/binghatti.svg", alt: "Binghatti", h: "h-9", href: "/dubai#dev-binghatti" },
  { src: "/partners/dubai/danube.png", alt: "Danube Properties", h: "h-5", href: "/dubai#dev-danube" },
  { src: "/partners/dubai/sobha.svg", alt: "Sobha Realty", h: "h-9", href: "/dubai#dev-sobha" },
  { src: "/partners/dubai/emaar.svg", alt: "Emaar", h: "h-6", href: "/dubai#dev-emaar" },
  { src: "/partners/dubai/damac.svg", alt: "Damac", h: "h-5", href: "/dubai#dev-damac" },
  { src: "/partners/dubai/ellington.png", alt: "Ellington Properties", h: "h-10", href: "/dubai#dev-ellington" },
  { src: "/partners/dubai/aldar.png", alt: "Aldar", h: "h-10", href: "/dubai#dev-aldar" },
  { src: "/partners/dubai/nakheel.svg", alt: "Nakheel", h: "h-5", href: "https://www.nakheel.com/en/developments", external: true },
];

export default function LogoMarquee({ fade = "#2b2823" }: { fade?: string }) {
  const track = [...LOGOS, ...LOGOS];
  const Logo = ({ l, i }: { l: (typeof LOGOS)[number]; i: number }) => (
    <a
      href={l.href}
      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${l.alt} — see their units`}
      className="block"
      onClick={(e) => {
        if (l.external) return;
        const id = l.href.split("#")[1];
        const el = id && document.getElementById(id);
        if (el && window.location.pathname === "/dubai") {
          e.preventDefault();
          const y = el.getBoundingClientRect().top + window.scrollY - 110;
          if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.1 }); else window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={l.src} alt={i < LOGOS.length ? l.alt : ""} className={`${l.h} w-auto opacity-70 transition duration-500 hover:opacity-100 hover:[filter:drop-shadow(0_0_10px_rgba(201,171,124,.55))]`} loading="lazy" />
    </a>
  );
  return (
    <>
    {/* phones: a still, tappable grid — no animation to fight the scroll */}
    <ul className="grid grid-cols-2 items-center gap-x-6 gap-y-7 px-8 py-7 md:hidden" aria-label="Developers we bring allocations from">
      {LOGOS.map((l, i) => (
        <li key={l.alt} className="flex justify-center"><Logo l={l} i={i} /></li>
      ))}
    </ul>
    <div className="marquee relative hidden overflow-hidden md:block" aria-label="Developers we bring allocations from">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style={{ background: `linear-gradient(90deg, ${fade}, transparent)` }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style={{ background: `linear-gradient(270deg, ${fade}, transparent)` }} aria-hidden="true" />
      <ul className="marquee-track flex w-max items-center gap-16 py-6 md:gap-24">
        {track.map((l, i) => (
          <li key={`${l.alt}-${i}`} className="shrink-0" aria-hidden={i >= LOGOS.length}>
            <Logo l={l} i={i} />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
