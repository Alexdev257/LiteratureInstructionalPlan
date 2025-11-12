import { createRoute, Outlet } from "@tanstack/react-router";
import { Route as ExamRoute } from "../_layout";


export const Route = createRoute({
    getParentRoute: () => ExamRoute,
    path: "/$examId",
    component: () => <Outlet />,
});
