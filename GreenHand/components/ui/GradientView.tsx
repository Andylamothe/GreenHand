import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface GradientViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const GradientView: React.FC<GradientViewProps> = ({ children, style }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Utilisation d'une View avec backgroundColor pour simuler un gradient
  // Pour un vrai gradient, installer expo-linear-gradient
  return (
    <View
      style={[
        styles.gradient,
        {
          backgroundColor: colors.gradientStart,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
  },
});

