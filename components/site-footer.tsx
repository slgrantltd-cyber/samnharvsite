import Link from "next/link";
import BenchmarkMark from "@/components/benchmark-mark";

export default function SiteFooter() {
  return (
    <footer className="m-concrete mt-auto">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <BenchmarkMark className="h-8 w-8 text-bronze-bright" />
            <p className="display mt-4 text-3xl">
              SAM <span className="display-it lowercase">n</span> HARV
            </p>
            <p className="muted mt-2 max-w-sm text-sm leading-relaxed">
              Property investment &amp; deal sourcing. Two brothers, based in
              the UK South West, working deals across the country.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2">
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/services">
              What we do
            </Link>
            <a className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="https://wa.me/447444551241">
              WhatsApp Samuel
            </a>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/about">
              The brothers
            </Link>
            <a className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="https://wa.me/447753600183">
              WhatsApp Harvey
            </a>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/landlords">
              Landlords
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/councils">
              Councils
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/deals">
              Current deals
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/toolkit">
              Toolkit
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/resources">
              Resources
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/learn">
              Learning Centre
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/stays">
              Stays
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/insights">
              Insights
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/faq">
              FAQs
            </Link>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/standards">
              Standards &amp; compliance
            </Link>
            <a className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="mailto:contact@samnharv.com">
              Email the office
            </a>
            <Link className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright" href="/contact">
              Contact
            </Link>
            <a
              className="annot muted flex min-h-11 items-center transition-colors hover:text-bronze-bright"
              href="https://share.google/lsd2TlaWo3OpRFqhO"
              rel="noopener"
            >
              Google reviews
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="annot muted">
            © {new Date().getFullYear()} S L Grants Ltd, trading as Sam n Harv
          </p>
          <p className="annot muted">UK South West · Working the whole map</p>
        </div>
      </div>
    </footer>
  );
}
