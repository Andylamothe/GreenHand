import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { api } from "../api/axiosInstance";
import { TokenService } from "../api/tokenService";

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // 🔥 On sauvegarde le token ici
      await TokenService.saveToken(res.data.token);

      console.log("TOKEN SAUVEGARDÉ :", res.data.token);

      // On peut prévenir App.js du succès
      if (onLoginSuccess) onLoginSuccess();

    } catch (err) {
      console.log("Erreur login :", err.response?.data || err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email :</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Mot de passe :</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}
