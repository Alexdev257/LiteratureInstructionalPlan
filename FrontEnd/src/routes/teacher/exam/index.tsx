
import ExamPage from "@/components/teacher/exam/page";
import { Route as examLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => examLayoutRoute,
  path: '/',
  component:ExamPage ,
});