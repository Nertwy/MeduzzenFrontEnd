import { RegisterUser } from "../types";
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

export const register = async (userData: RegisterUser) => {
  try {
    const responce = await axiosInstance.post("/api/auth/users/", userData);
    if (responce.status === 400) throw new Error("Could not register user");
    else if (responce.status === 201) return true;
  } catch (error) {
    console.error(error);
  } finally {
    return false;
  }
};
