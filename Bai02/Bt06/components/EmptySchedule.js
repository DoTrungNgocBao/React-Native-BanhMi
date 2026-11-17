
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function EmptySchedule() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🌙</Text>
      </View>

      <Text style={styles.title}>
        Hôm nay không có lịch học!
      </Text>

      <Text style={styles.description}>
        Hãy nghỉ ngơi, thư giãn và chuẩn bị
        cho những buổi học tiếp theo.
      </Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          ✨ ENJOY YOUR FREE DAY
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151F34',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#293751',
    marginBottom: 20,
  },

  iconCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#312E81',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  icon: {
    fontSize: 42,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
  },

  badge: {
    backgroundColor: '#312E81',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#6366F1',
  },

  badgeText: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
