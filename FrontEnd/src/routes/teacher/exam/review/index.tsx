

import { Route as examReviewLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";
import ReviewExamPage from "@/components/teacher/exam/review/page";

export const Route = createRoute({
  getParentRoute: () => examReviewLayoutRoute,
  path: '/',
  component: ReviewExamPage ,
});