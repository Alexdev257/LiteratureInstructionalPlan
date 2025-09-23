

import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import { HomePage } from "@/components/home/home";

export const Route = createRoute({
  getParentRoute: () => rootRoute, 
  path: "/",
  component: () => <HomePage user={{ name: "Guest", role: "visitor" }} />,
});
