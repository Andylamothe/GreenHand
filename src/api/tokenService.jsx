import AsyncStorage from "@react-native-async-storage/async-storage";

export const TokenService = {
    saveToken: async(token) => {
        try {
            await AsyncStorage.setItem("token", token);

        } catch (error) {
            console.error("Error saving token:", error);
        }
    },

    getToken: async() => {
        try {
            const token = await AsyncStorage.getItem("token");
            return token;
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    },

    clearToken: async() => {
        try {
            await AsyncStorage.removeItem("token");
        } catch (error) {
            console.error("Error clearing token:", error);
        }
    }
}