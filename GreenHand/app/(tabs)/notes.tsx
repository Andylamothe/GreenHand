import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockWeather, mockNotes } from '@/data/mockData';

export default function NotesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Météo d'Aujourd'hui
          </Text>
        </View>

        {/* Carte météo verte */}
        <View style={[styles.weatherCard, { backgroundColor: colors.primary }]}>
          <View style={styles.weatherLocationDate}>
            <Text style={styles.weatherLocationText}>
              Montréal, QC
            </Text>
            <Text style={styles.weatherDateText}>
              {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.weatherMainInfo}>
            <Text style={styles.weatherTemp}>
              {mockWeather.temperature}°C
            </Text>
            <View style={styles.weatherIconContainer}>
              <IconSymbol name="cloud.sun.fill" size={60} color="#FFFFFF" />
            </View>
          </View>

          <Text style={styles.weatherHumidity}>
            Humidité {mockWeather.humidity}%
          </Text>

          <Text style={styles.weatherCondition}>
            {mockWeather.condition}
          </Text>

          <View style={styles.weatherRecommendation}>
            <IconSymbol name="lightbulb.fill" size={20} color="#FFFFFF" />
            <Text style={styles.weatherRecommendationText}>
              {mockWeather.recommendation}
            </Text>
          </View>
        </View>

        {/* Section Notes */}
        <Card style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Notes
            </Text>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </View>

          {mockNotes.map((note, index) => (
            <TouchableOpacity key={note.id} style={styles.noteItem}>
              <Image
                source={{
                  uri: [
                    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100',
                    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=100',
                    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100',
                    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=100',
                  ][index % 4],
                }}
                style={styles.noteThumbnail}
                contentFit="cover"
              />
              <View style={styles.noteInfo}>
                <Text style={[styles.noteDate, { color: colors.textSecondary }]}>
                  {new Date(note.date).toLocaleDateString('fr-FR', {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  . {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={[styles.noteContent, { color: colors.text }]} numberOfLines={2}>
                  {note.content}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Bouton Ajouter Note */}
        <TouchableOpacity
          style={[styles.addNoteButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            console.log('Ajouter une nouvelle note');
          }}>
          <IconSymbol name="plus" size={24} color="#FFFFFF" />
          <Text style={styles.addNoteButtonText}>Ajouter une Nouvelle Note</Text>
        </TouchableOpacity>
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
  weatherCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  weatherLocationDate: {
    marginBottom: 20,
  },
  weatherLocationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  weatherDateText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  weatherMainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weatherTemp: {
    fontSize: 56,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  weatherIconContainer: {
    alignItems: 'center',
  },
  weatherHumidity: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  weatherCondition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  weatherRecommendation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  weatherRecommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  notesCard: {
    marginBottom: 20,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  noteThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  noteInfo: {
    flex: 1,
  },
  noteDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  addNoteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

