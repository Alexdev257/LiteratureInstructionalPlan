import ForgotPasswordPage from "@/components/(auth)/fotgotpassword/page";
import { Route as authRoute } from "./_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
    getParentRoute: () => authRoute,
    path: "/forgot-password",
    component: ForgotPasswordPage,
});