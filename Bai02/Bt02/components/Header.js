
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>

      {/* Ten ung dung */}
      <View style={styles.topRow}>
        <Text style={styles.logo}>
          ✦ LEARNINGAPP PRO
        </Text>

        <View style={styles.bellBox}>
          <Text style={styles.bell}>🔔</Text>
        </View>
      </View>

      {/* Loi chao */}
      <Text style={styles.greeting}>
        Xin chào, Ngọc Bảo! 👋
      </Text>

      <Text style={styles.subtitle}>
        Mỗi ngày học một chút, tiến bộ mỗi ngày.
      </Text>

      {/* Thong tin sinh vien */}
      <View style={styles.studentCard}>

        <View style={styles.studentRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>🎓</Text>
          </View>

          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>
              Đỗ Trung Ngọc Bảo
            </Text>

            <Text style={styles.studentId}>
              MSSV: CD-CNTT18A05
            </Text>

            <Text style={styles.studentId}>
              Lớp: CD-CNTT18A
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Muc tieu hoc tap */}
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            🎯 Mục tiêu tuần này
          </Text>

          <Text style={styles.progressPercent}>
            75%
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.progressNote}>
          Bạn đang làm rất tốt! Tiếp tục cố gắng nhé.
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#172554',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 25,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  logo: {
    color: '#A5B4FC',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  bellBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#33458B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bell: {
    fontSize: 19,
  },

  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  subtitle: {
    color: '#CBD5FF',
    fontSize: 13,
    marginBottom: 22,
  },

  studentCard: {
    backgroundColor: '#34478D',
    borderRadius: 20,
    padding: 16,
  },

  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6475C6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarIcon: {
    fontSize: 25,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },

  studentId: {
    fontSize: 12,
    color: '#E0E7FF',
    marginBottom: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#6678BC',
    marginVertical: 16,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  progressLabel: {
    color: '#E0E7FF',
    fontSize: 12,
  },

  progressPercent: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#6273B2',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#A5F3FC',
    borderRadius: 10,
  },

  progressNote: {
    color: '#CBD5FF',
    fontSize: 11,
    marginTop: 12,
  },

});
