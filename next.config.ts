import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // /deals is a static system maintained as plain HTML in public/deals
    // (deal pages are dropped in as files; see public/deals/index.html)
    return [{ source: "/deals", destination: "/deals/index.html" }];
  },
};

export default nextConfig;
