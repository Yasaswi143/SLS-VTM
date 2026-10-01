import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-app";

export const Route = createFileRoute("/admin")({ component: AdminLayout });
