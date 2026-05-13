import React from 'react';
import { TouchableOpacity, Image, Dimensions } from 'react-native';

const size = Dimensions.get('window').width / 3 - 10;

export const ImageGridTile = ({ url, onPress }: { url: string, onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: url }} style={{ width: size, height: size, margin: 5, borderRadius: 5 }} />
    </TouchableOpacity>
  );
};
