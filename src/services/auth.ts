import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://taxiapp.easybooks.me:8288";

const getClientCookie = (name) => {
  if (typeof window !== "undefined") {
    return Cookies.get(name);
  }
  return null;
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/User/SignIn`,
      {
        userName: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data?.token) {
      Cookies.set("auth_token", response.data.token, {
        expires: 7,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      Cookies.set("user_name", response.data.userName, {
        expires: 7,
        path: "/",
      });
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/User/SignUp`,
      {
        userName: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const logout = () => {
  Cookies.remove("auth_token", { path: "/" });
  Cookies.remove("user_name", { path: "/" });
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

export const getAuthToken = () => getClientCookie("auth_token");

export const isAuthenticated = () => !!getAuthToken();
