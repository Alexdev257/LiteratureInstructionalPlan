import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
import QuestionManagementPage from "@/components/admin/questions/QuestionManagementPage";

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/questions",
  component: QuestionManagementPage,
});