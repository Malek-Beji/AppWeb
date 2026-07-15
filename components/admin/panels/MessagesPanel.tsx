import { prisma } from "@/lib/prisma";
import { toggleMessageRead, deleteMessage } from "@/lib/actions/messages";
import DeleteButton from "@/components/admin/DeleteButton";
import { CHIP_BUTTON, CHIP_BUTTON_DANGER } from "@/components/admin/styles";

export default async function MessagesPanel() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
        Demandes
      </p>
      <h1 className="font-serif text-3xl text-zinc-900 dark:text-white mb-10">Messages</h1>

      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg border p-6 shadow-sm dark:shadow-none ${
              m.read
                ? "border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02]"
                : "border-accent/30 bg-accent/[0.06] dark:bg-accent/[0.04]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
              <div>
                <div className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                  {m.prenom} {m.nom}
                  {!m.read && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-strong dark:text-accent border border-accent/30 rounded px-1.5 py-0.5">
                      Nouveau
                    </span>
                  )}
                </div>
                <div className="font-mono text-[11px] text-zinc-400 dark:text-white/35 mt-1.5">
                  {m.email}
                  {m.phone ? ` · ${m.phone}` : ""} ·{" "}
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(m.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={String(m.read)} />
                  <button type="submit" className={CHIP_BUTTON}>
                    {m.read ? "Marquer non lu" : "Marquer lu"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <DeleteButton
                    confirmText="Supprimer ce message ?"
                    className={CHIP_BUTTON_DANGER}
                  />
                </form>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-white/70 leading-relaxed whitespace-pre-wrap">
              {m.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="border border-zinc-200 dark:border-white/10 rounded-lg p-8 text-center bg-white dark:bg-transparent shadow-sm dark:shadow-none">
            <p className="text-sm text-zinc-400 dark:text-white/40">
              Aucun message pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
