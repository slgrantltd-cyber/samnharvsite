"use client";

import { useState } from "react";

const TOPICS = [
  ["invest-dubai", "Investing in Dubai"],
  ["invest-ad", "Investing in Abu Dhabi"],
  ["move", "Moving to the UAE"],
  ["video", "Question about a video"],
  ["browse", "Just looking for now"],
] as const;

const BUDGETS = [
  ["Under AED 1M", "under AED 1M"],
  ["AED 1–2M", "AED 1–2M"],
  ["AED 2M+", "AED 2M+"],
  ["Not sure yet", "not sure yet"],
] as const;

const NUMBER = "971585570551";

const WaIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5 shrink-0">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24m4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28" />
  </svg>
);

export default function WhatsappLauncher() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number][0] | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const topicLabel = TOPICS.find(([k]) => k === topic)?.[1];
  const lines = [
    `Hi Samuel — ${topicLabel ? `I'm interested in: ${topicLabel.toLowerCase()}` : "I saw your YouTube video"}.`,
    budget ? `Budget: ${budget}.` : null,
    topic ? "(Came from YouTube)" : null,
  ].filter(Boolean);
  const href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(lines.join(" "))}`;

  const chip = (selected: boolean) =>
    `rounded-full border px-5 py-3 text-[0.95rem] leading-none transition-all duration-300 ${
      selected
        ? "border-[#ead8ab] bg-[#ead8ab] text-[#1a1a1a] shadow-[0_10px_30px_-12px_rgba(234,216,171,0.45)]"
        : "border-[var(--line-light)] text-[var(--plaster)]/85 hover:border-[#ead8ab]/60 hover:text-[#ead8ab]"
    }`;

  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center text-center">
        {WaIcon}
        <span>Chat on WhatsApp</span>
      </a>
      <p className="annot mt-4 text-center text-[var(--stone-dark)]">
        Opens WhatsApp with a message ready — just press send.
      </p>

      <p className="annot mb-4 mt-14 text-[var(--bronze-bright)]">Optional — tell me what you&rsquo;re after and I&rsquo;ll reply with the right options first time</p>
      <div className="flex flex-wrap gap-2.5">
        {TOPICS.map(([key, label]) => (
          <button key={key} type="button" onClick={() => setTopic(key)} aria-pressed={topic === key} className={chip(topic === key)}>
            {label}
          </button>
        ))}
      </div>

      {(topic === "invest-dubai" || topic === "invest-ad" || topic === "move") && (
        <div className="mt-8">
          <p className="annot mb-4 text-[var(--bronze-bright)]">Rough budget — so my first reply has the right options in it</p>
          <div className="flex flex-wrap gap-2.5">
            {BUDGETS.map(([label, value]) => (
              <button key={value} type="button" onClick={() => setBudget(value)} aria-pressed={budget === value} className={chip(budget === value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
