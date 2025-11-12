import { Route as matrixLayoutRoute } from "../_layout"; // Sửa import
import { createRoute, Outlet } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => matrixLayoutRoute, // Sửa parent
  path: '/create',
  component: () => <Outlet />,
});