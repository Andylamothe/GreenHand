/**
 * Thème vert nature pour GreenHand - Application d'assistant agricole
 * Couleurs inspirées de la nature avec des tons verts doux et professionnels
 */

import { Platform } from 'react-native';

// Couleurs principales - Tons verts nature
const primaryGreen = '#4CAF50'; // Vert principal
const secondaryGreen = '#66BB6A'; // Vert secondaire
const teal = '#26A69A'; // Sarcelle
const lightGreen = '#C8E6C9'; // Vert clair
const darkGreen = '#2E7D32'; // Vert foncé

const tintColorLight = primaryGreen;
const tintColorDark = secondaryGreen;

export const Colors = {
  light: {
    text: '#1B5E20', // Vert très foncé pour le texte
    textSecondary: '#424242', // Gris foncé pour texte secondaire
    background: '#F1F8F4', // Fond très clair vert
    backgroundCard: '#FFFFFF', // Blanc pour les cartes
    tint: tintColorLight,
    icon: '#66BB6A',
    tabIconDefault: '#81C784',
    tabIconSelected: tintColorLight,
    primary: primaryGreen,
    secondary: secondaryGreen,
    teal: teal,
    accent: '#8BC34A', // Vert lime
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    gradientStart: '#4CAF50',
    gradientEnd: '#26A69A',
    shadow: 'rgba(76, 175, 80, 0.1)',
  },
  dark: {
    text: '#E8F5E9', // Vert très clair pour le texte
    textSecondary: '#B0BEC5', // Gris clair pour texte secondaire
    background: '#1B5E20', // Fond vert foncé
    backgroundCard: '#2E7D32', // Carte vert foncé
    tint: tintColorDark,
    icon: '#81C784',
    tabIconDefault: '#66BB6A',
    tabIconSelected: tintColorDark,
    primary: secondaryGreen,
    secondary: primaryGreen,
    teal: teal,
    accent: '#8BC34A',
    success: '#66BB6A',
    warning: '#FF9800',
    error: '#EF5350',
    gradientStart: '#2E7D32',
    gradientEnd: '#26A69A',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
