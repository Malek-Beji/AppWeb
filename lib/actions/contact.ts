"use server";

import { prisma } from "@/lib/prisma";

export type ContactFormState = {
  ok: boolean;
  error?: string;
};

export async function submitContactMessage(
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: a hidden field that only bots fill in. Pretend success without writing anything.
  if (String(formData.get("website") || "").trim()) {
    return { ok: true };
  }

  const prenom = String(formData.get("prenom") || "").trim();
  const nom = String(formData.get("nom") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!prenom || !nom || !email || !message) {
    return { ok: false, error: "Veuillez remplir tous les champs requis." };
  }

  await prisma.contactMessage.create({
    data: { prenom, nom, email, phone: phone || null, message },
  });

  return { ok: true };
}
