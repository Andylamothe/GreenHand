import React, { useEffect, useState } from "react";
import PlantDetailsScreen from "./PlantDetailsScreen";
import { api } from "../api/axiosInstance";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createGlobalStyles } from "../style/global";
import { useTheme } from "../context/ThemeContext";
import { createInventoryStyles } from "../style/inventoryStyles";
import { InventoryApi } from "../api/inventoryApi";
import { FilterButton } from "../components/ForInventory/FilterButton";
import { Search } from "lucide-react-native";
import ItemCard from "../components/itemCard";
import AjoutPlant from "../components/ForInventory/AjoutPlant";
import { CategoryApi } from "../api/categoryAp";

export default function InventoryScreen() {
  const { theme } = useTheme();
  const styles = createGlobalStyles(theme);
  const inventoryStyles = createInventoryStyles(theme);
  const [inventory, setInventory] = useState([]);
  const [originalInventory, setOriginalInventory] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeScreen, setActiveScreen] = useState("inventory");
  const [allCategories, setAllCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const handleSearch = async (text) => {
    setSearch(text);

    if (text.trim() === "") {
      setInventory(originalInventory);
      return;
    }

    try {
      const res = await InventoryApi.searchNamePlant(text);
      setInventory(res.data);
    } catch (e) {
      console.log("Erreur search:", e);
    }
  };
  const getCategoryName = (id) => {
    const cat = allCategories.find((c) => c._id === id);
    return cat ? cat["Plant Name"] : "Catégorie inconnue";
  };

  const handleDeletePlant = async (plantId) => {
  try {
    await InventoryApi.deletePlant(plantId);

    setInventory((prev) => prev.filter((p) => p._id !== plantId));
    setOriginalInventory((prev) => prev.filter((p) => p._id !== plantId));
  } catch (err) {
    console.log("Erreur suppression plante:", err);
  }
};

  const loadInventory = async () => {
    try {
      const res = await InventoryApi.getMyPlants();
      const plants = Array.isArray(res.data) ? res.data : res.data.items || [];

      setOriginalInventory(plants);
      setInventory(plants);
    } catch (err) {
      console.log("Erreur inventaire:", err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await CategoryApi.getCategories();
      setAllCategories(res.data);
    } catch (err) {
      console.log("Erreur catégories:", err);
    }
  };

  useEffect(() => {
    if (inventory.length > 0 && allCategories.length > 0) {
      const unique = [
        "All",
        ...new Set(inventory.map((p) => getCategoryName(p.categoryId))),
      ];
      setCategories(unique);
    }
  }, [inventory, allCategories]);

  useEffect(() => {
    loadInventory();
    loadCategories();
  }, []);

  const filtered =
    activeCategory === "All"
      ? inventory
      : inventory.filter(
          (p) => getCategoryName(p.categoryId) === activeCategory
        );

  if (activeScreen === "details" && selectedPlantId) {
    return (
      <PlantDetailsScreen
        plantId={selectedPlantId}
        setActiveScreen={setActiveScreen}
      />
    );
  }

  if (activeScreen === "addPlant") {
    return (
      <AjoutPlant
        onBack={() => setActiveScreen("inventory")}
        onAddSuccess={() => loadInventory()}
      />
    );
  }

  return (
    <View style={inventoryStyles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={inventoryStyles.scrollContent}
      >
        <View style={inventoryStyles.headerCard}>
          <Text style={inventoryStyles.title}>Inventory</Text>

          <View style={inventoryStyles.searchBar}>
            <Search size={20} color="#fff" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search items..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={inventoryStyles.searchInput}
              value={search}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <ScrollView horizontal style={inventoryStyles.filtersContainer}>
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onPress={() => setActiveCategory(cat)}
            />
          ))}
        </ScrollView>

        {filtered.length === 0 && (
          <View style={inventoryStyles.emptyContainer}>
            <Text style={inventoryStyles.emptyTitle}>
              Aucun item dans votre inventaire 🌱
            </Text>
            <Text style={inventoryStyles.emptySubtitle}>
              Ajoutez une plante pour commencer
            </Text>
          </View>
        )}

        <View style={inventoryStyles.grid}>
          {filtered.map((plant) => (
            <ItemCard
              key={plant._id}
              plant={plant}
              categoryName={getCategoryName(plant.categoryId)}
              onPress={() => {
                setSelectedPlantId(plant._id);
                setActiveScreen("details");
              }}
              onDelete={handleDeletePlant}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingAddButton}
        onPress={() => setActiveScreen("addPlant")}
      >
        <Text style={inventoryStyles.addIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
