import { api } from "./axiosInstance";

export const AdminApi = {
  promoteUser: (id) => api.patch(`/auth/promote/${id}`),
  deleteInventory: (userId) =>
    api.delete(`/inventory/deleteInventory/${userId}`),
};
