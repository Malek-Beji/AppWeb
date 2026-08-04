import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Generated per request rather than at build time: the project list comes from
// the database, and a build should never fail just because the DB is asleep.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  const staticPages = ["", "/services", "/portfolio", "/apropos", "/contact"];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.9,
  }));

  try {
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    });
    entries.push(
      ...projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  } catch {
    // DB unreachable — still serve a valid sitemap of the static pages.
  }

  return entries;
}
