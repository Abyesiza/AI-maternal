import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const resources = [
  {
    title: 'Pregnancy Nutrition Guide',
    description: 'Learn about essential nutrients and meal planning during pregnancy',
    icon: 'cutlery',
    url: 'https://example.com/nutrition-guide',
  },
  {
    title: 'Exercise & Wellness',
    description: 'Safe exercises and wellness tips for expecting mothers',
    icon: 'heartbeat',
    url: 'https://example.com/exercise-guide',
  },
  {
    title: 'Mental Health Support',
    description: 'Resources for managing stress and emotional well-being',
    icon: 'smile-o',
    url: 'https://example.com/mental-health',
  },
  {
    title: 'Prenatal Classes',
    description: 'Find local and online prenatal education classes',
    icon: 'graduation-cap',
    url: 'https://example.com/prenatal-classes',
  },
];

export default function ResourcesScreen() {
  const handleResourcePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>Educational content and helpful links</Text>
      </View>

      <View style={styles.resourcesList}>
        {resources.map((resource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.resourceCard}
            onPress={() => handleResourcePress(resource.url)}
          >
            <View style={styles.resourceIcon}>
              <FontAwesome name={resource.icon as any} size={24} color={colors.primary} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color={colors.text.light} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.light,
    opacity: 0.7,
  },
  resourcesList: {
    gap: 16,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.light,
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
  },
}); 