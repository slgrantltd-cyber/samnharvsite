"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The investor brief — near the top of the home page. Three things we need
 * to know before anything else: who you are, what capital, what you're
 * after. Posts to /api/contact tagged "investor-brief". Book-a-call sits
 * beside it for people who'd rather talk first.
 */
export default function InvestorBrief() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        email: f.get("email"),
        phone: f.get("phone"),
        subject: `INVESTOR BRIEF — ${f.get("name")} · ${f.get("capital")}`,
        message: `INVESTOR BRIEF\nCapital: ${f.get("capital")}\nLooking for: ${f.get("looking")}\nTimeframe: ${f.get("when")}\nPhone: ${f.get("phone")}\n\n${f.get("note") || ""}`,
        tag: "investor-brief",
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  const field = "mt-2 w-full border-b hairline bg-transparent py-2 text-[0.9375rem] outline-none focus:border-ink";

  return (
    <section className="px-5 pb-16 md:px-10 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="on-stone grid grid-cols-1 gap-10 p-7 shadow-daylight md:p-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="annot text-[var(--bronze-bright)]">Start here</p>
            <h2 className="display mt-3 text-3xl leading-snug md:text-4xl">
              Tell us your capital and what it&rsquo;s for.{" "}
              <span className="display-it">We&rsquo;ll tell you what fits.</span>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-[var(--plaster)]/80">
              Thirty seconds. One of us replies personally — with the mandate
              that matches, or an honest &ldquo;not yet&rdquo;.
            </p>
            <div className="mt-8 border-t hairline pt-6">
              <p className="annot text-[var(--plaster)]/60">Rather talk first?</p>
              <Link href="/call" className="btn btn-ghost mt-3 border-[var(--plaster)]/40 text-[var(--plaster)] hover:border-[var(--bronze-bright)] hover:text-[var(--bronze-bright)]">
                Book a 15-minute intro call
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            {state === "done" ? (
              <div className="border hairline p-8">
                <p className="annot text-[var(--bronze-bright)]">Received</p>
                <p className="display mt-3 text-2xl">Thank you — we&rsquo;ll be in touch personally.</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--plaster)]/75">Usually within one working day. If it&rsquo;s urgent, WhatsApp Samuel on 07444 551241.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="annot text-[var(--plaster)]/65">Name</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="annot text-[var(--plaster)]/65">Email</span>
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
                <label className="block">
                  <span className="annot text-[var(--plaster)]/65">Phone</span>
                  <input name="phone" autoComplete="tel" className={field} />
                </label>
                <label className="block">
                  <span className="annot text-[var(--plaster)]/65">Capital to deploy</span>
                  <select name="capital" className={field}>
                    <option>£100k – £250k</option>
                    <option>£250k – £500k</option>
                    <option>£500k – £1m</option>
                    <option>£1m – £3m</option>
                    <option>£3m – £10m</option>
                    <option>£10m +</option>
                  </select>
                </label>
                <label className="block">
                  <span className="annot text-[var(--plaster)]/65">Looking for</span>
                  <select name="looking" className={field}>
                    <option>Cash-flow — UK houses, long term</option>
                    <option>Capital growth — Dubai, developer-direct</option>
                    <option>An operating asset — the Thailand resort</option>
                    <option>A conversion or development project</option>
                    <option>A search run to my brief</option>
                    <option>Not sure yet — talk me through it</option>
                  </select>
                </label>
                <label className="block">
                  <span className="annot text-[var(--plaster)]/65">Timeframe</span>
                  <select name="when" className={field}>
                    <option>Ready now</option>
                    <option>Next 3 months</option>
                    <option>This year</option>
                    <option>Just researching</option>
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="annot text-[var(--plaster)]/65">Anything else (optional)</span>
                  <input name="note" className={field} placeholder="e.g. buying through a company, want hands-off, already own three" />
                </label>
                <div className="flex flex-wrap items-center gap-5 md:col-span-2">
                  <button type="submit" disabled={state === "sending"} className="btn btn-ink border border-[var(--plaster)]/30">
                    {state === "sending" ? "Sending…" : "Send my brief"}
                  </button>
                  <p className="annot text-[var(--plaster)]/55">Private. Never shared. No mailing list.</p>
                  {state === "error" && <p className="annot text-[var(--bronze-bright)]">Something went wrong — WhatsApp 07444 551241</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
