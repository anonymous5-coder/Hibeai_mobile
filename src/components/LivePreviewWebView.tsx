import React from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const LivePreviewWebView = ({ url, onClose }: any) => {
  return (
    <Modal visible transparent={false} animationType="slide">
      <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary }}>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', backgroundColor: DarkHackerTheme.header, borderBottomWidth: 1, borderBottomColor: DarkHackerTheme.border }}>
          <Text style={{ color: DarkHackerTheme.accent, fontFamily: 'monospace' }}>Preview: {url}</Text>
          <TouchableOpacity onPress={onClose}><Text style={{ color: DarkHackerTheme.error, fontFamily: 'monospace', fontWeight: 'bold' }}>CLOSE</Text></TouchableOpacity>
        </View>
        <WebView source={{ uri: url }} style={{ flex: 1 }} />
      </View>
    </Modal>
  );
};
