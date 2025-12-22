import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const notify = async (message, type = "success") => {
  const stored = await AsyncStorage.getItem("notificationSettings");
  const settings = stored ? JSON.parse(stored) : null;

  // si l'utilisateur a activé la notifff
  if (settings?.push) {
    showMessage({
      message,
      type,
      icon: "auto",
      floating: true,
    });
  }
};
