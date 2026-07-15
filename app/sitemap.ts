import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";

  const projects = await prisma.project.findMany({
    select: { slug: true, updatedAt: true },
  });

  const staticPages = ["", "/services", "/portfolio", "/apropos", "/contact"];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
