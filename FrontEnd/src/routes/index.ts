
import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { Route as testRoute } from "./test";

const routeTree = rootRoute.addChildren([
    testRoute,
]);

export const router = createRouter({ routeTree });