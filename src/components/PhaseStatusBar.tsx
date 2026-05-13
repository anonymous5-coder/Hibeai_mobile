import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const PhaseStatusBar = ({ phase, description }: { phase: string, description: string }) => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[{ backgroundColor: DarkHackerTheme.secondary, padding: 10, margin: 10, borderRadius: 5, borderLeftWidth: 3, borderLeftColor: DarkHackerTheme.accent, borderWidth: 1, borderColor: DarkHackerTheme.border }, animatedStyle]}>
      <Text style={{ color: DarkHackerTheme.accent, fontWeight: 'bold', fontFamily: 'monospace' }}>{phase}</Text>
      <Text style={{ color: DarkHackerTheme.text, fontSize: 12, fontFamily: 'monospace' }}>{description}</Text>
    </Animated.View>
  );
};
