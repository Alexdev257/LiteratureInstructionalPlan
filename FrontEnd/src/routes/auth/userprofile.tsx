import { createRoute } from "@tanstack/react-router";
import ProfilePage from "@/components/userprofile/ProfilePage";
import { Route as AuthLayoutRoute } from "./_layout";

export const Route = createRoute({
  getParentRoute: () => AuthLayoutRoute,
  path: "/userprofile",
  component: ProfilePage,
});

export default ProfilePage;