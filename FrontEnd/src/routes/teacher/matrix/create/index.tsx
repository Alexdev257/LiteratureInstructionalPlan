import CreateMatrixPage from "@/components/teacher/matrix/create/page";
import { Route as createLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => createLayoutRoute,
  path: '/',
  component: CreateMatrixPage,
});