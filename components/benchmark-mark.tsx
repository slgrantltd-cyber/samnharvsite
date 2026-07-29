/**
 * The Ordnance Survey benchmark: a broad arrow beneath a horizontal
 * levelling line. Cut into stone wherever a surveyor fixed a height —
 * the brand's mark for "we were here, and we measured it properly."
 */
export default function BenchmarkMark({
  className,
  strokeWidth = 1.6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="28" y2="7" />
      <line x1="16" y1="7" x2="16" y2="14" />
      <path d="M16 14 L7 27 M16 14 L25 27 M16 14 L16 27" />
    </svg>
  );
}
