
import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { Route as homeRoute } from "./home";
import { Route as practiceRoute } from "./practice";
import { Route as authRoute } from "./auth/_layout";
import { Route as loginRoute } from "./auth/login";
import { Route as registerRoute } from "./auth/register";
import { Route as forgotPasswordRoute } from "./auth/forgotpassword";
import { Route as examRoute } from "./exam";
const routeTree = rootRoute.addChildren([
    homeRoute,
    practiceRoute,
    examRoute,
    authRoute.addChildren([
        loginRoute,
        registerRoute,
        forgotPasswordRoute,
    ]),
]);

export const router = createRouter({ routeTree });