import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../style/global";
import { AuthApi } from "../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft } from "lucide-react-native";
import Icon from "react-native-vector-icons/Feather";

const LoginScreen = ({ onLoginSuccess, setUser, setActiveScreen }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await AuthApi.login({
        email: form.email,
        password: form.password,
      });
      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      console.log("Logged in user:", user);
      onLoginSuccess();
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveScreen("start");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles1.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles1.backButton}>
          <ArrowLeft color="#FFF" size={24} />
        </TouchableOpacity>

        <View style={styles1.titleRow}></View>
      </View>

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

            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={[styles.input, { flex: 1, color: "#fff" }]}
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(v) => handleChange("password", v)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ padding: 5 }}
              >
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
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

const styles1 = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    marginLeft: 20,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 17,
  },
});
