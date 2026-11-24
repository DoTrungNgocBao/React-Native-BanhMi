
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function ScheduleCard({ subject }) {
  return (
    <View style={styles.card}>

      {/* Thanh màu phân biệt môn */}
      <View
        style={[
          styles.colorBar,
          { backgroundColor: subject.color },
        ]}
      />

      {/* Phần đầu thẻ */}
      <View style={styles.header}>
        <View
          style={[
            styles.iconBox,
            { backgroundColor: subject.color },
          ]}
        >
          <Text style={styles.icon}>
            {subject.icon}
          </Text>
        </View>

        <View style={styles.titleArea}>
          <Text
            style={[
              styles.category,
              { color: subject.color },
            ]}
          >
            MÔN HỌC
          </Text>

          <Text style={styles.subjectName}>
            {subject.name}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Thời gian và phòng học */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>
            ⏰ GIỜ HỌC
          </Text>

          <Text style={styles.infoValue}>
            {subject.time}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>
            📍 PHÒNG HỌC
          </Text>

          <Text style={styles.infoValue}>
            {subject.room}
          </Text>
        </View>
      </View>

      {/* Giảng viên */}
      <View style={styles.teacherBox}>
        <Text style={styles.teacherText}>
          👨‍🏫 GV: {subject.teacher}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#151F34',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#293751',
    overflow: 'hidden',
  },

  colorBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: '120%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  icon: {
    fontSize: 24,
  },

  titleArea: {
    flex: 1,
  },

  category: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 5,
  },

  subjectName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  divider: {
    height: 1,
    backgroundColor: '#293751',
    marginVertical: 16,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 7,
  },

  infoValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  teacherBox: {
    backgroundColor: '#1D2941',
    borderRadius: 10,
    padding: 11,
  },

  teacherText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
});
