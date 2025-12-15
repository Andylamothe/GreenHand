import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { BarChart } from "react-native-chart-kit";
import { styles } from "../style/global";
import { getPlantDashboard } from "../services/plantService";

const screenWidth = Dimensions.get("window").width;

/* =========================
   CHART CONFIG (SAME AS WEATHER)
   ========================= */
const greenChartConfig = {
  backgroundGradientFrom: "#ffffffff",
  backgroundGradientTo: "#cad4b1ff",
  decimalPlaces: 1,
  color: () => "#7f9e4dff",
  labelColor: () => "#4a5714ff",

  propsForBackgroundLines: {
    stroke: "#7f9e4dff",
  },
};

export default function PlantDashboardScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getPlantDashboard();
        setData({
          avg_npk: res.avg_npk || [],
          rain_temp: res.rain_temp || [],
          ph: res.ph || [],
          fert_long: res.fert_long || [],
          soil_crop: res.soil_crop || [],
        });

        console.log("DASHBOARD DATA:", res);
      } catch (e) {
        console.error("FETCH ERROR", e);
        setError("Erreur lors du chargement des données plantes");
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

  if (error || !data) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {error || "No data found"}
        </Text>
      </View>
    );
  }

  /* =========================
     GRAPH 1 – Top crops (Nitrogen)
     ========================= */
  const topCrops = data.avg_npk.sort((a, b) => b.N - a.N).slice(0, 6);

  /* =========================
     GRAPH 2 – Average temperature by crop
     ========================= */
  const tempByCrop = {};
  data.rain_temp.forEach((item) => {
    if (!tempByCrop[item.label]) tempByCrop[item.label] = [];
    tempByCrop[item.label].push(item.temperature);
  });

  const tempLabels = Object.keys(tempByCrop).slice(0, 6);
  const tempValues = tempLabels.map(
    (label) =>
      tempByCrop[label].reduce((a, b) => a + b, 0) / tempByCrop[label].length
  );

  /* =========================
     GRAPH 3 – Average soil pH by crop
     ========================= */
  const phByCrop = {};
  data.ph.forEach((item) => {
    if (!phByCrop[item.label]) phByCrop[item.label] = [];
    phByCrop[item.label].push(item.ph);
  });

  const phLabels = Object.keys(phByCrop).slice(0, 6);
  const phValues = phLabels.map(
    (label) =>
      phByCrop[label].reduce((a, b) => a + b, 0) / phByCrop[label].length
  );

  /* =========================
     GRAPH 4 – Fertilizer nutrients
     ========================= */
  /* =========================
   GRAPH 4 – Fertilizer nutrients (AVG)
   ========================= */
  const fertGrouped = data.fert_long.reduce((acc, cur) => {
    if (!acc[cur.Nutrient]) {
      acc[cur.Nutrient] = [];
    }
    acc[cur.Nutrient].push(cur.Value);
    return acc;
  }, {});

  const fertLabels = Object.keys(fertGrouped);
  const fertValues = fertLabels.map(
    (nutrient) =>
      fertGrouped[nutrient].reduce((a, b) => a + b, 0) /
      fertGrouped[nutrient].length
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TOP CROPS – NITROGEN */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Top Crops – Nitrogen (N)</Text>
          <BarChart
            data={{
              labels: topCrops.map((c) => c.label.slice(0, 6)),
              datasets: [{ data: topCrops.map((c) => c.N) }],
            }}
            width={screenWidth - 80}
            height={220}
            fromZero
            chartConfig={greenChartConfig}
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* TEMPERATURE */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>
            Average Temperature by Crop (°C)
          </Text>
          <BarChart
            data={{
              labels: tempLabels.map((l) => l.slice(0, 6)),
              datasets: [{ data: tempValues }],
            }}
            width={screenWidth - 80}
            height={220}
            yAxisSuffix="°C"
            fromZero
            chartConfig={greenChartConfig}
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* SOIL PH */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>Average Soil pH by Crop</Text>
          <BarChart
            data={{
              labels: phLabels.map((l) => l.slice(0, 6)),
              datasets: [{ data: phValues }],
            }}
            width={screenWidth - 80}
            height={220}
            fromZero
            chartConfig={greenChartConfig}
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* FERTILIZERS */}
        <View style={styles.weatherCard}>
          <Text style={styles.weatherTitle}>
            Average Fertilizer Nutrient Values
          </Text>
          <BarChart
            data={{
              labels: fertLabels.map((l) => l.slice(0, 3)), // Nit, Pho, Pot
              datasets: [{ data: fertValues }],
            }}
            width={screenWidth - 80}
            height={220}
            fromZero
            chartConfig={greenChartConfig}
            style={{ borderRadius: 16 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
