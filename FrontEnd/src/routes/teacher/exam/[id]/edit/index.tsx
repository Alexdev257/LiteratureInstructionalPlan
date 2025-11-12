





import UpdateExamPage from "@/components/teacher/exam/[id]/update/page";
import { Route as examLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";


export const Route = createRoute({
  getParentRoute: () => examLayoutRoute,
  path: '/',
  component: UpdateExamPage ,
});