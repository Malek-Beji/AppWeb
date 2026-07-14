import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/lib/actions/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <Link
        href="/admin/projects"
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
      >
        ← Projets
      </Link>
      <h1 className="font-serif text-3xl text-white mt-3 mb-10">
        Éditer « {project.title} »
      </h1>
      <ProjectForm action={updateProject} project={project} />
    </div>
  );
}
