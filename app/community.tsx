import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 375;

type Thread = { id: string; title: string; replies: number };
const initialThreads: Thread[] = [
  { id: '1', title: 'Welcome to the Community!', replies: 3 },
  { id: '2', title: 'Share your pregnancy tips', replies: 7 },
  { id: '3', title: 'Ask a midwife', replies: 2 },
];

export default function CommunityScreen() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  if (selectedThread) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedThread(null)} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color={colors.primary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.threadTitle}>{selectedThread.title}</Text>
        <Text style={styles.placeholder}>Replies coming soon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Forum</Text>
      <FlatList
        data={threads}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.threadItem} onPress={() => setSelectedThread(item)}>
            <Text style={styles.threadText}>{item.title}</Text>
            <View style={styles.replies}><FontAwesome name="comments" size={14} color={colors.info} /><Text style={styles.repliesText}>{item.replies}</Text></View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
        style={{ maxHeight: width < 400 ? 220 : 320 }}
      />
      <TouchableOpacity style={styles.newThreadButton}>
        <FontAwesome name="plus" size={16} color={colors.card} />
        <Text style={styles.newThreadText}>New Thread</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.light, padding: isSmallScreen ? 8 : 16 },
  title: { fontSize: isSmallScreen ? 18 : 22, fontWeight: 'bold', color: colors.primary, marginBottom: isSmallScreen ? 10 : 16, textAlign: 'center' },
  threadItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderRadius: 10, padding: isSmallScreen ? 10 : 14, marginBottom: 10, minHeight: 44 },
  threadText: { fontSize: isSmallScreen ? 14 : 16, color: colors.text.light, flex: 1, flexWrap: 'wrap' },
  replies: { flexDirection: 'row', alignItems: 'center' },
  repliesText: { marginLeft: 4, color: colors.info, fontWeight: 'bold' },
  newThreadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 8, paddingVertical: isSmallScreen ? 8 : 10, paddingHorizontal: isSmallScreen ? 12 : 18, alignSelf: 'center', marginTop: 10, minHeight: 44 },
  newThreadText: { color: colors.card, fontWeight: 'bold', marginLeft: 8 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, minHeight: 44 },
  backText: { marginLeft: 6, color: colors.primary, fontWeight: 'bold' },
  threadTitle: { fontSize: isSmallScreen ? 15 : 18, fontWeight: 'bold', color: colors.primary, marginBottom: 12 },
  placeholder: { color: colors.text.light, opacity: 0.7 },
}); 