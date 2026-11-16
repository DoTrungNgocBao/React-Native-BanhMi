
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function CourseCard({ course }) {
  const completed = course.progress === 100;

  const handlePress = () => {
    Alert.alert(
      'LearningApp Pro',
      completed
        ? `Bạn đã hoàn thành môn ${course.name}!`
        : `Bạn đã chọn học môn ${course.name}.`
    );
  };

  return (
    <View style={styles.card}>
      {/* Thong tin mon hoc */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: course.light },
          ]}
        >
          <Text style={styles.icon}>{course.icon}</Text>
        </View>

        <View style={styles.courseInfo}>
          <Text style={styles.courseName}>
            {course.name}
          </Text>

          <Text style={styles.description}>
            {course.description}
          </Text>
        </View>
      </View>

      {/* Tien do hoc tap */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>
          Tiến độ học tập
        </Text>

        <Text
          style={[
            styles.percent,
            { color: course.color },
          ]}
        >
          {course.progress}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${course.progress}%`,
              backgroundColor: course.color,
            },
          ]}
        />
      </View>

      {/* Nut hoc tiep */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: course.color },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {completed ? '✓ Đã hoàn thành' : 'Học tiếp →'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 17,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  icon: {
    fontSize: 27,
  },

  courseInfo: {
    flex: 1,
  },

  courseName: {
    color: '#172554',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 18,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 9,
  },

  progressLabel: {
    fontSize: 12,
    color: '#64748B',
  },

  percent: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 10,
  },

  button: {
    marginTop: 17,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
