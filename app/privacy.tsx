import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../styles/theme';
import { router } from 'expo-router';

export default function PrivacyScreen() {
  const [privacySettings, setPrivacySettings] = useState({
    shareHealthData: false,
    shareLocation: false,
    shareDueDate: true,
    shareAppointments: false,
    shareWithPartner: true,
  });

  const toggleSetting = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const privacyOptions = [
    {
      title: 'Share Health Data',
      description: 'Allow sharing of health metrics with healthcare providers',
      icon: 'heart' as const,
      key: 'shareHealthData' as const,
    },
    {
      title: 'Share Location',
      description: 'Share location for emergency services and nearby clinics',
      icon: 'map-marker' as const,
      key: 'shareLocation' as const,
    },
    {
      title: 'Share Due Date',
      description: 'Show due date in your profile',
      icon: 'calendar' as const,
      key: 'shareDueDate' as const,
    },
    {
      title: 'Share Appointments',
      description: 'Allow partner to view your appointment schedule',
      icon: 'calendar-check-o' as const,
      key: 'shareAppointments' as const,
    },
    {
      title: 'Share with Partner',
      description: 'Share pregnancy progress with your partner',
      icon: 'user' as const,
      key: 'shareWithPartner' as const,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text.light} />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy</Text>
      </View>

      <View style={styles.content}>
        {privacyOptions.map((option) => (
          <View key={option.key} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <FontAwesome name={option.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.settingTitle}>{option.title}</Text>
                <Text style={styles.settingDescription}>{option.description}</Text>
              </View>
            </View>
            <Switch
              value={privacySettings[option.key]}
              onValueChange={() => toggleSetting(option.key)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Download My Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  content: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...shadows.small,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.light,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    ...shadows.small,
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
}); 