"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {  useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes";
import { Toaster } from "sonner";
import Cookies from "js-cookie";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleOAuthProvider } from '@react-oauth/google';
import envconfig from "@/config/envConfig";

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
  return (
    <GoogleOAuthProvider clientId={envconfig.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider initialToken={tokenCookie || null} initialRefreshToken={refreshCookie || null}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router}  />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors duration={2000} />
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
