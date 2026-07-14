import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession, SESSION_COOKIE } from "@/lib/session";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySession(token);
  if (!session) return null;

  return prisma.admin.findUnique({ where: { id: session.adminId } });
}
