// ============================================================
// RECOMMENDATION API SERVICE
// Service pour communiquer avec l'API de recommandations IA
// ============================================================
// - Utilise axios (cohérent avec usePlant.jsx)
// - URL configurée via .env pour éviter les hardcodes
// - Headers Authorization à ajouter quand l'auth sera intégrée
// ============================================================

import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recommendationApi = {
  /**
   * Sauvegarder une recommandation IA
   */
  async saveRecommendation(data) {
    try {
      const response = await apiClient.post('/recommendations', {
        userId: data.userId,
        userQuery: data.userQuery,
        aiResponse: data.aiResponse,
        recommendationType: data.recommendationType,
        priority: data.priority,
        plantId: data.plantId,
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la recommandation:', error);
      throw error;
    }
  },

  /**
   * Récupérer toutes les recommandations d'un utilisateur
   */
  async getRecommendationsByUserId(userId) {
    try {
      const response = await apiClient.get(`/recommendations/${userId}`);

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      throw error;
    }
  },
};
