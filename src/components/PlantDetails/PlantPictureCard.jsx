import { Camera, X, ImageIcon } from "lucide-react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, Text, TouchableOpacity, View, Image } from "react-native";
import { styles as global } from "../../style/global";

export default function PlantPicture({
  photos,
  handleDeletePhoto,
  openCamera,
}) {
  return (
    <View style={global.photosCard}>
      <View style={global.photosHeader}>
        <Text style={global.photosTitle}>Pictures</Text>

        <TouchableOpacity onPress={openCamera} style={global.addBtn}>
          <Camera color="white" size={18} />
          <Text style={global.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {photos.length > 0 ? (
        <View style={global.photosGrid}>
          {photos.map((photo) => (
            <View key={photo._id || photo.id} style={global.photoItem}>
              <Image
                source={{ uri: photo.url || photo.photoUrl }}
                style={global.photoImage}
              />

              <TouchableOpacity
                onPress={() => handleDeletePhoto(photo._id || photo.id)}
                style={global.deleteBtn}
              >
                <X size={16} color="white" />
              </TouchableOpacity>

              <Text style={global.photoDate}>
                {photo.date || photo.dateTaken}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={global.emptyPhotos}>
          <View style={global.emptyIconBox}>
            <ImageIcon size={32} color="rgba(255,255,255,0.5)" />
          </View>
          <Text style={global.emptyText}>There is no pictures</Text>
        </View>
      )}
    </View>
  );
}
