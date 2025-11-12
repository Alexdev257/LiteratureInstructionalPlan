import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
// Sửa đường dẫn import ở dòng này:
import UserManagementPage from "@/components/admin/users/page"; 

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/users",
  component: UserManagementPage, // Tên biến giữ nguyên
});