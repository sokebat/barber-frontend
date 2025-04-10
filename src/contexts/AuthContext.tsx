
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '@/types';
import { authAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setAuthState({
            user: userData,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          localStorage.removeItem('token');
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

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { token, user } = await authAPI.login(credentials);
      localStorage.setItem('token', token);
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
      });
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.fullName}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const { token, user } = await authAPI.register(credentials);
      localStorage.setItem('token', token);
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false,
      });
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.fullName}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Could not create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
