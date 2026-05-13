import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { CloudOrchestrator } from '../services/cloudOrchestrator';
import { MemoryItem } from '../components/MemoryItem';
import { DarkHackerTheme } from '../theme/darkHackerTheme';

export const MemoryScreen = () => {
  const [memory, setMemory] = useState<Record<string, string>>({});

  useEffect(() => {
    CloudOrchestrator.getMemory().then(res => setMemory(res.active_compressed_context || {}));
  }, []);

  const canvas_add = () => console.log('canvas_add');
  const canvas_update = () => console.log('canvas_update');
  const canvas_filter = () => console.log('canvas_filter');
  const canvas_delete = () => console.log('canvas_delete');
  const canvas_summary = () => console.log('canvas_summary');

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: DarkHackerTheme.header, borderBottomWidth: 1, borderBottomColor: DarkHackerTheme.border }}>
        <TouchableOpacity onPress={canvas_add}><Text style={{color: DarkHackerTheme.accent, fontFamily: 'monospace'}}>Add</Text></TouchableOpacity>
        <TouchableOpacity onPress={canvas_update}><Text style={{color: DarkHackerTheme.accent, fontFamily: 'monospace'}}>Update</Text></TouchableOpacity>
        <TouchableOpacity onPress={canvas_filter}><Text style={{color: DarkHackerTheme.accent, fontFamily: 'monospace'}}>Filter</Text></TouchableOpacity>
        <TouchableOpacity onPress={canvas_delete}><Text style={{color: DarkHackerTheme.error, fontFamily: 'monospace'}}>Delete</Text></TouchableOpacity>
      </View>
      <FlatList
        data={Object.entries(memory)}
        keyExtractor={([k]) => k}
        renderItem={({ item: [k, v] }) => <MemoryItem memKey={k} value={v} />}
      />
    </View>
  );
};
