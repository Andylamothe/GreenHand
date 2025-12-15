import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../style/global";
import { AuthApi } from "../api/userApi";

const RegistrationScreen = ({ goToLogin }) => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      await AuthApi.register(form);
      alert("Account created successfully!");
      goToLogin();
    } catch (err) {
      console.log("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title Card */}
        <View style={[styles.welcomeCard, { marginTop: 30 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeText}>Create your</Text>
            <Text style={styles.farmerText}>Account</Text>
          </View>
          <Icon name="user-plus" size={32} color="#fff" />
        </View>

        {/* Error */}
        {error !== "" && (
          <Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
        )}

        {/* Form Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Sign Up</Text>

          {/* Email */}
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Icon name="mail" size={20} color="#fff" />
            </View>
            <View style={styles.tipTextContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}
                value={form.email}
                onChangeText={(v) => handleChange("email", v)}
              />
            </View>
          </View>

          {/* Username */}
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Icon name="user" size={20} color="#fff" />
            </View>
            <View style={styles.tipTextContainer}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}
                value={form.username}
                onChangeText={(v) => handleChange("username", v)}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Icon name="lock" size={20} color="#fff" />
            </View>
            <View style={styles.tipTextContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}
                value={form.password}
                onChangeText={(v) => handleChange("password", v)}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.tipItem}>
            <View style={styles.tipIconContainer}>
              <Icon name="map-pin" size={20} color="#fff" />
            </View>
            <View style={styles.tipTextContainer}>
              <TextInput
                placeholder="City (Location)"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}
                value={form.location}
                onChangeText={(v) => handleChange("location", v)}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
