import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader, Badge } from "@/components/admin/ui";
import { CARD, CHIP_BUTTON, MUTED_MONO } from "@/components/admin/styles";
import {
  IconLayers,
  IconInbox,
  IconMail,
  IconStar,
  IconPlus,
  IconExternal,
} from "@/components/admin/icons";

export default async function OverviewPanel() {
  const [projectCount, featuredCount, unreadCount, messageCount, recentMessages] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
    ]);

  const stats = [
    {
      value: projectCount,
      label: "Projets au portfolio",
      hint: `${featuredCount} en vedette`,
      href: "/admin?tab=projects",
      Icon: IconLayers,
    },
    {
      value: unreadCount,
      label: "Messages non lus",
      hint: unreadCount > 0 ? "À traiter" : "Tout est lu",
      href: "/admin?tab=messages",
      Icon: IconInbox,
      highlight: unreadCount > 0,
    },
    {
      value: messageCount,
      label: "Messages au total",
      hint: "Depuis le lancement",
      href: "/admin?tab=messages",
      Icon: IconMail,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="Pilotage"
        title="Vue d'ensemble"
        description="Un coup d'œil sur votre portfolio et les demandes entrantes."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map(({ value, label, hint, href, Icon, highlight }) => (
          <Link
            key={label}
            href={href}
            className={`${CARD} group relative block p-6 overflow-hidden hover:border-accent/50 transition-colors ${
              highlight ? "ring-1 ring-accent/25" : ""
            }`}
          >
            <div
              className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-[0.09] blur-2xl transition-opacity"
              style={{ background: "var(--color-accent)" }}
            />
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent-strong dark:text-accent">
                <Icon className="w-[18px] h-[18px]" />
              </div>
              {highlight && <Badge tone="accent">Nouveau</Badge>}
            </div>
            <div className="font-serif italic text-[2.75rem] leading-none text-accent-strong dark:text-accent">
              {value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-white/45 mt-3">
              {label}
            </div>
            <div className="text-xs text-zinc-400 dark:text-white/30 mt-1.5">{hint}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent messages */}
        <div className={`${CARD} lg:col-span-2 p-6`}>
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45">
              Derniers messages
            </h2>
            <Link href="/admin?tab=messages" className={CHIP_BUTTON}>
              Tout voir
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-sm text-zinc-400 dark:text-white/35 py-6 text-center">
              Aucun message pour le moment.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-white/[0.07]">
              {recentMessages.map((m) => (
                <li key={m.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="truncate">
                          {m.prenom} {m.nom}
                        </span>
                        {!m.read && <Badge tone="accent">Non lu</Badge>}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-white/45 truncate mt-0.5">
                        {m.message}
                      </p>
                    </div>
                    <span className={`${MUTED_MONO} shrink-0 pt-0.5`}>
                      {new Intl.DateTimeFormat("fr-FR", {
                        day: "2-digit",
                        month: "short",
                      }).format(m.createdAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick actions */}
        <div className={`${CARD} p-6`}>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 dark:text-white/45 mb-5">
            Actions rapides
          </h2>
          <div className="flex flex-col gap-2.5">
            <QuickAction
              href="/admin?tab=projects&view=new"
              icon={<IconPlus className="w-4 h-4" />}
              label="Ajouter un projet"
            />
            <QuickAction
              href="/admin?tab=projects"
              icon={<IconStar className="w-4 h-4" />}
              label="Gérer le portfolio"
            />
            <QuickAction
              href="/portfolio"
              icon={<IconExternal className="w-4 h-4" />}
              label="Voir le site public"
              external
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  const className =
    "flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-white/10 px-3.5 py-3 text-sm text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white hover:border-accent/40 hover:bg-accent/[0.04] transition-colors";

  const content = (
    <>
      <span className="text-accent-strong dark:text-accent">{icon}</span>
      {label}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
