import AsyncStorage from "@react-native-async-storage/async-storage";

export const getWeatherDashboard = async () => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(
    "http://10.0.2.2:3000/api/dashboard/weather",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.log("BACKEND ERROR:", text);
    throw new Error("Erreur API météo");
  }

  return response.json();
};
