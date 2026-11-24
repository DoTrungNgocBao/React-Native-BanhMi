
import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ServiceDetailScreen from "./screens/ServiceDetailScreen";
import BookingScreen from "./screens/BookingScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0B1020",
    card: "#111A30",
    text: "#FFFFFF",
    border: "#263451",
    primary: "#7655EE"
  }
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: { backgroundColor: "#111A30" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "800" },
          contentStyle: { backgroundColor: "#0B1020" },
          animation: "slide_from_right"
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ServiceDetailScreen"
          component={ServiceDetailScreen}
          options={{ title: "Chi tiết dịch vụ" }}
        />

        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{ title: "Đặt lịch dịch vụ" }}
        />

        <Stack.Screen
          name="ConfirmationScreen"
          component={ConfirmationScreen}
          options={{
            title: "Xác nhận lịch hẹn",
            headerBackVisible: false,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
