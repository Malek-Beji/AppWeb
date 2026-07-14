"use client";

import { useActionState } from "react";
import type { ProjectFormState } from "@/lib/actions/projects";
import type { PortfolioProject } from "@/lib/types";

type Action = (
  prevState: ProjectFormState,
  formData: FormData
) => Promise<ProjectFormState>;

export default function ProjectForm({
  action,
  project,
}: {
  action: Action;
  project?: PortfolioProject;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  const inputClass =
    "w-full px-4 py-2.5 rounded bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c8a96e]";
  const labelClass = "block text-xs uppercase tracking-widest text-white/40 mb-2";

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div>
        <label className={labelClass}>Titre</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={project?.title}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Catégorie</label>
        <input
          type="text"
          name="category"
          required
          placeholder="ex. WordPress · E-commerce"
          defaultValue={project?.category}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>URL du site</label>
        <input
          type="url"
          name="url"
          required
          placeholder="https://..."
          defaultValue={project?.url}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tags (séparés par des virgules)</label>
        <input
          type="text"
          name="tags"
          placeholder="WordPress, E-commerce, Multilingual"
          defaultValue={project?.tags.join(", ")}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Image — coller une URL</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="https://..."
          defaultValue={project?.image}
          className={inputClass}
        />
        <p className="text-xs text-white/30 mt-1">
          Ou uploader un fichier ci-dessous (prioritaire sur l&apos;URL si les deux sont fournis).
        </p>
      </div>

      <div>
        <label className={labelClass}>Image — uploader un fichier</label>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          className="text-sm text-white/70"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          defaultChecked={project?.featured}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="text-sm text-white/70">
          Projet vedette
        </label>
      </div>

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-2.5 rounded bg-[#c8a96e] text-[#08090d] text-sm font-semibold uppercase tracking-wide hover:bg-transparent hover:text-[#c8a96e] border border-[#c8a96e] transition-colors disabled:opacity-60"
      >
        {pending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
