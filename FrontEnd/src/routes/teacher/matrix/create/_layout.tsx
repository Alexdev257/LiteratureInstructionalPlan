import { Route as matrixLayoutRoute } from "../_layout";
import { createRoute, Outlet } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => matrixLayoutRoute, 
  path: '/create',
  component: () => <Outlet />,
});