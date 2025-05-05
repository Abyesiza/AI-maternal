import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;

type BPMEntry = { value: number; time: string };

export default function BPMScreen() {
  const [motherBPM, setMotherBPM] = useState('');
  const [babyBPM, setBabyBPM] = useState('');
  const [motherHistory, setMotherHistory] = useState<BPMEntry[]>([]);
  const [babyHistory, setBabyHistory] = useState<BPMEntry[]>([]);

  const logBPM = (type: 'mother' | 'baby') => {
    if (type === 'mother' && motherBPM) {
      setMotherHistory([{ value: Number(motherBPM), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...motherHistory]);
      setMotherBPM('');
    }
    if (type === 'baby' && babyBPM) {
      setBabyHistory([{ value: Number(babyBPM), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...babyHistory]);
      setBabyBPM('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BPM Tracker</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mother</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={motherBPM}
            onChangeText={setMotherBPM}
            placeholder="Enter BPM"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.logButton} onPress={() => logBPM('mother')}>
            <FontAwesome name="plus" size={18} color={colors.card} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={motherHistory}
          keyExtractor={(_, i) => 'm' + i}
          renderItem={({ item }) => (
            <View style={styles.bpmItem}><Text style={styles.bpmValue}>{item.value} bpm</Text><Text style={styles.bpmTime}>{item.time}</Text></View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No readings yet.</Text>}
          keyboardShouldPersistTaps="handled"
          style={{ maxHeight: height * 0.25 }}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Baby</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={babyBPM}
            onChangeText={setBabyBPM}
            placeholder="Enter BPM"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.logButton} onPress={() => logBPM('baby')}>
            <FontAwesome name="plus" size={18} color={colors.card} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={babyHistory}
          keyExtractor={(_, i) => 'b' + i}
          renderItem={({ item }) => (
            <View style={styles.bpmItem}><Text style={styles.bpmValue}>{item.value} bpm</Text><Text style={styles.bpmTime}>{item.time}</Text></View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No readings yet.</Text>}
          keyboardShouldPersistTaps="handled"
          style={{ maxHeight: height * 0.25 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.light, padding: isSmallScreen ? 8 : 16 },
  title: { fontSize: isSmallScreen ? 18 : 22, fontWeight: 'bold', color: colors.error, marginBottom: isSmallScreen ? 10 : 16, textAlign: 'center' },
  section: { marginBottom: isSmallScreen ? 16 : 24 },
  sectionTitle: { fontSize: isSmallScreen ? 15 : 18, fontWeight: 'bold', color: colors.text.light, marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  input: { flex: 1, backgroundColor: colors.card, borderRadius: 8, paddingHorizontal: isSmallScreen ? 8 : 12, paddingVertical: isSmallScreen ? 6 : 8, fontSize: isSmallScreen ? 14 : 16, marginRight: 8, color: colors.text.light },
  logButton: { backgroundColor: colors.error, borderRadius: 8, padding: 12, minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  bpmItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderRadius: 8, padding: isSmallScreen ? 8 : 10, marginBottom: 6, minHeight: 44 },
  bpmValue: { fontWeight: 'bold', color: colors.text.light, fontSize: isSmallScreen ? 14 : 16 },
  bpmTime: { color: colors.text.light, opacity: 0.7, fontSize: isSmallScreen ? 10 : 12 },
  empty: { color: colors.text.light, opacity: 0.5, fontStyle: 'italic', textAlign: 'center', marginTop: 8 },
}); 