import TemplateManagementPage from "@/components/teacher/template/page";
import { createRoute } from "@tanstack/react-router";
import { Route as teacherLayoutRoute } from "./_layout";
export const Route = createRoute({
    getParentRoute: () => teacherLayoutRoute,
    path: '/templates',
    component: TemplateManagementPage,
})