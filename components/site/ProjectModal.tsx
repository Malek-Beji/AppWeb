"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/types";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: PortfolioProject | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <div
      className={`modal${project ? " open" : ""}`}
      aria-hidden={project ? "false" : "true"}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      {project && (
        <div
          className="modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <button
            ref={closeRef}
            className="modal-close"
            type="button"
            aria-label="Fermer"
            onClick={onClose}
          >
            ×
          </button>
          <div className="modal-inner">
            <div className="modal-media">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="modal-content">
              <div className="s-label" style={{ marginBottom: ".9rem" }}>
                Projet
              </div>
              <h3 className="modal-title" id="modalTitle">
                {project.title}
              </h3>
              <p className="modal-desc">{project.description}</p>
              <div className="proj-tags">
                {project.tags.map((t) => (
                  <span className="proj-pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="modal-actions">
                <a
                  className="btn-primary"
                  href={project.url}
                  target="_blank"
                  rel="noopener"
                >
                  Voir le site
                </a>
                <Link className="btn-ghost" href={`/portfolio/${project.slug}`}>
                  Page du projet
                </Link>
                <button className="btn-ghost" type="button" onClick={onClose}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
