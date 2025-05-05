import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../styles/theme';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const menuItems = [
    {
      title: 'Profile',
      icon: 'user-circle' as const,
      color: colors.primary,
      onPress: () => router.push('/profile'),
    },
    {
      title: 'Notifications',
      icon: 'bell' as const,
      color: colors.secondary,
      onPress: () => router.push('/notifications'),
    },
    {
      title: 'Privacy',
      icon: 'lock' as const,
      color: colors.accent,
      onPress: () => router.push('/privacy'),
    },
    {
      title: 'Help & Support',
      icon: 'question-circle' as const,
      color: colors.info,
      onPress: () => router.push('/help'),
    },
    {
      title: 'Sign Out',
      icon: 'sign-out' as const,
      color: colors.error,
      onPress: handleSignOut,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <FontAwesome name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.light,
    fontWeight: '500',
  },
}); 