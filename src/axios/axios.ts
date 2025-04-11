import axios from "axios";
import Cookies from "js-cookie";
import { redirectTo } from "@/lib/navigate";

const baseURL = "http://192.168.1.67:7236/api";

const createAxiosInstance = (config = {}) =>
  axios.create({
    baseURL,
    timeout: 15000,
    ...config,
  });

export const axiosPublic = createAxiosInstance();
export const axiosPrivate = createAxiosInstance();



axiosPrivate.interceptors.request.use(
  async config => {
    const apiToken = Cookies.get("auth_token");
    const userRole = Cookies.get("user_role");

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


// 🚨 Intercept responses to handle 401 Unauthorized and 403 Forbidden errors
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Clear cookies
      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("user_role", { path: "/" });
      // Redirect to login page
      redirectTo("/login");
      return Promise.reject(error);
    }

    // Handle 403 Forbidden (user does not have the required role)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Clear cookies (optional, depending on your requirements)
      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("user_role", { path: "/" });
      // Redirect to a page indicating lack of permission
      redirectTo("/");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);