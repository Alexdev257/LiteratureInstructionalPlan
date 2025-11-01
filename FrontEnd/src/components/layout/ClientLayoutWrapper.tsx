"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes";
import { Toaster } from "sonner";
import Cookies from "js-cookie";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import envconfig from "@/config/envConfig";

/**
 * Client layout wrapper: providers for auth, react-query, theme and router.
 * - Bảo vệ khi `router` chưa được export/khởi tạo: hiển thị fallback thay vì crash.
 */
export default function ClientLayoutWrapper() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const tokenCookie = Cookies.get("accesstoken");
  const refreshCookie = Cookies.get("refreshtoken");

  // Nếu router chưa có (không khởi tạo đúng), hiển thị fallback giúp debug
  const hasRouter = Boolean(router);

  return (
    <GoogleOAuthProvider clientId={envconfig.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider initialToken={tokenCookie || null} initialRefreshToken={refreshCookie || null}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {hasRouter ? (
              // RouterProvider sẽ render route tree (App routes)
              <RouterProvider router={router} />
            ) : (
              // Fallback nhẹ (hiển thị thông báo trong dev)
              <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-lg text-center">
                  <h2 className="text-lg font-semibold mb-2">Router chưa sẵn sàng</h2>
                  <p className="text-sm text-muted-foreground">
                    Vui lòng kiểm tra file src/routes và export router ở src/routes/index (hoặc
                    khởi tạo createFileRouter trong main). Mở console để xem chi tiết.
                  </p>
                </div>
              </div>
            )}
          </ThemeProvider>

          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors duration={2000} />
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}