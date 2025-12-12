import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Droplets, Sun, FlaskRound, Sprout, Shovel } from "lucide-react-native";

export default function PlantCare({ watering, sunlight, growth, soil, fertilizationType }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Necessary care</Text>

      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Droplets color="white" size={20} />
            <Text style={styles.label}>Watering:</Text>
          </View>
          <Text style={styles.value}>{watering}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Sun color="white" size={20} />
            <Text style={styles.label}>Sunlight:</Text>
          </View>
          <Text style={styles.value}>{sunlight}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Sprout color="white" size={20} />
            <Text style={styles.label}>Growth:</Text>
          </View>
          <Text style={styles.value}>{growth}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <Shovel color="white" size={20} />
            <Text style={styles.label}>Soil:</Text>
          </View>
          <Text style={styles.value}>{soil}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.row}>
            <FlaskRound color="white" size={20} />
            <Text style={styles.label}>Fertilization:</Text>
          </View>
          <Text style={styles.value}>{fertilizationType}</Text>
        </View>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 16,
    gap: 14,
  },

  item: {
    flex: 1,
    padding: 12,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },

  value: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
