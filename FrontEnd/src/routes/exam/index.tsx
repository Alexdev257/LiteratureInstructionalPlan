import { createRoute } from "@tanstack/react-router";
import { Route as examLayoutRoute } from "./_layout";
import ExamPage from "@/components/exam/page";

export const Route = createRoute({
  getParentRoute: () => examLayoutRoute,
  path: "/",
  component: () => <ExamPage />,
});