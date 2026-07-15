"use client";

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
      className="w-9 h-9 shrink-0 rounded-md border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/25 transition-colors flex items-center justify-center text-base"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
