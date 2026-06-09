'use client';

import { createContext, useState } from "react";

type AuthContextProps = {
    token: string;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    function login(token: string) {
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
        localStorage.setItem('isAuthenticated', 'true');
    }
    
    function logout() {
        setToken('');
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
    }

    return (
        <AuthContext.Provider value={{token, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}