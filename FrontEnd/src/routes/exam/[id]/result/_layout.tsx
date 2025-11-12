import { createRoute, Outlet } from "@tanstack/react-router";
import { Route as TakeExamLayoutRoute } from "../[attemptId]/_layout";


export const Route = createRoute({
    getParentRoute: () => TakeExamLayoutRoute,
    path: "/result",
    component: () => <Outlet />,
});
