import React from 'react';
import { View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const ImageViewerModal = ({ url, onClose }: { url: string, onClose: () => void }) => {
  return (
    <Modal visible={true} transparent={true} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: url }} style={{ width: '100%', height: '80%' }} resizeMode="contain" />
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 50, right: 20 }}>
          <Text style={{ color: DarkHackerTheme.error, fontSize: 18, fontWeight: 'bold' }}>✕</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
