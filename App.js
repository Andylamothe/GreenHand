
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { Home } from './components/Home';
import ChatbotScreen from './src/screens/ChatbotScreen';
import HomeScreen from './src/screens/HomeScreen';
import StartScreen from "./src/screens/StartScreen";
import RegistrationScreen from './src/screens/RegistrationScreen';
import LoginScreen from './src/screens/LoginScreen';
// import { Profile } from './components/Profile';
// import { PlantDetail } from './components/PlantDetail';
import Navigation from './src/components/Navigation';
import { styles } from './src/style/global';
import InventoryScreen from './src/screens/InventoryScreen';
import LoginScreen from './src/screens/LoginScreen'
import { TokenService } from './src/api/tokenService';
 

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [screen, setScreen] = useState("start");

  //check le token au debut
  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  //si connecté -> app principale
  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        {screen === "home" && <HomeScreen />}
        {screen === "inventory" && <InventoryScreen />}
        {screen === "chatbot" && <ChatbotScreen />}
        <Navigation activeScreen={screen} setActiveScreen={setScreen} />
      </View>
    );
  }

  //Si pas connecter -> auth flow
  switch (screen) {
    case "start":
      return (
        <StartScreen
          goToLogin={() => setScreen("login")}
          goToRegister={() => setScreen("register")}
        />
      );

    case "login":
      return (
        <LoginScreen
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setScreen("home");
          }}
        />
      );

    case "register":
      return (
        <RegistrationScreen
          goToLogin={() => setScreen("login")}
        />
      );

    default:
      return null;
  }
}

