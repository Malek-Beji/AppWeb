import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${baseUrl()}/sitemap.xml`,
  };
}

function baseUrl() {
  return process.env.SITE_URL || "http://localhost:3000";
}
