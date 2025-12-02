import React, { useState } from 'react';
import { View, Text } from 'react-native';
// import { Home } from './components/Home';
// import { Inventory } from './components/Inventory';
import ChatbotScreen from './src/screens/ChatbotScreen';
import HomeScreen from './src/screens/HomeScreen';
// import { Profile } from './components/Profile';
// import { PlantDetail } from './components/PlantDetail';
import Navigation from './src/components/Navigation';
import { styles } from './src/style/global';
 
export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState(null);
 
  // const handleSelectPlant = (plant) => {
  //   setSelectedPlant(plant);
  // };
 
  // const handleSelectInventoryItem = (item) => {
  //   // Convert inventory item to plant format
  //   const plant = {
  //     name: item.name.replace(' Seeds', ''),
  //     stage: 'Growing',
  //     progress: Math.floor(Math.random() * 50) + 30, // Random progress between 30-80
  //     days: Math.floor(Math.random() * 30) + 10, // Random days between 10-40
  //   };
  //   setSelectedPlant(plant);
  // };
 
  // const handleBackFromPlant = () => {
  //   setSelectedPlant(null);
  // };
 
  const renderScreen = () => {
    // if (selectedPlant) {
    //   return <PlantDetail plant={selectedPlant} onBack={handleBackFromPlant} />;
    // }

    switch (activeScreen) {
      case 'home':
          return <HomeScreen />;
      // case 'inventory':
      //   return <Inventory onSelectItem={handleSelectInventoryItem} />;
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
 