// src/contexts/AuthContext.tsx
"use client";

import { useToast } from "@/hooks/use-toast";
import AuthService from "@/services/auth.service";
import { LoginCredentials, RegisterCredentials, User } from "@/types";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
interface AuthContextProps {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });
  const { toast } = useToast();
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const authService = AuthService;

  useEffect(() => {
    const initializeAuth = async () => {
      const session = cookies.session;
      if (session?.apiToken) {
        try {
          const decoded: any = jwtDecode(session.apiToken);
          const user = {
            id: decoded.sub,
            email: decoded.email || "",
            fullName: decoded.fullName || "",
            role: decoded.role || "admin",
            teamId: decoded.teamId || "",
          };

          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            throw new Error("Token expired");
          }

          setAuthState({
            user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          removeCookie("session", { path: "/" });
          setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    initializeAuth();
  }, [cookies, removeCookie]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        const { token } = response.data;
        if (!token) {
          throw new Error("No token received");
        }

        // Set cookie with token
        setCookie(
          "session",
          { apiToken: token },
          {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 24 hours
          }
        );

        const decoded: any = jwtDecode(token);
        const user = {
          id: decoded.sub,
          email: decoded.email,
          fullName: decoded.fullName,
          role: decoded.role,
          teamId: decoded.teamId,
        };

        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });

        toast({
          title: "Success",
          description: "Login successful!",
        });
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      toast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials);
      if (response.success) {
        const { token } = response.data;
        if (!token) {
          throw new Error("No token received");
        }

        setCookie(
          "session",
          { apiToken: token },
          {
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 24 hours
          }
        );

        const decoded: any = jwtDecode(token);
        const user = {
          id: decoded.sub,
          email: decoded.email,
          fullName: credentials.fullName,
          role: decoded.role,
          teamId: decoded.teamId,
        };

        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
        });

        toast({
          title: "Success",
          description: "Registration successful!",
        });
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    removeCookie("session", { path: "/" });
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const value = {
    authState,
    login,
    register,
    logout,
    isLoading: authState.loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
