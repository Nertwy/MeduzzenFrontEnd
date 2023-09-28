import axios from "axios";
import process from "process";
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
});
export default axiosInstance;
