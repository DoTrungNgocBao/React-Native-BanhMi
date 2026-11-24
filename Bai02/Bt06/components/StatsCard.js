
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function StatsCard({ schedules }) {
  // Tổng số buổi học
  const totalClasses = schedules.length;

  // Tổng số môn học khác nhau
  const totalSubjects = new Set(
    schedules.map((item) => item.name)
  ).size;

  // Số ngày không có lịch học
  const studyDays = new Set(
    schedules.map((item) => item.day)
  ).size;

  const freeDays = 7 - studyDays;

  const stats = [
    {
      id: 1,
      title: 'Buổi học',
      value: totalClasses,
      icon: '📚',
      color: '#8B5CF6',
    },
    {
      id: 2,
      title: 'Môn học',
      value: totalSubjects,
      icon: '🎯',
      color: '#06B6D4',
    },
    {
      id: 3,
      title: 'Ngày nghỉ',
      value: freeDays,
      icon: '🌙',
      color: '#10B981',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.label}>
            STUDY OVERVIEW
          </Text>

          <Text style={styles.title}>
            Tổng quan học tập
          </Text>
        </View>

        <Text style={styles.headingIcon}>📊</Text>
      </View>

      <View style={styles.row}>
        {stats.map((item) => (
          <View
            key={item.id}
            style={styles.card}
          >
            <Text style={styles.icon}>
              {item.icon}
            </Text>

            <Text
              style={[
                styles.value,
                { color: item.color },
              ]}
            >
              {String(item.value).padStart(2, '0')}
            </Text>

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 5,
  },

  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  label: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  headingIcon: {
    fontSize: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: '31.5%',
    backgroundColor: '#151F34',
    borderWidth: 1,
    borderColor: '#293751',
    borderRadius: 18,
    padding: 14,
    alignItems: 'flex-start',
  },

  icon: {
    fontSize: 23,
    marginBottom: 12,
  },

  value: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 7,
  },

  cardTitle: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '700',
  },
});
