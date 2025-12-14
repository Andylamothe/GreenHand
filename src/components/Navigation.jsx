import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Home, Package, MessageCircle, User, BarChart3 } from 'lucide-react-native';
import { styles } from '../style/global';
 
export function Navigation({ activeScreen, setActiveScreen }) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'inventory', icon: Package, label: 'Inventory' },
    { id: 'dashboards', icon: BarChart3, label: 'Dash' },
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
              color="#FFFFFF"
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

export default Navigation;
 