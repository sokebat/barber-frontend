// src/services/AuthService.js
import { axiosPublic } from "@/axios/axios";
import {
  LoginCredentials,
  RegisterCredentials,
} from "@/types/AuthService.types";

class AuthService {
  async login(credentials: LoginCredentials) {
    try {

      console.log(credentials,"hello wrold ")

      const response = await axiosPublic.post("/auth/login", credentials);
      return {
        success: true,
        data: response.data,
        message: "Login successful",
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response.data.message,
        status: error.response.status,
        error: error.response.data.errors,
      };
    }
  }

  async register(credentials: RegisterCredentials) {
    try {

      const response = await axiosPublic.post("/auth/register", credentials);


      return {
        success: true,
        data: response.data,
        message: "Registration successful",
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response.data.message,
        status: error.response.status,
        error: error.response.data.errors,
      };
    }
  }
}

export default new AuthService();
