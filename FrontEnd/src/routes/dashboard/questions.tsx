import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
// Sửa đường dẫn import ở dòng này:
import QuestionManagementPage from "@/components/admin/questions/page"; // Đổi từ QuestionManagementPage thành page

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/questions",
  component: QuestionManagementPage, // Tên biến giữ nguyên
});