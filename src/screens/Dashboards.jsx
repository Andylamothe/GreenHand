import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import { styles } from "../style/global";

import useCharts from "../hooks/useCharts";

export default function Dashboards() {
  const { charts, loading } = useCharts();

  const [selectedImage, setSelectedImage] = useState(null);

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
    <>
      <Modal visible={!!selectedImage} transparent={true}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setSelectedImage(null)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: "90%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </Pressable>
      </Modal>

      <ScrollView contentContainerStyle={{ padding: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          Annual Dashboards
        </Text>

        {charts.length === 0 && <Text>Aucun graphique trouvé.</Text>}

        {charts.map((url, index) => (
          <View
            key={index}
            style={{
              marginBottom: 25,
              backgroundColor: "#fff",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 6,
            }}
          >
            <Pressable onPress={() => setSelectedImage(url)}>
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
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
