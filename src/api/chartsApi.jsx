import { api } from "../api/axiosInstance";

export const getPlantDataDashboard = async () => {
  const response = await api.get("/dashboard/plante");
  return response.data;
};


export const getWeatherDashboard = async () => {
  const response = await api.get("/dashboard/weather");
  return response.data;
};
