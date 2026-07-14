import OverviewPanel from "@/components/admin/panels/OverviewPanel";
import ProjectsPanel from "@/components/admin/panels/ProjectsPanel";
import MessagesPanel from "@/components/admin/panels/MessagesPanel";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; view?: string; id?: string }>;
}) {
  const { tab = "overview", view, id } = await searchParams;

  if (tab === "projects") return <ProjectsPanel view={view} id={id} />;
  if (tab === "messages") return <MessagesPanel />;
  return <OverviewPanel />;
}
