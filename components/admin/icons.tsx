/**
 * Inline SVG icon set for the admin dashboard.
 * Kept local (rather than pulling in an icon package) so the bundle stays lean
 * and every glyph inherits `currentColor` for free in both light and dark mode.
 */

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function base(className?: string) {
  return className ?? "w-4 h-4";
}

const COMMON = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function IconGauge({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="m13.4 10.6 4.1-4.1" />
      <path d="M3.3 17A9 9 0 1 1 20.7 17" />
    </svg>
  );
}

export function IconLayers({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function IconMail({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconInbox({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
      <path d="M3 12h4l1.5 2.5h7L17 12h4l-2.2-6.4A2 2 0 0 0 16.9 4H7.1a2 2 0 0 0-1.9 1.6L3 12Z" />
    </svg>
  );
}

export function IconPlus({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconPencil({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="m14.5 7.5 2 2" />
    </svg>
  );
}

export function IconTrash({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M4 7h16" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function IconArrowUp({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

export function IconArrowDown({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function IconArrowLeft({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function IconStar({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8L12 4Z" />
    </svg>
  );
}

export function IconCheck({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

export function IconExternal({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M14 4h6v6" />
      <path d="m20 4-9 9" />
      <path d="M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10" />
    </svg>
  );
}

export function IconImage({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" />
    </svg>
  );
}

export function IconInfo({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function IconLogout({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 8 6 12l4 4" />
      <path d="M6 12h9" />
    </svg>
  );
}

export function IconSun({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function IconMoon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...COMMON} strokeWidth={strokeWidth} className={base(className)}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}
