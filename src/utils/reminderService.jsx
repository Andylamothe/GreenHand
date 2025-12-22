import AsyncStorage from "@react-native-async-storage/async-storage";
import { notify } from "./notify";

export const checkDailyReminder = async () => {
  try {
    const stored = await AsyncStorage.getItem("notificationSettings");
    const settings = stored ? JSON.parse(stored) : {};

    if (!settings.reminders) return; // désactivé

    const lastReminder = await AsyncStorage.getItem("lastReminderDate");
    const today = new Date().toDateString();

    if (lastReminder !== today) {
      notify("Don't forget to water your plants today 🌱");
      await AsyncStorage.setItem("lastReminderDate", today);
    }
  } catch (err) {
    console.log("Reminder error:", err);
  }
};
