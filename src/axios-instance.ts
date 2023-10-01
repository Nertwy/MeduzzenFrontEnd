import axios from "axios";
import process from "process";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 5000,
});

export default axiosInstance;
