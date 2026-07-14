"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, SESSION_COOKIE } from "@/lib/session";

export type LoginState = { error?: string };

const LOCK_THRESHOLD = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return { error: "Identifiants invalides." };

  if (admin.lockedUntil && admin.lockedUntil > new Date()) {
    const minutes = Math.max(
      1,
      Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 60000)
    );
    return {
      error: `Trop de tentatives échouées. Réessayez dans ${minutes} min.`,
    };
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    const failedAttempts = admin.failedAttempts + 1;
    const lockedUntil =
      failedAttempts >= LOCK_THRESHOLD
        ? new Date(Date.now() + LOCK_DURATION_MS)
        : null;
    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedAttempts, lockedUntil },
    });
    if (lockedUntil) {
      return {
        error: "Trop de tentatives échouées. Compte verrouillé 15 minutes.",
      };
    }
    return { error: "Identifiants invalides." };
  }

  if (admin.failedAttempts > 0 || admin.lockedUntil) {
    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedAttempts: 0, lockedUntil: null },
    });
  }

  const token = await signSession({ adminId: admin.id, email: admin.email });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
