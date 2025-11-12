
import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
import ExamManagementPage from "@/components/admin/exam/page"; // Trỏ đến file page.tsx

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/exams",
  component: ExamManagementPage,
});