import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout"; 
import UserManagementPage from "@/components/admin/users/UserManagementPage";

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/users",
  component: UserManagementPage,
});
