import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../_root";
import { Outlet } from "@tanstack/react-router";


const ExamLayoutComponent = () => {
  return (
   <Outlet />
  );
};

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/exam",
  component: ExamLayoutComponent,
});
