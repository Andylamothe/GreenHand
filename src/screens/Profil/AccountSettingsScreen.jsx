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
import { notify } from "../../utils/notify"; 

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
      notify("No changes to save", "warning");
      return;
    }

    setLoading(true);

    try {
      await UserApi.updateMe(payload);
      const res = await UserApi.me();
      const freshUser = res.data.user;

      await AsyncStorage.setItem("user", JSON.stringify(freshUser));
      onUserUpdate(freshUser);

      notify("Profile updated successfully!", "success"); 
    } catch (err) {
      notify("Update failed", "danger"); 
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) {
      notify("Enter a new password", "warning");
      return;
    }

    setLoading(true);

    try {
      await UserApi.updateMe({ password: newPassword });
      setNewPassword("");
      notify("Password changed!", "success"); 
    } catch (err) {
      notify("Password update failed", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      notify("Enter password to confirm", "warning");
      return;
    }

    setLoading(true);

    try {
      await UserApi.deleteMe();
    } catch {}

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    notify("Account deleted", "danger"); 
    setShowDelete(false);
    onLogout();
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
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 200 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.accountHeader}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.accountTitle}>Account Settings</Text>
        </View>

        {/* PROFILE CARD */}
        <View style={[styles.accountCard, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Profile Info</Text>

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

        <TouchableOpacity
          style={[styles.saveAccountButton, { marginTop: 20 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveAccountText}>Save Changes</Text>
        </TouchableOpacity>


        {/* PASSWORD CARD */}
        <View style={[styles.accountCard, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>Security</Text>

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
            style={[styles.saveAccountButton, { backgroundColor: "#6a8e23" }]}
            onPress={handlePasswordChange}
            disabled={loading}
          >
            <Text style={styles.saveAccountText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        {/* DELETE */}
        <TouchableOpacity
          style={[styles.deleteOutlineButton, { marginTop: 40 }]}
          onPress={() => setShowDelete(true)}
        >
          <Text style={styles.deleteOutlineText}>Delete Account</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL */}
      <Modal visible={showDelete} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Account Deletion</Text>

            <View style={styles.accountField}>
              <Feather name="lock" size={18} color="white" />
              <TextInput
                placeholder="Enter password"
                secureTextEntry
                value={deletePassword}
                onChangeText={setDeletePassword}
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.saveButtonText}>Delete</Text>
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
