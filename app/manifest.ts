import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sam n Harv — Property Investment & Deal Sourcing",
    short_name: "Sam n Harv",
    description:
      "Two brothers investing in property and sourcing investment property deals across the UK.",
    start_url: "/",
    display: "browser",
    background_color: "#f2efe8",
    theme_color: "#f2efe8",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
