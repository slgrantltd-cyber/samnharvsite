import type { Metadata } from "next";
import {
  Libre_Caslon_Display,
  Libre_Caslon_Text,
  Hanken_Grotesk,
  Fragment_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import MaterialLight from "@/components/material-light";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const caslon = Libre_Caslon_Display({
  variable: "--font-caslon",
  weight: "400",
  subsets: ["latin"],
});

const caslonItalic = Libre_Caslon_Text({
  variable: "--font-caslon-it",
  weight: "400",
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
  metadataBase: new URL("https://samnharv.com"),
  title: {
    default: "Sam n Harv — Property Investment & Deal Sourcing, UK South West",
    template: "%s — Sam n Harv",
  },
  description:
    "Two brothers investing in property and sourcing deals across the UK — BRRR, rent to rent, flips, blocks, land and serviced accommodation. Based in the South West, working the whole map.",
  openGraph: {
    type: "website",
    siteName: "Sam n Harv",
    locale: "en_GB",
    url: "/",
    title: "Sam n Harv — Property Investment & Deal Sourcing",
    description:
      "Two brothers investing in property and sourcing deals across the UK. Based in the South West, working the whole map.",
    images: [{ url: "/hero-poster.jpg", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam n Harv — Property Investment & Deal Sourcing",
    description:
      "Two brothers investing in property and sourcing deals across the UK.",
    images: ["/hero-poster.jpg"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sam n Harv",
  legalName: "S L Grants Ltd",
  url: "https://samnharv.com",
  email: "contact@samnharv.com",
  telephone: "+447444551241",
  areaServed: "GB",
  description:
    "Property investment and deal sourcing — BRRR, rent to rent, flips, blocks, land and serviced accommodation. Based in the UK South West, working nationwide.",
  sameAs: ["https://share.google/lsd2TlaWo3OpRFqhO"],
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
