import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TrendingUp } from "lucide-react-native";
import PlantWaterCard from "./PlantWaterCard";

export default function PlantProgressCard({ plant }) {
  return (
    <View style={styles.progressCard}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <TrendingUp color="white" size={24} />
          </View>
          <View>
            <Text style={styles.progressLabel}>Progression</Text>
            <Text style={styles.progressDays}>{plant.days} Days</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.progressPercent}>{plant.progress}%</Text>
        </View>
      </View>

      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${plant.progress}%` }]}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 32,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  progressLabel: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  progressDays: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },

  rightSection: {
    alignItems: "flex-end",
  },

  progressPercent: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  progressBarBackground: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    height: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  progressBarFill: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    borderRadius: 12,
  },
});
