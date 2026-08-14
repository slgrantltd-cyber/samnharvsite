/**
 * The benchmark mark, surveying itself into a house.
 *
 * Same drawing, two readings: the levelling line settles to become the
 * ground; the stem splits into the two walls; the broad arrow closes
 * into the roof; the arrow's centre leg stays behind as the front door.
 * "We measure properly" becomes "…and it becomes home."
 *
 * The morph runs on the CSS `d` property with long dwells at each pose.
 * Where `d` animation is unsupported (older Safari) or the visitor
 * prefers reduced motion, it simply holds as the static mark.
 */
export default function MarkMorph({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <style>{`
        .snhm path { stroke: currentColor; stroke-width: 1.5px; vector-effect: non-scaling-stroke; fill: none; stroke-linecap: square; }
        .snhm .m-ground { stroke: var(--bronze, #8c7b65); }
        @supports (d: path("M0 0 L1 1")) {
          .snhm .m-ground { d: path("M4 7 L28 7"); animation: snhm-g 11s ease-in-out infinite; }
          .snhm .m-wl { d: path("M16 7 L16 14"); animation: snhm-wl 11s ease-in-out infinite; }
          .snhm .m-wr { d: path("M16 7 L16 14"); animation: snhm-wr 11s ease-in-out infinite; }
          .snhm .m-arrow { d: path("M16 14 L7 27 M16 14 L25 27 M16 14 L16 27"); animation: snhm-a 11s ease-in-out infinite; }
          @keyframes snhm-g {
            0%, 32% { d: path("M4 7 L28 7"); }
            46%, 82% { d: path("M4 27 L28 27"); }
            96%, 100% { d: path("M4 7 L28 7"); }
          }
          @keyframes snhm-wl {
            0%, 32% { d: path("M16 7 L16 14"); }
            46%, 82% { d: path("M6 13 L6 27"); }
            96%, 100% { d: path("M16 7 L16 14"); }
          }
          @keyframes snhm-wr {
            0%, 32% { d: path("M16 7 L16 14"); }
            46%, 82% { d: path("M26 13 L26 27"); }
            96%, 100% { d: path("M16 7 L16 14"); }
          }
          @keyframes snhm-a {
            0%, 32% { d: path("M16 14 L7 27 M16 14 L25 27 M16 14 L16 27"); }
            46%, 82% { d: path("M16 6 L6 13 M16 6 L26 13 M16 20 L16 27"); }
            96%, 100% { d: path("M16 14 L7 27 M16 14 L25 27 M16 14 L16 27"); }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .snhm .m-ground, .snhm .m-wl, .snhm .m-wr, .snhm .m-arrow { animation: none; }
        }
      `}</style>
      <svg viewBox="0 0 32 32" fill="none" className="snhm h-full w-full">
        <path vectorEffect="non-scaling-stroke" className="m-ground" d="M4 7 L28 7" />
        <path vectorEffect="non-scaling-stroke" className="m-wl" d="M16 7 L16 14" />
        <path vectorEffect="non-scaling-stroke" className="m-wr" d="M16 7 L16 14" />
        <path vectorEffect="non-scaling-stroke" className="m-arrow" d="M16 14 L7 27 M16 14 L25 27 M16 14 L16 27" />
      </svg>
    </div>
  );
}
