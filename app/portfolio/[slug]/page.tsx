import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProject(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — AppWeb Plus`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <section style={{ padding: "8rem 0 6rem" }}>
        <div className="container">
          <Link href="/#portfolio" className="btn-ghost" style={{ marginBottom: "2.5rem", display: "inline-block" }}>
            ← Retour au portfolio
          </Link>

          <div
            style={{
              background: "var(--ink-soft)",
              border: "1px solid var(--border-m)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div className="modal-inner">
              <div className="modal-media" style={{ minHeight: 420 }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1000}
                  height={750}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="modal-content">
                <div className="s-label" style={{ marginBottom: ".9rem" }}>
                  {project.category}
                </div>
                <h1 className="modal-title">{project.title}</h1>
                <p className="modal-desc">{project.description}</p>
                <div className="proj-tags">
                  {project.tags.map((t) => (
                    <span className="proj-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="modal-actions">
                  <a className="btn-primary" href={project.url} target="_blank" rel="noopener">
                    Voir le site
                  </a>
                  <Link className="btn-ghost" href="/#contact">
                    Un projet similaire ?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
