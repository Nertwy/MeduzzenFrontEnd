import axios from "axios";
import process from "process";
const axiosInstance = axios.create({
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,application/json,*/*;q=0.8",
  },
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 5000,
});

export default axiosInstance;
