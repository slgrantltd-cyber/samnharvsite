import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES } from "@/lib/guides";

/**
 * Private guest guides, reached by QR cards inside the properties.
 * Unlisted: noindex, not in the sitemap, not linked from navigation.
 */

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  return {
    title: guide ? `${guide.name} — Guest Guide` : "Guest Guide",
    robots: { index: false, follow: false },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const hasWifi = guide.wifiName && guide.wifiPassword;

  return (
    <main id="main" className="pt-24 md:pt-28">
      <section className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="annot muted">Your guest guide — {guide.strap}</p>
          <h1 className="display mt-3 text-4xl md:text-6xl">
            {guide.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="display-it">{guide.name.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-6 leading-relaxed text-lg">{guide.welcome}</p>

          {hasWifi && (
            <div className="on-stone mt-10 p-6 shadow-daylight md:p-8">
              <p className="annot text-[var(--bronze-bright)]">Wi-Fi</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="annot muted">Network</p>
                  <p className="display mt-1 text-2xl">{guide.wifiName}</p>
                </div>
                <div>
                  <p className="annot muted">Password</p>
                  <p className="display mt-1 text-2xl">{guide.wifiPassword}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-col gap-10">
            {guide.sections.map((section) => (
              <section key={section.title}>
                <h2 className="display text-2xl md:text-3xl">{section.title}</h2>
                <dl className="mt-5 grid grid-cols-1 gap-px border bg-[var(--line)] hairline">
                  {section.items.map((item) => (
                    <div key={item.label} className="bg-[var(--plaster)] p-5">
                      <dt className="annot text-bronze">{item.label}</dt>
                      <dd className="mt-2 leading-relaxed">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <div className="mt-12 border hairline p-6 md:p-8">
            <p className="annot muted">Checking out</p>
            <p className="mt-3 leading-relaxed">{guide.checkout}</p>
          </div>

          <div className="on-stone mt-12 p-7 text-center shadow-daylight md:p-10">
            <p className="display text-2xl md:text-3xl">
              Enjoyed your stay?{" "}
              <span className="display-it">Tell someone.</span>
            </p>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--plaster)]/82">
              We&rsquo;re two brothers building this on our own name — a
              review from you genuinely changes things for us. It takes about
              a minute.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://share.google/lsd2TlaWo3OpRFqhO"
                rel="noopener"
                className="btn btn-ink"
              >
                Leave a Google review
              </a>
              <a href="https://wa.me/447444551241" className="btn btn-ghost">
                Or tell us what we could do better
              </a>
            </div>
            <p className="annot muted mt-6">
              Booked through Airbnb? A review there helps just as much.
            </p>
          </div>

          <p className="annot muted mt-12 text-center">
            SAM <i>n</i> HARV · www.samnharv.com · 07444 551241
          </p>
        </div>
      </section>
    </main>
  );
}
