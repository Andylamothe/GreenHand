import { api } from "../api/axiosInstance";

export const InventoryApi = {

    getMyPlants : () => api.get("/inventory/me/plants"),
    searchNamePlant: (name) => api.get(`/inventory/search?name=${name}`),
    filter: (category) => api.get(`/inventory/filter?category=${category}`),
    deletePlant: (id) => api.delete(`/inventory/me/plants/${id}`),
};