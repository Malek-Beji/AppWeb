/** Shared class strings for admin UI, so every panel stays visually consistent. */

export const CHIP_BUTTON =
  "inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-white/60 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors disabled:opacity-25 disabled:pointer-events-none";

export const CHIP_BUTTON_DANGER =
  "inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-white/10 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-white/60 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors";

export const CHIP_BUTTON_ACCENT =
  "inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-ink font-semibold hover:bg-transparent hover:text-accent-strong dark:hover:text-accent transition-colors";

/** Square 34px icon-only button, used for the reorder arrows. */
export const ICON_BUTTON =
  "w-[34px] h-[34px] rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/25 hover:bg-zinc-50 dark:hover:bg-white/5 disabled:opacity-25 disabled:pointer-events-none transition-colors flex items-center justify-center";

/** Panel/card surface: white on light, translucent on dark. */
export const CARD =
  "rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none";

/** Small uppercase mono eyebrow above a page title. */
export const EYEBROW =
  "font-mono text-[10px] uppercase tracking-[0.25em] text-accent-strong dark:text-accent";

export const PAGE_TITLE = "font-serif text-3xl text-zinc-900 dark:text-white";

export const MUTED = "text-zinc-500 dark:text-white/45";

export const MUTED_MONO =
  "font-mono text-[11px] text-zinc-400 dark:text-white/35";
