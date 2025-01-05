import axios from "axios";

export const API_URL = "https://backend-pjg0.onrender.com/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: ["Authorization"],
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    console.log(response);
    if (response.data.success) {
      return response.data;
    }

    return { success: false, message: "Login failed." };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed." };
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    console.log(response);
    return response.status === 200 ? { success: true } : { success: false };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false };
  }
};

export const register = async (username, email, password) => {
  try {
    if (!username || !email || !password) {
      return { success: false, message: "Preencha todos os campos." };
    }
    const response = await api.post("/register", { username, email, password });
    console.log(response);
    return response.status === 201
      ? response.data
      : {
          success: false,
          message: response.data.message || "Registration failed.",
        };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Registration failed." };
  }
};

export const checkIfLoggedIn = async () => {
  try {
    const { data } = await api.get("/isLogged");
    console.log(data);
    return data.success ? { ok: true, user: data.data } : { ok: false };
  } catch (error) {
    console.error("Error checking login status:", error);
    return { ok: false };
  }
};

export const generateVerse = async () => {
  try {
    const response = await api.get("/generateVerse");
    console.log(response);
    return response ? response.data.data : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
