"use client";

import { useActionState } from "react";
import type { ProjectFormState } from "@/lib/actions/projects";
import type { PortfolioProject } from "@/lib/types";

type Action = (
  prevState: ProjectFormState,
  formData: FormData
) => Promise<ProjectFormState>;

const inputClass =
  "w-full px-4 py-2.5 rounded bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-accent/5 transition-colors";
const labelClass = "block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2";
const sectionLabelClass = "font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4";

export default function ProjectForm({
  action,
  project,
}: {
  action: Action;
  project?: PortfolioProject;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="max-w-2xl">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="bg-ink-soft border border-white/10 rounded-lg p-8 mb-6">
        <p className={sectionLabelClass}>Informations</p>

        <div className="space-y-5">
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

          <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>

      <div className="bg-ink-soft border border-white/10 rounded-lg p-8 mb-6">
        <p className={sectionLabelClass}>Image</p>

        <div className="space-y-5">
          <div>
            <label className={labelClass}>Coller une URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="https://..."
              defaultValue={project?.image}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Ou uploader un fichier</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="w-full text-sm text-white/60 file:mr-4 file:rounded file:border file:border-white/10 file:bg-white/5 file:px-3 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-wider file:text-white/70 hover:file:border-white/25 file:transition-colors"
            />
            <p className="text-xs text-white/30 mt-2">
              Le fichier uploadé est prioritaire sur l&apos;URL si les deux sont fournis.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-ink-soft border border-white/10 rounded-lg p-8 mb-6">
        <label htmlFor="featured" className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={project?.featured}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm text-white/80">Projet vedette</span>
          <span className="text-xs text-white/35">
            — affiché en grand format sur le portfolio public
          </span>
        </label>
      </div>

      {state?.error && (
        <p className="text-sm text-red-400 mb-5">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-2.5 rounded bg-accent text-ink text-sm font-semibold uppercase tracking-wide hover:bg-transparent hover:text-accent border border-accent transition-colors disabled:opacity-60 disabled:pointer-events-none"
      >
        {pending ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
