import axios from 'axios';

const API_KEY = '245523bd0cdb76b1d528038647d1d705';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: API_KEY,
                units: 'metric', // Les températures seront renvoyées en Celsius
                lang: 'fr', // La langue des réponses sera en français
            },
        });

        return response.data; // Retourne les données météo
    } catch (error) {
        console.error('Erreur API: ', error);
        throw error; // Lance l'erreur pour qu'elle soit gérée dans le composant
    }
};
