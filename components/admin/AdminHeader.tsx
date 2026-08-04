"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import ThemeToggle from "@/components/admin/ThemeToggle";
import { IconGauge, IconLayers, IconMail, IconLogout } from "@/components/admin/icons";

const TABS = [
  { key: "overview", label: "Vue d'ensemble", Icon: IconGauge },
  { key: "projects", label: "Projets", Icon: IconLayers },
  { key: "messages", label: "Messages", Icon: IconMail },
];

export default function AdminHeader({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const initial = email.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-white/10 bg-white/85 dark:bg-ink/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        {/* Top row: brand + account */}
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 shrink-0 group">
            <span className="font-serif text-xl tracking-tight text-zinc-900 dark:text-white">
              AppWeb<span className="text-accent italic">+</span>
            </span>
            <span className="hidden sm:block h-4 w-px bg-zinc-200 dark:bg-white/15" />
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-white/35">
              Back-office
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2.5 pr-1">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center font-mono text-[11px] font-semibold text-accent-strong dark:text-accent">
                {initial}
              </div>
              <span className="text-sm text-zinc-500 dark:text-white/50 truncate max-w-[170px]">
                {email}
              </span>
            </div>
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                title="Déconnexion"
                className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <IconLogout className="w-[18px] h-[18px]" />
                <span className="hidden lg:inline font-mono text-[10px] uppercase tracking-[0.18em]">
                  Quitter
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row: section tabs with active underline */}
        <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
          {TABS.map(({ key, label, Icon }) => {
            const active = key === activeTab;
            return (
              <Link
                key={key}
                href={`/admin?tab=${key}`}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  active
                    ? "border-accent text-zinc-900 dark:text-white font-medium"
                    : "border-transparent text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`w-[17px] h-[17px] ${
                    active ? "text-accent-strong dark:text-accent" : ""
                  }`}
                />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
