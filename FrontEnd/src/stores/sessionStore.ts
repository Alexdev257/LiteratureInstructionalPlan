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

  // token
  setToken: (token: Token) => void;
  clearToken: () => void;

  // user
  setUserFromToken: (accessToken: string) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;

  // logout
  logout: () => void;
}

/**
 * ✅ Zustand store quản lý session (token + user)
 * - Hỗ trợ updateUser({ userName, fullName }) cho trang Profile
 * - Tự hydrate từ cookie nếu có sẵn accesstoken
 */
export const useSessionStore = create<SessionState>((set) => {
  // Hydrate ban đầu từ cookie (nếu có)
  const accessFromCookie = Cookies.get("accesstoken") ?? null;
  const refreshFromCookie = Cookies.get("refreshtoken") ?? null;

  let initialToken: Token | null = null;
  let initialUser: User | null = null;

  if (accessFromCookie && refreshFromCookie) {
    try {
      initialUser = decodeJWT<User>(accessFromCookie);
      initialToken = { accessToken: accessFromCookie, refreshToken: refreshFromCookie };
    } catch (e) {
      // token cũ hỏng thì xóa
      Cookies.remove("accesstoken");
      Cookies.remove("refreshtoken");
      initialToken = null;
      initialUser = null;
    }
  }

  return {
    token: initialToken,
    user: initialUser,

    setToken: (token) => {
      try {
        // Decode để lấy user
        const decoded = decodeJWT<User>(token.accessToken);

        // Lưu cookie (hết hạn sau 1 giờ)
        const oneHourLater = new Date(Date.now() + 60 * 60 * 1000);
        Cookies.set("accesstoken", token.accessToken, { expires: oneHourLater });
        Cookies.set("refreshtoken", token.refreshToken, { expires: oneHourLater });

        // Cập nhật state
        set({ token, user: decoded });
      } catch (error) {
        console.error("Invalid access token", error);
        Cookies.remove("accesstoken");
        Cookies.remove("refreshtoken");
        set({ token: null, user: null });
      }
    },

    clearToken: () => {
      Cookies.remove("accesstoken");
      Cookies.remove("refreshtoken");
      set({ token: null });
    },

    setUserFromToken: (accessToken) => {
      try {
        const decoded = decodeJWT<User>(accessToken);
        set({ user: decoded });
      } catch (error) {
        console.error("Invalid token when decoding user", error);
        set({ user: null });
      }
    },

    /**
     * 🔧 Cập nhật một phần user (ví dụ từ trang Profile)
     * Ví dụ: updateUser({ userName, fullName })
     */
    updateUser: (partial) => {
      set((state) => {
        if (!state.user) return state; // chưa đăng nhập thì bỏ qua
        // Gộp vào user hiện tại
        const merged = { ...state.user, ...partial } as User;
        return { ...state, user: merged };
      });
    },

    clearUser: () => set({ user: null }),

    logout: () => {
      Cookies.remove("accesstoken");
      Cookies.remove("refreshtoken");
      set({ token: null, user: null });
    },
  };
});
