import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toggleMessageRead, deleteMessage } from "@/lib/actions/messages";
import DeleteButton from "@/components/admin/DeleteButton";
import { PageHeader, EmptyState, Badge } from "@/components/admin/ui";
import { CHIP_BUTTON, CHIP_BUTTON_DANGER } from "@/components/admin/styles";
import {
  IconInbox,
  IconTrash,
  IconCheck,
  IconMail,
  IconExternal,
} from "@/components/admin/icons";

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "unread", label: "Non lus" },
];

export default async function MessagesPanel({ filter }: { filter?: string }) {
  const activeFilter = filter === "unread" ? "unread" : "all";

  const [messages, unreadCount, totalCount] = await Promise.all([
    prisma.contactMessage.findMany({
      where: activeFilter === "unread" ? { read: false } : undefined,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.count(),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="Demandes"
        title="Messages"
        description="Les soumissions du formulaire de contact du site public."
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 mb-6">
        {FILTERS.map(({ key, label }) => {
          const active = key === activeFilter;
          const count = key === "unread" ? unreadCount : totalCount;
          return (
            <Link
              key={key}
              href={key === "all" ? "/admin?tab=messages" : `/admin?tab=messages&filter=${key}`}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                active
                  ? "border-accent/40 bg-accent/10 text-zinc-900 dark:text-white font-medium"
                  : "border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25"
              }`}
            >
              {label}
              <span
                className={`font-mono text-[10px] rounded px-1.5 py-0.5 ${
                  active
                    ? "bg-accent/20 text-accent-strong dark:text-accent"
                    : "bg-zinc-100 dark:bg-white/[0.07] text-zinc-500 dark:text-white/40"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {messages.length === 0 ? (
        <EmptyState
          icon={<IconInbox className="w-5 h-5" />}
          title={
            activeFilter === "unread"
              ? "Aucun message non lu"
              : "Aucun message pour le moment"
          }
          description={
            activeFilter === "unread"
              ? "Tous les messages reçus ont été traités."
              : "Les demandes envoyées via le formulaire de contact apparaîtront ici."
          }
          action={
            activeFilter === "unread" ? (
              <Link href="/admin?tab=messages" className={CHIP_BUTTON}>
                Voir tous les messages
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <article
              key={m.id}
              className={`rounded-xl border p-5 sm:p-6 shadow-sm dark:shadow-none transition-colors ${
                m.read
                  ? "border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03]"
                  : "border-accent/35 bg-accent/[0.05] dark:bg-accent/[0.05]"
              }`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-mono text-[11px] font-semibold ${
                      m.read
                        ? "bg-zinc-100 dark:bg-white/[0.07] text-zinc-500 dark:text-white/50 border border-zinc-200 dark:border-white/10"
                        : "bg-accent/15 text-accent-strong dark:text-accent border border-accent/30"
                    }`}
                  >
                    {m.prenom.charAt(0).toUpperCase()}
                    {m.nom.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2 flex-wrap">
                      {m.prenom} {m.nom}
                      {!m.read && <Badge tone="accent">Nouveau</Badge>}
                    </div>
                    <div className="font-mono text-[11px] text-zinc-400 dark:text-white/35 mt-1 flex items-center gap-1.5 flex-wrap">
                      <a
                        href={`mailto:${m.email}`}
                        className="hover:text-accent-strong dark:hover:text-accent transition-colors"
                      >
                        {m.email}
                      </a>
                      {m.phone && (
                        <>
                          <span aria-hidden>·</span>
                          <a
                            href={`tel:${m.phone.replace(/\s/g, "")}`}
                            className="hover:text-accent-strong dark:hover:text-accent transition-colors"
                          >
                            {m.phone}
                          </a>
                        </>
                      )}
                      <span aria-hidden>·</span>
                      <time dateTime={m.createdAt.toISOString()}>
                        {new Intl.DateTimeFormat("fr-FR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(m.createdAt)}
                      </time>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent(
                      "Re: votre demande — AppWeb Plus"
                    )}`}
                    className={CHIP_BUTTON}
                    title="Répondre par email"
                  >
                    <IconExternal className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Répondre</span>
                  </a>
                  <form action={toggleMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={String(m.read)} />
                    <button
                      type="submit"
                      className={CHIP_BUTTON}
                      title={m.read ? "Marquer comme non lu" : "Marquer comme lu"}
                    >
                      {m.read ? (
                        <IconMail className="w-3.5 h-3.5" />
                      ) : (
                        <IconCheck className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden sm:inline">
                        {m.read ? "Non lu" : "Lu"}
                      </span>
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <DeleteButton
                      confirmText="Supprimer ce message ? Cette action est définitive."
                      className={CHIP_BUTTON_DANGER}
                      title="Supprimer"
                    >
                      <IconTrash className="w-3.5 h-3.5" />
                      <span className="sr-only">Supprimer</span>
                    </DeleteButton>
                  </form>
                </div>
              </div>

              <p className="text-sm text-zinc-600 dark:text-white/70 leading-relaxed whitespace-pre-wrap border-t border-zinc-100 dark:border-white/[0.07] pt-4">
                {m.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
