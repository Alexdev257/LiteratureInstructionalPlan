/* eslint-disable react-refresh/only-export-components */
"use client";
import { tokenSession, userSession } from "@/lib/session";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, type ReactNode } from "react";




interface AuthContextType {
    setTokenAndUser: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
    initialToken?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialToken }: AuthProviderProps) => {
    useEffect(() => {
        if (initialToken) {
            setTokenAndUser(initialToken);
        }
    }, [initialToken]);

    const setTokenAndUser = (token: string) => {
        tokenSession.value = token;
        userSession.setFromToken(token);
    }

    const logout = () => {
        tokenSession.clear()
        userSession.clear();
        // delete cookie
        Cookies.remove("accesstoken");
        Cookies.remove("refreshtoken");
    };

    return (
        <AuthContext.Provider value={{ logout, setTokenAndUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};
