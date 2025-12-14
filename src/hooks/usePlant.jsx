import { useState, useEffect, useCallback } from "react";
import { PlantApi } from "../api/plantApi";

// ============================================================
// - URL configurée via .env pour éviter les hardcodes
// ============================================================

export default function usePlant(plantId) {
  const [plant, setPlant] = useState(null);
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlant = useCallback(async () => {
    console.log("usePlant fetchPlant called with plantId:", plantId);

    if (!plantId) {
      console.log("No plantId provided, stopping fetch.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await PlantApi.getPlantDetails(plantId);
      console.log(res.data);

      setPlant(res.data.plant);
      setCategory(res.data.category);
      setPhotos(res.data.photos || []);

      console.log("Updated state:", {
        plant: res.data.plant,
        category: res.data.category,
        photos: res.data.photos,
      });
    } catch (error) {
      console.log("Error fetching plant:", error);
    } finally {
      setLoading(false);
    }
  }, [plantId]);

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

  const deletePhoto = async (photoId) => {
    try {
      await PlantApi.deletePhoto(plantId, photoId);

      setPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (error) {
      console.log("Error deleting photo:", error);
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
  };
}
