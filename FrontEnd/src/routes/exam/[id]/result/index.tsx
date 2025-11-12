import { createRoute } from "@tanstack/react-router";
import { Route as ResultLayoutRoute } from "./_layout";
import ResultPage from "@/components/exam/[id]/[attemptId]/result/page";
export const Route = createRoute({
  getParentRoute: () => ResultLayoutRoute,
  path: "/",
  component: ResultPage,
});