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
    <div className="min-h-screen bg-[#08090d] text-[#f5f3ef] flex">
      <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-serif text-xl">
            AppWeb<span className="text-[#c8a96e] italic">+</span>
          </span>
          <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
            Administration
          </p>
        </div>
        <div className="flex-1 px-3 py-4">
          <AdminNav />
        </div>
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-xs text-white/40 mb-3 truncate">{admin.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs uppercase tracking-widest text-white/50 hover:text-[#c8a96e] transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
