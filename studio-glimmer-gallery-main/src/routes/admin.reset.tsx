import { createFileRoute } from "@tanstack/react-router";
import { PasswordResetPage } from "@/components/admin/admin-app";

export const Route = createFileRoute("/admin/reset")({ component: PasswordResetPage });
