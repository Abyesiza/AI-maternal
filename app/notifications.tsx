import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../styles/theme';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    healthCheckReminders: true,
    weeklyUpdates: true,
    emergencyAlerts: true,
    marketingEmails: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationSettings = [
    {
      title: 'Appointment Reminders',
      description: 'Get notified about upcoming appointments',
      icon: 'calendar' as const,
      key: 'appointmentReminders' as const,
    },
    {
      title: 'Health Check Reminders',
      description: 'Reminders for regular health check-ups',
      icon: 'heart' as const,
      key: 'healthCheckReminders' as const,
    },
    {
      title: 'Weekly Updates',
      description: 'Receive weekly pregnancy progress updates',
      icon: 'newspaper-o' as const,
      key: 'weeklyUpdates' as const,
    },
    {
      title: 'Emergency Alerts',
      description: 'Important health alerts and warnings',
      icon: 'exclamation-triangle' as const,
      key: 'emergencyAlerts' as const,
    },
    {
      title: 'Marketing Emails',
      description: 'Receive promotional offers and updates',
      icon: 'envelope' as const,
      key: 'marketingEmails' as const,
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
        <Text style={styles.title}>Notifications</Text>
      </View>

      <View style={styles.content}>
        {notificationSettings.map((setting) => (
          <View key={setting.key} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <FontAwesome name={setting.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </View>
            </View>
            <Switch
              value={notifications[setting.key]}
              onValueChange={() => toggleNotification(setting.key)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.card}
            />
          </View>
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
}); 