
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import DestinationCard from '../components/DestinationCard';

// DANH SÁCH ĐỊA ĐIỂM DU LỊCH
const destinations = [
  {
    id: 1,
    name: 'Đà Lạt',
    location: 'Lâm Đồng',
    category: 'Núi rừng',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800',
    description: 'Thành phố ngàn hoa với khí hậu mát mẻ.',
  },
  {
    id: 2,
    name: 'Nha Trang',
    location: 'Khánh Hòa',
    category: 'Biển đảo',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    description: 'Thành phố biển nổi tiếng với bãi cát đẹp.',
  },
  {
    id: 3,
    name: 'Hội An',
    location: 'Đà Nẵng',
    category: 'Văn hóa',
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    description: 'Phố cổ với những ngôi nhà và đèn lồng.',
  },
  {
    id: 4,
    name: 'Phú Quốc',
    location: 'An Giang',
    category: 'Biển đảo',
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    description: 'Đảo ngọc với làn nước trong xanh.',
  },
  {
    id: 5,
    name: 'Sa Pa',
    location: 'Lào Cai',
    category: 'Núi rừng',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800',
    description: 'Núi non hùng vĩ và ruộng bậc thang.',
  },
  {
    id: 6,
    name: 'Huế',
    location: 'Huế',
    category: 'Văn hóa',
    image:
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
    description: 'Vùng đất cố đô với nhiều di sản lịch sử.',
  },
  {
    id: 7,
    name: 'Hạ Long',
    location: 'Quảng Ninh',
    category: 'Biển đảo',
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    description: 'Vịnh biển nổi tiếng với hàng nghìn đảo đá.',
  },
  {
    id: 8,
    name: 'Mộc Châu',
    location: 'Sơn La',
    category: 'Núi rừng',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    description: 'Cao nguyên xanh với những đồi chè.',
  },
];

const categories = [
  'Tất cả',
  'Biển đảo',
  'Núi rừng',
  'Văn hóa',
];

export default function ListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');

  // TÌM KIẾM VÀ LỌC DANH MỤC
  const filtered = destinations.filter((item) => {
    const keyword = search.trim().toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword);

    const matchCategory =
      category === 'Tất cả' ||
      item.category === category;

    return matchSearch && matchCategory;
  });

  // CHUYỂN SANG MÀN HÌNH CHI TIẾT
  const openDetail = (item) => {
    navigation.navigate('Detail', {
      destination: item,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* TIÊU ĐỀ */}
        <Text style={styles.heading}>
          🗺️ Khám phá địa điểm
        </Text>

        <Text style={styles.subtitle}>
          Tìm kiếm điểm đến yêu thích của bạn
        </Text>

        {/* THANH TÌM KIẾM */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔎</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Tìm địa điểm, tỉnh thành..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch('')}
            >
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* DANH MỤC */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                category === item &&
                  styles.activeCategory,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item &&
                    styles.activeText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SỐ LƯỢNG ĐỊA ĐIỂM */}
        <View style={styles.resultRow}>
          <Text style={styles.count}>
            📍 Có {filtered.length} địa điểm
          </Text>

          <TouchableOpacity
            onPress={() => {
              setSearch('');
              setCategory('Tất cả');
            }}
          >
            <Text style={styles.resetText}>
              Đặt lại
            </Text>
          </TouchableOpacity>
        </View>

        {/* COMPONENT DESTINATION CARD */}
        {filtered.map((item) => (
          <DestinationCard
            key={item.id}
            item={item}
            onPress={() => openDetail(item)}
          />
        ))}

        {/* KHÔNG CÓ KẾT QUẢ */}
        {filtered.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>
              🔍
            </Text>

            <Text style={styles.emptyTitle}>
              Không tìm thấy địa điểm
            </Text>

            <Text style={styles.emptyDescription}>
              Hãy thử từ khóa hoặc danh mục khác.
            </Text>

            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => {
                setSearch('');
                setCategory('Tất cả');
              }}
            >
              <Text style={styles.emptyButtonText}>
                Xem tất cả địa điểm
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* FOOTER */}
        <Text style={styles.footer}>
          MultiScreenApp - Đỗ Trung Ngọc Bảo
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  subtitle: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 18,
    height: 54,
  },

  searchIcon: {
    fontSize: 19,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },

  clearText: {
    fontSize: 18,
    color: '#64748B',
    padding: 5,
  },

  categories: {
    marginBottom: 20,
  },

  categoryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: '#2563EB',
  },

  categoryText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 13,
  },

  activeText: {
    color: '#FFFFFF',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  count: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334155',
  },

  resetText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: 'bold',
  },

  emptyBox: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  emptyDescription: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  emptyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 20,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  footer: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 20,
    marginBottom: 30,
  },
});
