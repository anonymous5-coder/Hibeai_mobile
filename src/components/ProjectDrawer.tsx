import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { loadState } from '../database';
import { Project } from '../models/canvasState';

export const ProjectDrawer = ({ onSelectProject }: { onSelectProject: (id: string) => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadState().then(s => setProjects(s.projects));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.secondary, padding: 20, paddingTop: 50, borderRightWidth: 1, borderRightColor: DarkHackerTheme.border }}>
      <Text style={{ color: DarkHackerTheme.accent, fontSize: 20, marginBottom: 20, fontFamily: 'monospace' }}>PROJECT_WORKSPACE</Text>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectProject(item.id)} style={{ padding: 15, borderBottomWidth: 1, borderColor: DarkHackerTheme.border }}>
            <Text style={{ color: DarkHackerTheme.text, fontSize: 16, fontFamily: 'monospace' }}>{item.name}</Text>
            <Text style={{ color: DarkHackerTheme.mutedText, fontSize: 12, fontFamily: 'monospace' }}>{new Date(item.lastOpenedAt).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
