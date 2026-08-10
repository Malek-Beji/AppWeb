import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/projects";

// Généré à la requête plutôt qu'au build : la liste des projets est statique,
// mais SITE_URL est lu à l'exécution — changer la variable dans Vercel suffit,
// sans redéploiement, et un oubli ne fige pas un sitemap pointant sur localhost.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  const staticPages = ["", "/services", "/portfolio", "/apropos", "/contact"];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
    })),
    ...portfolioProjects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
