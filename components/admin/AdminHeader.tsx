"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import ThemeToggle from "@/components/admin/ThemeToggle";

const TABS = [
  { key: "overview", label: "Vue d'ensemble", meta: "Pilotage" },
  { key: "projects", label: "Projets", meta: "Portfolio" },
  { key: "messages", label: "Messages", meta: "Demandes" },
];

export default function AdminHeader({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-white/10 bg-zinc-50/90 dark:bg-ink/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link
            href="/admin"
            className="font-serif text-xl tracking-tight shrink-0 text-zinc-900 dark:text-white"
          >
            AppWeb<span className="text-accent italic">+</span>
          </Link>

          <nav className="flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = t.key === activeTab;
              return (
                <Link
                  key={t.key}
                  href={`/admin?tab=${t.key}`}
                  className={`group flex items-center gap-2 rounded-md px-3.5 py-2 text-sm transition-colors whitespace-nowrap ${
                    active
                      ? "bg-accent/10 text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-white/55 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-medium">{t.label}</span>
                  <span
                    className={`hidden sm:inline font-mono text-[9px] uppercase tracking-[0.2em] ${
                      active
                        ? "text-accent-strong dark:text-accent"
                        : "text-zinc-300 dark:text-white/25 group-hover:text-zinc-400 dark:group-hover:text-white/40"
                    }`}
                  >
                    {t.meta}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:block text-sm text-zinc-500 dark:text-white/50 truncate max-w-[180px]">
              {email}
            </span>
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40 hover:text-accent-strong dark:hover:text-accent transition-colors"
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
