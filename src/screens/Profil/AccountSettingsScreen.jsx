import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../style/profilStyle";
import { UserApi } from "../../api/userApi";

export default function AccountSettingsScreen({
  user,
  onUserUpdate,
  goBack,
  onLogout,
  refreshUser,
}) {
  const [form, setForm] = useState({
    username: "",
    location: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };


 const handleSave = async () => {
  const payload = {};

  if (form.username !== user.username) payload.username = form.username;
  if (form.location !== user.location) payload.location = form.location;

  if (Object.keys(payload).length === 0) {
    setMessage("No changes to update");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    await UserApi.updateMe(payload);

    const meRes = await UserApi.me();
    const freshUser = meRes.data.user; 

    await AsyncStorage.setItem("user", JSON.stringify(freshUser));
    onUserUpdate(freshUser);

    setMessage("Profile updated successfully ");
  } catch (err) {
    console.log("UPDATE ERROR:", err?.response?.data || err.message);
    setMessage("Update failed ");
  } finally {
    setLoading(false);
  }
};



  const handlePasswordChange = async () => {
    if (!newPassword) {
      setMessage("Please enter a new password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await UserApi.updateMe({ password: newPassword });
      setNewPassword("");
      setMessage("Password updated successfully");
      
    } catch (err) {
      setMessage("Password update failed ");
    } finally {
      setLoading(false);
    }
  };


 const handleDeleteAccount = async () => {
  if (!deletePassword) {
    setMessage("Please enter your password to confirm");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    await UserApi.deleteMe();
  } catch (err) {

    console.log("Delete API error (ignored):", err?.response?.data || err.message);
  } finally {

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    setShowDelete(false);
    onLogout(); 
  }
};



  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

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
          <Text style={styles.accountTitle}>Account Settings</Text>
        </View>

        
        <View style={styles.accountCard}>
          <View style={styles.accountField}>
            <Feather name="mail" size={18} color="white" />
            <TextInput
              value={user.email}
              editable={false}
              style={[styles.accountInput, styles.accountInputDisabled]}
            />
          </View>

          <View style={styles.accountField}>
            <Feather name="user" size={18} color="white" />
            <TextInput
              placeholder="Username"
              value={form.username}
              onChangeText={(v) => handleChange("username", v)}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.accountInput}
            />
          </View>

          <View style={styles.accountField}>
            <Feather name="map-pin" size={18} color="white" />
            <TextInput
              placeholder="Location"
              value={form.location}
              onChangeText={(v) => handleChange("location", v)}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.accountInput}
            />
          </View>
        </View>

       
        <View style={styles.accountCard}>
          <View style={styles.accountField}>
            <Feather name="lock" size={18} color="white" />
            <TextInput
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.accountInput}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveAccountButton, { backgroundColor: "#6B8E23" }]}
            onPress={handlePasswordChange}
            disabled={loading}
          >
            <Text style={styles.saveAccountText}>Change Password</Text>
          </TouchableOpacity>
        </View>

      
        <TouchableOpacity
          style={styles.saveAccountButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveAccountText}>Save Changes</Text>
        </TouchableOpacity>

        {message !== "" && (
          <Text style={styles.feedbackText}>{message}</Text>
        )}

        <TouchableOpacity
          style={styles.deleteOutlineButton}
          onPress={() => setShowDelete(true)}
        >
          <Text style={styles.deleteOutlineText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>

 

    <Modal
        transparent
        animationType="fade"
        visible={showDelete}
        onRequestClose={() => setShowDelete(false)}
        >
        <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
                This action is irreversible
            </Text>

            <View style={styles.accountField}>
                <Feather name="lock" size={18} color="white" />
                <TextInput
                placeholder="Type your password to confirm"
                secureTextEntry
                value={deletePassword}
                onChangeText={setDeletePassword}
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.accountInput}
                />
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDeleteAccount}
                disabled={loading}
            >
                <Text style={styles.deleteText}>
                {loading ? "Deleting..." : "Confirm Delete"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowDelete(false)}>
                <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>

    </View>
  );
}
