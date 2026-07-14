import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createProject, updateProject, deleteProject, moveProject } from "@/lib/actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";
import ProjectForm from "@/components/admin/ProjectForm";
import { CHIP_BUTTON, CHIP_BUTTON_DANGER, CHIP_BUTTON_ACCENT } from "@/components/admin/styles";

const BACK_LINK_CLASS =
  "font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors";

export default async function ProjectsPanel({
  view,
  id,
}: {
  view?: string;
  id?: string;
}) {
  if (view === "new") {
    return (
      <div>
        <Link href="/admin?tab=projects" className={BACK_LINK_CLASS}>
          ← Projets
        </Link>
        <h1 className="font-serif text-3xl text-white mt-3 mb-10">Nouveau projet</h1>
        <ProjectForm action={createProject} />
      </div>
    );
  }

  if (view === "edit") {
    const project = id ? await prisma.project.findUnique({ where: { id } }) : null;
    if (!project) notFound();

    return (
      <div>
        <Link href="/admin?tab=projects" className={BACK_LINK_CLASS}>
          ← Projets
        </Link>
        <h1 className="font-serif text-3xl text-white mt-3 mb-10">
          Éditer « {project.title} »
        </h1>
        <ProjectForm action={updateProject} project={project} />
      </div>
    );
  }

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            Portfolio
          </p>
          <h1 className="font-serif text-3xl text-white">Projets</h1>
        </div>
        <Link href="/admin?tab=projects&view=new" className={CHIP_BUTTON_ACCENT}>
          + Nouveau projet
        </Link>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="flex items-center gap-4 px-5 py-4 border-b border-white/10 last:border-b-0 hover:bg-white/[0.03] transition-colors"
          >
            <div className="relative w-20 h-12 shrink-0 rounded-md overflow-hidden bg-white/5 ring-1 ring-white/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="80px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate flex items-center gap-2">
                {project.title}
                {project.featured && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent border border-accent/30 rounded px-1.5 py-0.5">
                    Vedette
                  </span>
                )}
              </div>
              <div className="font-mono text-[11px] text-white/35 truncate mt-1">
                {project.category}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <form action={moveProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="direction" value="up" />
                <button
                  type="submit"
                  disabled={i === 0}
                  className="w-8 h-8 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  aria-label="Monter"
                >
                  ↑
                </button>
              </form>
              <form action={moveProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="direction" value="down" />
                <button
                  type="submit"
                  disabled={i === projects.length - 1}
                  className="w-8 h-8 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  aria-label="Descendre"
                >
                  ↓
                </button>
              </form>
              <Link href={`/admin?tab=projects&view=edit&id=${project.id}`} className={CHIP_BUTTON}>
                Éditer
              </Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <DeleteButton
                  confirmText={`Supprimer « ${project.title} » ?`}
                  className={CHIP_BUTTON_DANGER}
                />
              </form>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="p-8 text-sm text-white/40 text-center">
            Aucun projet pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
