import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CategoryApi } from "../../api/categoryAp";
import { PlantApi } from "../../api/plantApi";
import { styles } from "../../style/global";
import ajoutStyles from "../../style/ajoutPlantStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { notify } from "../../utils/notify";
import { Feather } from "@expo/vector-icons";


export default function AjoutPlant({ onBack, onAddSuccess }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [lastWatered, setLastWatered] = useState("");
  const [search, setSearch] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const resultatCategorie = await CategoryApi.getCategories();
        setCategories(resultatCategorie.data);
      } catch (erreur) {
        console.log("Erreur catégories:", erreur);
      }
    };
    loadCategories();
  }, []);

  const filteredCategories = categories.filter((categorie) =>
    categorie["Plant Name"]?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async () => {
    try {
      await PlantApi.addPlant({
        name,
        categoryId: selectedCategory,
        description,
        lastWatered,
      });

      notify("Plant added to your inventory !");

      onAddSuccess();
      onBack();
    } catch (erreur) {
      console.log("Erreur ajout:", erreur);
    }
  };

  return (
    <View style={[styles.container, ajoutStyles.screen]}>
      <TouchableOpacity onPress={onBack} style={ajoutStyles.backButton}>
        <Text style={ajoutStyles.backIcon}>⬅</Text>
        <Text style={ajoutStyles.backText}>Back</Text>
      </TouchableOpacity>

      {step === 1 && (
        <View style={ajoutStyles.stepContainer}>
          <Text style={ajoutStyles.title}>
            What is the name of your plant ?
          </Text>

          <TextInput
            placeholder="Ex: Menthe"
            placeholderTextColor="#ffffffff"
            style={ajoutStyles.input}
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => name.trim() && setStep(2)}
          >
            <Text style={styles.nextButtonText}>Next ➜</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={[ajoutStyles.stepContainer, { flex: 1 }]}>
          <Text style={ajoutStyles.title}>
            What is the type of your plant ?
          </Text>

          <TextInput
            placeholder="Add a category..."
            placeholderTextColor="#ccc"
            style={ajoutStyles.input}
            value={search}
            onChangeText={setSearch}
          />

          <ScrollView
            style={ajoutStyles.scroll}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {filteredCategories
              .filter(
                (categorie) =>
                  !selectedCategory || categorie._id === selectedCategory
              )
              .map((categorie) => (
                <TouchableOpacity
                  key={categorie._id}
                  onPress={() =>
                    setSelectedCategory(
                      selectedCategory === categorie._id ? null : categorie._id
                    )
                  }
                  style={[
                    ajoutStyles.categoryItem,
                    selectedCategory === categorie._id &&
                      ajoutStyles.categorySelected,
                  ]}
                >
                  <Text style={ajoutStyles.categoryText}>
                    {categorie["Plant Name"]}
                  </Text>
                </TouchableOpacity>
              ))}

            <TouchableOpacity
              style={[styles.nextButton, ajoutStyles.bottomSpace]}
              onPress={() => selectedCategory && setStep(3)}
            >
              <Text style={styles.nextButtonText}>Next ➜</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {step === 3 && (
        <View style={ajoutStyles.stepContainer}>
          <Text style={ajoutStyles.title}>Description (optional) </Text>

          <TextInput
            placeholder="Description..."
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={4}
            style={ajoutStyles.descriptionInput}
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setStep(4)}
          >
            <Text style={styles.nextButtonText}>Next ➜</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 4 && (
  <View style={ajoutStyles.stepContainer}>
    <Text style={ajoutStyles.title}>Last watering date</Text>

    <TouchableOpacity
      onPress={() => setShowPicker(true)}
      style={ajoutStyles.dateButton}
    >
      <View style={ajoutStyles.dateButtonContent}>
        <Feather name="calendar" size={20} color="#F4F7E8" />
        <Text style={ajoutStyles.dateText}>
          {lastWatered
            ? new Date(lastWatered).toLocaleDateString()
            : "Choisir une date"}
        </Text>
      </View>
    </TouchableOpacity>

    <Text style={ajoutStyles.hintText}>
      Select the last watering date for your plant.
    </Text>

    {showPicker && (
      <DateTimePicker
        value={lastWatered ? new Date(lastWatered) : new Date()}
        mode="date"
        maximumDate={new Date()}
        onChange={(event, date) => {
          setShowPicker(false);
          if (date) setLastWatered(date.toISOString());
        }}
      />
    )}

    <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
      <Text style={styles.nextButtonText}>Create my plant</Text>
    </TouchableOpacity>
  </View>
)}

    </View>
  );
}
