import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { axiosPrivate } from "../axios/axios";
import AuthService from "../services/auth.service";
import { UserResponse } from "../types/AuthService.types";

// Define the shape of the AuthContext
interface AuthContextType {
  user: UserResponse | null;
  token: string | null;
  register: (data: {
    email: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    role: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility to encode/decode user data
const encodeUserData = (user: UserResponse): string => {
  return btoa(JSON.stringify(user)); // Base64 encode the user data
};

const decodeUserData = (encoded: string): UserResponse => {
  return JSON.parse(atob(encoded)); // Decode Base64 and parse JSON
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null); // Token state for reactivity
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
 
  // Check for existing user data and token on app load
  useEffect(() => {
    const encodedUser = localStorage.getItem("user");
    const storedToken = Cookies.get("auth_token");

    if (encodedUser) {
      try {
        const decodedUser = decodeUserData(encodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode user data:", error);
        localStorage.removeItem("user");
      }
    }

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Add a response interceptor to handle 401 errors
  useEffect(() => {
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
          return <Navigate to="/login" />;
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor on unmount
    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []); // Re-run if navigate changes

  const register = async (data: {
    email: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    role: string;
  }) => {
    const response = await AuthService.register(data);
    if (!response.success) {
      throw new Error(response.message);
    }

    const userData = response.data;
    if (!userData) {
      throw new Error("No user data returned from registration");
    }

    // Encode and store user data in localStorage
    localStorage.setItem("user", encodeUserData(userData));
    setUser(userData);
    setIsAuthenticated(false); // User is not authenticated until they log in
  };

  const login = async (data: { email: string; password: string }) => {
    const response = await AuthService.login(data);
    if (!response.success) {
      throw new Error(response.message);
    }

    const userData = response.data;
    if (!userData || !userData.token) {
      throw new Error("No user data or token returned from login");
    }

    // Store the token in a cookie (expires in 1 day)
    Cookies.set("auth_token", userData.token, {
      expires: 1, // 1 day expiration
      secure: true, // Only send over HTTPS (set to false for local development if not using HTTPS)
      sameSite: "Strict", // Prevent CSRF by not sending cookie in cross-site requests
      path: "/",
    });
     
    Cookies.set("user_role", userData.role, {
      expires: 1, // 1 day expiration
      secure: true, // Only send over HTTPS (set to false for local development if not using HTTPS)
      sameSite: "Strict", // Prevent CSRF by not sending cookie in cross-site requests
      path: "/",
    });

    // Update state
    setToken(userData.token);
    // Encode and store user data in localStorage
    localStorage.setItem("user", encodeUserData(userData));
    setUser(userData);
    console.log(userData,"userData");
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("auth_token"); // Remove the token cookie
    Cookies.remove("user_role"); // Remove the role cookie
    localStorage.removeItem("user"); // Clear user data
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    return <Navigate to="/login" />;
  };

  // Handle token expiration (1 day as per your API)
  useEffect(() => {
    const currentToken = Cookies.get("auth_token");
    if (currentToken) {
      try {
        // Decode the token to check expiration
        const decodedToken = JSON.parse(atob(currentToken.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();

        if (currentTime > expirationTime) {
          logout(); // Log out if token is expired
        } else {
          setToken(currentToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout(); // Log out if token is invalid
      }
    }
  }, [ ]); // Run on mount and when navigate changes

  return (
    <AuthContext.Provider
      value={{ user, token, register, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
