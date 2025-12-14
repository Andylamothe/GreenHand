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
        <Text style={ajoutStyles.backText}>Retour</Text>
      </TouchableOpacity>


      {step === 1 && (
        <View style={ajoutStyles.stepContainer}>
          <Text style={ajoutStyles.title}>
            Quel sera le nom de votre plante ?
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
            <Text style={styles.nextButtonText}>Suivant ➜</Text>
          </TouchableOpacity>
        </View>
      )}


      {step === 2 && (
        <View style={[ajoutStyles.stepContainer, { flex: 1 }]}>
          <Text style={ajoutStyles.title}>
            Quel est le type de votre plante ?
          </Text>

          <TextInput
            placeholder="Ajouter une catégorie..."
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
              <Text style={styles.nextButtonText}>Suivant ➜</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}


      {step === 3 && (
        <View style={ajoutStyles.stepContainer}>
          <Text style={ajoutStyles.title}>Description (optionnelle) </Text>

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
            <Text style={styles.nextButtonText}>Suivant ➜</Text>
          </TouchableOpacity>
        </View>
      )}


      {step === 4 && (
        <View style={ajoutStyles.stepContainer}>
          <Text style={ajoutStyles.title}>Dernière date d'arrosage</Text>

          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.input}
          >
            <Text style={{ color: "white" }}>
              {lastWatered
                ? new Date(lastWatered).toLocaleDateString()
                : "Choisir une date"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={lastWatered ? new Date(lastWatered) : new Date()}
              mode="date"
              maximumDate={new Date()}
              display="calendar"
              onChange={(selectedDate) => {
                setShowPicker(false);
                if (selectedDate) setLastWatered(selectedDate.toISOString());
              }}
            />
          )}

          <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
            <Text style={styles.nextButtonText}>Créer ma plante </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
