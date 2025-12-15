import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PlantProgressCard from "../components/PlantDetails/PlantProgressCard";
import { SafeAreaView } from "react-native-safe-area-context";
import PlantCare from "../components/PlantDetails/PlantCareCard";
import PlantPicture from "../components/PlantDetails/PlantPictureCard";
import usePlant from "../hooks/usePlant";
import TakePicture from "../components/PlantDetails/Camera";
import PlantAnalyseCard from "../components/PlantDetails/PlantAnalyseCard";
import PlantHeader from "../components/PlantDetails/PlantHeaderCard";
import PlantWaterCard from "../components/PlantDetails/PlantWaterCard";

export default function PlantDetailsScreen({ plantId, setActiveScreen }) {
  // Id temporaire pour tester
  // const plantId = "693228dfa5aebb55e20cce55";

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

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analysisScore, setAnalysisScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (loading || !plant || !category) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  ////////////////// Analyse ////////////////////
  const handleAnalyze = () => {};

  const getScoreLabel = (score) => {};

  ////////////////////// pictures //////////////////////////
  const handlePictureTaken = async (base64) => {
    await addPhoto(base64);
    setIsCameraOpen(false);
  };

  const handleDeletePhoto = async (id: string) => {
    await deletePhoto(id);
  };

  //// modfication ///////////////////////////////////////////

  const handleUpdatePlant = async (updates) => {
    await updatePlantDetails(updates);
  };

  const handleUpdateWateringDate = async (newDate) => {
    await updatePlantWateringDate(newDate);
  };

  ////////////////Navigation///////////////////////////////

  const handleBack = () => {
    setActiveScreen("inventory");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isCameraOpen ? (
        <TakePicture onPictureTaken={handlePictureTaken} />
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
            <Text style={{ color: "#F4F7E8", marginLeft: 20 }}>{plant.description} </Text>
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantProgressCard plant={plant} />
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantWaterCard plant={plant} onEdit={handleUpdateWateringDate} />
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
              openCamera={() => setIsCameraOpen(true)}
            />
          </View>

          <View style={{ width: "100%", marginBottom: 10 }}>
            <PlantAnalyseCard
              analysisScore={analysisScore}
              isAnalyzing={isAnalyzing}
              handleAnalyze={handleAnalyze}
              getScoreLabel={getScoreLabel}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
