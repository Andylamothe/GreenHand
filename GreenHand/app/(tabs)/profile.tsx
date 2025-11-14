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
import { mockUserProfile } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
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
            Profil
          </Text>
        </View>

        {/* Photo de profil et informations */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '20' }]}>
              {mockUserProfile.avatar ? (
                <Image
                  source={{ uri: mockUserProfile.avatar }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              ) : (
                <Text style={[styles.avatarText, { color: colors.primary }]}>
                  {mockUserProfile.name.charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                console.log('Modifier le profil');
              }}>
              <IconSymbol name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {mockUserProfile.name}
            </Text>
            <View style={styles.profileDetail}>
              <IconSymbol name="envelope.fill" size={16} color={colors.textSecondary} />
              <Text style={[styles.profileDetailText, { color: colors.textSecondary }]}>
                {mockUserProfile.email}
              </Text>
            </View>
            <View style={styles.profileDetail}>
              <IconSymbol name="location.fill" size={16} color={colors.textSecondary} />
              <Text style={[styles.profileDetailText, { color: colors.textSecondary }]}>
                {mockUserProfile.location}
              </Text>
            </View>
          </View>
        </Card>

        {/* Paramètres */}
        <Card style={styles.settingsCard}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>
            Paramètres
          </Text>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="globe" size={20} color={colors.primary} />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Langue
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Français
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.teal + '20' }]}>
                <IconSymbol name="bell.fill" size={20} color={colors.teal} />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Notifications
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Activées
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="moon.fill" size={20} color={colors.secondary} />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>
                  Thème
                </Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  {colorScheme === 'dark' ? 'Sombre' : 'Clair'}
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Galerie de photos */}
        <Card style={styles.galleryCard}>
          <View style={styles.galleryHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Galerie de Plantes
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                Voir tout
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.galleryGrid}>
            {mockUserProfile.plantPhotos.map((photo, index) => (
              <TouchableOpacity
                key={index}
                style={styles.galleryItem}
                onPress={() => {
                  console.log('Voir la photo', index);
                }}>
                <Image
                  source={{ uri: photo }}
                  style={styles.galleryImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  profileCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    width: '100%',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  profileDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  profileDetailText: {
    fontSize: 14,
  },
  settingsCard: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  galleryCard: {
    marginBottom: 20,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryItem: {
    width: (width - 72) / 3,
    height: (width - 72) / 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
});

