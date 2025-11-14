import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockPlantScan } from '@/data/mockData';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ScanScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getHealthColor = (score: number) => {
    if (score >= 80) return colors.success;
    if (score >= 60) return colors.warning;
    return colors.error;
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Bon';
    return 'À surveiller';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Analyse de Plante
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Zone de photo */}
        <Card style={styles.imageCard}>
          <View style={[styles.imageContainer, { backgroundColor: colors.background }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' }}
              style={styles.plantImage}
              contentFit="cover"
            />
            <TouchableOpacity
              style={[styles.cameraButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                // Simuler la prise de photo
                console.log('Ouvrir l\'appareil photo');
              }}>
              <IconSymbol name="camera.fill" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Score de santé */}
        <Card style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={[styles.scoreTitle, { color: colors.text }]}>
              Score de Santé
            </Text>
            <View
              style={[
                styles.scoreBadge,
                { backgroundColor: getHealthColor(mockPlantScan.healthScore) + '20' },
              ]}>
              <Text
                style={[
                  styles.scoreValue,
                  { color: getHealthColor(mockPlantScan.healthScore) },
                ]}>
                {mockPlantScan.healthScore}/100
              </Text>
            </View>
          </View>
          <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>
            {getHealthLabel(mockPlantScan.healthScore)}
          </Text>

          {/* Barre de progression */}
          <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${mockPlantScan.healthScore}%`,
                  backgroundColor: getHealthColor(mockPlantScan.healthScore),
                },
              ]}
            />
          </View>
        </Card>

        {/* Symptômes détectés */}
        <Card style={styles.symptomsCard}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.warning} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Symptômes Détectés
            </Text>
          </View>
          {mockPlantScan.symptoms.map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <View style={[styles.symptomDot, { backgroundColor: colors.warning }]} />
              <Text style={[styles.symptomText, { color: colors.text }]}>{symptom}</Text>
            </View>
          ))}
        </Card>

        {/* Recommandations */}
        <Card style={styles.recommendationsCard}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="lightbulb.fill" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recommandations
            </Text>
          </View>
          {mockPlantScan.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={[styles.recommendationDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                {recommendation}
              </Text>
            </View>
          ))}
        </Card>

        {/* Plantes similaires */}
        <Card style={styles.relatedCard}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="leaf.fill" size={24} color={colors.secondary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Plantes Similaires
            </Text>
          </View>
          <View style={styles.relatedPlants}>
            {mockPlantScan.relatedPlants.map((plant, index) => (
              <View
                key={index}
                style={[
                  styles.plantTag,
                  { backgroundColor: colors.secondary + '20', borderColor: colors.secondary },
                ]}>
                <Text style={[styles.plantTagText, { color: colors.secondary }]}>
                  {plant}
                </Text>
              </View>
            ))}
          </View>
        </Card>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  imageCard: {
    marginBottom: 20,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreCard: {
    marginBottom: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  scoreBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  symptomsCard: {
    marginBottom: 16,
  },
  recommendationsCard: {
    marginBottom: 16,
  },
  relatedCard: {
    marginBottom: 16,
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
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  symptomDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  symptomText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  recommendationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  relatedPlants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  plantTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  plantTagText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

