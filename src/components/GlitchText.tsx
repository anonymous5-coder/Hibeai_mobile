import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

export const GlitchText = ({ text }: { text: string }) => {
  const redOffset = useSharedValue(0);
  const blueOffset = useSharedValue(0);

  useEffect(() => {
    const glitchSequence = () => withSequence(
      withTiming(-2, { duration: 50 }),
      withTiming(2, { duration: 50 }),
      withTiming(0, { duration: 50 }),
      withTiming(0, { duration: Math.random() * 2000 + 1000 })
    );

    redOffset.value = withRepeat(glitchSequence(), -1, true);
    blueOffset.value = withRepeat(glitchSequence(), -1, true);
  }, []);

  const redStyle = useAnimatedStyle(() => ({ transform: [{ translateX: redOffset.value }] }));
  const blueStyle = useAnimatedStyle(() => ({ transform: [{ translateX: -blueOffset.value }] }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { color: 'rgba(255,0,0,0.8)', position: 'absolute' }, redStyle]}>{text}</Animated.Text>
      <Animated.Text style={[styles.text, { color: 'rgba(0,255,255,0.8)', position: 'absolute' }, blueStyle]}>{text}</Animated.Text>
      <Text style={[styles.text, { color: 'white' }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative' },
  text: { fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace' }
});
