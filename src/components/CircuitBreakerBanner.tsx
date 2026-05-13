import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const CircuitBreakerBanner = ({ until }: { until: string | null }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!until) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, new Date(until).getTime() - Date.now());
      setTimeLeft(Math.floor(remaining / 1000));
      if (remaining === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [until]);

  if (!until || timeLeft <= 0) return null;

  return (
    <View style={{ backgroundColor: DarkHackerTheme.warning, padding: 10, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: DarkHackerTheme.error }}>
      <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>
        SYSTEM OVERLOAD // COOLING: {timeLeft}s
      </Text>
    </View>
  );
};
