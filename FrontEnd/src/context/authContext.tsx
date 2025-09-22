/* eslint-disable react-refresh/only-export-components */
"use client";
import { tokenSession, userSession } from "@/lib/session";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";




interface AuthContextType {
    setTokenAndUser: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
    initialToken?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialToken }: AuthProviderProps) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        if (initialToken) {
            setTokenAndUser(initialToken);
        }
        setLoading(false);
    }, [initialToken])

    const setTokenAndUser = (token: string) => {
        tokenSession.value = token;
        userSession.setFromToken(token);
    }

    const logout = () => {
        tokenSession.clear()
        userSession.clear();
        // delete cookie
        Cookies.remove("token");
        Cookies.remove("refreshToken");
    };

    return (
        <AuthContext.Provider value={{ logout, setTokenAndUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};
