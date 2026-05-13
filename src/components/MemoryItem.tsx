import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const MemoryItem = ({ memKey, value }: { memKey: string, value: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{ padding: 10, borderBottomWidth: 1, borderColor: DarkHackerTheme.border, backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <Text style={{ color: DarkHackerTheme.accent, fontWeight: 'bold', fontFamily: 'monospace' }}>{memKey}</Text>
      <Text style={{ color: DarkHackerTheme.text, marginTop: 5, fontFamily: 'monospace' }}>
        {expanded ? value : value.substring(0, 50) + '...'}
      </Text>
    </TouchableOpacity>
  );
};
