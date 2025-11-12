


import SelectQuestionPage from "@/components/teacher/exam/select-question/page";
import { Route as examSelectQuestionLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => examSelectQuestionLayoutRoute,
  path: '/',
  component: SelectQuestionPage
   ,
});