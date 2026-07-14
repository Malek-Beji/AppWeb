import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function OverviewPanel() {
  const [projectCount, unreadCount, messageCount] = await Promise.all([
    prisma.project.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.count(),
  ]);

  const stats = [
    { value: projectCount, label: "Projets au portfolio", href: "/admin?tab=projects" },
    { value: unreadCount, label: "Messages non lus", href: "/admin?tab=messages" },
    { value: messageCount, label: "Messages au total", href: "/admin?tab=messages" },
  ];

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
        Pilotage
      </p>
      <h1 className="font-serif text-3xl text-white mb-10">Vue d&apos;ensemble</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative block rounded-lg border border-white/10 bg-white/[0.03] p-7 overflow-hidden hover:border-accent/40 transition-colors"
          >
            <div
              className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 group-hover:opacity-[0.08] blur-2xl transition-opacity"
              style={{ background: "var(--color-accent)" }}
            />
            <div className="font-serif italic text-5xl text-accent leading-none">
              {stat.value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-4">
              {stat.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
