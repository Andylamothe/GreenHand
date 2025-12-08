import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native"; 
import { styles } from "../../style/global"

export default function PlantHeader({ plant, onBack }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>

      <TouchableOpacity
        onPress={onBack}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "rgba(255,255,255,0.2)",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
        }}
      >
        <ArrowLeft color="#FFF" size={24} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#FFF", marginBottom: 2 }}>
          {plant.name}
        </Text>
      </View>
    </View>
  );
}
