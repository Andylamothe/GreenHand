import { api } from "./axiosInstance"; // ton Axios configuré avec baseURL

export const AuthApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};
