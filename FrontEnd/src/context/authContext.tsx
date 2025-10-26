/* eslint-disable react-refresh/only-export-components */
"use client";

import { useSessionStore } from "@/stores/sessionStore";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect,  type ReactNode } from "react";

interface AuthContextType {
  setTokenAndUser: (accessToken: string, refreshToken?: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
  initialToken?: string | null;
  initialRefreshToken?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialToken,
  initialRefreshToken,
}: AuthProviderProps) => {
  const { setToken} = useSessionStore();

  const setTokenAndUser = (accessToken: string, refreshToken?: string) => {
    setToken({
      accessToken,
      refreshToken: refreshToken || Cookies.get("refreshtoken") || "",
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = Cookies.get("accesstoken");
        const refreshToken = Cookies.get("refreshtoken");

        if (accessToken) {
          // Ưu tiên token trong cookie (vì người dùng có thể đã đăng nhập)
          setTokenAndUser(accessToken, refreshToken);
        } else if (initialToken) {
          // Nếu không có cookie nhưng có token khởi tạo
          setTokenAndUser(initialToken, initialRefreshToken || "");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } 
    };

    checkAuth();
  }, [initialToken, initialRefreshToken]);

  return (
    <AuthContext.Provider value={{  setTokenAndUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
