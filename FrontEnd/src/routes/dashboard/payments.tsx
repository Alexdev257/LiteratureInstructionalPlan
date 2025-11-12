import { createRoute } from "@tanstack/react-router";
import { Route as dashboardLayoutRoute } from "./_layout";
// Import component page MỚI của admin
import AdminPaymentPage from "@/components/admin/payment/page"; 

export const Route = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/payments",
  component: AdminPaymentPage,
});