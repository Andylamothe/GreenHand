import axios from "axios";
import { TokenService } from "./tokenService";

export const api = axios.create({
  baseURL: "https://greenhandwebservice.onrender.com/api",
});

api.interceptors.request.use(async (config) => {
  const token = await TokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
);
