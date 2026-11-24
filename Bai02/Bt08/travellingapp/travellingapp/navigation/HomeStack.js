
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

import DestinationDetailScreen from '../screens/DestinationDetailScreen';

import TravelPlannerScreen from '../screens/TravelPlannerScreen';

import { useTravel } from '../context/TravelContext';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { colors } = useTravel();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="DestinationDetail"
        component={DestinationDetailScreen}
      />

      <Stack.Screen
        name="TravelPlanner"
        component={TravelPlannerScreen}
      />
    </Stack.Navigator>
  );
}
