import TemplatePage from "@/components/template/page";
import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/templates",
    component: TemplatePage
})