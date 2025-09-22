
import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { Route as testRoute } from "./test";
import { Route as authRoute } from "./auth/_layout";
import { Route as loginRoute } from "./auth/login";
import { Route as registerRoute } from "./auth/register";

// Main router với auth routes có layout riêng
const routeTree = rootRoute.addChildren([
    testRoute,
    authRoute.addChildren([
        loginRoute,
        registerRoute,
    ]),
]);

export const router = createRouter({ routeTree });