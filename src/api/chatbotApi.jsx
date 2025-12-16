import { api } from "./axiosInstance";

export const ChatbotApi = {
  saveRecommendation: (data) => api.post("/recommendations", data),
  getRecommendationsByUserId: (userId) => api.get(`/recommendations/${userId}`),
};
