import { api } from "./axiosInstance"; // ton Axios configuré avec baseURL

export const AuthApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
};

export const UserApi = {
  me: () => api.get("/users/me"),
  updateMe: (data) => api.patch("/users/me", data),
  deleteMe: () => api.delete("/users/me"),
  logout: () => api.post("/users/logout"), 
};
