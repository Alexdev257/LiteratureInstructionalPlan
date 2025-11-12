



import DetailExamPage from "@/components/teacher/exam/[id]/page";
import { Route as examLayoutRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";


export const Route = createRoute({
  getParentRoute: () => examLayoutRoute,
  path: '/',
  component:DetailExamPage ,
});