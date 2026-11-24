
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

import ActionButton from './ActionButton';

export default function ProgressCard({
  goal,
  onStart,
  onPause,
  onIncrease,
  onComplete,
  onReset,
  onDelete,
}) {
  const progress = useRef(
    new Animated.Value(goal.progress)
  ).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: goal.progress,
      duration: 650,
      useNativeDriver: false,
    }).start();
  }, [goal.progress]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const completed = goal.progress === 100;
  const active = goal.status === 'active';
  const paused = goal.status === 'paused';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>{goal.icon}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{goal.title}</Text>
          <Text style={styles.subtitle}>{goal.subtitle}</Text>
        </View>

        <Text style={styles.percent}>
          {goal.progress}%
        </Text>
      </View>

      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, { width }]}
        />
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.status}>
          {completed
            ? '✅ Đã hoàn thành'
            : active
            ? '⏳ Đang học'
            : paused
            ? '⏸ Đã tạm dừng'
            : '📌 Chưa bắt đầu'}
        </Text>

        <Text style={styles.progressText}>
          {goal.progress}/100
        </Text>
      </View>

      {completed ? (
        <ActionButton
          title="↻ Làm lại"
          onPress={onReset}
          secondary
        />
      ) : active ? (
        <View style={styles.buttons}>
          <ActionButton
            title="+25% tiến độ"
            onPress={onIncrease}
            style={styles.halfButton}
            secondary
          />

          <ActionButton
            title="⏸ Tạm dừng"
            onPress={onPause}
            style={styles.halfButton}
            secondary
          />

          <ActionButton
            title="✓ Hoàn thành"
            onPress={onComplete}
            style={styles.fullButton}
          />
        </View>
      ) : (
        <ActionButton
          title={
            paused
              ? '▶ Tiếp tục học'
              : '▶ Bắt đầu học'
          }
          onPress={onStart}
        />
      )}

      <ActionButton
        title="🗑 Xóa mục tiêu"
        onPress={onDelete}
        danger
        style={styles.deleteButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 21,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F1EDFF',
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#EDE9FE',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    marginHorizontal: 11,
  },
  title: {
    color: '#1E1B4B',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  percent: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  track: {
    height: 10,
    backgroundColor: '#EDE9FE',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 17,
  },
  fill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  status: {
    color: '#64748B',
    fontSize: 12,
  },
  progressText: {
    color: '#64748B',
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  halfButton: {
    flexGrow: 1,
    flexBasis: '43%',
  },
  fullButton: {
    width: '100%',
  },
  deleteButton: {
    marginTop: 10,
  },
});
