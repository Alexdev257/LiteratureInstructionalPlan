
import { createRoute, Outlet } from "@tanstack/react-router";
import { Route as matrixIdRoute } from '../_layout';

export const Route = createRoute({
  getParentRoute: () => matrixIdRoute,
  path: '/edit',
  component: ()=><Outlet />,
})