import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const ImageInputSheet = ({ onClose, onImage }: { onClose: () => void, onImage: (uri: string) => void }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      onImage(result.assets[0].uri);
    }
    onClose();
  };

  const pasteImage = async () => {
    const hasImage = await Clipboard.hasImageAsync();
    if (hasImage) {
      const img = await Clipboard.getImageAsync({ format: 'jpeg' });
      if (img) onImage(img.data);
    }
    onClose();
  };

  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 250, backgroundColor: DarkHackerTheme.secondary, padding: 20, borderTopWidth: 1, borderTopColor: DarkHackerTheme.border }}>
      <Text style={{ color: DarkHackerTheme.text, marginBottom: 20, fontFamily: 'monospace' }}>Attach Image</Text>
      <TouchableOpacity onPress={pickImage} style={{ backgroundColor: DarkHackerTheme.accent, padding: 15, borderRadius: 5, alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>Choose from Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pasteImage} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 5, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
        <Text style={{ color: DarkHackerTheme.text, fontFamily: 'monospace' }}>Paste from Clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: DarkHackerTheme.error, fontFamily: 'monospace' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
