import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";

// import { Home } from './components/Home';
import { CameraProvider } from "./src/context/CameraContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
// import { Inventory } from './components/Inventory';
import LoginScreen from "./src/screens/LoginScreen";
import PlantDashboardScreen from "./src/screens/PlantDashboardScreen";
import WeatherDashboard from "./src/screens/WeatherDashboardScreen";
import ChatbotScreen from "./src/screens/ChatbotScreen";
import HomeScreen from "./src/screens/HomeScreen";
import StartScreen from "./src/screens/StartScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import AccountSettingsScreen from "./src/screens/Profil/AccountSettingsScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import HelpSupportScreen from "./src/screens/HelpSupportScreen";
import AdminPanelScreen from "./src/screens/AdminPanelScreen";
import ParticlesSplashScreen from "./src/screens/ParticlesSplashScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
// import { PlantDetail } from './components/PlantDetail';
import Navigation from "./src/components/Navigation";
import { styles } from "./src/style/global";
import InventoryScreen from "./src/screens/InventoryScreen";

export default function App() {
  return (
    <ThemeProvider>
      <CameraProvider>
        <AppContent />
      </CameraProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [screen, setScreen] = useState("start");
  const [user, setUser] = useState(null);
  
const [showSplash, setShowSplash] = useState(true);

  // Update StatusBar style based on theme
  useEffect(() => {
    StatusBar.setBarStyle(
      theme.name === 'dark' ? 'light-content' : 'dark-content',
      true
    );
  }, [theme]);

  const handleLogout = async () => {
    try {
      await UserApi.logout();
    } catch (err) {
      console.log("Logout API error:", err.message);
    } finally {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      setUser(null);
      setIsAuthenticated(false);
      setScreen("start");
    }
  };

  const refreshUser = async () => {
    const res = await UserApi.me();
    setUser(res.data);
    await AsyncStorage.setItem("user", JSON.stringify(res.data));
  };

  const handleUserUpdate = async (updatedUser) => {
    setUser(updatedUser);
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
  };

  //check le token au debut
  useEffect(() => {
    const verifyToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isAuthenticated && showSplash) {
  return <ParticlesSplashScreen onFinish={() => setShowSplash(false)} />;
}

  //si connecté -> app principale
  if (isAuthenticated) {
    return (
      
      <View style={styles.container}>
        {screen === "home" && <HomeScreen setScreen={setScreen} />}
        {screen === "inventory" && <InventoryScreen />}
        {screen === "chatbot" && <ChatbotScreen user={user} />}
        {screen === "dashboards" && <Dashboards />}
        {screen === "profile" && (
          <ProfileScreen
            user={user}
            onLogout={handleLogout}
            goToAccount={() => setScreen("account")}
            goToNotifications={() => setScreen("notifications")}
            goToHelp={() => setScreen("help")}
            goToAdmin={() => setScreen("admin")}
          />
        )}
        {screen === "account" && (
          <AccountSettingsScreen
            user={user}
            onUserUpdate={handleUserUpdate}
            goBack={() => setScreen("profile")}
            onLogout={handleLogout}
            refreshUser={refreshUser}
          />
        )}
        {screen === "notifications" && (
          <NotificationsScreen goBack={() => setScreen("profile")} />
        )}
        {screen === "help" && (
          <HelpSupportScreen goBack={() => setScreen("profile")} />
        )}
        {screen === "admin" && (
          <AdminPanelScreen goBack={() => setScreen("profile")} />
        )}

        {screen === "plantDashBoard" && <PlantDashboardScreen />}
        {screen === "weatherDashboard" && <WeatherDashboard />}

        <Navigation activeScreen={screen} setActiveScreen={setScreen} />
        <FlashMessage position="top" />
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
          setUser={setUser}
          setActiveScreen={setScreen}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setScreen("home");
          }}
        />
      );

    case "register":
      return <RegistrationScreen goToLogin={() => setScreen("login")} 
        setActiveScreen={setScreen}/>;

    default:
      return null;
  }
  
}