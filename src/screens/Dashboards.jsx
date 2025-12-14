import React from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { styles } from "../style/global"


import useCharts from "../hooks/useCharts";

export default function Dashboards() {
  const { charts, loading } = useCharts();

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Chargement des graphiques...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Dashboards
      </Text>

      {charts.length === 0 && (
        <Text>Aucun graphique trouvé.</Text>
      )}

      {charts.map((url, index) => (
        <View key={index} style={{ marginBottom: 25 }}>
          <Image
            source={{ uri: url }}
            style={{
              width: "100%",
              height: 250,
              borderRadius: 10,
              resizeMode: "contain",
              backgroundColor: "#f0f0f0",
            }}
          />
          <Text style={{ marginTop: 8, textAlign: "center" }}>
            {url.split("/").pop()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
