import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { getWeatherDashboard } from "../services/weatherService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../style/global";

const screenWidth = Dimensions.get("window").width;

// CONFIGURATION CHARTS
const greenChartConfig = {
  backgroundGradientFrom: "#ffffffff", // fond blanc
  backgroundGradientTo: "#cad4b1ff",
  decimalPlaces: 1,
  color: () => "#7f9e4dff",
  labelColor: () => "#4a5714ff",
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#7f9e4dff",
    fill: "#ffffffff",
  },
  propsForBackgroundLines: {
    stroke: "#7f9e4dff",
  },
};

export default function WeatherDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getWeatherDashboard();
        setData(res);
      } catch (e) {
        console.error("FETCH ERROR", e);
        setError("Erreur lors du chargement des données météo");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7f9e4dff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  // Extraire température horaire moyenne par jour
  const hourlyTempData = data.hourlyTemperature
    ? data.hourlyTemperature.map((d, i) => ({
        time: data.hourlyTime[i],
        temp: d,
      }))
    : [];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HUMIDITÉ */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Humidité (%)</Text>
          <LineChart
            data={{
              labels: data.humidity.map((d) => d.date.slice(5)),
              datasets: [{ data: data.humidity.map((d) => d.humidity) }],
            }}
            width={screenWidth - 80}
            height={220}
            yAxisSuffix="%"
            chartConfig={greenChartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* PRÉCIPITATIONS */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Précipitations (mm)</Text>
          <BarChart
            data={{
              labels: data.precipitation.map((d) => d.date.slice(5)),
              datasets: [
                { data: data.precipitation.map((d) => d.precipitation) },
              ],
            }}
            width={screenWidth - 80}
            height={220}
            yAxisSuffix="mm"
            chartConfig={greenChartConfig}
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* TEMPÉRATURE MAX/MIN */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Température (°C)</Text>
          <LineChart
            data={{
              labels: data.temperature.time.map((d) => d.slice(5)),
              datasets: [
                {
                  data: data.temperature.temperature_2m_max,
                  color: () => "#95af4cff",
                },
                {
                  data: data.temperature.temperature_2m_min,
                  color: () => "#638020ff",
                },
              ],
              legend: ["Max", "Min"],
            }}
            width={screenWidth - 80}
            height={220}
            yAxisSuffix="°C"
            chartConfig={greenChartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* VITESSE DU VENT QUOTIDIEN (nouveau graphique) */}
        {data.windDaily && data.windDaily.length > 0 && (
          <View style={styles.weatherCard}>
            <Text style={styles.weatherTitle}>Vitesse du vent (km/h)</Text>
            <BarChart
              data={{
                labels: data.windDaily.map((d) => d.date.slice(5)), // MM-DD
                datasets: [{ data: data.windDaily.map((d) => d.windSpeed) }],
              }}
              width={screenWidth - 80}
              height={220}
              yAxisSuffix=" km/h"
              chartConfig={greenChartConfig}
              style={{ borderRadius: 16 }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
