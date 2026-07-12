"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login as apiLogin, refreshAccessToken, getMe, User } from "./auth";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  refreshAccessToken()
    .then(async (result) => {
      setAccessToken(result.accessToken);
      const currentUser = await getMe(result.accessToken);
      setUser(currentUser);
    })
    .catch(() => {
      setAccessToken(null);
      setUser(null);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, []);

  const login = async (email: string, password: string) => {
    const result = await apiLogin(email, password);
    setAccessToken(result.accessToken);
    setUser(result.user);
  };

  const logout = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    // ignore network errors on logout — clear local state regardless
  }
  setAccessToken(null);
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}