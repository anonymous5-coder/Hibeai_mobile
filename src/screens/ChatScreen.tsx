import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BuilderChatBubble } from '../components/BuilderChatBubble';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { EmergentClient } from '../services/emergentClient';
import { loadState, snapshotState } from '../database';
import { CanvasState, ChatMessage } from '../models/canvasState';
import { FileUploadSheet } from '../components/FileUploadSheet';

export const ChatScreen = () => {
  const [state, setState] = useState<CanvasState | null>(null);
  const [input, setInput] = useState('');
  const [sheetVisible, setSheetVisible] = useState(false);

  useEffect(() => {
    loadState().then(setState);
  }, []);

  const handleSend = async () => {
    if (!input || !state) return;
    
    if (state.isCircuitBreakerActive) {
      if (state.circuitBreakerUntil && new Date() < new Date(state.circuitBreakerUntil)) return;
      state.isCircuitBreakerActive = false;
      state.circuitBreakerUntil = null;
    }

    const startMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date().toISOString() };
    const newHistory = [...(state.localHistory || []), startMsg];
    setState({ ...state, localHistory: newHistory });
    setInput('');

    try {
      const response = await EmergentClient.chat(state.systemPrompts['main'] || 'You are Hibeai.', newHistory);
      const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date().toISOString() };
      const updatedHistory = [...newHistory, aiMsg];
      const newState = { ...state, localHistory: updatedHistory, trustScore: Math.min(1000, state.trustScore + 5) };
      setState(newState);
      await snapshotState(newState);
    } catch (e) {
      console.error(e);
      const budget = Math.max(0, state.errorBudget - 1);
      const newState = { ...state, errorBudget: budget };
      if (budget === 0) {
        newState.isCircuitBreakerActive = true;
        newState.circuitBreakerUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      }
      setState(newState);
      await snapshotState(newState);
    }
  };

  if (!state) return <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary }} />;

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 10 }}>
      {state.isCircuitBreakerActive && (
        <View style={{ backgroundColor: DarkHackerTheme.error, padding: 10, marginBottom: 10 }}>
          <Text style={{ color: 'white' }}>Circuit Breaker Active - Cooldown</Text>
        </View>
      )}
      <FlatList
        data={state.localHistory}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <BuilderChatBubble role={item.role} content={item.content} />
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: DarkHackerTheme.header, padding: 10, borderRadius: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' }}>
        <TouchableOpacity onPress={() => setSheetVisible(true)} style={{ padding: 10 }}>
          <Text style={{ color: DarkHackerTheme.accent, fontSize: 18 }}>📎</Text>
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter command to orchestrator..."
          placeholderTextColor={DarkHackerTheme.mutedText}
          style={{ flex: 1, color: DarkHackerTheme.text, backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 5, fontFamily: 'monospace' }}
        />
        <TouchableOpacity onPress={handleSend} style={{ padding: 10, marginLeft: 10, backgroundColor: DarkHackerTheme.accent, borderRadius: 5 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>EXECUTE</Text>
        </TouchableOpacity>
      </View>
      {sheetVisible && <FileUploadSheet onClose={() => setSheetVisible(false)} onFileSelected={(content) => { setInput(prev => prev + '\n' + content); setSheetVisible(false); }} />}
    </View>
  );
};
