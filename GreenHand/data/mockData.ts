// Données factices pour l'application GreenHand

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  condition: string;
  recommendation: string;
}

export interface PlantScanResult {
  healthScore: number;
  symptoms: string[];
  recommendations: string[];
  relatedPlants: string[];
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Note {
  id: string;
  date: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  location: string;
  avatar?: string;
  plantPhotos: string[];
}

// Données météo factices
export const mockWeather: WeatherData = {
  temperature: 22,
  humidity: 65,
  windSpeed: 12,
  sunrise: '06:30',
  sunset: '19:45',
  condition: 'Ensoleillé',
  recommendation: 'Bonne journée pour arroser vos plantes. L\'humidité est optimale.',
};

// Résultat de scan de plante factice
export const mockPlantScan: PlantScanResult = {
  healthScore: 85,
  symptoms: ['Feuilles légèrement jaunies', 'Croissance normale'],
  recommendations: [
    'Arroser régulièrement (2-3 fois par semaine)',
    'Exposition au soleil modérée recommandée',
    'Fertiliser dans 2 semaines',
  ],
  relatedPlants: ['Tomate', 'Basilic', 'Poivron'],
};

// Inventaire de produits factices
export const mockProducts: Product[] = [
  { id: '1', name: 'Tomates', category: 'Légumes', price: 3.50, unit: 'kg', trend: 'up' },
  { id: '2', name: 'Carottes', category: 'Légumes', price: 2.20, unit: 'kg', trend: 'stable' },
  { id: '3', name: 'Salade', category: 'Légumes', price: 1.80, unit: 'pièce', trend: 'down' },
  { id: '4', name: 'Pommes', category: 'Fruits', price: 2.90, unit: 'kg', trend: 'up' },
  { id: '5', name: 'Fraises', category: 'Fruits', price: 5.50, unit: 'kg', trend: 'up' },
  { id: '6', name: 'Basilic', category: 'Herbes', price: 2.00, unit: 'bouquet', trend: 'stable' },
];

// Recommandations de culture
export const mockCropRecommendations = [
  { name: 'Tomates', reason: 'Saison optimale, prix en hausse', season: 'Printemps-Été' },
  { name: 'Salade', reason: 'Croissance rapide, demande stable', season: 'Toute l\'année' },
  { name: 'Basilic', reason: 'Facile à cultiver, prix stable', season: 'Printemps-Été' },
];

// Notes factices
export const mockNotes: Note[] = [
  {
    id: '1',
    date: '2025-01-15',
    title: 'Première récolte de tomates',
    content: 'Les tomates commencent à mûrir. Première récolte réussie !',
    tags: ['récolte', 'tomates'],
  },
  {
    id: '2',
    date: '2025-01-12',
    title: 'Plantation de carottes',
    content: 'Semis de carottes effectué dans le jardin. Arrosage régulier nécessaire.',
    tags: ['plantation', 'carottes'],
  },
  {
    id: '3',
    date: '2025-01-10',
    title: 'Taille des rosiers',
    content: 'Taille d\'hiver effectuée sur tous les rosiers. Les plantes sont en bonne santé.',
    tags: ['taille', 'rosiers'],
  },
];

// Profil utilisateur factice
export const mockUserProfile: UserProfile = {
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  location: 'Montréal, QC',
  plantPhotos: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400',
    'https://images.unsplash.com/photo-1463946035006-77e729521780?w=400',
  ],
};

