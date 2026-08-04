import { EYEBROW, PAGE_TITLE, CARD } from "@/components/admin/styles";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
      <div>
        <p className={`${EYEBROW} mb-2.5`}>{eyebrow}</p>
        <h1 className={PAGE_TITLE}>{title}</h1>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-white/45 mt-2 max-w-xl">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={`${CARD} px-6 py-14 text-center`}>
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-400 dark:text-white/35">
        {icon}
      </div>
      <p className="text-sm font-medium text-zinc-700 dark:text-white/80">{title}</p>
      {description && (
        <p className="text-sm text-zinc-500 dark:text-white/45 mt-1.5 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
}) {
  const tones = {
    neutral:
      "border-zinc-200 dark:border-white/15 text-zinc-500 dark:text-white/50",
    accent:
      "border-accent/40 text-accent-strong dark:text-accent bg-accent/5",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
