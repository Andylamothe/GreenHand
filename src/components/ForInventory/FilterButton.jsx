import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Package } from "lucide-react-native";

export const FilterButton = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ styles.FilterButton, {
        backgroundColor: active
          ? "rgba(255,255,255,0.25)"
          : "rgba(255,255,255,0.12)",
       
      }]}
    >
      <Package size={18} color="#fff" style={styles.PackageIcon} />
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  FilterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  PackageIcon:{
     marginRight: 6
  },
  labelText:{
    color: "#fff", fontWeight: "600"
  }
});

