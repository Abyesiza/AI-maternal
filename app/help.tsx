import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../styles/theme';
import { router } from 'expo-router';

export default function HelpScreen() {
  const faqs = [
    {
      question: 'How do I update my due date?',
      answer: 'You can update your due date in the Profile section. Go to Settings > Profile and tap on the due date field to edit it.',
    },
    {
      question: 'How do I share my health data with my doctor?',
      answer: 'In the Privacy settings, you can enable sharing of health data. This will allow your healthcare provider to access your health metrics.',
    },
    {
      question: 'Can I add my partner to the app?',
      answer: 'Yes, you can invite your partner through the Profile section. They will need to create their own account to access shared information.',
    },
    {
      question: 'How do I schedule an appointment?',
      answer: 'Go to the Schedule tab and tap the + button to add a new appointment. You can select the type of appointment and choose a date and time.',
    },
  ];

  const supportOptions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: 'headphones' as const,
      action: () => Linking.openURL('mailto:support@maternityapp.com'),
    },
    {
      title: 'FAQ',
      description: 'View frequently asked questions',
      icon: 'question-circle' as const,
      action: () => Linking.openURL('https://maternityapp.com/faq'),
    },
    {
      title: 'User Guide',
      description: 'Read our comprehensive user guide',
      icon: 'book' as const,
      action: () => Linking.openURL('https://maternityapp.com/guide'),
    },
    {
      title: 'Report a Problem',
      description: 'Let us know about any issues',
      icon: 'bug' as const,
      action: () => Linking.openURL('https://maternityapp.com/report'),
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
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Options</Text>
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.supportItem}
              onPress={option.action}
            >
              <View style={styles.supportInfo}>
                <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                  <FontAwesome name={option.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.supportTitle}>{option.title}</Text>
                  <Text style={styles.supportDescription}>{option.description}</Text>
                </View>
              </View>
              <FontAwesome name="chevron-right" size={16} color={colors.text.light} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>App Version 1.0.0</Text>
          <Text style={styles.footerText}>© 2024 Maternity App</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...shadows.small,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.light,
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
    lineHeight: 20,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...shadows.small,
  },
  supportInfo: {
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
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.light,
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 12,
    color: colors.text.light,
    opacity: 0.5,
    marginBottom: 4,
  },
}); 