"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes";
import { Toaster } from "sonner";
import Cookies from "js-cookie";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleOAuthProvider } from '@react-oauth/google';
import envconfig from "@/lib/config";
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
  const cookie = Cookies.get("token");
  return (
    <GoogleOAuthProvider clientId={envconfig.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider initialToken={cookie || null}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors duration={2000} />
        </QueryClientProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
