import { axiosPublic } from "@/axios/axios";
import {
  LoginCredentials,
  RegisterCredentials,
  UserResponse,
} from "@/types/AuthService.types";

class AuthService {
  async login(credentials: LoginCredentials): Promise<{
    success: boolean;
    data: UserResponse | null;
    message: string;
    status: number;
    error?: string;
  }> {
    try {
      const response = await axiosPublic.post<UserResponse>("/auth/login", credentials);
      return {
        success: true,
        data: response.data,
        message: "Login successful",
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.error || "Login failed",
        status: error.response?.status || 500,
        error: error.response?.data?.error || "Unknown error",
      };
    }
  }

  async register(credentials: RegisterCredentials): Promise<{
    success: boolean;
    data: UserResponse | null;
    message: string;
    status: number;
    error?: string;
  }> {
    try {
      const response = await axiosPublic.post<UserResponse>("/auth/register", credentials);
      return {
        success: true,
        data: response.data,
        message: "Registration successful",
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.error || "Registration failed",
        status: error.response?.status || 500,
        error: error.response?.data?.error || "Unknown error",
      };
    }
  }
}

export default new AuthService();