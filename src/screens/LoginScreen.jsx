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
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const API_LOGIN = "http://10.0.2.2:3000/api/auth/login";

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      console.log("TOKEN :", data.token);
      console.log("USER :", data.user);

      await AsyncStorage.setItem("token", data.token);
      onLoginSuccess(); //redirection après login réussi

      alert("Login successful!");
    } catch (e) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={[styles.welcomeCard, { marginTop: 30 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.farmerText}>Back</Text>
          </View>
          <Icon name="log-in" size={32} color="#fff" />
        </View>

        {/* Error */}
        {error !== "" && (
          <Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
        )}

        {/* Form Card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Sign In</Text>

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

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
