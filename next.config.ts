import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/private-office", destination: "/opportunities", permanent: true },
      { source: "/book", destination: "/call", permanent: false },
      { source: "/intro", destination: "/call", permanent: false },
    ];
  },
  async rewrites() {
    // /deals is a static system maintained as plain HTML in public/deals
    // (deal pages are dropped in as files; see public/deals/index.html)
    const rules = [{ source: "/deals", destination: "/deals/index.html" }];
    // dev only: gated international pages live in deals-held/ (not public/);
    // proxy them at their eventual URLs so the Private Office flow can be
    // reviewed locally. Never active in production builds.
    if (process.env.NODE_ENV !== "production") {
      rules.push({ source: "/deals/int-:slug.html", destination: "http://localhost:3999/int-:slug.html" });
    }
    return rules;
  },
};

export default nextConfig;
