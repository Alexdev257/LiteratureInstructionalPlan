import { create } from "zustand";
import Cookies from "js-cookie";
import { decodeJWT } from "@/lib/utils";
import type { User } from "@/utils/type";

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface SessionState {
  token: Token | null;
  user: User | null;

  setToken: (token: Token) => void;
  clearToken: () => void;

  setUserFromToken: (token: string) => void;
  clearUser: () => void;

  logout: () => void;
}

/**
 * ✅ Zustand store để quản lý session (token + user)
 */
export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  user: null,

  setToken: (token) => {
    try {
      // Lưu cookie
     const decoded = decodeJWT<User>(token.accessToken);

      // Cập nhật cookie
      const oneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
      Cookies.set("accesstoken", token.accessToken, { expires: oneHour });
      Cookies.set("refreshtoken", token.refreshToken, { expires: oneHour });

      // Cập nhật Zustand state
      set({ token, user: decoded });
    } catch (error) {
      console.error("Invalid access token", error);
      set({ token: null, user: null });
    }
  },

  clearToken: () => {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshtoken");
    set({ token: null });
  },

  setUserFromToken: (token) => {
    try {
      const decoded = decodeJWT<User>(token);
      set({ user: decoded });
    } catch (error) {
      console.error("Invalid token when decoding user", error);
      set({ user: null });
    }
  },

  clearUser: () => set({ user: null }),

  logout: () => {
    Cookies.remove("accesstoken");
    Cookies.remove("refreshtoken");
    set({ token: null, user: null });
  },
}));