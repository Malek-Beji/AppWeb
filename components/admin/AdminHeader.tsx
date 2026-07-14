"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { logout } from "@/lib/actions/auth";

const TABS = [
  { key: "overview", label: "Vue d'ensemble", meta: "Pilotage" },
  { key: "projects", label: "Projets", meta: "Portfolio" },
  { key: "messages", label: "Messages", meta: "Demandes" },
];

export default function AdminHeader({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin" className="font-serif text-xl tracking-tight shrink-0">
            AppWeb<span className="text-accent italic">+</span>
          </Link>

          <nav className="flex items-center gap-1">
            {TABS.map((t) => {
              const active = t.key === activeTab;
              return (
                <Link
                  key={t.key}
                  href={`/admin?tab=${t.key}`}
                  className={`group flex items-center gap-2 rounded-md px-3.5 py-2 text-sm transition-colors ${
                    active
                      ? "bg-accent/10 text-white"
                      : "text-white/55 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-medium">{t.label}</span>
                  <span
                    className={`hidden sm:inline font-mono text-[9px] uppercase tracking-[0.2em] ${
                      active ? "text-accent" : "text-white/25 group-hover:text-white/40"
                    }`}
                  >
                    {t.meta}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden md:block text-sm text-white/50 truncate max-w-[180px]">
              {email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-accent transition-colors"
              >
                Déconnexion →
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
