import { createRoute, Outlet } from "@tanstack/react-router";
import { Route as rootRoute } from "../_root";





export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam",
  component: ()=> <Outlet/>,
});
