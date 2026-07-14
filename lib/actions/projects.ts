"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { uploadProjectImage } from "@/lib/supabaseStorage";

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(base: string, excludeId?: string) {
  const root = base || "projet";
  let slug = root;
  let i = 1;
  while (
    await prisma.project.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    i += 1;
    slug = `${root}-${i}`;
  }
  return slug;
}

function isValidImageValue(value: string) {
  if (value.startsWith("/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function readProjectFields(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    url: String(formData.get("url") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
    imageUrl: String(formData.get("imageUrl") || "").trim(),
    imageFile: formData.get("imageFile") as File | null,
  };
}

export type ProjectFormState = { error?: string };

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const fields = readProjectFields(formData);
  if (!fields.title || !fields.category || !fields.url || !fields.description) {
    return { error: "Veuillez remplir tous les champs requis." };
  }
  if (!isValidUrl(fields.url)) {
    return { error: "L'URL du site doit être une adresse http(s) valide." };
  }

  let image = fields.imageUrl;
  if (fields.imageFile && fields.imageFile.size > 0) {
    try {
      image = await uploadProjectImage(fields.imageFile);
    } catch {
      return { error: "Échec de l'upload de l'image." };
    }
  }
  if (!image || !isValidImageValue(image)) {
    return {
      error:
        "Veuillez fournir une image valide : un fichier uploadé, un chemin commençant par « / », ou une URL http(s) complète.",
    };
  }

  const slug = await uniqueSlug(slugify(fields.title));
  const maxOrder = await prisma.project.aggregate({ _max: { order: true } });

  await prisma.project.create({
    data: {
      slug,
      title: fields.title,
      category: fields.category,
      url: fields.url,
      description: fields.description,
      tags: fields.tags,
      featured: fields.featured,
      image,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const id = String(formData.get("id") || "");
  const fields = readProjectFields(formData);
  if (!id || !fields.title || !fields.category || !fields.url || !fields.description) {
    return { error: "Veuillez remplir tous les champs requis." };
  }
  if (!isValidUrl(fields.url)) {
    return { error: "L'URL du site doit être une adresse http(s) valide." };
  }

  let image = fields.imageUrl;
  if (fields.imageFile && fields.imageFile.size > 0) {
    try {
      image = await uploadProjectImage(fields.imageFile);
    } catch {
      return { error: "Échec de l'upload de l'image." };
    }
  }
  if (!image || !isValidImageValue(image)) {
    return {
      error:
        "Veuillez fournir une image valide : un fichier uploadé, un chemin commençant par « / », ou une URL http(s) complète.",
    };
  }

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return { error: "Projet introuvable." };

  const slug =
    slugify(fields.title) === existing.slug
      ? existing.slug
      : await uniqueSlug(slugify(fields.title), id);

  await prisma.project.update({
    where: { id },
    data: {
      slug,
      title: fields.title,
      category: fields.category,
      url: fields.url,
      description: fields.description,
      tags: fields.tags,
      featured: fields.featured,
      image,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function moveProject(formData: FormData) {
  const id = String(formData.get("id") || "");
  const direction = String(formData.get("direction") || "");
  if (!id || (direction !== "up" && direction !== "down")) return;

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return;

  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= projects.length) return;

  const a = projects[index];
  const b = projects[swapWith];

  await prisma.$transaction([
    prisma.project.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.project.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
