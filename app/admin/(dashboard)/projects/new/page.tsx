import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif mb-8">Nouveau projet</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
