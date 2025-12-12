import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
// import { Home } from './components/Home';
import ChatbotScreen from './src/screens/ChatbotScreen';
// import { Profile } from './components/Profile';
// import { PlantDetail } from './components/PlantDetail';
import Navigation from './src/components/Navigation';
import { styles } from './src/style/global';
import InventoryScreen from './src/screens/InventoryScreen';
import LoginScreen from './src/screens/LoginScreen'
import { TokenService } from './src/api/tokenService';
 
export default function App() {


  const [activeScreen, setActiveScreen] = useState('home');

   const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Quand login réussi
  const handleLoginSuccess = async () => {
    const token = await TokenService.getToken();
    console.log("TOKEN APRÈS LOGIN =", token);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

 
  const renderScreen = () => {
    // if (selectedPlant) {
    //   return <PlantDetail plant={selectedPlant} onBack={handleBackFromPlant} />;
    // }

    switch (activeScreen) {
      // case 'home':
      //   return <Home onSelectPlant={handleSelectPlant} />;
      case 'inventory':
        return <InventoryScreen  />;
      case 'chatbot':
        return <ChatbotScreen />;
      // case 'profile':
      //   return <Profile />;
      default:
        return (
          <View style={styles.container}>
            <View style={styles.scrollContent}>
              <Text style={styles.farmerText}>Bienvenue sur GreenHand!</Text>
              <Text style={styles.welcomeText}>Sélectionnez Chat dans la navigation pour tester le chatbot.</Text>
            </View>
          </View>
        );
    }
  };  return (
    <View style={styles.container}>
      {renderScreen()}
      <Navigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </View>
  );
}
 