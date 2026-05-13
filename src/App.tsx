import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatScreen } from './screens/ChatScreen';
import { GatewayScreen } from './screens/GatewayScreen';
import { ImageScreen } from './screens/ImageScreen';
import { DarkHackerTheme } from './theme/darkHackerTheme';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DummyScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: DarkHackerTheme.text }}>{name}</Text>
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: DarkHackerTheme.header, borderTopWidth: 1, borderTopColor: 'rgba(102,252,241,0.2)' },
        tabBarActiveTintColor: DarkHackerTheme.accent,
        tabBarInactiveTintColor: DarkHackerTheme.mutedText,
        headerStyle: { backgroundColor: DarkHackerTheme.header, borderBottomWidth: 1, borderBottomColor: 'rgba(102,252,241,0.2)' },
        headerTintColor: DarkHackerTheme.accent,
        headerTitleStyle: { fontFamily: 'monospace', fontWeight: 'bold', tracking: 2 }
      }}
    >
      <Tab.Screen name="ChatTab" component={ChatScreen} options={{ title: 'Chat' }} />
      <Tab.Screen name="Images" component={ImageScreen} />
      <Tab.Screen name="SreDashboard" component={() => <DummyScreen name="SRE" />} />
      <Tab.Screen name="Settings" component={() => <DummyScreen name="Settings" />} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Gateway" component={GatewayScreen} />
        <Stack.Screen name="Chat" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
