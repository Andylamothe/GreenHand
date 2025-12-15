import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="white" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search items..."
        placeholderTextColor="rgba(255,255,255,0.7)"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    marginTop: 10,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#F4F7E8",
  },
});
