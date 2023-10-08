import { Company, PageWith, RegisterUser, User } from "../types";
import axiosInstance from "../axios-instance";
import { access } from "fs";
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
    else if (responce.status === 201) return responce.data;
  } catch (error) {
    console.error(error);
  } finally {
    return false;
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

    if (result.status === 200) return result.data;
    else throw new Error("Login failed");
  } catch (error) {
    console.error(error);
    return null;
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
export const deleteUser = async (password: string) => {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token where found!");

  const result = await axiosInstance.delete("api/auth/users/me/", {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      current_password: password,
    },
  });
  if (result.status === 204) return true;
  return result.data;
};
export const GetAllUsers = async (page: number = 1) => {
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
async function axiosRequest<T>(
  url: string,
  params?: Record<string, any>
): Promise<T> {
  try {
    const response = await axiosInstance.get<T>(url, { params });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Request failed with status code " + response.status);
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling at a higher level, if needed
  }
}
type axiosProps = {
  params?: any;
  data?: any;
};
export const deleteReqAxios = async (
  url: string,
  axiosReqSettings: axiosProps
) => {
  const token = localStorage.getItem("access");
  if (!token) return false;
  const responce = await axiosInstance.delete(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
    ...axiosReqSettings,
  });
  if (responce.status === 204) {
    return true;
  } else {
    return false;
  }
};
export const postReqAxios = async (
  url: string,
  axiosReqSettings: axiosProps
) => {
  const token = localStorage.getItem("access");
  if (!token) return false;
  const result = await axiosInstance.post(url, axiosReqSettings.data,{
    headers: {
      Authorization: `Token ${token}`,
    },
    params:axiosReqSettings.params
  });
  if (result.status >= 200 && result.status < 300) return true;
  return false;
};
export const updateReqAxios = async (url: string, id: number, data: any) => {
  const token = localStorage.getItem("access");
  if (!token) return false;
  const responce = await axiosInstance.put(url + id + "/", data, {});
  if (responce.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const GetAllCompanies = async (page: number = 1) => {
  try {
    const result = await axiosInstance.get<PageWith<Company>>(
      "api/companies/",
      {
        params: {
          page,
        },
      }
    );
    if (result.status === 200) {
      return result.data;
    } else {
      throw new Error("Cant fetch companies!");
    }
  } catch (error) {
    console.error(error);
  }
};
export const logout = async () => {
  const token = localStorage.getItem("access");
  if (!token) return;
  await axiosInstance.post("api/auth/token/logout/", undefined, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  localStorage.removeItem("access");
  localStorage.removeItem("refreshToken");
};
