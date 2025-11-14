import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockWeather, mockUserProfile } from '@/data/mockData';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header vert avec salutation */}
      <View style={[styles.greenHeader, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerGreeting}>
              {getGreeting()}
            </Text>
            <TouchableOpacity style={styles.dateContainer}>
              <Text style={styles.headerDate}>{currentDate}</Text>
              <IconSymbol name="chevron.down" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={[styles.profileAvatar, { backgroundColor: '#FFFFFF' }]}>
              <Text style={[styles.profileInitial, { color: colors.primary }]}>
                {mockUserProfile.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Barre de recherche */}
        <View style={[styles.searchContainer, { backgroundColor: colors.backgroundCard }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Rechercher..."
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity>
            <IconSymbol name="mic.fill" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Carte météo améliorée */}
        <Card style={styles.weatherCard}>
          <View style={styles.weatherLocation}>
            <Text style={[styles.weatherLocationText, { color: colors.text }]}>
              Montréal, QC
            </Text>
          </View>
          
          <View style={styles.weatherMain}>
            <View style={styles.weatherTempSection}>
              <Text style={[styles.weatherTemp, { color: colors.text }]}>
                +{mockWeather.temperature}°C
              </Text>
              <View style={styles.weatherHighLow}>
                <Text style={[styles.weatherHighLowText, { color: colors.textSecondary }]}>
                  H: {mockWeather.temperature + 6}°C
                </Text>
                <Text style={[styles.weatherHighLowText, { color: colors.textSecondary }]}>
                  L: {mockWeather.temperature - 8}°C
                </Text>
              </View>
            </View>
            <IconSymbol name="cloud.moon.fill" size={60} color={colors.textSecondary} />
          </View>

          <View style={styles.weatherMetrics}>
            <View style={styles.weatherMetric}>
              <Text style={[styles.weatherMetricLabel, { color: colors.textSecondary }]}>
                Humidité
              </Text>
              <Text style={[styles.weatherMetricValue, { color: colors.text }]}>
                {mockWeather.humidity}%
              </Text>
            </View>
            <View style={styles.weatherMetric}>
              <Text style={[styles.weatherMetricLabel, { color: colors.textSecondary }]}>
                Précipitation
              </Text>
              <Text style={[styles.weatherMetricValue, { color: colors.text }]}>
                5.1ml
              </Text>
            </View>
            <View style={styles.weatherMetric}>
              <Text style={[styles.weatherMetricLabel, { color: colors.textSecondary }]}>
                Pression
              </Text>
              <Text style={[styles.weatherMetricValue, { color: colors.text }]}>
                450 hpa
              </Text>
            </View>
            <View style={styles.weatherMetric}>
              <Text style={[styles.weatherMetricLabel, { color: colors.textSecondary }]}>
                Vent
              </Text>
              <Text style={[styles.weatherMetricValue, { color: colors.text }]}>
                {mockWeather.windSpeed} m/s
              </Text>
            </View>
          </View>

          <View style={styles.sunriseSunset}>
            <View style={styles.sunTime}>
              <IconSymbol name="sunrise.fill" size={20} color={colors.warning} />
              <Text style={[styles.sunTimeText, { color: colors.text }]}>
                {mockWeather.sunrise} Lever
              </Text>
            </View>
            <View style={styles.sunArc}>
              <IconSymbol name="sun.max.fill" size={24} color={colors.warning} />
            </View>
            <View style={styles.sunTime}>
              <IconSymbol name="sunset.fill" size={20} color={colors.warning} />
              <Text style={[styles.sunTimeText, { color: colors.text }]}>
                {mockWeather.sunset} Coucher
              </Text>
            </View>
          </View>
        </Card>

        {/* Section Actions par Catégorie */}
        <View style={styles.categorySection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Actions par Catégorie
          </Text>
          <View style={styles.categoryGrid}>
            <Link href="/(tabs)/scan" asChild>
              <TouchableOpacity
                style={[
                  styles.categoryCard,
                  { backgroundColor: colors.backgroundCard, shadowColor: colors.shadow },
                ]}>
                <View style={[styles.categoryIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="camera.fill" size={28} color={colors.primary} />
                </View>
                <Text style={[styles.categoryLabel, { color: colors.text }]}>
                  Scanner
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/(tabs)/inventory" asChild>
              <TouchableOpacity
                style={[
                  styles.categoryCard,
                  { backgroundColor: colors.backgroundCard, shadowColor: colors.shadow },
                ]}>
                <View style={[styles.categoryIcon, { backgroundColor: colors.teal + '20' }]}>
                  <IconSymbol name="list.bullet" size={28} color={colors.teal} />
                </View>
                <Text style={[styles.categoryLabel, { color: colors.text }]}>
                  Inventaire
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[
                styles.categoryCard,
                { backgroundColor: colors.backgroundCard, shadowColor: colors.shadow },
              ]}>
              <View style={[styles.categoryIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="chart.bar.fill" size={28} color={colors.secondary} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]}>
                Statistiques
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.categoryCard,
                { backgroundColor: colors.backgroundCard, shadowColor: colors.shadow },
              ]}>
              <View style={[styles.categoryIcon, { backgroundColor: colors.warning + '20' }]}>
                <IconSymbol name="shield.fill" size={28} color={colors.warning} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]}>
                Sécurité
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Meilleures Offres */}
        <View style={styles.offersSection}>
          <View style={styles.offersHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Meilleures Offres
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>
                Voir tout
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll}>
            <View style={styles.offerCardWrapper}>
              <Card style={styles.offerCard}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300' }}
                  style={styles.offerImage}
                  contentFit="cover"
                />
                <View style={styles.offerContent}>
                  <Text style={[styles.offerTitle, { color: colors.text }]}>
                    Ferme Biologique
                  </Text>
                  <Text style={[styles.offerSubtitle, { color: colors.textSecondary }]}>
                    Produits frais
                  </Text>
                </View>
              </Card>
            </View>
            <View style={styles.offerCardWrapper}>
              <Card style={styles.offerCard}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300' }}
                  style={styles.offerImage}
                  contentFit="cover"
                />
                <View style={styles.offerContent}>
                  <Text style={[styles.offerTitle, { color: colors.text }]}>
                    Jardin Potager
                  </Text>
                  <Text style={[styles.offerSubtitle, { color: colors.textSecondary }]}>
                    Légumes locaux
                  </Text>
                </View>
              </Card>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greenHeader: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerGreeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerDate: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  profileButton: {
    marginLeft: 16,
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  weatherCard: {
    marginBottom: 24,
    padding: 20,
  },
  weatherLocation: {
    marginBottom: 16,
  },
  weatherLocationText: {
    fontSize: 16,
    fontWeight: '600',
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  weatherTempSection: {
    flex: 1,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },
  weatherHighLow: {
    flexDirection: 'row',
    gap: 16,
  },
  weatherHighLowText: {
    fontSize: 14,
  },
  weatherMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  weatherMetric: {
    alignItems: 'center',
  },
  weatherMetricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  weatherMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  sunriseSunset: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  sunTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sunTimeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sunArc: {
    flex: 1,
    alignItems: 'center',
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 64) / 4,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  offersSection: {
    marginBottom: 24,
  },
  offersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  offersScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  offerCardWrapper: {
    marginRight: 12,
  },
  offerCard: {
    width: width - 80,
    overflow: 'hidden',
    padding: 0,
  },
  offerImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  offerContent: {
    padding: 16,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 14,
  },
});
