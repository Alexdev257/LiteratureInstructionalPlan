import { LoginPage } from "@/components/(auth)/login/page";
import { createRoute } from "@tanstack/react-router";
import { Route as authRoute } from "./_layout";

export const Route = createRoute({
  getParentRoute: () => authRoute,
  path: "/login",
  component: LoginPage,
});