"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioProject } from "@/lib/types";
import ProjectModal from "./ProjectModal";

export default function Portfolio({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio-head reveal">
          <div>
            <span className="s-label">Réalisations</span>
            <h2 className="s-title">
              Portfolio
              <br />
              <em>& Projets</em>
            </h2>
          </div>
          <p className="s-sub">
            Chaque projet est unique — conçu et taillé sur mesure pour
            répondre aux ambitions de nos clients.
          </p>
        </div>

        <div className="portfolio-grid reveal">
          {projects.map((project) => (
            <div className="proj-card" key={project.id}>
              <div
                className="proj-thumb"
                role="button"
                tabIndex={0}
                onClick={() => setSelected(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(project);
                  }
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <a
                  className="proj-cta"
                  href={project.url}
                  target="_blank"
                  rel="noopener"
                  onClick={(e) => e.stopPropagation()}
                >
                  Voir le site →
                </a>
              </div>
              <div className="proj-info">
                <div className="proj-meta">
                  <span className="proj-tag-label">{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="proj-tags">
                  {project.tags.map((t) => (
                    <span className="proj-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
