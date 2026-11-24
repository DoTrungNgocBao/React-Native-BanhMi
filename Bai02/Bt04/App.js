
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563EB',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '🌏 MultiScreenApp' }}
        />

        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{ title: '🗺️ Danh sách địa điểm' }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: '📍 Chi tiết địa điểm' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
