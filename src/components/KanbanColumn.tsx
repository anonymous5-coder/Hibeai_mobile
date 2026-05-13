import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { KanbanCard } from './KanbanCard';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const KanbanColumn = ({ title, data }: any) => (
  <View style={{ flex: 1, margin: 5, backgroundColor: DarkHackerTheme.secondary, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: DarkHackerTheme.border }}>
    <Text style={{ color: DarkHackerTheme.text, fontWeight: 'bold', marginBottom: 10, fontFamily: 'monospace' }}>{title}</Text>
    <FlatList
      data={data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => <KanbanCard {...item} />}
    />
  </View>
);
