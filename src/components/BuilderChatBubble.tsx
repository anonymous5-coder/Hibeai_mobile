import React from 'react';
import { View, Text } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const BuilderChatBubble = ({ role, content }: { role: string, content: string }) => {
  return (
    <View style={{ padding: 15, marginVertical: 5, backgroundColor: role === 'user' ? DarkHackerTheme.messageUser : DarkHackerTheme.messageSys, borderRadius: 8, borderWidth: 1, borderColor: role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(102,252,241,0.1)' }}>
      {content.includes('```') ? (
        <SyntaxHighlighter language="typescript" style={{}}>{content}</SyntaxHighlighter>
      ) : (
        <Text style={{ color: DarkHackerTheme.text, fontFamily: 'monospace' }}>{content}</Text>
      )}
    </View>
  );
};
