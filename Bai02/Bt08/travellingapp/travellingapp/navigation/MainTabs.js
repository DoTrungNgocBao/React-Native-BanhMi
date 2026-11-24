
import React from 'react';

import { StyleSheet, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';

import FavoritesScreen from '../screens/FavoritesScreen';

import ProfileScreen from '../screens/ProfileScreen';

import { useTravel } from '../context/TravelContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const {
    colors,
    favoriteCount,
  } = useTravel();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"

      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,

        tabBarInactiveTintColor: colors.secondary,

        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          marginTop: 3,
        },

        tabBarBadgeStyle: {
          backgroundColor: colors.danger,
          color: '#FFFFFF',
          fontSize: 10,
          fontWeight: 'bold',
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }

          if (route.name === 'Favorites') {
            iconName = focused
              ? 'heart'
              : 'heart-outline';
          }

          if (route.name === 'Profile') {
            iconName = focused
              ? 'person'
              : 'person-outline';
          }

          return (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: focused
                    ? colors.surface
                    : 'transparent',
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={25}
                color={color}
              />
            </View>
          );
        },
      })}
    >
      {/* Tab Trang chủ */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Trang chủ',
          tabBarLabel: 'Trang chủ',
        }}
      />

      {/* Tab Yêu thích */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Yêu thích',
          tabBarLabel: 'Yêu thích',

          tabBarBadge:
            favoriteCount > 0
              ? favoriteCount
              : undefined,
        }}
      />

      {/* Tab Cá nhân */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Cá nhân',
          tabBarLabel: 'Cá nhân',
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 58,
    height: 35,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
