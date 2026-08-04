"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { ProjectFormState } from "@/lib/actions/projects";
import type { PortfolioProject } from "@/lib/types";
import { CARD, CHIP_BUTTON } from "@/components/admin/styles";
import { IconInfo, IconImage, IconStar, IconCheck } from "@/components/admin/icons";

type Action = (
  prevState: ProjectFormState,
  formData: FormData
) => Promise<ProjectFormState>;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-white/20 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 focus:bg-white dark:focus:bg-accent/5 transition-colors";
const labelClass =
  "block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40 mb-2";
const hintClass = "text-xs text-zinc-400 dark:text-white/30 mt-2";

function SectionHeader({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent-strong dark:text-accent shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-medium text-zinc-900 dark:text-white">{title}</h2>
        {hint && (
          <p className="text-xs text-zinc-400 dark:text-white/35 mt-0.5">{hint}</p>
        )}
      </div>
    </div>
  );
}

export default function ProjectForm({
  action,
  project,
}: {
  action: Action;
  project?: PortfolioProject;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [imagePreview, setImagePreview] = useState(project?.image ?? "");

  function onFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  const previewIsRenderable =
    imagePreview.startsWith("/") ||
    imagePreview.startsWith("http") ||
    imagePreview.startsWith("blob:");

  return (
    <form action={formAction} className="max-w-3xl pb-24">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className={`${CARD} p-6 sm:p-8 mb-4`}>
        <SectionHeader
          icon={<IconInfo className="w-4 h-4" />}
          title="Informations"
          hint="Ce que les visiteurs verront sur la carte du projet."
        />

        <div className="space-y-5">
          <div>
            <label className={labelClass} htmlFor="title">
              Titre
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              placeholder="ex. TileO Dubai"
              defaultValue={project?.title}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="category">
                Catégorie
              </label>
              <input
                id="category"
                type="text"
                name="category"
                required
                placeholder="ex. WordPress · E-commerce"
                defaultValue={project?.category}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="url">
                URL du site
              </label>
              <input
                id="url"
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
            <label className={labelClass} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Décrivez le projet en quelques phrases..."
              defaultValue={project?.description}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              placeholder="WordPress, E-commerce, Multilingual"
              defaultValue={project?.tags.join(", ")}
              className={inputClass}
            />
            <p className={hintClass}>Séparez chaque tag par une virgule.</p>
          </div>
        </div>
      </div>

      <div className={`${CARD} p-6 sm:p-8 mb-4`}>
        <SectionHeader
          icon={<IconImage className="w-4 h-4" />}
          title="Image"
          hint="Collez une URL ou uploadez un fichier."
        />

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-start">
          <div className="space-y-5 min-w-0">
            <div>
              <label className={labelClass} htmlFor="imageUrl">
                URL de l&apos;image
              </label>
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                placeholder="https://..."
                defaultValue={project?.image}
                onChange={(e) => setImagePreview(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="imageFile">
                Ou uploader un fichier
              </label>
              <input
                id="imageFile"
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={onFilePicked}
                className="w-full text-sm text-zinc-500 dark:text-white/60 file:mr-4 file:rounded-lg file:border file:border-zinc-200 dark:file:border-white/10 file:bg-zinc-50 dark:file:bg-white/5 file:px-3.5 file:py-2 file:font-mono file:text-[10px] file:uppercase file:tracking-wider file:text-zinc-600 dark:file:text-white/70 hover:file:border-zinc-300 dark:hover:file:border-white/25 file:cursor-pointer file:transition-colors"
              />
              <p className={hintClass}>
                Le fichier uploadé est prioritaire sur l&apos;URL si les deux sont fournis.
              </p>
            </div>
          </div>

          {/* Live preview */}
          <div className="w-full sm:w-44 shrink-0">
            <span className={labelClass}>Aperçu</span>
            <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center">
              {previewIsRenderable ? (
                // eslint-disable-next-line @next/next/no-img-element -- preview may be a blob: URL from a not-yet-uploaded file, which next/image cannot optimise
                <img
                  src={imagePreview}
                  alt="Aperçu du projet"
                  className="w-full h-full object-cover"
                />
              ) : (
                <IconImage className="w-6 h-6 text-zinc-300 dark:text-white/20" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`${CARD} p-6 sm:p-8`}>
        <SectionHeader icon={<IconStar className="w-4 h-4" />} title="Mise en avant" />
        <label
          htmlFor="featured"
          className="flex items-start gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={project?.featured}
            className="mt-0.5 w-4 h-4 accent-accent cursor-pointer"
          />
          <span>
            <span className="block text-sm text-zinc-800 dark:text-white/85">
              Projet vedette
            </span>
            <span className="block text-xs text-zinc-400 dark:text-white/35 mt-0.5">
              Affiché en grand format sur la page portfolio publique.
            </span>
          </span>
        </label>
      </div>

      {state?.error && (
        <p className="mt-5 rounded-lg border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {state.error}
        </p>
      )}

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-ink/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-3.5 flex items-center justify-end gap-3">
          <Link href="/admin?tab=projects" className={CHIP_BUTTON}>
            Annuler
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-ink text-sm font-semibold hover:bg-accent-dim border border-accent transition-colors disabled:opacity-60 disabled:pointer-events-none"
          >
            <IconCheck className="w-4 h-4" />
            {pending ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </form>
  );
}
