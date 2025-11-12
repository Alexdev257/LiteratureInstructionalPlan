


import QuestionDetailPage from "@/components/teacher/question/[id]/page";
import { Route as questionLayoutRoute } from "./_layout"; 
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => questionLayoutRoute, 
  path: '/',
  component:  QuestionDetailPage
});