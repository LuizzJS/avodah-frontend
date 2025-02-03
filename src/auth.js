import axios from "axios";

export const API_URL = "https://backend-pjg0.onrender.com/api/auth";
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: ["Authorization"],
});

const handleError = (error, defaultMessage) => {
  console.error(error);
  return { success: false, message: error.message || defaultMessage };
};

export const login = async (username, password) => {
  try {
    const { data } = await api.post("/login", { username, password });
    return data.success
      ? { success: true, data }
      : { success: false, message: "Login failed." };
  } catch (error) {
    return handleError(error, "Login failed.");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.status === 200
      ? { success: true }
      : { success: false, message: "Logout failed." };
  } catch (error) {
    return handleError(error, "Logout failed.");
  }
};

export const register = async (username, email, password) => {
  try {
    if (!username || !email || !password)
      return { success: false, message: "Preencha todos os campos." };
    const { data, status } = await api.post("/register", {
      username,
      email,
      password,
    });
    return status === 201
      ? { success: true, data }
      : { success: false, message: data.message || "Registration failed." };
  } catch (error) {
    return handleError(error, "Registration failed.");
  }
};

export const checkIfLoggedIn = async () => {
  try {
    const { data } = await api.get("/isLogged");
    return data.success
      ? { success: true, user: data.data }
      : { success: false, user: null };
  } catch (error) {
    return handleError(error, "Error checking login status.");
  }
};

export const generateVerse = async () => {
  try {
    const booksResponse = await fetch("https://bolls.life/get-books/ARA/");
    const books = await booksResponse.json();
    const {
      data: { data },
    } = await api.get("/generateVerse");
    const book = books.find((b) => b.bookid === data.book);
    return data
      ? {
          success: true,
          data: {
            referenceBook: book.name,
            text: data.text,
            chapter: data.chapter,
            book: data.book,
            verse: data.verse,
            reference: `${book.name} ${data.chapter}:${data.verse}`,
          },
        }
      : { success: false, message: "Failed to generate verse." };
  } catch (error) {
    return handleError(error, "Failed to generate verse.");
  }
};

export const setNewRole = async (role, email) => {
  try {
    const { data } = await api.post("/set-role", { role, email });
    return data.success
      ? { success: true, data }
      : { success: false, message: data.message || "Failed to set role." };
  } catch (error) {
    return handleError(error, "Failed to set role.");
  }
};

export const setNewPassword = async (password, email) => {
  try {
    const { data } = await api.post("/set-password", { password, email });
    return data.success
      ? { success: true, data }
      : { success: false, message: data.message || "Failed to set password." };
  } catch (error) {
    return handleError(error, "Failed to set password.");
  }
};

export const changePicture = async (user, picture) => {
  try {
    const { data } = await api.post("/change-picture", { user, picture });
    return data.success
      ? { success: true, data }
      : {
          success: false,
          message: data.message || "Failed to change picture.",
        };
  } catch (error) {
    return handleError(error, "Failed to change picture.");
  }
};
