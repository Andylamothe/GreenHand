import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { styles } from "../style/profilStyle";
import { AdminApi } from "../api/adminApi";
import { notify } from "../utils/notify";

export default function AdminPanelScreen({ goBack }) {
  const [userId, setUserId] = useState("");
  const [inventoryUserId, setInventoryUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handlePromote = async () => {
    if (!userId) {
      setMessage("Please enter a user ID");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await AdminApi.promoteUser(userId);
      setMessage("User promoted to admin ");
      notify("User promoted to admin !");
      setUserId("");
    } catch (err) {
      setMessage("Promotion failed ");
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteInventory = async () => {
    if (!inventoryUserId) {
      setMessage("Please enter a user ID");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await AdminApi.deleteInventory(inventoryUserId);
      setMessage("Inventory deleted successfully ");
      notify(" Inventory deleted successfully !");
      setInventoryUserId("");
    } catch (err) {
      setMessage("Delete inventory failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
    
        <View style={styles.accountHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.accountTitle}>Admin Panel</Text>
        </View>

    
        <View style={styles.accountCard}>
          <Text style={styles.sectionTitle}>Promote User</Text>

          <View style={styles.accountField}>
            <Feather name="user-check" size={18} color="white" />
            <TextInput
              placeholder="User ID"
              value={userId}
              onChangeText={setUserId}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.accountInput}
            />
          </View>

          <TouchableOpacity
            style={styles.saveAccountButton}
            onPress={handlePromote}
            disabled={loading}
          >
            <Text style={styles.saveAccountText}>
              {loading ? "Processing..." : "Promote to Admin"}
            </Text>
          </TouchableOpacity>
        </View>


        <View style={styles.accountCard}>
          <Text style={styles.sectionTitle}>Delete Inventory</Text>

          <View style={styles.accountField}>
            <Feather name="trash-2" size={18} color="white" />
            <TextInput
              placeholder="User ID"
              value={inventoryUserId}
              onChangeText={setInventoryUserId}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.accountInput}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveAccountButton, { backgroundColor: "#8B0000" }]}
            onPress={handleDeleteInventory}
            disabled={loading}
          >
            <Text style={styles.saveAccountText}>
              {loading ? "Deleting..." : "Delete Inventory"}
            </Text>
          </TouchableOpacity>
        </View>

        {message !== "" && (
          <Text style={styles.feedbackText}>{message}</Text>
        )}
      </ScrollView>
    </View>
  );
}
