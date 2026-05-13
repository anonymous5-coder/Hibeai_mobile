import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as Haptics from 'expo-haptics';

export const HapticTouchable = (props: TouchableOpacityProps) => {
  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (props.onPress) props.onPress(e);
  };

  return <TouchableOpacity {...props} onPress={handlePress} />;
};
