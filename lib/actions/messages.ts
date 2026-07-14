"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleMessageRead(formData: FormData) {
  const id = String(formData.get("id") || "");
  const read = formData.get("read") === "true";
  if (!id) return;
  await prisma.contactMessage.update({ where: { id }, data: { read: !read } });
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
}
