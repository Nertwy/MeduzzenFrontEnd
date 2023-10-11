import { PageWith, RegisterUser, User } from "../types";
import axiosInstance from "../axios-instance";
import store from "@/store/store";
import { AxiosError } from "axios";
/**
 * If healthy returns true else false on error logs error
 */
const checkHealth = async () => {
  try {
    const responce = await axiosInstance.get("/");
    return true;
  } catch (error) {
    console.error("Error at checkHealth, Error:", error);
    throw error;
  }
};

export const register = async (userData: RegisterUser) => {
  try {
    const responce = await axiosInstance.post("/api/auth/users/", userData);
    return responce.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googlePress = async () => {
  try {
    const responce = await axiosInstance.get(
      "api/auth/social/o/google-oauth2/",
      {
        xsrfCookieName: "csrftoken",
        params: {
          redirect_uri: "http://localhost:3000/callback/",
        },
      }
    );
    return responce.data.authorization_url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const googleGetToken = async (url: URL) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const scope = url.searchParams.get("scope");
  const authuser = url.searchParams.get("authuser");
  const prompt = url.searchParams.get("prompt");
  try {
    const responce = await axiosInstance.post(
      "api/auth/social/o/google-oauth2/",
      null,
      {
        params: {
          state,
          code,
          scope,
          authuser,
          prompt,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access, refresh, user } = responce.data;
    return {
      accessToken: access,
      refreshToken: refresh,
      user,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const Login = async (
  email: string,
  password: string
): Promise<User | Error> => {
  try {
    const result = await axiosInstance.post(
      "api/auth/token/login/",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { auth_token } = result!.data;
    localStorage.setItem("accessToken", auth_token);
    const userInfo = await fetchUserInfo();
    return userInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const RefreshToken = async (refreshToken: string) => {
  try {
    const result = await axiosInstance.post("api/auth/jwt/refresh/", {
      refresh: refreshToken,
    });
    return result.data.access;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token where found!");

    const result = await axiosInstance.get<User>("api/auth/users/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetAllUsers = async (page: number = 1) => {
  try {
    const result = await axiosInstance.get<PageWith<User>>("api/users/", {
      params: {
        page,
      },
    });

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const axiosRequest = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
type axiosProps = {
  params?: any;
  data?: any;
};
export const deleteReqAxios = async (
  url: string,
  axiosReqSettings: axiosProps
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No accessToken where Found!");
    await axiosInstance.delete(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
      ...axiosReqSettings,
    });

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateReqAxios = async (url: string, id: number, data: any) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No accessToken Provided");

    await axiosInstance.put(url + id + "/", data, {});

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
