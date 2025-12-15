import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style/profilStyle";

export default function NotificationsScreen({ goBack }) {
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    push: true,
    email: false,
    reminders: false,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem("notificationSettings");
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (err) {
        console.log("Load notification settings error", err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    await AsyncStorage.setItem(
      "notificationSettings",
      JSON.stringify(newSettings)
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={styles.accountHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.accountTitle}>Notifications</Text>
        </View>

       
        <View style={styles.accountCard}>
          
          <View style={styles.notificationRow}>
            <View style={styles.notificationLeft}>
              <Feather name="bell" size={18} color="white" />
              <Text style={styles.notificationText}>
                Push Notifications
              </Text>
            </View>

            <Switch
              value={settings.push}
              onValueChange={(v) =>
                saveSettings({ ...settings, push: v })
              }
            />
          </View>

        
          <View style={styles.notificationRow}>
            <View style={styles.notificationLeft}>
              <Feather name="mail" size={18} color="white" />
              <Text style={styles.notificationText}>
                Email Notifications
              </Text>
            </View>

            <Switch
              value={settings.email}
              onValueChange={(v) =>
                saveSettings({ ...settings, email: v })
              }
            />
          </View>

         
          <View style={styles.notificationRow}>
            <View style={styles.notificationLeft}>
              <Feather name="clock" size={18} color="white" />
              <Text style={styles.notificationText}>
                Daily Reminders
              </Text>
            </View>

            <Switch
              value={settings.reminders}
              onValueChange={(v) =>
                saveSettings({ ...settings, reminders: v })
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
