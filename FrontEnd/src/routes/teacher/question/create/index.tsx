
import CreateQuestionPage from "@/components/teacher/question/create/page";
import { Route as createLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => createLayoutRoute,
  path: '/',
  component: CreateQuestionPage,
});