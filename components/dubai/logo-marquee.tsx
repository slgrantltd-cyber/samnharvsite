/**
 * Developer logos on a slow, seamless belt. Pure CSS motion (one transform
 * animation on a duplicated track) — no JS, pauses under the hand, logos
 * brighten and warm to gold on hover.
 */
const LOGOS = [
  { src: "/partners/dubai/binghatti.svg", alt: "Binghatti", h: "h-9" },
  { src: "/partners/dubai/danube.png", alt: "Danube Properties", h: "h-5" },
  { src: "/partners/dubai/sobha.svg", alt: "Sobha Realty", h: "h-9" },
  { src: "/partners/dubai/emaar.svg", alt: "Emaar", h: "h-6" },
  { src: "/partners/dubai/damac.svg", alt: "Damac", h: "h-5" },
  { src: "/partners/dubai/ellington.png", alt: "Ellington Properties", h: "h-10" },
  { src: "/partners/dubai/aldar.png", alt: "Aldar", h: "h-10" },
  { src: "/partners/dubai/nakheel.svg", alt: "Nakheel", h: "h-5" },
];

export default function LogoMarquee() {
  const track = [...LOGOS, ...LOGOS];
  return (
    <div className="marquee relative overflow-hidden" aria-label="Developers we bring allocations from">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#2b2823] to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#2b2823] to-transparent" aria-hidden="true" />
      <ul className="marquee-track flex w-max items-center gap-16 py-6 md:gap-24">
        {track.map((l, i) => (
          <li key={`${l.alt}-${i}`} className="shrink-0" aria-hidden={i >= LOGOS.length}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.src} alt={i < LOGOS.length ? l.alt : ""} className={`${l.h} w-auto opacity-70 transition duration-500 hover:opacity-100 hover:[filter:drop-shadow(0_0_10px_rgba(201,171,124,.55))]`} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  );
}
