import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const StatusDot = ({ status }: { status: 'idle' | 'working' | 'error' }) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (status === 'working') {
      opacity.value = withRepeat(withSequence(withTiming(0.2, { duration: 500 }), withTiming(1, { duration: 500 })), -1, true);
    } else {
      opacity.value = 1;
    }
  }, [status]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const color = status === 'working' ? DarkHackerTheme.accent : status === 'error' ? DarkHackerTheme.error : DarkHackerTheme.success;

  return <Animated.View style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }, style]} />;
};
