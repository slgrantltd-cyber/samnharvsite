import type { Metadata } from "next";

/**
 * Demo site shown to local-business prospects during website pitches.
 * Fictional business. Unlisted + noindex. Deliberately NOT in the
 * Sam n Harv brand — it demonstrates what a trade site looks like.
 */

export const metadata: Metadata = {
  title: "Harbour & Hill Plumbing — Weston-super-Mare (Demo)",
  robots: { index: false, follow: false },
};

const NAVY = "#12263a";
const AMBER = "#f59e0b";

export default function PlumberDemo() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", color: NAVY }}>
      {/* demo pages present as standalone sites: hide the Sam n Harv chrome */}
      <style>{`header, footer, a[href="#main"] { display: none !important; }`}</style>
      {/* top bar */}
      <div style={{ background: NAVY, color: "#fff", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <strong style={{ fontSize: 20, letterSpacing: "-0.02em" }}>
          Harbour <span style={{ color: AMBER }}>&amp;</span> Hill Plumbing
        </strong>
        <a
          href="tel:07000000000"
          style={{ background: AMBER, color: NAVY, fontWeight: 700, padding: "10px 18px", borderRadius: 8, textDecoration: "none" }}
        >
          Call now — 07000 000000
        </a>
      </div>

      {/* hero */}
      <div style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #1d3a57 100%)`, color: "#fff", padding: "64px 20px 56px", textAlign: "center" }}>
        <p style={{ color: AMBER, fontWeight: 700, letterSpacing: ".12em", fontSize: 13, textTransform: "uppercase" }}>
          Weston-super-Mare · Worle · Locking
        </p>
        <h1 style={{ fontSize: "clamp(30px, 6vw, 52px)", fontWeight: 800, margin: "14px auto 0", maxWidth: 700, lineHeight: 1.1 }}>
          A plumber who turns up, on time, at the price he quoted.
        </h1>
        <p style={{ margin: "18px auto 0", maxWidth: 520, fontSize: 18, opacity: 0.9 }}>
          Boilers, bathrooms, leaks and landlord certificates — same-week
          appointments across Weston.
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="tel:07000000000" style={{ background: AMBER, color: NAVY, fontWeight: 800, padding: "14px 26px", borderRadius: 10, textDecoration: "none", fontSize: 17 }}>
            📞 Get a same-day quote
          </a>
          <a href="#reviews" style={{ background: "rgba(255,255,255,.12)", color: "#fff", fontWeight: 600, padding: "14px 26px", borderRadius: 10, textDecoration: "none", fontSize: 17 }}>
            ★ 4.9 on Google
          </a>
        </div>
        <p style={{ marginTop: 22, fontSize: 14, opacity: 0.75 }}>
          Gas Safe registered · Fully insured · No call-out fee
        </p>
      </div>

      {/* services */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 20px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center" }}>What we do</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginTop: 28 }}>
          {[
            ["🔥", "Boilers", "Repairs, services and full installations — all major brands."],
            ["🛁", "Bathrooms", "Full refits from design to grout, done in a week."],
            ["💧", "Leaks & emergencies", "Fast response across Weston, seven days."],
            ["🏠", "Landlord certificates", "Gas safety certs and checks, reminders handled for you."],
          ].map(([icon, title, body]) => (
            <div key={title as string} style={{ border: "1px solid #e5e7eb", borderRadius: 14, padding: 22, boxShadow: "0 4px 14px rgba(18,38,58,.06)" }}>
              <div style={{ fontSize: 34 }}>{icon}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, marginTop: 10 }}>{title}</h3>
              <p style={{ marginTop: 6, color: "#4b5c6b", fontSize: 15, lineHeight: 1.5 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* reviews */}
      <div id="reviews" style={{ background: "#f4f6f8", padding: "52px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center" }}>
            What Weston says
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 28 }}>
            {[
              ["“Quoted Tuesday, boiler in by Friday, price didn't move. Rare.”", "— Karen, Worle"],
              ["“Found the leak two others missed. Tidy, polite, fair.”", "— Dave, Milton"],
              ["“Does all our rental certificates — texts me before they expire.”", "— Local landlord"],
            ].map(([q, who]) => (
              <div key={who as string} style={{ background: "#fff", borderRadius: 14, padding: 22, border: "1px solid #e5e7eb" }}>
                <p style={{ color: AMBER, fontSize: 18 }}>★★★★★</p>
                <p style={{ marginTop: 8, fontSize: 15.5, lineHeight: 1.55 }}>{q}</p>
                <p style={{ marginTop: 10, fontWeight: 600, fontSize: 14, color: "#4b5c6b" }}>{who}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: NAVY, color: "#fff", textAlign: "center", padding: "56px 20px" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800 }}>Got a job in mind?</h2>
        <p style={{ marginTop: 10, opacity: 0.85, fontSize: 17 }}>
          Call or WhatsApp a photo of the problem — quote back within the hour.
        </p>
        <a href="tel:07000000000" style={{ display: "inline-block", marginTop: 22, background: AMBER, color: NAVY, fontWeight: 800, padding: "16px 34px", borderRadius: 10, textDecoration: "none", fontSize: 18 }}>
          07000 000000
        </a>
        <p style={{ marginTop: 30, fontSize: 12.5, opacity: 0.55 }}>
          Demonstration website by SAM n HARV — fictional business. Your
          business could look like this by Friday · 07444 551241
        </p>
      </div>
    </div>
  );
}
