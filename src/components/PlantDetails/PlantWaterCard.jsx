import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Droplet, CalendarSync } from "lucide-react-native";

export default function PlantWaterCard({ plant, onEdit }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      onEdit(selectedDate.toISOString());
    }
  };

  return (
    <View style={styles.progressCard}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Droplet color="white" size={24} />
          </View>
          <View>
            <Text style={styles.progressLabel}>Last Watered</Text>
            <Text style={styles.progressDays}>
              {plant.lastWatered
                ? new Date(plant.lastWatered).toLocaleDateString()
                : "Never"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.editButton}
        >
          <CalendarSync color="#FFF" size={20} />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={plant.lastWatered ? new Date(plant.lastWatered) : new Date()}
          mode="date"
          onChange={handleChange}
          style={styles.datePicker}
        />
      )}
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  datePicker: {
    marginTop: 10,
    color: "#F4F7E8",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
