import { api } from "./axiosInstance";

export const ChatbotApi = {
  saveRecommendation: (data) => api.post("/recommendation", data),
  getRecommendationsByUserId: (userId) => api.get(`/recommendation/${userId}`),
};
