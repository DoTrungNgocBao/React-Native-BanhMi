
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>

      {/* Dòng giới thiệu */}
      <View style={styles.topRow}>
        <View style={styles.onlineDot} />

        <Text style={styles.label}>
          MY STUDY PLANNER
        </Text>

        <Text style={styles.version}>
          V1.0
        </Text>
      </View>

      {/* Tên ứng dụng */}
      <View style={styles.titleRow}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>
            Schedule
            <Text style={styles.titleHighlight}>
              App
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            YOUR SMART STUDY SPACE
          </Text>
        </View>

        <View style={styles.iconBox}>
          <Text style={styles.iconText}>
            ⚡
          </Text>
        </View>
      </View>

      {/* Thông tin sinh viên */}
      <View style={styles.studentCard}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            NB
          </Text>
        </View>

        <View style={styles.studentInfo}>
          <Text style={styles.greeting}>
            XIN CHÀO, SINH VIÊN
          </Text>

          <Text style={styles.studentName}>
            Đỗ Trung Ngọc Bảo
          </Text>

          <Text style={styles.studentId}>
            CD-CNTT18A05 • CD-CNTT18A
          </Text>
        </View>

        <Text style={styles.star}>
          ✦
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 22,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22D3EE',
    marginRight: 9,
  },

  label: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2.2,
    flex: 1,
  },

  version: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700',
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  titleArea: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },

  titleHighlight: {
    color: '#A78BFA',
  },

  subtitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 5,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#312E81',
    borderWidth: 1,
    borderColor: '#818CF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconText: {
    fontSize: 27,
  },

  studentCard: {
    backgroundColor: '#131D33',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#273450',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  studentInfo: {
    flex: 1,
  },

  greeting: {
    color: '#22D3EE',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },

  studentName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },

  studentId: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 5,
  },

  star: {
    color: '#A78BFA',
    fontSize: 22,
    marginLeft: 6,
  },
});
