import axios from "axios";
import axiosInstance from "../axios-instance";
/**
 * If healthy returns true else false on error logs error
 */
const checkHealth = async () => {
  try {
    const responce = await axiosInstance.get("/");
    if (responce.status === 200) {
      return true;
    } else {
      console.error("Back End is not Healthy status:", responce.status);
      return false;
    }
  } catch (error) {
    console.error("Error at checkHealth, Error:", error);
  }
};
