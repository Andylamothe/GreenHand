import { api } from "../api/axiosInstance";

export const getWeatherDashboard = async () => {
  const response = await api.get("/dashboard/weather");
  return response.data;
};
