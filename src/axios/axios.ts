// src/lib/axios.ts
"use client";

import axios from "axios";
import { useCookies } from "react-cookie";

const baseURL = "http://192.168.1.67:7236/api";

const createAxiosInstance = (config = {}) =>
  axios.create({
    baseURL,
    timeout: 15000,
    ...config,
  });

export const axiosPublic = createAxiosInstance();
export const axiosPrivate = createAxiosInstance();

// 🔒 Intercept requests to attach token from cookies
axiosPrivate.interceptors.request.use(
  (config) => {
    const [cookies] = useCookies(["session"]);
    const apiToken = cookies.session?.apiToken;

    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Intercept responses to handle 401 Unauthorized errors
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const [, , removeCookie] = useCookies(["session"]);
      removeCookie("session", { path: "/" });
      // If using Next.js, uncomment and use:
      // const router = useRouter();
      // router.push('/auth/login');
      
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);