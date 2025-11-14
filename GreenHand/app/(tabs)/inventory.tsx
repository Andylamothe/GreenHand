import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockProducts, mockCropRecommendations } from '@/data/mockData';

export default function InventoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'arrow.up.right';
      case 'down':
        return 'arrow.down.right';
      default:
        return 'minus';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return colors.success;
      case 'down':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Inventaire
          </Text>
        </View>

        {/* Section Recommandations */}
        <Card style={styles.recommendationsSection}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="star.fill" size={24} color={colors.warning} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Meilleures Cultures à Cultiver
            </Text>
          </View>
          {mockCropRecommendations.map((crop, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={[styles.recommendationIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="leaf.fill" size={20} color={colors.primary} />
              </View>
              <View style={styles.recommendationContent}>
                <Text style={[styles.recommendationName, { color: colors.text }]}>
                  {crop.name}
                </Text>
                <Text style={[styles.recommendationReason, { color: colors.textSecondary }]}>
                  {crop.reason}
                </Text>
                <Text style={[styles.recommendationSeason, { color: colors.primary }]}>
                  Saison: {crop.season}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Liste des produits */}
        <View style={styles.productsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>
            Prix du Marché
          </Text>
          {mockProducts.map((product) => (
            <Card key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <View style={styles.productInfo}>
                  <Text style={[styles.productName, { color: colors.text }]}>
                    {product.name}
                  </Text>
                  <Text style={[styles.productCategory, { color: colors.textSecondary }]}>
                    {product.category}
                  </Text>
                </View>
                <View style={styles.productPrice}>
                  <Text style={[styles.priceValue, { color: colors.text }]}>
                    {product.price.toFixed(2)} $
                  </Text>
                  <Text style={[styles.priceUnit, { color: colors.textSecondary }]}>
                    / {product.unit}
                  </Text>
                </View>
              </View>
              <View style={styles.productTrend}>
                <IconSymbol
                  name={getTrendIcon(product.trend)}
                  size={16}
                  color={getTrendColor(product.trend)}
                />
                <Text
                  style={[
                    styles.trendText,
                    { color: getTrendColor(product.trend) },
                  ]}>
                  {product.trend === 'up'
                    ? 'En hausse'
                    : product.trend === 'down'
                    ? 'En baisse'
                    : 'Stable'}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationReason: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  recommendationSeason: {
    fontSize: 12,
    fontWeight: '500',
  },
  productsSection: {
    marginTop: 8,
  },
  productCard: {
    marginBottom: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
  },
  productPrice: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceUnit: {
    fontSize: 12,
  },
  productTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

