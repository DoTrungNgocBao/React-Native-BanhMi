
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const goToList = () => {
    if (navigation) {
      navigation.navigate('List');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Xin chào 👋</Text>
            <Text style={styles.name}>
              Đỗ Trung Ngọc Bảo
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NB</Text>
          </View>
        </View>

        {/* BANNER */}
        <View style={styles.banner}>
          <Text style={styles.bannerSmall}>
            🌏 VIETNAM TRAVEL
          </Text>

          <Text style={styles.bannerTitle}>
            Khám phá Việt Nam
          </Text>

          <Text style={styles.bannerDesc}>
            Cùng khám phá những địa điểm du lịch
            nổi tiếng và tuyệt đẹp tại Việt Nam.
          </Text>

          <TouchableOpacity
            style={styles.bannerButton}
            onPress={goToList}
          >
            <Text style={styles.bannerButtonText}>
              Khám phá ngay →
            </Text>
          </TouchableOpacity>
        </View>

        {/* THỐNG KÊ */}
        <Text style={styles.sectionTitle}>
          📊 Tổng quan ứng dụng
        </Text>

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>08</Text>
            <Text style={styles.statLabel}>Địa điểm</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>03</Text>
            <Text style={styles.statLabel}>Danh mục</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>03</Text>
            <Text style={styles.statLabel}>Màn hình</Text>
          </View>
        </View>

        {/* TÍNH NĂNG */}
        <Text style={styles.sectionTitle}>
          ✨ Tính năng nổi bật
        </Text>

        <TouchableOpacity
          style={styles.feature}
          onPress={goToList}
        >
          <Text style={styles.featureIcon}>🔎</Text>

          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>
              Tìm kiếm địa điểm
            </Text>
            <Text style={styles.featureDesc}>
              Khám phá địa điểm theo tên và tỉnh thành
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.feature}
          onPress={goToList}
        >
          <Text style={styles.featureIcon}>🗺️</Text>

          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>
              Danh sách du lịch
            </Text>
            <Text style={styles.featureDesc}>
              Xem các điểm đến nổi tiếng Việt Nam
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.feature}>
          <Text style={styles.featureIcon}>❤️</Text>

          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>
              Địa điểm yêu thích
            </Text>
            <Text style={styles.featureDesc}>
              Tính năng sẽ được bổ sung sau
            </Text>
          </View>
        </View>

        {/* THÔNG TIN SINH VIÊN */}
        <View style={styles.studentCard}>
          <Text style={styles.studentTitle}>
            👨‍🎓 Thông tin sinh viên
          </Text>

          <Text style={styles.studentText}>
            Họ tên: Đỗ Trung Ngọc Bảo
          </Text>

          <Text style={styles.studentText}>
            MSSV: CD-CNTT18A05
          </Text>

          <Text style={styles.studentText}>
            Lớp: CD-CNTT18A
          </Text>

          <Text style={styles.studentText}>
            Bài tập: BT04 – MultiScreenApp
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    paddingHorizontal: 18,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  hello: {
    fontSize: 14,
    color: '#64748B',
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  banner: {
    backgroundColor: '#2563EB',
    borderRadius: 24,
    padding: 25,
    marginBottom: 25,
  },
  bannerSmall: {
    color: '#BFDBFE',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },
  bannerDesc: {
    color: '#DBEAFE',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 10,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    paddingVertical: 20,
    alignItems: 'center',
    borderRadius: 16,
  },
  statNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 6,
  },
  feature: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 17,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 28,
    marginRight: 15,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  featureDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
    lineHeight: 18,
  },
  arrow: {
    fontSize: 28,
    color: '#94A3B8',
    marginLeft: 8,
  },
  studentCard: {
    backgroundColor: '#E0EAFF',
    padding: 20,
    borderRadius: 18,
    marginTop: 15,
    marginBottom: 30,
  },
  studentTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 12,
  },
  studentText: {
    color: '#334155',
    fontSize: 14,
    marginBottom: 7,
  },
});
