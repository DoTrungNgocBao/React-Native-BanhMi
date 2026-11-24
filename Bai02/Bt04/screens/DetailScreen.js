
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const destination = route.params?.destination;

  if (!destination) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Không tìm thấy thông tin địa điểm.</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ẢNH ĐỊA ĐIỂM */}
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
        />

        {/* THÔNG TIN CHI TIẾT */}
        <View style={styles.content}>
          <Text style={styles.category}>
            🌟 {destination.category}
          </Text>

          <Text style={styles.title}>
            {destination.name}
          </Text>

          <Text style={styles.location}>
            📍 {destination.location}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            📖 Giới thiệu
          </Text>

          <Text style={styles.description}>
            {destination.description}
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>
              🧭 Thông tin chuyến đi
            </Text>

            <Text style={styles.infoText}>
              🏷️ Loại hình: {destination.category}
            </Text>

            <Text style={styles.infoText}>
              📍 Khu vực: {destination.location}
            </Text>

            <Text style={styles.infoText}>
              🌏 Quốc gia: Việt Nam
            </Text>
          </View>

          {/* NÚT QUAY LẠI */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>
              ← Quay lại danh sách
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            MultiScreenApp – Đỗ Trung Ngọc Bảo
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
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: 22,
  },
  category: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  location: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
  },
  infoCard: {
    backgroundColor: '#E0EAFF',
    borderRadius: 18,
    padding: 20,
    marginTop: 25,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#2563EB',
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  backText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 25,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
