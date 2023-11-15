import axios from "axios";
import { logout } from "./utils/functions";

const axiosInstance = axios.create({
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,text/csv,image/avif,image/webp,application/json,*/*;q=0.8",
  },
  withCredentials: true,
  baseURL:import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(
  (responce) => {
    return responce;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.responce) {
      if (error.responce.status === 401 && !originalConfig._retry) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const responce = await axiosInstance.post(
              "/api/auth/token/refresh/",
              {
                refresh: refreshToken,
              }
            );
            const newAccessToken = responce.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            return axiosInstance(error.config);
          } catch (error) {
            logout();
          }
        } else {
          logout();
        }
      }
      return Promise.reject(error);
    }
  }
);
// Do an interceptor
export default axiosInstance;
