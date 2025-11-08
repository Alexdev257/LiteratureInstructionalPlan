// --- File: src/routes/index.tsx ---

import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { Route as homeRoute } from "./home";
import { Route as loginRoute } from "./auth/login";
import { Route as registerRoute } from "./auth/register";
import { Route as forgotPasswordRoute } from "./auth/forgotpassword";
import { Route as examLayoutRoute } from "./exam/_layout";
import { Route as examIndexRoute } from "./exam/index";
import { Route as examDetailRoute } from "./exam/[id]/index";
import { Route as takeExamLayoutRoute } from "./exam/[id]/[attemptId]/_layout";
import { Route as takeExamRoute } from "./exam/[id]/[attemptId]/index";
import { Route as authLayoutRoute } from "./auth/_layout";
import { Route as dashboardLayoutRoute } from "./dashboard/_layout";
import { Route as dashboardUsersRoute } from "./dashboard/users";
import { Route as dashboardQuestionsRoute } from "./dashboard/questions";
import { Route as userProfileRoute } from "./auth/userprofile"; 
import { Route as teacherLayoutRoute } from "./teacher/_layout";
import { Route as templateRouteByTeacher } from "./teacher/template";
import { Route as matrixLayoutRoute } from "./teacher/matrix/_layout";
import { Route as matrixIndexRoute } from "./teacher/matrix/index";
import { Route as matrixCreateLayoutRoute } from "./teacher/matrix/create/_layout";
import { Route as matrixCreateIndexRoute } from "./teacher/matrix/create/index";

const routeTree = rootRoute.addChildren([

    homeRoute,
    userProfileRoute, 
    examLayoutRoute.addChildren([
        examIndexRoute,
        examDetailRoute.addChildren([
            takeExamLayoutRoute.addChildren([
                takeExamRoute,
            ]),
        ]),
    ]),
     
 
    authLayoutRoute.addChildren([
        loginRoute,
        registerRoute,
        forgotPasswordRoute,
    ]),

    teacherLayoutRoute.addChildren([
        templateRouteByTeacher,
        matrixLayoutRoute.addChildren([
            matrixIndexRoute,
            matrixCreateLayoutRoute.addChildren([
                matrixCreateIndexRoute,
            ]),
        ]),
    ]),

    dashboardLayoutRoute.addChildren([
        dashboardUsersRoute, 
        dashboardQuestionsRoute,
    ]),
]);

export const router = createRouter({ routeTree });