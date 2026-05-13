import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const CodePreviewModal = ({ files, onClose }: any) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Modal visible transparent animationType="slide">
      <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, marginTop: 50, borderTopWidth: 2, borderTopColor: DarkHackerTheme.border, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: DarkHackerTheme.header, borderBottomWidth: 1, borderBottomColor: DarkHackerTheme.border }}>
          {files.map((f: any, i: number) => (
            <TouchableOpacity key={i} onPress={() => setActiveTab(i)} style={{ padding: 5, borderBottomWidth: activeTab === i ? 2 : 0, borderColor: DarkHackerTheme.accent }}>
              <Text style={{ color: activeTab === i ? DarkHackerTheme.accent : DarkHackerTheme.mutedText, fontFamily: 'monospace' }}>{f.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} style={{ marginLeft: 'auto' }}><Text style={{ color: DarkHackerTheme.error, fontSize: 18 }}>✕</Text></TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <SyntaxHighlighter language="javascript">
            {files[activeTab]?.code || ''}
          </SyntaxHighlighter>
        </ScrollView>
      </View>
    </Modal>
  );
};
