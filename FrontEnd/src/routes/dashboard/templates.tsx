import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
// Import component page MỚI của admin
import AdminTemplatePage from "@/components/admin/template/page"; 

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/templates",
  component: AdminTemplatePage,
});