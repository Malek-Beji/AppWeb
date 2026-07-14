import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminOverview() {
  const [projectCount, unreadCount, messageCount] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-serif mb-8">Vue d&apos;ensemble</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/projects"
          className="block rounded-lg border border-white/10 bg-white/5 p-6 hover:border-[#c8a96e]/40 transition-colors"
        >
          <div className="text-4xl font-serif italic text-[#c8a96e]">
            {projectCount}
          </div>
          <div className="text-xs uppercase tracking-widest text-white/40 mt-2">
            Projets au portfolio
          </div>
        </Link>
        <Link
          href="/admin/messages"
          className="block rounded-lg border border-white/10 bg-white/5 p-6 hover:border-[#c8a96e]/40 transition-colors"
        >
          <div className="text-4xl font-serif italic text-[#c8a96e]">
            {unreadCount}
          </div>
          <div className="text-xs uppercase tracking-widest text-white/40 mt-2">
            Messages non lus
          </div>
        </Link>
        <Link
          href="/admin/messages"
          className="block rounded-lg border border-white/10 bg-white/5 p-6 hover:border-[#c8a96e]/40 transition-colors"
        >
          <div className="text-4xl font-serif italic text-[#c8a96e]">
            {messageCount}
          </div>
          <div className="text-xs uppercase tracking-widest text-white/40 mt-2">
            Messages au total
          </div>
        </Link>
      </div>
    </div>
  );
}
