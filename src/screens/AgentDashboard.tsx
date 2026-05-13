import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { AgentCard } from '../components/AgentCard';
import { DeployButton } from '../components/DeployButton';
import { CloudBuilder } from '../services/cloudOrchestrator';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const AgentDashboard = ({ buildId }: any) => {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    if (!buildId) return;
    const interval = setInterval(async () => {
      const data = await CloudBuilder.getBuildStatus(buildId);
      setStatus(data);
    }, 10000);
    return () => clearInterval(interval);
  }, [buildId]);

  if (!status) return <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary }} />;

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 10 }}>
      <Text style={{ color: DarkHackerTheme.accent, fontSize: 20, marginBottom: 10, fontFamily: 'monospace', fontWeight: 'bold' }}>PHASE: {status.phase}</Text>
      <FlatList
        data={status.agents}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <AgentCard {...item} />}
      />
      {status.phase === 'Done' && <DeployButton buildId={buildId} onDeployed={(url: string) => console.log('Deployed', url)} />}
    </View>
  );
};
