import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import PracticePage from "@/components/practice/page";

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/practice",
    component: () => <PracticePage />,
});
