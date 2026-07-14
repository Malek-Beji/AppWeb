import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProject, moveProject } from "@/lib/actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 rounded bg-[#c8a96e] text-[#08090d] text-sm font-semibold uppercase tracking-wide hover:bg-transparent hover:text-[#c8a96e] border border-[#c8a96e] transition-colors"
        >
          + Nouveau projet
        </Link>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="flex items-center gap-4 px-4 py-3 border-b border-white/10 last:border-b-0"
          >
            <div className="relative w-16 h-10 shrink-0 rounded overflow-hidden bg-white/5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="64px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {project.title}
                {project.featured && (
                  <span className="ml-2 text-[10px] uppercase tracking-widest text-[#c8a96e]">
                    Vedette
                  </span>
                )}
              </div>
              <div className="text-xs text-white/40 truncate">{project.category}</div>
            </div>
            <form action={moveProject}>
              <input type="hidden" name="id" value={project.id} />
              <input type="hidden" name="direction" value="up" />
              <button
                type="submit"
                disabled={i === 0}
                className="w-8 h-8 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed"
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
                className="w-8 h-8 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed"
                aria-label="Descendre"
              >
                ↓
              </button>
            </form>
            <Link
              href={`/admin/projects/${project.id}`}
              className="px-3 py-1.5 rounded border border-white/10 text-xs text-white/70 hover:text-white hover:border-white/30 transition-colors"
            >
              Éditer
            </Link>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={project.id} />
              <DeleteButton
                confirmText={`Supprimer « ${project.title} » ?`}
                className="px-3 py-1.5 rounded border border-red-500/20 text-xs text-red-400/80 hover:text-red-400 hover:border-red-500/50 transition-colors"
              />
            </form>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="p-6 text-sm text-white/40">Aucun projet pour le moment.</p>
        )}
      </div>
    </div>
  );
}
