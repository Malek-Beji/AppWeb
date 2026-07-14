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
      <h1 className="text-2xl font-serif mb-8">Éditer « {project.title} »</h1>
      <ProjectForm action={updateProject} project={project} />
    </div>
  );
}
