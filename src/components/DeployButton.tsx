import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { CloudBuilder } from '../services/cloudOrchestrator';

export const DeployButton = ({ buildId, onDeployed }: any) => {
  const [loading, setLoading] = useState(false);

  const deploy = async () => {
    setLoading(true);
    try {
      const url = await CloudBuilder.deployApp(buildId);
      onDeployed(url);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <TouchableOpacity onPress={deploy} style={{ backgroundColor: DarkHackerTheme.success, padding: 15, borderRadius: 5, alignItems: 'center' }}>
      {loading ? <ActivityIndicator color="#000" /> : <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>DEPLOY NOW</Text>}
    </TouchableOpacity>
  );
};
