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
import { Route as userProfileRoute } from "./auth/userprofile"; // <-- thêm import

const routeTree = rootRoute.addChildren([
    // Routes sử dụng root layout (Header + Footer)
    homeRoute,
    userProfileRoute, // <-- thêm ở đây để /userprofile được đăng ký
    examLayoutRoute.addChildren([
        examIndexRoute,
        examDetailRoute.addChildren([
            takeExamLayoutRoute.addChildren([
                takeExamRoute,
            ]),
        ]),
    ]),

    // Routes có layout riêng (không có Header + Footer của root)
    authLayoutRoute.addChildren([
        loginRoute,
        registerRoute,
        forgotPasswordRoute,
    ]),

    // Thêm các route của dashboard vào layout tương ứng
    dashboardLayoutRoute.addChildren([
        dashboardUsersRoute, // Route hiển thị trang /dashboard/users
        dashboardQuestionsRoute,
    ]),
]);

export const router = createRouter({ routeTree });