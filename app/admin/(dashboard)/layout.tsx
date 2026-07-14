import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/projects", label: "Projets" },
  { href: "/admin/messages", label: "Messages" },
];

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
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
