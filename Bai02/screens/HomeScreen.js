
import React, {
  useState,
  useMemo,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import TravelHeader from '../components/TravelHeader';
import CategoryList from '../components/CategoryList';
import DestinationCard from '../components/DestinationCard';

import { destinations } from '../data/destinations';

import { useTravel } from '../context/TravelContext';

const sortOptions = [
  {
    id: 'default',
    name: 'Nổi bật',
    icon: 'sparkles-outline',
  },
  {
    id: 'low',
    name: 'Giá thấp',
    icon: 'arrow-up-outline',
  },
  {
    id: 'high',
    name: 'Giá cao',
    icon: 'arrow-down-outline',
  },
  {
    id: 'rating',
    name: 'Đánh giá',
    icon: 'star-outline',
  },
];

// Tìm kiếm tiếng Việt không dấu
const normalize = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();

// Chuyển chuỗi giá thành số
const getPrice = (item) =>
  Number(item.price.replace(/\D/g, ''));

export default function HomeScreen({
  navigation,
}) {
  const { colors } = useTravel();

  const [search, setSearch] = useState('');

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState('all');

  const [sortBy, setSortBy] =
    useState('default');

  const [viewMode, setViewMode] =
    useState('grid');

  const compact = viewMode === 'grid';

  // Tìm kiếm, lọc và sắp xếp
  const filteredDestinations = useMemo(() => {
    const keyword = normalize(search);

    const result = destinations.filter(
      (item) => {
        const matchesCategory =
          selectedCategory === 'all' ||
          item.category === selectedCategory;

        const matchesSearch =
          normalize(item.name).includes(keyword) ||
          normalize(item.location).includes(keyword) ||
          normalize(item.description).includes(keyword);

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );

    if (sortBy === 'low') {
      result.sort(
        (a, b) => getPrice(a) - getPrice(b)
      );
    }

    if (sortBy === 'high') {
      result.sort(
        (a, b) => getPrice(b) - getPrice(a)
      );
    }

    if (sortBy === 'rating') {
      result.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSortBy('default');
  };

  // Phần đầu trang chủ
  const renderHeader = () => (
    <View>
      <TravelHeader
        navigation={navigation}
        search={search}
        setSearch={setSearch}
      />

      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Danh mục du lịch
        </Text>

        <Text
          style={[
            styles.smallText,
            { color: colors.primary },
          ]}
        >
          EXPLORE
        </Text>
      </View>

      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Tiêu đề kết quả */}
      <View style={styles.resultsHeader}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Khám phá điểm đến
          </Text>

          <Text
            style={[
              styles.resultCount,
              { color: colors.secondary },
            ]}
          >
            {filteredDestinations.length} /{' '}
            {destinations.length} địa điểm
          </Text>
        </View>

        {/* Chế độ lưới và danh sách */}
        <View
          style={[
            styles.viewControls,
            { backgroundColor: colors.card },
          ]}
        >
          {[
            {
              id: 'grid',
              icon: 'grid-outline',
            },
            {
              id: 'list',
              icon: 'list-outline',
            },
          ].map((item) => (
            <Pressable
              key={item.id}
              accessibilityLabel={item.id}
              onPress={() =>
                setViewMode(item.id)
              }
              style={[
                styles.viewButton,
                {
                  backgroundColor:
                    viewMode === item.id
                      ? colors.primary
                      : 'transparent',
                },
              ]}
            >
              <Ionicons
                name={item.icon}
                size={21}
                color={
                  viewMode === item.id
                    ? '#080F1C'
                    : colors.secondary
                }
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Sắp xếp địa điểm */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sortRow}
      >
        {sortOptions.map((item) => {
          const active = sortBy === item.id;

          return (
            <Pressable
              key={item.id}
              onPress={() =>
                setSortBy(item.id)
              }
              style={[
                styles.sortButton,
                {
                  backgroundColor: active
                    ? colors.primary
                    : colors.card,

                  borderColor: active
                    ? colors.primary
                    : colors.border,
                },
              ]}
            >
              <Ionicons
                name={item.icon}
                size={16}
                color={
                  active
                    ? '#080F1C'
                    : colors.primary
                }
              />

              <Text
                style={[
                  styles.sortText,
                  {
                    color: active
                      ? '#080F1C'
                      : colors.text,
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );

  // Không tìm thấy kết quả
  const renderEmpty = () => (
    <View
      style={[
        styles.emptyCard,
        { backgroundColor: colors.card },
      ]}
    >
      <Ionicons
        name="search-outline"
        size={55}
        color={colors.primary}
      />

      <Text
        style={[
          styles.emptyTitle,
          { color: colors.text },
        ]}
      >
        Không tìm thấy địa điểm
      </Text>

      <Text
        style={[
          styles.emptyText,
          { color: colors.secondary },
        ]}
      >
        Hãy thử từ khóa hoặc danh mục khác.
      </Text>

      <Pressable
        onPress={resetFilters}
        style={[
          styles.resetButton,
          { backgroundColor: colors.primary },
        ]}
      >
        <Text style={styles.resetText}>
          Xóa bộ lọc
        </Text>
      </Pressable>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Ionicons
        name="compass-outline"
        size={35}
        color={colors.primary}
      />

      <Text
        style={[
          styles.footerTitle,
          { color: colors.primary },
        ]}
      >
        TRAVELLING.
      </Text>

      <Text
        style={[
          styles.footerText,
          { color: colors.secondary },
        ]}
      >
        MIDNIGHT EXPLORER 2.0
      </Text>

      <Text
        style={[
          styles.footerText,
          { color: colors.secondary },
        ]}
      >
        Đỗ Trung Ngọc Bảo
      </Text>

      <Text
        style={[
          styles.footerText,
          { color: colors.secondary },
        ]}
      >
        CD-CNTT18A05
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <FlatList
        key={viewMode}
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        numColumns={compact ? 2 : 1}

        columnWrapperStyle={
          compact ? styles.columnWrapper : undefined
        }

        keyboardShouldPersistTaps="handled"

        showsVerticalScrollIndicator={false}

        ListHeaderComponent={renderHeader()}

        ListEmptyComponent={renderEmpty}

        ListFooterComponent={renderFooter}

        renderItem={({ item }) => (
          <View
            style={
              compact
                ? styles.gridItem
                : styles.listItem
            }
          >
            <DestinationCard
              destination={item}
              compact={compact}
              onPress={() =>
                navigation.navigate(
                  'DestinationDetail',
                  { destination: item }
                )
              }
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
  },

  smallText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 25,
    marginBottom: 15,
    gap: 10,
  },

  resultCount: {
    fontSize: 12,
    marginTop: 7,
  },

  viewControls: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    gap: 3,
  },

  viewButton: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sortRow: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 8,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },

  sortText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  columnWrapper: {
    paddingHorizontal: 18,
    gap: 12,
  },

  gridItem: {
    flex: 1,
    minWidth: 0,
    maxWidth: '49%',
    marginBottom: 15,
  },

  listItem: {
    marginHorizontal: 18,
    marginBottom: 18,
  },

  emptyCard: {
    marginHorizontal: 18,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },

  resetButton: {
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 20,
  },

  resetText: {
    color: '#080F1C',
    fontWeight: '900',
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  footerTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 10,
  },

  footerText: {
    fontSize: 11,
    marginTop: 8,
  },
});
