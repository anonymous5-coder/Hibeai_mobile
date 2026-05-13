import React from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const FileUploadSheet = ({ onClose, onFileSelected }: { onClose: () => void, onFileSelected: (content: string) => void }) => {
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets && result.assets.length > 0) {
      InteractionManager.runAfterInteractions(() => {
        const content = result.assets[0].name || "data";
        const injected = `<SYSTEM_ARCHITECTURE_FILE path="${result.assets[0].name}">\n${content}\n</SYSTEM_ARCHITECTURE_FILE>`;
        onFileSelected(injected);
      });
    } else {
      onClose();
    }
  };

  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, backgroundColor: DarkHackerTheme.secondary, padding: 20, borderTopWidth: 1, borderTopColor: DarkHackerTheme.border }}>
      <Text style={{ color: DarkHackerTheme.text, marginBottom: 20, fontFamily: 'monospace' }}>Upload Architecture File</Text>
      <TouchableOpacity onPress={pickDocument} style={{ backgroundColor: DarkHackerTheme.accent, padding: 15, borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>Pick Document</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: DarkHackerTheme.error, fontFamily: 'monospace' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
