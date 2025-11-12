import { createRoute } from "@tanstack/react-router";
import { Route as takeExamLayoutRoute } from "./_layout";
import { TakeExamPage } from "@/components/exam/[id]/[attemptId]/page";


export const Route = createRoute({
  getParentRoute: () => takeExamLayoutRoute,
  path: "/",
  component: TakeExamPage
});