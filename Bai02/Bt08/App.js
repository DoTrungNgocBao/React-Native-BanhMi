
import 'react-native-gesture-handler';

import React, { useState } from 'react';

import {
  StatusBar,
  StyleSheet,
} from 'react-native';

import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import {
  TravelProvider,
  useTravel,
} from './context/TravelContext';

import AppDrawer from './navigation/AppDrawer';

import SplashScreen from './screens/SplashScreen';

function TravellingApp() {
  const { colors, isDark } = useTravel();

  const [started, setStarted] = useState(false);

  const baseTheme = isDark
    ? DarkTheme
    : DefaultTheme;

  const navigationTheme = {
    ...baseTheme,

    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.danger,
    },
  };

  // Hiển thị màn hình chào mừng
  if (!started) {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#080F1C"
        />

        <SplashScreen
          onStart={() => setStarted(true)}
        />
      </>
    );
  }

  // Hiển thị ứng dụng chính
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        barStyle={
          isDark
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={colors.background}
      />

      <AppDrawer />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <TravelProvider>
          <TravellingApp />
        </TravelProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
