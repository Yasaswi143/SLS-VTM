import { createFileRoute } from "@tanstack/react-router";
import { AdminLoginPage } from "@/components/admin/admin-app";

export const Route = createFileRoute("/admin/login")({ component: AdminLoginPage });
