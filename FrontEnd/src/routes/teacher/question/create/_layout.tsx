import { Route as questionLayoutRoute } from "../_layout";
import { createRoute, Outlet } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => questionLayoutRoute, 
  path: '/create',
  component: () => <Outlet />,
});