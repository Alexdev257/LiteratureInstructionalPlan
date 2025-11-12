import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
// Import component page MỚI của admin
import AdminMatrixPage from "@/components/admin/matrix/page"; 

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/matrices",
  component: AdminMatrixPage,
});