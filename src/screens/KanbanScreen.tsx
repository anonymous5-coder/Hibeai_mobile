import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { KanbanColumn } from '../components/KanbanColumn';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { CloudOrchestrator } from '../services/cloudOrchestrator';

export const KanbanScreen = () => {
  const [plans, setPlans] = useState([]);
  const [queue, setQueue] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const data = await CloudOrchestrator.fetchStatus();
      setPlans(data.mcts_plans || []);
      setQueue(data.task_queue || []);
    } catch (e) {
      console.error(e);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 10 }}>
      <ScrollView 
        horizontal 
        style={{ flex: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} />}
      >
        <KanbanColumn title="To Do" data={plans} />
        <KanbanColumn title="In Progress" data={queue} />
        <KanbanColumn title="Complete" data={[]} />
      </ScrollView>
    </View>
  );
};
