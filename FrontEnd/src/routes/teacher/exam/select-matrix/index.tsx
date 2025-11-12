

import SelectMatrixPage from "@/components/teacher/exam/select-matrix/page";
import { Route as examSelectMatrixLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => examSelectMatrixLayoutRoute,
  path: '/',
  component: SelectMatrixPage ,
});