import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <Link
        href="/admin/projects"
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
      >
        ← Projets
      </Link>
      <h1 className="font-serif text-3xl text-white mt-3 mb-10">Nouveau projet</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
