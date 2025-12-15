import { api } from "../api/axiosInstance";

export const getPlantDashboard = async () => {
  const response = await api.get("/dashboard/plante");
  return response.data;
};
