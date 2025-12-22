import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import PlantProgressCard from "../components/PlantDetails/PlantProgressCard";
import PlantCare from "../components/PlantDetails/PlantCareCard";
import PlantPicture from "../components/PlantDetails/PlantPictureCard";
import PlantAnalyseCard from "../components/PlantDetails/PlantAnalyseCard";
import PlantHeader from "../components/PlantDetails/PlantHeaderCard";
import PlantWaterCard from "../components/PlantDetails/PlantWaterCard";

import usePlant from "../hooks/usePlant";
import CameraScreen from "./CameraScreen";
import { useCamera } from "../context/CameraContext";

export default function PlantDetailsScreen({ plantId, setActiveScreen }) {
  const {
    plant,
    category,
    photos,
    loading,
    addPhoto,
    deletePhoto,
    updatePlantDetails,
    updatePlantWateringDate,
  } = usePlant(plantId);

  const { isCameraOpen, photoBase64, setPhotoBase64 } = useCamera();

  const [analysisScore, setAnalysisScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  
  useEffect(() => {
    if (photoBase64) {
      addPhoto(photoBase64);
      setPhotoBase64(null);
    }
  }, [photoBase64]);

  if (loading || !plant || !category) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleDeletePhoto = async (id) => {
    await deletePhoto(id);
  };

  const handleUpdatePlant = async (updates) => {
    await updatePlantDetails(updates);
  };

  const handleUpdateWateringDate = async (newDate) => {
    await updatePlantWateringDate(newDate);
  };

  const handleBack = () => {
    setActiveScreen("inventory");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isCameraOpen ? (
        <CameraScreen />
      ) : (
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 100,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <PlantHeader
            plant={plant}
            onBack={handleBack}
            onEdit={handleUpdatePlant}
          />

          <View style={{ width: "100%", marginBottom: 20 }}>
            <Text style={{ color: "#F4F7E8", marginLeft: 20 }}>
              {plant.description}
            </Text>
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantProgressCard plant={plant} />
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantWaterCard
              plant={plant}
              onEdit={handleUpdateWateringDate}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantCare
              watering={category.Watering}
              sunlight={category.Sunlight}
              growth={category.Growth}
              soil={category.Soil}
              fertilizationType={category["Fertilization Type"]}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantPicture
              photos={photos}
              handleDeletePhoto={handleDeletePhoto}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantAnalyseCard
              analysisScore={analysisScore}
              isAnalyzing={isAnalyzing}
              handleAnalyze={() => {}}
              getScoreLabel={() => {}}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
