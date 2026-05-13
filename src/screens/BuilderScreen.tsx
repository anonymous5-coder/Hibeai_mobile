import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { CloudBuilder } from '../services/cloudOrchestrator';
import { BuilderChatBubble } from '../components/BuilderChatBubble';

export const BuilderScreen = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{role: string, content: string}[]>([]);

  const submit = async () => {
    if (!input) return;
    setHistory([...history, { role: 'user', content: input }]);
    setInput('');
    try {
      const buildId = await CloudBuilder.submitAppIdea(input);
      setHistory(prev => [...prev, { role: 'assistant', content: `Build started. ID: ${buildId}. Use dashboard to track.` }]);
    } catch (e) {
      setHistory(prev => [...prev, { role: 'assistant', content: `Error: ${e}` }]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 10 }}>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <BuilderChatBubble role={item.role} content={item.content} />}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: DarkHackerTheme.header, padding: 10, borderRadius: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Describe your app..."
          placeholderTextColor={DarkHackerTheme.mutedText}
          style={{ flex: 1, color: DarkHackerTheme.text, backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 5, fontFamily: 'monospace' }}
        />
        <TouchableOpacity onPress={submit} style={{ padding: 10, marginLeft: 10, backgroundColor: DarkHackerTheme.accent, borderRadius: 5 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>BUILD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
