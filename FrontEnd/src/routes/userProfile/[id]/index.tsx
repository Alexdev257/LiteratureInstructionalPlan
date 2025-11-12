
import ProfilePage from "@/components/userprofile/ProfilePage";
import { Route as userProfileLayoutRoute } from "../_layout";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => userProfileLayoutRoute,
  path: '/$id',
  component: ProfilePage,
});