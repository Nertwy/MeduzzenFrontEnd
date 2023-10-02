import axios from "axios";

const axiosInstance = axios.create({
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,application/json,*/*;q=0.8",
  },
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: 5000,
});
// Do an interceptor
export default axiosInstance;
