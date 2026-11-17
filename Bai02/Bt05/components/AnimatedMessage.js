
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
} from 'react-native';

export default function AnimatedMessage({ message }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.6)).current;
  const moveY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (!message) return;

    opacity.setValue(0);
    scale.setValue(0.6);
    moveY.setValue(30);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(moveY, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, [message]);

  if (!message) return null;

  return (
    <Animated.View
      style={[
        styles.box,
        {
          opacity,
          transform: [
            { scale },
            { translateY: moveY },
          ],
        },
      ]}
    >
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>Chúc mừng!</Text>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#DCFCE7',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  emoji: {
    fontSize: 35,
  },
  title: {
    color: '#166534',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  text: {
    color: '#166534',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
