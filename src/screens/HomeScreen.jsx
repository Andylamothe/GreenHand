import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createGlobalStyles } from "../style/global";
import { useTheme } from "../context/ThemeContext";
import { getWeatherData } from "../api/weatherAPI";
import { Sprout } from "lucide-react-native";
import Icon from "react-native-vector-icons/Feather";
import { checkDailyReminder } from "../utils/reminderService";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from "react-native-reanimated";

const HomeScreen = ({ setScreen }) => {
  const { theme } = useTheme();
  const styles = createGlobalStyles(theme);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // shared value pour bounce
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withRepeat(
      withSpring(1, { damping: 2, stiffness: 120 }),
      -1,
      true
    );
  }, []);

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + 0.2 * bounce.value }],
  }));

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const latitude = 45.50884;
        const longitude = -73.58781;

        const data = await getWeatherData(latitude, longitude);
        if (data) setWeather(data);
        else setError("Invalid data received from the API.");
      } catch (e) {
        setError("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

   useEffect(() => {
    checkDailyReminder();
  }, []);
  // fonction pour envelopper chaque icône avec le bounce
  const BouncyIcon = ({ children }) => (
    <Animated.View style={bounceStyle}>{children}</Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Card */}
        <View style={[styles.welcomeCard, { marginTop: 30 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeText}>Hi ,</Text>
            <Text style={styles.farmerText}>Farmer!</Text>
          </View>
          <BouncyIcon>
            <Sprout size={30} color="#fff" />
          </BouncyIcon>
        </View>

        {/* Loading / Error */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={{ marginTop: 20 }}
          />
        )}
        {error && (
          <Text style={{ color: "red", marginTop: 20, marginLeft: 20 }}>
            {error}
          </Text>
        )}

        {/* Weather Card */}
        {weather && !loading && !error && (
          <View style={styles.weatherCard}>
            <Text style={styles.weatherTitle}>Today’s weather</Text>

            <View style={styles.weatherMetrics}>
              {[
                { name: "sun", value: `${weather.temperature_2m}°C` },
                { name: "droplet", value: `${weather.relative_humidity_2m}%` },
                { name: "cloud-rain", value: `${weather.precipitation_probability}%` },
                { name: "wind", value: `${weather.wind_speed_10m} km/h` },
              ].map((item, index) => (
                <View style={styles.weatherMetric} key={index}>
                  <BouncyIcon>
                    <View style={styles.weatherIconContainer}>
                      <Icon name={item.name} size={24} color="#fff" />
                    </View>
                  </BouncyIcon>
                  <Text style={styles.weatherValue}>{item.value}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setScreen("weatherDashboard")}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                View the charts
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tips Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips of the Day</Text>

          {[
            {
              icon: "droplet",
              title: "Monitor humidity",
              subtitle: "Water less frequently, dry air heats up faster in winter",
            },
            {
              icon: "alert-circle",
              title: "Maximize light",
              subtitle: "Place plants near sunny windows or use a grow light",
            },
            {
              icon: "check-circle",
              title: "Avoid direct cold",
              subtitle: "Keep plants away from poorly insulated windows and drafts",
            },
          ].map((tip, index) => (
            <View style={styles.tipItem} key={index}>
              <BouncyIcon>
                <View style={styles.tipIconContainer}>
                  <Icon name={tip.icon} size={20} color="#fff" />
                </View>
              </BouncyIcon>
              <View style={styles.tipTextContainer}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipSubtitle}>{tip.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
