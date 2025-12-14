// Service pour communiquer avec l'API Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('EXPO_PUBLIC_GEMINI_API_KEY est manquante dans les variables d\'environnement');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const geminiService = {
  /**
   * Obtenir une recommandation agricole de Gemini
   */
  async getAgricultureAdvice(userQuery) {
    try {
      // ⚠️ Utilise gemini-1.5-flash (quota gratuit plus généreux que gemini-2.5-pro)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const systemPrompt = `Tu es un assistant agricole expert. Tu fournis des conseils pratiques et scientifiquement fondés 
      sur la culture, l'irrigation, la fertilisation, la prévention des maladies et la gestion des cultures. Votre réponse doit faire maximum 225 mots pour avoir la possibilité d'être transférée dans une base donnée.
      Réponds en français et de manière concise et claire a un débutant qui commence ou continue l'agriculture. `;

      const prompt = `${systemPrompt}\n\nQuestion de l'utilisateur: ${userQuery}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      // Log détaillé pour faciliter le debug tout en retournant un message générique à l'utilisateur
      console.error('Erreur lors de l\'appel à Gemini API:', {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      throw new Error('Impossible de générer une réponse. Veuillez réessayer.');
    }
  },
};
