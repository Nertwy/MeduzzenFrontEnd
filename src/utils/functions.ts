import { Company, GoogleUser, PageWith, RegisterUser, User } from "../types";
import axiosInstance from "../axios-instance";
import { AxiosRequestConfig } from "axios";

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
    console.log(responce);

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

    console.log(responce.data);
    const { access, refresh, user } = responce.data;
    // localStorage.setItem("accessToken", access);
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
export const getGoogleUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token Provided");
    const result = await getReqAxios<GoogleUser>(
      "api/users/get_google_user_info/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result as Partial<GoogleUser>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const Login = async (email: string, password: string) => {
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
export const deleteUser = async (password: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token where found!");

    const result = await axiosInstance.delete("api/auth/users/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        current_password: password,
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
  axiosReqSettings?: AxiosRequestConfig<any>
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getReqAxios = async <T>(
  url: string,
  config?: AxiosRequestConfig<any>
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token provided");
    const result = await axiosInstance.get<T>(url, config);
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReqAxios = async (
  url: string,
  axiosReqSettings?: axiosProps
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No Token Provided");

    await axiosInstance.post(url, axiosReqSettings?.data, {
      headers: {
        Authorization: `Token ${token}`,
      },
      params: axiosReqSettings?.params,
    });
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const GetAllCompanies = async <T>(page: number = 1): Promise<T> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token");

    const result = await axiosInstance.get<T>("api/companies/", {
      headers: {
        Authorization: `Token ${token}`,
      },
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
export const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    await axiosInstance.post("api/auth/token/logout/", undefined, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    throw error;
  }
};
