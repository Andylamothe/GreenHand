import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:3000/api/dashboard";

export const getPlantData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${API_URL}/plante`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching plant data:", error);
    throw error;
  }
};
