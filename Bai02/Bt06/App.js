
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Import các component
import Header from './components/Header';
import WeekCalendar from './components/WeekCalendar';
import ScheduleCard from './components/ScheduleCard';
import EmptySchedule from './components/EmptySchedule';
import StatsCard from './components/StatsCard';

// Dữ liệu thời khóa biểu mẫu
const schedules = [
  {
    id: 1,
    day: 2,
    name: 'Lập trình React Native',
    time: '07:00 - 09:30',
    room: 'A203',
    teacher: 'Nguyễn Văn An',
    color: '#8B5CF6',
    icon: '📱',
  },
  {
    id: 2,
    day: 2,
    name: 'Cơ sở dữ liệu',
    time: '13:00 - 15:30',
    room: 'B102',
    teacher: 'Trần Thị Lan',
    color: '#06B6D4',
    icon: '🗄️',
  },
  {
    id: 3,
    day: 3,
    name: 'Lập trình Node.js',
    time: '07:00 - 09:30',
    room: 'LAB01',
    teacher: 'Lê Minh Tuấn',
    color: '#F59E0B',
    icon: '💻',
  },
  {
    id: 4,
    day: 4,
    name: 'Thiết kế giao diện',
    time: '08:00 - 10:30',
    room: 'A205',
    teacher: 'Phạm Thị Hoa',
    color: '#EC4899',
    icon: '🎨',
  },
  {
    id: 5,
    day: 5,
    name: 'Tiếng Anh chuyên ngành',
    time: '13:00 - 15:30',
    room: 'C301',
    teacher: 'Nguyễn Thị Mai',
    color: '#10B981',
    icon: '📚',
  },
  {
    id: 6,
    day: 6,
    name: 'Lập trình React Native',
    time: '07:00 - 09:30',
    room: 'A203',
    teacher: 'Nguyễn Văn An',
    color: '#8B5CF6',
    icon: '📱',
  },
  {
    id: 7,
    day: 7,
    name: 'Thực hành Node.js',
    time: '08:00 - 11:00',
    room: 'LAB02',
    teacher: 'Lê Minh Tuấn',
    color: '#F59E0B',
    icon: '💻',
  },
];

export default function App() {
  // Mặc định chọn Thứ Hai
  const [selectedDay, setSelectedDay] = useState(2);

  // Lọc môn học theo ngày được chọn
  const todaySchedules = schedules.filter(
    (item) => item.day === selectedDay
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090E1C"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* Header */}
        <Header />

        {/* Banner thời khóa biểu */}
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>
            THỜI KHÓA BIỂU CÁ NHÂN
          </Text>

          <Text style={styles.bannerTitle}>
            Học thông minh.{"\n"}Sống chủ động.
          </Text>

          <Text style={styles.bannerDesc}>
            Quản lý lịch học của bạn mỗi ngày.
          </Text>
        </View>

        {/* Bảng thống kê */}
        <StatsCard schedules={schedules} />

        {/* Lịch học 7 ngày */}
        <WeekCalendar
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        {/* Tiêu đề danh sách môn học */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionLabel}>
              YOUR CLASSES
            </Text>

            <Text style={styles.sectionTitle}>
              Lịch học đã chọn
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {todaySchedules.length} môn
            </Text>
          </View>
        </View>

        {/* Danh sách môn học */}
        {todaySchedules.map((subject) => (
          <ScheduleCard
            key={subject.id}
            subject={subject}
          />
        ))}

        {/* Thông báo khi không có lịch */}
        {todaySchedules.length === 0 && (
          <EmptySchedule />
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            ⚡ SCHEDULEAPP
          </Text>

          <Text style={styles.footerText}>
            Designed by Đỗ Trung Ngọc Bảo
          </Text>

          <Text style={styles.footerId}>
            CD-CNTT18A05 • React Native BT06
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090E1C',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  // Banner
  banner: {
    backgroundColor: '#312E81',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#6366F1',
  },

  bannerLabel: {
    color: '#67E8F9',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 12,
    lineHeight: 34,
  },

  bannerDesc: {
    color: '#C7D2FE',
    fontSize: 13,
    marginTop: 12,
  },

  // Tiêu đề danh sách môn học
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  sectionLabel: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
  },

  countBadge: {
    backgroundColor: '#312E81',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },

  countText: {
    color: '#C4B5FD',
    fontSize: 12,
    fontWeight: '800',
  },

  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 28,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#293751',
  },

  footerTitle: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },

  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 9,
  },

  footerId: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 6,
  },
});
