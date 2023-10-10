import { PageWith, RegisterUser, User } from "../types";
import axiosInstance from "../axios-instance";
import store from "@/store/store";
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
    if (responce.status === 400)
      throw new Error(`Could not register user: ${responce.data}`);
    else if (responce.status === 201) return responce.data;
  } catch (error) {
    console.error(error);
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
      undefined,
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
      access,
      refresh,
      user,
    };
  } catch (error) {
    console.error(error);
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

    if (result.status === 200) {
      const { auth_token } = result!.data;
      localStorage.setItem("access", auth_token);
      const userInfo = await fetchUserInfo();
      if (!userInfo) throw new Error("No user info was provided!");
      return userInfo;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};
export const RefreshToken = async (refreshToken: string) => {
  try {
    const result = await axiosInstance.post("api/auth/jwt/refresh/", {
      refresh: refreshToken,
    });
    if (result.status === 200) return result.data.access;
    throw new Error(
      `Couldnt refresh token status code: ${result.status}, text: ${result.statusText}`
    );
  } catch (error) {
    console.error(error);
  }
};
export const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem("access");
    if (!token) throw new Error("No token where found!");

    const result = await axiosInstance.get<User>("api/auth/users/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (result.status === 200) return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const GetAllUsers = async (page: number | undefined) => {
  try {
    const result = await axiosInstance.get<PageWith<User>>("api/users/", {
      params: {
        page,
      },
    });
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Cant fetch users!");
    }
  } catch (error) {
    console.error(error);
  }
};
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
