
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Header from './Header';
import StatCard from './StatCard';
import CourseCard from './CourseCard';
import BottomMenu from './BottomMenu';

const courses = [
  {
    id: '1',
    name: 'Lập trình React Native',
    description: 'Xây dựng ứng dụng di động',
    progress: 75,
    icon: '📱',
    color: '#4F46E5',
    light: '#EEF2FF',
  },
  {
    id: '2',
    name: 'Lập trình Node.js',
    description: 'Phát triển ứng dụng Backend',
    progress: 50,
    icon: '💻',
    color: '#059669',
    light: '#D1FAE5',
  },
  {
    id: '3',
    name: 'Cơ sở dữ liệu SQL Server',
    description: 'Quản trị và truy vấn dữ liệu',
    progress: 90,
    icon: '🗄️',
    color: '#EA580C',
    light: '#FFEDD5',
  },
  {
    id: '4',
    name: 'Lập trình ASP.NET Core',
    description: 'Xây dựng ứng dụng web MVC',
    progress: 35,
    icon: '🌐',
    color: '#8B5CF6',
    light: '#EDE9FE',
  },
  {
    id: '5',
    name: 'Thiết kế giao diện UI',
    description: 'Nguyên tắc thiết kế ứng dụng',
    progress: 100,
    icon: '🎨',
    color: '#DB2777',
    light: '#FCE7F3',
  },
  {
    id: '6',
    name: 'HTML, CSS và JavaScript',
    description: 'Lập trình giao diện website',
    progress: 100,
    icon: '📘',
    color: '#0891B2',
    light: '#CFFAFE',
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        📊 Tổng quan học tập
      </Text>

      <View style={styles.statsRow}>
        <StatCard
          icon="📚"
          number="06"
          label="Khóa học"
          color="#4F46E5"
        />
        <StatCard
          icon="⏳"
          number="04"
          label="Đang học"
          color="#EA580C"
        />
        <StatCard
          icon="🏆"
          number="02"
          label="Hoàn thành"
          color="#059669"
        />
      </View>
    </View>
  );

  const renderCourses = () => (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <Text style={styles.sectionTitle}>
          📚 Khóa học của tôi
        </Text>

        <Text style={styles.courseCount}>
          06 khóa học
        </Text>
      </View>

      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
        />
      ))}
    </View>
  );

  const renderProfile = () => (
    <View style={styles.profileContainer}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🎓</Text>
        </View>

        <Text style={styles.profileName}>
          Đỗ Trung Ngọc Bảo
        </Text>

        <Text style={styles.profileSubtitle}>
          Sinh viên Công nghệ thông tin
        </Text>

        <View style={styles.divider} />

        <Text style={styles.profileInfo}>
          🪪 Mã sinh viên: CD-CNTT18A05
        </Text>

        <Text style={styles.profileInfo}>
          🏫 Lớp: CD-CNTT18A
        </Text>

        <Text style={styles.profileInfo}>
          📚 Tổng khóa học: 06
        </Text>

        <Text style={styles.profileInfo}>
          🏆 Đã hoàn thành: 02
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        key={activeTab}
      >
        {activeTab === 'home' && (
          <>
            <Header />
            {renderStats()}
            {renderCourses()}
          </>
        )}

        {activeTab === 'courses' && (
          <>
            <View style={styles.pageHeader}>
              <Text style={styles.pageTitle}>
                📚 Danh sách khóa học
              </Text>
              <Text style={styles.pageSubtitle}>
                Khám phá các môn học CNTT của bạn
              </Text>
            </View>
            {renderCourses()}
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <View style={styles.pageHeader}>
              <Text style={styles.pageTitle}>
                👤 Hồ sơ sinh viên
              </Text>
              <Text style={styles.pageSubtitle}>
                Thông tin cá nhân và học tập
              </Text>
            </View>
            {renderProfile()}
          </>
        )}

        <Text style={styles.footer}>
          LearningApp Pro • Đỗ Trung Ngọc Bảo
        </Text>
      </ScrollView>

      <BottomMenu
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF3FF',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 25,
  },

  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  courseCount: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  pageHeader: {
    backgroundColor: '#172554',
    padding: 24,
    paddingTop: 35,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  pageSubtitle: {
    fontSize: 13,
    color: '#CBD5FF',
    marginTop: 8,
  },

  profileContainer: {
    padding: 18,
    marginTop: 12,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  avatarText: {
    fontSize: 38,
  },

  profileName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#172554',
    textAlign: 'center',
  },

  profileSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    width: '100%',
    marginVertical: 22,
  },

  profileInfo: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },

  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 18,
    marginBottom: 15,
  },
});
