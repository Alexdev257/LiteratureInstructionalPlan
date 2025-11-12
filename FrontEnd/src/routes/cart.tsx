import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root";
import CartPage from "@/components/cart/page"; // Import component vừa tạo

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/cart",
    component: CartPage,
});