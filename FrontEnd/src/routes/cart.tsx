import CartPage from "@/cart/page"; // Import component giỏ hàng của bạn
import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./_root"; // Import route gốc

// Tạo route mới
export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/cart", // Đây là đường dẫn bạn cần
    component: CartPage // Gán component CartPage cho đường dẫn này
});