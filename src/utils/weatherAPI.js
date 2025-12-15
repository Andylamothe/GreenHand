import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (latitude, longitude) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                latitude,
                longitude,
                current: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
                hourly: 'precipitation_probability',
            },
        });

        const currentData = response.data.current;
        const probability = response.data.hourly.precipitation_probability?.[0] ?? 0;

        return {
            ...currentData,
            precipitation_probability: probability,
        };
    } catch (error) {
        console.error('Erreur API: ', error);
        throw error;
    }
};
