import type { MetadataRoute } from "next";
import { INSIGHTS } from "@/lib/insights";
import { RESOURCES } from "@/lib/resources";

const BASE = "https://www.samnharv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/about",
    "/stays",
    "/stays/terms",
    "/deal-intelligence",
    "/toolkit",
    "/opportunities",
    "/join",
    "/power-team",
    "/landlords",
    "/councils",
    "/agents",
    "/developers",
    "/resources",
    "/learn",
    "/insights",
    "/standards",
    "/trust",
    "/faq",
    "/contact",
    "/call",
  ].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const docs = RESOURCES.map((r) => ({
    url: `${BASE}/resources/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const posts = INSIGHTS.map((post) => ({
    url: `${BASE}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...routes, ...docs, ...posts];
}
