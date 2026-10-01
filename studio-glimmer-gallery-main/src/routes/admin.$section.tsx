import { createFileRoute } from "@tanstack/react-router";
import { AdminSectionRoute } from "@/components/admin/admin-app";

export const Route = createFileRoute("/admin/$section")({
  component: SectionPage,
  validateSearch: (search: Record<string, unknown>) => search,
});

function SectionPage() {
  const { section } = Route.useParams();
  return <AdminSectionRoute section={section} />;
}
