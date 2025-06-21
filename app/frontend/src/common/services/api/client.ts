import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

// axios instance
export const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

console.log("VITE_BACKEND_URL",import.meta.env.VITE_BACKEND_URL);

// Request Interceptor
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);
