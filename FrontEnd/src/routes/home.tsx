import HomePage from "@/components/home/page";
import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <HomePage />,
});
