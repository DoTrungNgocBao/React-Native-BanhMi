
import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

export default function ActionButton({
  title,
  onPress,
  secondary = false,
  danger = false,
  style,
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (value) => {
    Animated.spring(scale, {
      toValue: value,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[{ transform: [{ scale }] }, style]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={() => animate(0.94)}
        onPressOut={() => animate(1)}
        style={[
          styles.button,
          secondary && styles.secondary,
          danger && styles.danger,
        ]}
      >
        <Text
          style={[
            styles.text,
            (secondary || danger) && styles.darkText,
            danger && styles.dangerText,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  secondary: {
    backgroundColor: '#EDE9FE',
  },
  danger: {
    backgroundColor: '#FEE2E2',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkText: {
    color: '#6D28D9',
  },
  dangerText: {
    color: '#DC2626',
  },
});
