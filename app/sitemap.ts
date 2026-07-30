import type { MetadataRoute } from "next";
import { INSIGHTS } from "@/lib/insights";

const BASE = "https://samnharv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/about",
    "/stays",
    "/deal-intelligence",
    "/insights",
    "/faq",
    "/contact",
  ].map(
    (path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const posts = INSIGHTS.map((post) => ({
    url: `${BASE}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
