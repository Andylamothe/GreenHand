import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { ArrowLeft, Pen } from "lucide-react-native";
import { notify } from "../../utils/notify";

export default function PlantHeader({ plant, onBack, onEdit }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(plant.name);
  const [description, setDescription] = useState(plant.description);

  const save = () => {
    onEdit({ name, description });
    setOpen(false);

    notify("Détails de la plante mis à jour !");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{plant.name}</Text>

          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.editButton}
          >
            <Pen color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

  
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              style={[styles.input, styles.descriptionInput]}
            />

            <TouchableOpacity onPress={save} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  titleRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
  },

  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#8FA954',
    padding: 20,
    borderRadius: 20,
    borderBlockColor: "rgba(255, 255, 255, 1)",
  },

  label: {
    color: "#F4F7E8",
    marginBottom: 10,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#ffffffff",
    color: "#918888ff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  descriptionInput: {
    height: 100,
  },

  saveButton: {
    backgroundColor: "#ffffffff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    color: '#8FA954'
  },
});
