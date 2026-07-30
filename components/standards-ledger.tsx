"use client";

import { useEffect, useRef, useState } from "react";
import { Lift } from "@/components/reveal";
import {
  STANDARD_GROUPS,
  STATUS_LABEL,
  type StandardIcon,
  type StandardItem,
} from "@/lib/standards";

/**
 * Professional standards ledger: grouped hairline rows with thin-stroke
 * icons, honest status marks and an optional certificate viewer. Rows
 * with a certUrl open the document in a quiet modal; rows without stay
 * plain until the certificate is uploaded to /public/certificates.
 */

const ICONS: Record<StandardIcon, React.ReactNode> = {
  shield: (
    <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
  ),
  umbrella: (
    <>
      <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
      <path d="M12 12v6a2 2 0 0 0 4 0" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-4 10 4-10 4L2 9z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v5" />
    </>
  ),
  scales: (
    <>
      <path d="M12 4v16M5 7l14-2M5 7l-2.5 6a3 3 0 0 0 5 0L5 7zM19 5l-2.5 6a3 3 0 0 0 5 0L19 5z" />
      <path d="M8 20h8" />
    </>
  ),
  flame: (
    <path d="M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.5 2-5 .5 1.5 1.5 2 2.5 2C11 7 11 5 12 3z" />
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17.5 15a5.5 5.5 0 0 1 3 5" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="11" width="13" height="9" rx="1" />
      <path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 14.5v2.5" />
    </>
  ),
  risk: (
    <>
      <path d="M12 4L2.5 20h19L12 4z" />
      <path d="M12 10v4M12 16.8v.4" />
    </>
  ),
  droplet: (
    <path d="M12 3.5S6 10.5 6 14.5a6 6 0 0 0 12 0c0-4-6-11-6-11z" />
  ),
  building: (
    <>
      <path d="M4 20V6l8-3v17M12 20h8V10l-8-2" />
      <path d="M7 9h2M7 13h2M7 17h2M15 13h2M15 17h2M2 20h20" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="9" r="4" />
      <path d="M11 12l9 9M17 18l2-2M14 15l2-2" />
    </>
  ),
};

function Icon({ name }: { name: StandardIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function CertModal({
  item,
  onClose,
}: {
  item: StandardItem;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.showModal();
    const handle = () => onClose();
    el.addEventListener("close", handle);
    return () => el.removeEventListener("close", handle);
  }, [onClose]);

  const isImage = /\.(png|jpe?g|webp)$/i.test(item.certUrl ?? "");

  return (
    <dialog
      ref={ref}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto w-[min(92vw,56rem)] bg-[var(--plaster)] p-0 shadow-daylight backdrop:bg-[rgba(26,26,26,0.55)]"
    >
      <div className="flex items-center justify-between border-b hairline px-5 py-3 md:px-6">
        <p className="annot muted">{item.name}</p>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="annot flex min-h-11 items-center text-bronze transition-colors hover:text-ink"
        >
          Close ×
        </button>
      </div>
      {isImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.certUrl}
          alt={`${item.name} certificate`}
          className="max-h-[75vh] w-full object-contain"
        />
      ) : (
        <iframe
          src={item.certUrl}
          title={`${item.name} certificate`}
          className="h-[75vh] w-full"
        />
      )}
    </dialog>
  );
}

function Row({ item, onView }: { item: StandardItem; onView: () => void }) {
  const working = item.status === "working";
  return (
    <li className="group bg-[var(--plaster)] transition-colors duration-300 hover:bg-white/45">
      <div className="flex items-start gap-4 px-5 py-5 md:items-center md:gap-6 md:px-7">
        <span
          className={`mt-0.5 transition-colors duration-300 md:mt-0 ${
            working
              ? "text-[var(--stone)] opacity-60 group-hover:opacity-90"
              : "text-[var(--stone-dark)] group-hover:text-bronze"
          }`}
        >
          <Icon name={item.icon} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="display text-lg leading-snug transition-colors duration-300 group-hover:text-[var(--ink)] md:text-xl">
            {item.name}
          </p>
          <p className="muted mt-1 max-w-xl text-[0.8125rem] leading-relaxed">
            {item.detail}
          </p>
          {(item.issued || item.renews) && (
            <p className="annot muted mt-2">
              {item.issued && <>Issued {item.issued}</>}
              {item.issued && item.renews && <span className="mx-2">·</span>}
              {item.renews && <>Renews {item.renews}</>}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            className={`annot whitespace-nowrap border px-2.5 py-1 ${
              working
                ? "border-[var(--bronze)] text-bronze"
                : "hairline text-[var(--stone-dark)]"
            }`}
          >
            {STATUS_LABEL[item.status]}
          </span>
          {item.certUrl && (
            <button
              type="button"
              onClick={onView}
              className="annot flex min-h-11 items-center text-bronze transition-colors hover:text-ink"
            >
              View certificate →
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default function StandardsLedger() {
  const [open, setOpen] = useState<StandardItem | null>(null);

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {STANDARD_GROUPS.map((group) => (
        <Lift key={group.key}>
          <section aria-labelledby={`std-${group.key}`}>
            <p className="annot text-bronze">{group.label}</p>
            <h2
              id={`std-${group.key}`}
              className="display mt-3 text-3xl md:text-4xl"
            >
              {group.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="display-it">
                {group.title.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="muted mt-4 max-w-2xl leading-relaxed">{group.note}</p>

            <ul className="mt-8 grid grid-cols-1 gap-px border bg-[var(--line)] hairline">
              {group.items.map((item) => (
                <Row
                  key={item.name}
                  item={item}
                  onView={() => setOpen(item)}
                />
              ))}
            </ul>
          </section>
        </Lift>
      ))}

      {open?.certUrl && <CertModal item={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
