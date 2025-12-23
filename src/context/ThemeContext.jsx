import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  name: 'light',
  colors: {
    background: '#E8F5E9',
    primary: '#4CAF50',
    secondary: '#81C784',
    card: 'rgba(76, 175, 80, 0.15)',
    cardBorder: 'rgba(76, 175, 80, 0.3)',
    text: '#1B5E20',
    textSecondary: '#2E7D32',
    textTertiary: 'rgba(27, 94, 32, 0.7)',
    icon: '#2E7D32',
    buttonBg: 'rgba(76, 175, 80, 0.25)',
    buttonBorder: 'rgba(76, 175, 80, 0.4)',
    inputBg: 'rgba(76, 175, 80, 0.1)',
    activeNav: 'rgba(76, 175, 80, 0.4)',
    danger: 'rgba(211, 47, 47, 0.8)',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: '#1a2e1a',
    primary: '#4CAF50',
    secondary: '#A9C46C',
    card: 'rgba(95, 133, 80, 0.4)',
    cardBorder: 'rgba(169, 196, 108, 0.3)',
    text: '#F4F7E8',
    textSecondary: '#F4F7E8',
    textTertiary: 'rgba(244, 247, 232, 0.7)',
    icon: '#F4F7E8',
    buttonBg: 'rgba(95, 133, 80, 0.5)',
    buttonBorder: 'rgba(169, 196, 108, 0.4)',
    inputBg: 'rgba(95, 133, 80, 0.3)',
    activeNav: 'rgba(95, 133, 80, 0.6)',
    danger: 'rgba(180, 80, 80, 0.4)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme === 'light') {
        setTheme(lightTheme);
      } else {
        setTheme(darkTheme);
      }
    } catch (error) {
      console.log('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme.name === 'dark' ? lightTheme : darkTheme;
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('appTheme', newTheme.name);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
