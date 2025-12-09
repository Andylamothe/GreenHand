import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// ============================================================
// - URL configurée via .env pour éviter les hardcodes
// ============================================================
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function usePlant(plantId) {
  const [plant, setPlant] = useState(null);
  const [category, setCategory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPlant = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/plants/${plantId}/details`);

      setPlant(res.data.plant);
      setCategory(res.data.category);
      setPhotos(res.data.photos);
    } catch (error) {
      console.log("Error fetching plant:", error);
    } finally {
      setLoading(false);
    }
  }, [plantId]);

  useEffect(() => {
    fetchPlant();
  }, [fetchPlant]);


  const addPhoto = async (base64) => {
    try {
      const res = await axios.post(
        `${API_URL}/plants/${plantId}/photos`,
        {
          base64: `data:image/jpeg;base64,${base64}`,
          healthScore: 80, 
          comparisonResult: "Uploaded from mobile app"
        }
      );

      
      setPhotos((prev) => [...prev, res.data]);

      return res.data;
    } catch (error) {
      console.log("Error uploading photo:", error);
    }
  };


  const deletePhoto = async (photoId) => {
    try {
      await axios.delete(`${API_URL}/plants/${plantId}/photos/${photoId}`);

      setPhotos((prev) => prev.filter((p) => p._id !== photoId));
    } catch (error) {
      console.log("Error deleting photo:", error);
    }
  };

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
