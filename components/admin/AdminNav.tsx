"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble", meta: "Pilotage" },
  { href: "/admin/projects", label: "Projets", meta: "Portfolio" },
  { href: "/admin/messages", label: "Messages", meta: "Demandes" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center justify-between rounded-md border px-4 py-3 text-sm transition-colors ${
              active
                ? "border-[#c8a96e]/45 bg-[#c8a96e]/10 text-[#f5f3ef]"
                : "border-transparent text-white/60 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <span className="font-medium">{item.label}</span>
            <span
              className={`text-[10px] uppercase tracking-[0.22em] ${
                active ? "text-[#c8a96e]" : "text-white/25 group-hover:text-white/40"
              }`}
            >
              {item.meta}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
