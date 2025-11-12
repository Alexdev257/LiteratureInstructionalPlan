
import { createRoute } from "@tanstack/react-router";
import { Route as teacherLayoutRoute } from "./_layout";
import TeacherOverviewPage from '../../components/teacher/overview/page'
export const Route = createRoute({
    getParentRoute: () => teacherLayoutRoute,
    path: '/',
    component: TeacherOverviewPage,
})