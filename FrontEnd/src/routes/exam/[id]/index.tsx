import { createRoute } from "@tanstack/react-router";
import { Route as examLayoutRoute } from "./_layout";
import DetailExamPage from "@/components/exam/[id]/page";


export const Route = createRoute({
  getParentRoute: () => examLayoutRoute,
  path: "/",
  component: DetailExamPage
});