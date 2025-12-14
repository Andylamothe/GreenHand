import { api } from "../api/axiosInstance";

export const ChartsApi = {
  getCharts: () => api.get("/charts"),
};