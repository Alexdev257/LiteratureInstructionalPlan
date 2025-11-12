import { RegisterPage } from "@/components/(auth)/register/page";
import { createRoute } from "@tanstack/react-router";
import { Route as authRoute } from "./_layout";


export const Route = createRoute({
  getParentRoute: () => authRoute,
  path: "/register",
  component: RegisterPage,
});