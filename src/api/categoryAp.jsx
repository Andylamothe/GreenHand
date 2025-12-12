import { api } from "./axiosInstance";

export const CategoryApi = {
  getCategories: () => api.get("/categories"),

  
};
