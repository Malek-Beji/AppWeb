import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createProject, updateProject, deleteProject, moveProject } from "@/lib/actions/projects";
import DeleteButton from "@/components/admin/DeleteButton";
import ProjectForm from "@/components/admin/ProjectForm";
import { PageHeader, EmptyState, Badge } from "@/components/admin/ui";
import {
  CARD,
  CHIP_BUTTON,
  CHIP_BUTTON_DANGER,
  CHIP_BUTTON_ACCENT,
  ICON_BUTTON,
  EYEBROW,
  PAGE_TITLE,
} from "@/components/admin/styles";
import {
  IconPlus,
  IconPencil,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconLayers,
  IconStar,
  IconExternal,
} from "@/components/admin/icons";

const BACK_LINK_CLASS =
  "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40 hover:text-accent-strong dark:hover:text-accent transition-colors";

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
          <IconArrowLeft className="w-3.5 h-3.5" />
          Projets
        </Link>
        <p className={`${EYEBROW} mt-6 mb-2.5`}>Création</p>
        <h1 className={`${PAGE_TITLE} mb-8`}>Nouveau projet</h1>
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
          <IconArrowLeft className="w-3.5 h-3.5" />
          Projets
        </Link>
        <p className={`${EYEBROW} mt-6 mb-2.5`}>Édition</p>
        <h1 className={`${PAGE_TITLE} mb-8`}>{project.title}</h1>
        <ProjectForm action={updateProject} project={project} />
      </div>
    );
  }

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageHeader
        eyebrow="Portfolio"
        title="Projets"
        description="L'ordre défini ici est celui affiché sur la page portfolio publique."
        action={
          <Link href="/admin?tab=projects&view=new" className={CHIP_BUTTON_ACCENT}>
            <IconPlus className="w-3.5 h-3.5" />
            Nouveau projet
          </Link>
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          icon={<IconLayers className="w-5 h-5" />}
          title="Aucun projet pour le moment"
          description="Ajoutez votre première réalisation pour qu'elle apparaisse sur le site."
          action={
            <Link href="/admin?tab=projects&view=new" className={CHIP_BUTTON_ACCENT}>
              <IconPlus className="w-3.5 h-3.5" />
              Nouveau projet
            </Link>
          }
        />
      ) : (
        <div className={`${CARD} overflow-hidden`}>
          {/* Table header */}
          <div className="hidden md:flex items-center gap-4 px-5 py-3 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02]">
            <span className="w-20 shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/35">
              Aperçu
            </span>
            <span className="flex-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/35">
              Projet
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/35">
              {projects.length} au total
            </span>
          </div>

          {projects.map((project, i) => (
            <div
              key={project.id}
              className="flex items-center gap-4 px-5 py-4 border-b border-zinc-100 dark:border-white/[0.07] last:border-b-0 hover:bg-zinc-50 dark:hover:bg-white/[0.03] transition-colors"
            >
              <div className="relative w-20 h-12 shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-white/5 ring-1 ring-zinc-200 dark:ring-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-zinc-900 dark:text-white truncate flex items-center gap-2">
                  <span className="truncate">{project.title}</span>
                  {project.featured && (
                    <Badge tone="accent">
                      <IconStar className="w-2.5 h-2.5" />
                      Vedette
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-[11px] text-zinc-400 dark:text-white/35 truncate">
                    {project.category}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener"
                    title="Ouvrir le site du projet"
                    className="text-zinc-300 dark:text-white/25 hover:text-accent-strong dark:hover:text-accent transition-colors shrink-0"
                  >
                    <IconExternal className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-1 mr-1">
                  <form action={moveProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      type="submit"
                      disabled={i === 0}
                      className={ICON_BUTTON}
                      aria-label={`Monter ${project.title}`}
                      title="Monter"
                    >
                      <IconArrowUp className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={moveProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      disabled={i === projects.length - 1}
                      className={ICON_BUTTON}
                      aria-label={`Descendre ${project.title}`}
                      title="Descendre"
                    >
                      <IconArrowDown className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                <Link
                  href={`/admin?tab=projects&view=edit&id=${project.id}`}
                  className={CHIP_BUTTON}
                  title="Éditer"
                >
                  <IconPencil className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Éditer</span>
                </Link>

                <form action={deleteProject}>
                  <input type="hidden" name="id" value={project.id} />
                  <DeleteButton
                    confirmText={`Supprimer « ${project.title} » ? Cette action est définitive.`}
                    className={CHIP_BUTTON_DANGER}
                    title="Supprimer"
                  >
                    <IconTrash className="w-3.5 h-3.5" />
                    <span className="sr-only">Supprimer</span>
                  </DeleteButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
