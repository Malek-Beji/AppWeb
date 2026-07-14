import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink text-white font-sans">
      <Suspense fallback={<div className="h-16 border-b border-white/10" />}>
        <AdminHeader email={admin.email} />
      </Suspense>
      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12">
        {children}
      </main>
    </div>
  );
}
