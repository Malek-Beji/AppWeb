"use client";

import { IconSun, IconMoon } from "@/components/admin/icons";

function toggle() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  localStorage.setItem("admin-theme", next ? "dark" : "light");
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Changer de thème"
      title="Changer de thème"
      className="w-9 h-9 shrink-0 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center"
    >
      <IconMoon className="w-[18px] h-[18px] dark:hidden" />
      <IconSun className="w-[18px] h-[18px] hidden dark:block" />
    </button>
  );
}
