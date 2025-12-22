import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useCamera } from "../context/CameraContext";
import { MaterialIcons } from "@expo/vector-icons"; // icône appareil photo

export default function CameraScreen() {
  const { setPhotoBase64, closeCamera } = useCamera();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");

  const cameraRef = useRef(null);

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text>Loading…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.permissionText}>We need camera access</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const flipCamera = () => {
    setFacing(prev => (prev === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const result = await cameraRef.current.takePictureAsync({
      base64: true,
      quality: 0.7,
    });

    if (result.base64) {
      setPhotoBase64(result.base64);
      closeCamera();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.flipBtn} onPress={flipCamera}>
          <Text style={styles.flipText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
          <MaterialIcons name="photo-camera" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  permissionBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
  },
  permissionBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  controls: {
    position: "absolute",
    bottom: 130,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  flipBtn: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 12,
    borderRadius: 25,
  },
  flipText: {
    color: "#fff",
    fontWeight: "bold",
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffff4d",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
