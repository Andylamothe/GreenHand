// __tests__/weatherAPI.test.jsx
import axios from 'axios';
import { getWeatherData } from '../src/api/weatherAPI';

jest.mock('axios');

// Verifie ue getWeatherData retourne les bonnes valeurs et qu ela fonction utilise axios.get avec les bon aparametre
describe('Weather API', () => {
  it('fetches weather data correctly', async () => {
    //Mock de la réponse axios
    const mockResponse = {
      data: {
        current: {
          temperature_2m: 10,
          relative_humidity_2m: 50,
          wind_speed_10m: 5,
        },
        hourly: {
          precipitation_probability: [20],
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const latitude = 45.50884;
    const longitude = -73.58781;

    const data = await getWeatherData(latitude, longitude);

    expect(data.temperature_2m).toBe(10);
    expect(data.relative_humidity_2m).toBe(50);
    expect(data.wind_speed_10m).toBe(5);
    expect(data.precipitation_probability).toBe(20);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast',
      {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,relative_humidity_2m,wind_speed_10m',
          hourly: 'precipitation_probability',
        },
      }
    );
  });
});
