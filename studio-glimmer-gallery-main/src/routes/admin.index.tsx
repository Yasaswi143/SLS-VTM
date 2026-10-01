import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardRoute } from "@/components/admin/admin-app";

export const Route = createFileRoute("/admin/")({ component: AdminDashboardRoute });
