"use client";

import { useState } from "react";

/**
 * Placement request for local authorities: a structured booking-style
 * enquiry that emails the desk immediately (reply-to set) and logs the
 * officer in the Deal Book tagged "council".
 */

export default function PlacementForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const message = [
      `Council / organisation: ${f.get("council")}`,
      `Contact: ${f.get("name")} — ${f.get("role") || "role not given"}`,
      `Phone: ${f.get("phone") || "not given"}`,
      `Placement type: ${f.get("ptype")}`,
      `Number of placements: ${f.get("count") || "not given"}`,
      `When needed: ${f.get("when") || "not given"}`,
      "",
      `Details: ${f.get("details") || "—"}`,
    ].join("\n");
    setState("sending");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        email: f.get("email"),
        message,
        subject: `PLACEMENT REQUEST — ${f.get("council")}`,
        tag: "council",
        company: f.get("company"),
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  if (state === "done") {
    return (
      <div className="m-paper border p-8 hairline md:p-10">
        <p className="display text-3xl">
          Received — <span className="display-it">on it.</span>
        </p>
        <p className="mt-4 leading-relaxed muted">
          Your request is with Samuel and Harvey directly. For urgent
          placements, call or WhatsApp us now on{" "}
          <a href="tel:+447444551241" className="text-bronze">07444 551241</a>{" "}
          — we answer.
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-transparent border-b hairline py-2 text-base focus:outline-none focus:border-[var(--bronze)] transition-colors";

  return (
    <form onSubmit={submit} className="m-paper border p-8 hairline md:p-10">
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
        <label className="block">
          <span className="annot muted">Council / organisation</span>
          <input name="council" required className={input} />
        </label>
        <label className="block">
          <span className="annot muted">Your name</span>
          <input name="name" required className={input} autoComplete="name" />
        </label>
        <label className="block">
          <span className="annot muted">Role</span>
          <input name="role" className={input} placeholder="e.g. Placements officer" />
        </label>
        <label className="block">
          <span className="annot muted">Work email</span>
          <input name="email" type="email" required className={input} autoComplete="email" />
        </label>
        <label className="block">
          <span className="annot muted">Phone</span>
          <input name="phone" type="tel" className={input} autoComplete="tel" />
        </label>
        <label className="block">
          <span className="annot muted">Placement type</span>
          <select name="ptype" className={input} defaultValue="Planned placement">
            <option>Planned placement</option>
            <option>Urgent / emergency placement</option>
            <option>Block booking / ongoing capacity</option>
            <option>General enquiry</option>
          </select>
        </label>
        <label className="block">
          <span className="annot muted">Number of placements</span>
          <input name="count" className={input} placeholder="e.g. 2" />
        </label>
        <label className="block">
          <span className="annot muted">When needed</span>
          <input name="when" className={input} placeholder="e.g. this week / from March" />
        </label>
        <label className="block md:col-span-2">
          <span className="annot muted">Anything else we should know — no identifying details of young people, please</span>
          <textarea name="details" rows={3} className={input} />
        </label>
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn-ink">
          {state === "sending" ? "Sending…" : "Send placement request"}
        </button>
        <a href="tel:+447444551241" className="btn btn-ghost">
          Urgent? Call 07444 551241
        </a>
        {state === "error" && (
          <p className="annot v-poor">Something failed — please call us instead.</p>
        )}
      </div>
      <p className="annot mt-6 muted">
        Goes directly to Samuel &amp; Harvey — same-day response in working
        hours. Please share no personal details of young people at this stage.
      </p>
    </form>
  );
}
