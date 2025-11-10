import { createRoute } from "@tanstack/react-router";
import { Route as matrixIdRoute } from './_layout';
import UpdateMatrixPage from '@/components/teacher/matrix/[id]/update/page';

export const Route = createRoute({
  getParentRoute: () => matrixIdRoute,
  path: '/',
  component: UpdateMatrixPage,
})