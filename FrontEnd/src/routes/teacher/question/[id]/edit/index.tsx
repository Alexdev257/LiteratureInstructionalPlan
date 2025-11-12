import { createRoute } from "@tanstack/react-router";
import { Route as questionLayoutRoute } from './_layout';
import UpdateQuestionPage from "@/components/teacher/question/[id]/update/page";


export const Route = createRoute({
  getParentRoute: () => questionLayoutRoute,
  path: '/',
  component: UpdateQuestionPage,
})