import { api } from "../api/axiosInstance";

export const PlantApi = {
  addPlant: (plantData) => api.post("/inventory/me/plants", plantData),
  deletePlant: (id) => api.delete(`/inventory/me/plants/${id}`),
  getPlant: (plantId) => api.get(`/plant/${plantId}`),
  getPlantDetails: (id) => api.get(`/plants/${id}/details`),
  addPhoto: (id, data) => api.post(`/plants/${id}/photos`, data),
  deletePhoto: (plantId, photoId) => api.delete(`/plants/${plantId}/photos/${photoId}`),
};
