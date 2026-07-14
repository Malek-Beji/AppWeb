import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink text-white flex font-sans">
      <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col relative">
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
        />
        <div className="px-6 py-7 border-b border-white/10 relative">
          <span className="font-serif text-2xl tracking-tight">
            AppWeb<span className="text-accent italic">+</span>
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 mt-1.5">
            Administration
          </p>
        </div>
        <div className="flex-1 px-3 py-5">
          <AdminNav />
        </div>
        <div className="px-6 py-5 border-t border-white/10">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70 mb-1">
            Connecté
          </p>
          <p className="text-sm text-white/70 mb-4 truncate">{admin.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
            >
              Déconnexion →
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-x-auto">
        <div className="max-w-5xl px-8 py-10 md:px-12 md:py-12">{children}</div>
      </main>
    </div>
  );
}
