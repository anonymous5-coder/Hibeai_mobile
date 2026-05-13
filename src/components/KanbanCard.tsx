import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const KanbanCard = ({ title, agent, confidence }: any) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.agent}>{agent}</Text>
    <Text style={styles.confidence}>{confidence}% Confidence</Text>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 5, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  title: { color: DarkHackerTheme.text, fontWeight: 'bold', fontFamily: 'monospace' },
  agent: { color: DarkHackerTheme.accent, fontSize: 12, fontFamily: 'monospace' },
  confidence: { color: DarkHackerTheme.success, fontSize: 12, fontFamily: 'monospace' }
});
