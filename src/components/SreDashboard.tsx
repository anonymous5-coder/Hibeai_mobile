import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VictoryPie, VictoryBar, VictoryChart } from 'victory-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { loadState } from '../database';
import { CanvasState } from '../models/canvasState';

export const SreDashboard = () => {
  const [state, setState] = useState<CanvasState | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      loadState().then(setState);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!state) return <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary }} />;

  const tokenData = [
    { x: "Used", y: state.dailyTokenUsage },
    { x: "Remaining", y: Math.max(0, 500000 - state.dailyTokenUsage) }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 10 }}>
      <Text style={{ color: DarkHackerTheme.accent, fontSize: 24, marginBottom: 20, fontFamily: 'monospace', fontWeight: 'bold', tracking: 2 }}>SRE // TELEMETRY</Text>
      
      <View style={{ marginBottom: 20, backgroundColor: DarkHackerTheme.secondary, padding: 15, borderRadius: 5, borderWidth: 1, borderColor: DarkHackerTheme.border }}>
        <Text style={{ color: DarkHackerTheme.text, fontSize: 18, fontFamily: 'monospace' }}>Trust Score: {state.trustScore}/1000</Text>
        <Text style={{ color: DarkHackerTheme.text, fontSize: 18, fontFamily: 'monospace', marginTop: 5 }}>Error Budget: {state.errorBudget}/3</Text>
      </View>

      <Text style={{ color: DarkHackerTheme.accent, fontSize: 18, fontFamily: 'monospace' }}>Token Budget</Text>
      <View style={{ alignItems: 'center' }}>
        <VictoryPie
          data={tokenData}
          colorScale={[DarkHackerTheme.error, DarkHackerTheme.success]}
          innerRadius={50}
          height={200}
          style={{ labels: { fill: DarkHackerTheme.text, fontFamily: 'monospace' } }}
        />
      </View>

      <Text style={{ color: DarkHackerTheme.accent, fontSize: 18, marginTop: 20, fontFamily: 'monospace' }}>Recent Error Hashes</Text>
      {state.recentErrorHashes.length === 0 ? (
         <Text style={{ color: DarkHackerTheme.mutedText, fontSize: 12, fontFamily: 'monospace', marginTop: 10 }}>[NO ERRORS RECORDED]</Text>
      ) : (
         state.recentErrorHashes.map((hash, i) => (
           <Text key={i} style={{ color: DarkHackerTheme.error, fontSize: 12, fontFamily: 'monospace', marginTop: 5 }}>{hash}</Text>
         ))
      )}

    </ScrollView>
  );
};
