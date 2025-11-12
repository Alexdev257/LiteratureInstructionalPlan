import { Route as rootRoute } from "../_root";
import { createRoute, Outlet } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/userProfile',
  component: () => <Outlet />,
});