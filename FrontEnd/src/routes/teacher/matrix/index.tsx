import MatrixPage from "@/components/teacher/matrix/page";
import { Route as matrixLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => matrixLayoutRoute,
  path: '/',
  component: MatrixPage,
});