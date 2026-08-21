import Link from "next/link";
import BenchmarkMark from "@/components/benchmark-mark";
import { SITE_MAP } from "@/lib/site-nav";

export default function SiteFooter() {
  return (
    <footer className="m-concrete mt-auto">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <BenchmarkMark className="h-8 w-8 text-bronze-bright" />
            <p className="display mt-4 text-3xl">
              SAM <span className="display-it lowercase gold-text">n</span> HARV
            </p>
            <p className="muted mt-2 max-w-sm text-sm leading-relaxed">
              Private property opportunities, UK and international. Two brothers,
              based in the UK South West.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 md:gap-x-12">
            {SITE_MAP.map((g) => (
              <div key={g.label}>
                <p className="annot text-bronze-bright">{g.label}</p>
                <ul className="mt-3">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a className="annot muted flex min-h-10 items-center transition-colors hover:text-bronze-bright" href={item.href} target="_blank" rel="noopener noreferrer">{item.label} ↗</a>
                      ) : (
                        <Link className="annot muted flex min-h-10 items-center transition-colors hover:text-bronze-bright" href={item.href}>{item.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="annot muted">
            © {new Date().getFullYear()} S L Grants Ltd, trading as Sam n Harv
          </p>
          <p className="annot flex flex-wrap gap-x-6 muted">
            <a href="https://wa.me/447444551241" className="hover:text-bronze-bright">WhatsApp Samuel</a>
            <a href="https://wa.me/447753600183" className="hover:text-bronze-bright">WhatsApp Harvey</a>
            <a href="mailto:contact@samnharv.com" className="hover:text-bronze-bright">contact@samnharv.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
