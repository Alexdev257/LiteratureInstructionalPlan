import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import ExamPage from "@/components/exam/page";

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/exam",
    component: () => <ExamPage />,
});