import { prisma } from "@/lib/prisma";
import { toggleMessageRead, deleteMessage } from "@/lib/actions/messages";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-8">Messages</h1>

      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg border p-5 ${
              m.read ? "border-white/10 bg-white/[0.02]" : "border-[#c8a96e]/30 bg-[#c8a96e]/[0.03]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="text-sm font-medium">
                  {m.prenom} {m.nom}{" "}
                  {!m.read && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-[#c8a96e]">
                      Nouveau
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/40">
                  {m.email}
                  {m.phone ? ` · ${m.phone}` : ""} ·{" "}
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(m.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <form action={toggleMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={String(m.read)} />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded border border-white/10 text-xs text-white/70 hover:text-white hover:border-white/30 transition-colors"
                  >
                    {m.read ? "Marquer non lu" : "Marquer lu"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <DeleteButton
                    confirmText="Supprimer ce message ?"
                    className="px-3 py-1.5 rounded border border-red-500/20 text-xs text-red-400/80 hover:text-red-400 hover:border-red-500/50 transition-colors"
                  />
                </form>
              </div>
            </div>
            <p className="text-sm text-white/70 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-sm text-white/40">Aucun message pour le moment.</p>
        )}
      </div>
    </div>
  );
}
