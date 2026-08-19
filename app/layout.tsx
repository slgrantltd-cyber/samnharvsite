import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Hanken_Grotesk,
  Fragment_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import MaterialLight from "@/components/material-light";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

/* Display face: Cormorant Garamond — light, tall, with true italics.
   Kept on the historic variable names so every .display/.display-it
   across the site picks it up without touching a component. */
const caslon = Cormorant_Garamond({
  variable: "--font-caslon",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const caslonItalic = Cormorant_Garamond({
  variable: "--font-caslon-it",
  weight: ["300", "400", "500"],
  style: "italic",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const fragment = Fragment_Mono({
  variable: "--font-fragment",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.samnharv.com"),
  title: {
    default: "Sam n Harv — Private Property Mandates, UK & International",
    template: "%s — Sam n Harv",
  },
  description:
    "A small number of property mandates at any one time — UK and international — held quietly and released to qualified buyers. Every mandate underwritten to the standard we run our own operation by. Two brothers, based in the UK South West.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Sam n Harv",
    locale: "en_GB",
    url: "/",
    title: "Sam n Harv — Private Property Mandates",
    description:
      "A few opportunities, held quietly. UK and international.",
    images: [{ url: "/hero-poster.jpg", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam n Harv — Private Property Mandates",
    description:
      "A few opportunities, held quietly. UK and international.",
    images: ["/hero-poster.jpg"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://www.samnharv.com/#org",
      name: "Sam n Harv",
      legalName: "S L Grants Ltd",
      url: "https://www.samnharv.com",
      logo: "https://www.samnharv.com/apple-icon.png",
      image: "https://www.samnharv.com/hero-poster.jpg",
      email: "contact@samnharv.com",
      telephone: "+447444551241",
      priceRange: "££",
      address: {
        "@type": "PostalAddress",
        addressRegion: "South West England",
        addressCountry: "GB",
      },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      founder: [
        { "@type": "Person", name: "Samuel Grant" },
        { "@type": "Person", name: "Harvey Grant" },
      ],
      knowsAbout: [
        "Property deal sourcing",
        "Below market value property",
        "BRRR investment",
        "Buy to let investment",
        "HMO investment",
        "Rent to rent",
        "Serviced accommodation",
        "Property deal packaging",
      ],
      description:
        "Property investment company and deal sourcing service — BRRR deals, rent to rent, flips, HMOs, blocks, land and serviced accommodation for UK property investors. Based in the UK South West, working nationwide.",
      sameAs: ["https://share.google/lsd2TlaWo3OpRFqhO"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.samnharv.com/#website",
      url: "https://www.samnharv.com",
      name: "Sam n Harv",
      publisher: { "@id": "https://www.samnharv.com/#org" },
      inLanguage: "en-GB",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${caslon.variable} ${caslonItalic.variable} ${hanken.variable} ${fragment.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--concrete)] focus:px-4 focus:py-3 focus:text-[var(--plaster)]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll />
        <MaterialLight />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
