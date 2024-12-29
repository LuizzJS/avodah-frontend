import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
export const API_URL = process.env.API_URI || "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data || null;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed." };
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
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
    return data.success ? { ok: true, user: data.data } : { ok: false };
  } catch (error) {
    console.error("Error checking login status:", error);
    return { ok: false };
  }
};

export const generateVerse = async () => {
  try {
    const response = await axios.get(
      "https://bible-api.com/?random=verse&translation=almeida",
      { withCredentials: true } // Set to true if you need to send cookies
    );
    return response.data; // Return the actual verse data
  } catch (error) {
    console.error("Error generating verse:", error);
    return { success: false, message: "Failed to generate verse." };
  }
};
