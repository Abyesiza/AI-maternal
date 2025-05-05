import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../styles/theme';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { isSignedIn, userId } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text.light} />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarIcon}>
            <FontAwesome name="user-circle" size={80} color={colors.primary} />
          </View>
          <TouchableOpacity style={styles.editAvatarButton}>
            <FontAwesome name="camera" size={16} color={colors.card} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            ) : (
              <Text style={styles.value}>{name}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.value}>{phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Due Date</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="Enter your due date"
              />
            ) : (
              <Text style={styles.value}>{dueDate || 'Not set'}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, isEditing && styles.saveButton]}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
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
  profileSection: {
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  avatarIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  infoContainer: {
    width: '100%',
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
  },
  value: {
    fontSize: 16,
    color: colors.text.light,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text.light,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
    ...shadows.small,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
}); 