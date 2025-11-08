import { Route as teacherLayoutRoute } from "../_layout";
import { createRoute, Outlet } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => teacherLayoutRoute,
  path: '/matrices',
  component: () => <Outlet />,
});