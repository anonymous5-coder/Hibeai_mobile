import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const AgentCard = ({ name, status, log }: any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.status, { color: status === 'error' ? DarkHackerTheme.error : DarkHackerTheme.success }]}>{status}</Text>
      <Text style={styles.log}>{log}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 5, backgroundColor: DarkHackerTheme.secondary, borderRadius: 5, borderWidth: 1, borderColor: DarkHackerTheme.border },
  name: { color: DarkHackerTheme.accent, fontWeight: 'bold', fontFamily: 'monospace' },
  status: { marginTop: 5, textTransform: 'uppercase', fontFamily: 'monospace' },
  log: { color: DarkHackerTheme.mutedText, marginTop: 10, fontSize: 12, fontFamily: 'monospace' }
});
