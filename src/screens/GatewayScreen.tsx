import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Crypto from 'expo-crypto';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const GatewayScreen = ({ navigation }: any) => {
  const [initPrompt, setInitPrompt] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (initPrompt.length > 10000) {
      setError('Token Flooding Defence: Prompt exceeds 10,000 characters. Blocked.');
      return;
    }
    const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, initPrompt);
    if (initPrompt.includes('DROP TABLE')) {
       setError('Injection detected.');
       return;
    }
    navigation.replace('Chat');
  };

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 20, justifyContent: 'center' }}>
      <Text style={{ color: DarkHackerTheme.accent, fontSize: 24, marginBottom: 20, fontFamily: 'monospace', fontWeight: 'bold', tracking: 2 }}>HIBEAI // GATEWAY</Text>
      <TextInput
        value={initPrompt}
        onChangeText={setInitPrompt}
        placeholder="Enter initialization sequence..."
        placeholderTextColor={DarkHackerTheme.mutedText}
        multiline
        style={{ height: 150, color: DarkHackerTheme.text, backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, textAlignVertical: 'top', marginBottom: 10, borderRadius: 5, fontFamily: 'monospace' }}
      />
      {error ? <Text style={{ color: DarkHackerTheme.error, marginBottom: 10 }}>{error}</Text> : null}
      <TouchableOpacity onPress={submit} style={{ backgroundColor: DarkHackerTheme.accent, padding: 15, alignItems: 'center', borderRadius: 5 }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>INITIALIZE</Text>
      </TouchableOpacity>
    </View>
  );
};
