
/// C'ETAIT JUSTE POUR TESTER 

// import { useState } from 'react';
// // import { Home } from './components/Home';
// // import { Inventory } from './components/Inventory';
// // import { Chatbot } from './components/Chatbot';
// // import { Profile } from './components/Profile';
// // import { PlantDetail } from './components/PlantDetail';
// import { Navigation } from './components/Navigation';

// export default function App() {
//   const [activeScreen, setActiveScreen] = useState('home');
//   const [selectedPlant, setSelectedPlant] = useState(null);

//   // const handleSelectPlant = (plant) => {
//   //   setSelectedPlant(plant);
//   // };

//   // const handleSelectInventoryItem = (item) => {
//   //   // Convert inventory item to plant format
//   //   const plant = {
//   //     name: item.name.replace(' Seeds', ''),
//   //     stage: 'Growing',
//   //     progress: Math.floor(Math.random() * 50) + 30, // Random progress between 30-80
//   //     days: Math.floor(Math.random() * 30) + 10, // Random days between 10-40
//   //   };
//   //   setSelectedPlant(plant);
//   // };

//   // const handleBackFromPlant = () => {
//   //   setSelectedPlant(null);
//   // };

//   const renderScreen = () => {
//     if (selectedPlant) {
//       return <PlantDetail plant={selectedPlant} onBack={handleBackFromPlant} />;
//     }

//     switch (activeScreen) {
//       case 'home':
//         return <Home onSelectPlant={handleSelectPlant} />;
//       case 'inventory':
//         return <Inventory onSelectItem={handleSelectInventoryItem} />;
//       case 'chatbot':
//         return <Chatbot />;
//       case 'profile':
//         return <Profile />;
//       default:
//         return <Home onSelectPlant={handleSelectPlant} />;
//     }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #A9C46C, #8BA955, #A9C46C)' }}>
//       {/* Animated background blobs */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ backgroundColor: '#F4FFC3' }}></div>
//         <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" style={{ backgroundColor: '#A9C46C' }}></div>
//         <div className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" style={{ backgroundColor: '#C8E89A' }}></div>
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 min-h-screen pb-20">
//         {renderScreen()}
//       </div>

//       {/* Navigation */}
//       <Navigation activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
//     </div>
//   );
// }
 