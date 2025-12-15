import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Package, Trash2 } from "lucide-react-native";

export default function ItemCard({ plant, categoryName, onPress, onDelete }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(plant._id)}
      >
        <Trash2 size={20} color="white" />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <Package color="#fff" size={20} />
      </View>

      <Text style={styles.title}>{plant.name}</Text>

      <Text style={styles.category}>Categorie : {categoryName}</Text>

      {plant.lastWatered && (
        <Text style={styles.watered}>
          Watered : {new Date(plant.lastWatered).toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 20,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  iconContainer: {
    width: 46,
    height: 46,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 6,
  },

  category: {
    color: "#fff",
    opacity: 0.8,
  },

  watered: {
    color: "#fff",
    opacity: 0.7,
    marginTop: 4,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,0,0,0.4)",
    padding: 6,
    borderRadius: 8,
  },
});
