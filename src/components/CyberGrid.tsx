import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export const CyberGrid = () => {
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withRepeat(
      withTiming(20, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Animated.View style={[{ height: windowHeight + 20, width: '100%' }, animatedStyle]}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View key={i} style={{ width: '100%', height: 1, backgroundColor: 'rgba(102,252,241,0.05)', marginTop: 19 }} />
        ))}
      </Animated.View>
    </View>
  );
};
