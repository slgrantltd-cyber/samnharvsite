"use client";

import { useMemo, useState } from "react";

/**
 * Request-to-book calendar for the two SA units. No live availability feed
 * exists yet, so this composes a dated request that goes straight to Harvey
 * on WhatsApp (or email) — price and availability are confirmed personally.
 * No nightly rates are shown anywhere: rates are quoted per request, with
 * long stays (7+ nights) flagged for a discounted quote.
 */

const UNITS = ["The Barrows", "Cheddar", "Either place"] as const;
const DAY_MS = 86_400_000;
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const atMidnight = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const fmt = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

export default function BookingCalendar() {
  const today = useMemo(() => atMidnight(new Date()), []);
  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));
  const [unit, setUnit] = useState<(typeof UNITS)[number]>("Either place");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const nights =
    checkIn && checkOut
      ? Math.round((checkOut.getTime() - checkIn.getTime()) / DAY_MS)
      : 0;
  const longStay = nights >= 7;

  const firstOfMonth = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const leadBlanks = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const atCurrentMonth =
    view.year === today.getFullYear() && view.month === today.getMonth();

  const shift = (delta: number) => {
    const d = new Date(view.year, view.month + delta, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const pick = (day: number) => {
    const date = new Date(view.year, view.month, day);
    if (date < today) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
    }
  };

  const inRange = (day: number) => {
    if (!checkIn) return false;
    const t = new Date(view.year, view.month, day).getTime();
    const end = checkOut ?? checkIn;
    return t >= checkIn.getTime() && t <= end.getTime();
  };

  const isEdge = (day: number) => {
    const t = new Date(view.year, view.month, day).getTime();
    return t === checkIn?.getTime() || t === checkOut?.getTime();
  };

  const message = [
    `Hi Harvey — I'd like to request a stay.`,
    ``,
    `Unit: ${unit}`,
    checkIn ? `Check-in: ${fmt(checkIn)}` : `Check-in: (not chosen yet)`,
    checkOut ? `Check-out: ${fmt(checkOut)}` : `Check-out: (not chosen yet)`,
    nights ? `Nights: ${nights}${longStay ? " (7+ — long-stay rate?)" : ""}` : ``,
    `Guests: ${guests}`,
    ``,
    `Could you confirm availability and price?`,
  ]
    .filter(Boolean)
    .join("\n");

  const ready = Boolean(checkIn && checkOut);

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      {/* calendar */}
      <div>
        <div className="flex items-center justify-between">
          <p className="display text-2xl" aria-live="polite">
            {MONTHS[view.month]}{" "}
            <span className="display-it">{view.year}</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => shift(-1)}
              disabled={atCurrentMonth}
              aria-label="Previous month"
              className="btn btn-ghost px-4 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="btn btn-ghost px-4"
            >
              →
            </button>
          </div>
        </div>

        <div className="annot muted mt-6 grid grid-cols-7 text-center">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="py-2">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 border-l border-t hairline">
          {Array.from({ length: leadBlanks }).map((_, i) => (
            <span key={`b${i}`} className="aspect-square border-b border-r hairline" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(view.year, view.month, day);
            const past = date < today;
            const selected = inRange(day);
            const edge = isEdge(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => pick(day)}
                disabled={past}
                aria-pressed={selected}
                aria-label={fmt(date)}
                className={`aspect-square border-b border-r hairline text-sm transition-colors ${
                  past
                    ? "cursor-not-allowed text-ink/25"
                    : edge
                      ? "bg-smoked text-bronze-bright"
                      : selected
                        ? "bg-bronze-chip text-ink"
                        : "hover:bg-smoked hover:text-plaster"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="annot muted mt-4">
          Pick check-in, then check-out. Rates are quoted personally — 7+
          nights get a long-stay quote.
        </p>
      </div>

      {/* request summary */}
      <div>
        <fieldset>
          <legend className="annot muted">Which place?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {UNITS.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className={`btn ${unit === u ? "btn-ink" : "btn-ghost"}`}
              >
                {u}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <label htmlFor="guests" className="annot muted">
            Guests
          </label>
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              className="btn btn-ghost px-4"
              aria-label="Fewer guests"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
            >
              −
            </button>
            <span id="guests" className="display w-8 text-center text-2xl" aria-live="polite">
              {guests}
            </span>
            <button
              type="button"
              className="btn btn-ghost px-4"
              aria-label="More guests"
              onClick={() => setGuests((g) => Math.min(8, g + 1))}
            >
              +
            </button>
          </div>
        </div>

        <dl className="mt-8 border-t hairline">
          <div className="flex justify-between border-b hairline py-3">
            <dt className="annot muted">Check-in</dt>
            <dd className="text-sm">{checkIn ? fmt(checkIn) : "—"}</dd>
          </div>
          <div className="flex justify-between border-b hairline py-3">
            <dt className="annot muted">Check-out</dt>
            <dd className="text-sm">{checkOut ? fmt(checkOut) : "—"}</dd>
          </div>
          <div className="flex justify-between border-b hairline py-3">
            <dt className="annot muted">Nights</dt>
            <dd className="text-sm">
              {nights || "—"}
              {longStay && (
                <span className="chip annot ml-3">long-stay quote</span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/447753600183?text=${encodeURIComponent(message)}`}
            rel="noopener"
            aria-disabled={!ready}
            className={`btn btn-ink ${ready ? "" : "pointer-events-none opacity-40"}`}
          >
            Request on WhatsApp
          </a>
          <a
            href={`mailto:contact@samnharv.com?subject=${encodeURIComponent(
              `Stay request — ${unit}`,
            )}&body=${encodeURIComponent(message)}`}
            aria-disabled={!ready}
            className={`btn btn-ghost ${ready ? "" : "pointer-events-none opacity-40"}`}
          >
            Request by email
          </a>
        </div>
        <p className="annot muted mt-4" role="status">
          {ready
            ? "Your dates go straight to Harvey — availability and price confirmed personally."
            : "Choose your dates to send a request."}
        </p>
      </div>
    </div>
  );
}
