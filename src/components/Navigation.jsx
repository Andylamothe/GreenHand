import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Home, Package, MessageCircle, User, BarChart3 } from 'lucide-react-native';
import { createGlobalStyles } from '../style/global';
import { useTheme } from '../context/ThemeContext';
 
export default function Navigation({ activeScreen, setActiveScreen }) {
  const { theme } = useTheme();
  const styles = createGlobalStyles(theme);
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'plantDashBoard', icon: BarChart3, label: 'Dash' },
    { id: 'chatbot', icon: MessageCircle, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];
 
  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => setActiveScreen(item.id)}
            style={[styles.navItem, isActive && styles.navItemActive]}
          >
            <Icon
              color={theme.colors.text}
              size={24}
              style={styles.navIcon}
            />
            <Text style={styles.navLabel}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


 