import axios from "axios";
import useAuthStore from "../store/auth.store";
import { refreshAccessToken } from "../services/auth.service";


const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Get the latest access token from Zustand
    const accessToken = useAuthStore.getState().accessToken;

    // Attach Authorization header if token exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Continue sending the request
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// Response Inteceptor 
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = refreshAccessToken();

        useAuthStore
          .getState()
          .setAccessToken(response.data.accessToken);

        // Retry the original request
        return api(originalRequest);

      } catch (refreshError) {
        useAuthStore.getState().logout();

        window.location.href = "/auth";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;