import { useState, useEffect, useCallback } from "react";
import { PlantApi } from "../api/plantApi";

export default function usePlant(plantId) {
  const [plant, setPlant] = useState(null);
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlant = useCallback(async () => {
    if (!plantId) {
      console.log("No plantId");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await PlantApi.getPlantDetails(plantId);
      console.log(res.data);

      // Calcul des jours et la progression //////////////////////

      const createdAt = new Date(res.data.plant.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - createdAt);
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const growthSpeed = res.data.category.Growth;
      let totalDays;

      switch (growthSpeed.toLowerCase()) {
        case "fast":
          totalDays = 30;
          break;
        case "moderate":
          totalDays = 60;
          break;
        case "slow":
          totalDays = 120;
          break;
        default:
          totalDays = 60;
      }

      const progress = Math.min(100, Math.floor((days / totalDays) * 100));

      /// rajouter les informations pour la plante //////////////////////
      setPlant({
        ...res.data.plant,
        days,
        progress,
      });

      setCategory(res.data.category);
      setPhotos(res.data.photos || []);
    } catch (error) {
      console.log("Error fetching plant:", error);
    } finally {
      setLoading(false);
    }
  }, [plantId]);

  /// ajouter une photo pour la plantes //////////////////////
  const addPhoto = async (base64) => {
    try {
      const photoData = {
        base64: `data:image/jpeg;base64,${base64}`,
        healthScore: 80,
        comparisonResult: "healthy",
      };

      const res = await PlantApi.addPhoto(plantId, photoData);
      setPhotos((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.log("Error uploading photo:", error);
    }
  };

  /// supprimer une photo //////////////////////
  const deletePhoto = async (photoId) => {
    try {
      await PlantApi.deletePhoto(plantId, photoId);
      setPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (error) {
      console.log("Error deleting photo:", error);
    }
  };

  // modifier une plante

  //// modifier ses details ////////////////////////////////////////

  const updatePlantDetails = async (updates) => {
    try {
      const res = await PlantApi.updatePlantDetails(plantId, updates);
      setPlant((prev) => ({ ...prev, ...res.data }));
    } catch (error) {
      console.log("Error updating plant:", error);
    }
  };

  /// modifier la derniere fois qu'on l'a arrosée //////////////////////

  const updatePlantWateringDate = async (newDate) => {
    try {
      const res = await PlantApi.updatePlantWateringDate(plantId, newDate);
      setPlant((prev) => ({ ...prev, lastWatered: res.data.lastWatered }));
    } catch (error) {
      console.log("Error updating watering date:", error);
    }
  };

  /// supprimer une plante //////////////////////

  const deletePlant = async () => {
    try {
      await PlantApi.deletePlant(plantId);
    } catch (error) {
      console.log("Error deleting plant:", error);
    }
  };

  useEffect(() => {
    fetchPlant();
  }, [fetchPlant]);

  return {
    plant,
    category,
    photos,
    loading,
    addPhoto,
    deletePhoto,
    refresh: fetchPlant,
    updatePlantDetails,
    updatePlantWateringDate,
    deletePlant,
  };
}
