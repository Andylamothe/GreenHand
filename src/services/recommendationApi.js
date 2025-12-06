// Service pour communiquer avec l'API de recommandations
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const recommendationApi = {
  /**
   * Sauvegarder une recommandation IA
   */
  async saveRecommendation(data) {
    try {
      const response = await fetch(`${API_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: data.userId,
          userQuery: data.userQuery,
          aiResponse: data.aiResponse,
          recommendationType: data.recommendationType,
          priority: data.priority,
          plantId: data.plantId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
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
      const response = await fetch(`${API_URL}/recommendations/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      throw error;
    }
  },
};
