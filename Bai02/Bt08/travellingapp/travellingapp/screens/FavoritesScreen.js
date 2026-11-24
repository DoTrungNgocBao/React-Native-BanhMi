
import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import FavoriteCard from '../components/FavoriteCard';
import { useTravel } from '../context/TravelContext';

export default function FavoritesScreen({ navigation }) {
  const {
    colors,
    favorites,
    favoriteCount,
    clearFavorites,
  } = useTravel();

  // Quay về trang chủ
  const goHome = () => {
    navigation.navigate('HomeTab', {
      screen: 'Home',
    });
  };

  // Mở màn hình chi tiết
  const openDetail = (destination) => {
    navigation.navigate('HomeTab', {
      screen: 'DestinationDetail',
      params: {
        destination: destination,
      },
    });
  };

  // Xác nhận xóa toàn bộ yêu thích
  const handleClear = () => {
    if (favoriteCount === 0) {
      return;
    }

    if (Platform.OS === 'web') {
      if (
        window.confirm(
          'Bạn có muốn xóa toàn bộ địa điểm yêu thích không?'
        )
      ) {
        clearFavorites();
      }
      return;
    }

    Alert.alert(
      'Xóa danh sách yêu thích',
      'Bạn có muốn xóa toàn bộ địa điểm đã lưu không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa tất cả',
          style: 'destructive',
          onPress: clearFavorites,
        },
      ]
    );
  };

  // Phần đầu màn hình
  const renderHeader = () => (
    <View style={styles.header}>

      <View style={styles.topBar}>
        <Pressable
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons
            name="menu-outline"
            size={28}
            color={colors.primary}
          />
        </Pressable>

        <View style={styles.brand}>
          <Text
            style={[
              styles.brandTitle,
              { color: colors.primary },
            ]}
          >
            MY FAVORITES
          </Text>

          <Text
            style={[
              styles.brandSubtitle,
              { color: colors.secondary },
            ]}
          >
            YOUR TRAVEL COLLECTION
          </Text>
        </View>

        <Pressable
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
          onPress={handleClear}
          disabled={favoriteCount === 0}
        >
          <Ionicons
            name="trash-outline"
            size={23}
            color={
              favoriteCount > 0
                ? colors.danger
                : colors.secondary
            }
          />
        </Pressable>
      </View>

      <Text
        style={[
          styles.eyebrow,
          { color: colors.primary },
        ]}
      >
        YOUR PERSONAL COLLECTION
      </Text>

      <Text
        style={[
          styles.title,
          { color: colors.text },
        ]}
      >
        Điểm đến yêu thích
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: colors.secondary },
        ]}
      >
        Lưu giữ những nơi bạn muốn khám phá.
      </Text>

      {/* Thống kê yêu thích */}
      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.heartBox}>
          <Ionicons
            name="heart"
            size={35}
            color={colors.danger}
          />
        </View>

        <View style={styles.summaryContent}>
          <Text
            style={[
              styles.summaryNumber,
              { color: colors.text },
            ]}
          >
            {String(favoriteCount).padStart(2, '0')}
          </Text>

          <Text
            style={[
              styles.summaryLabel,
              { color: colors.secondary },
            ]}
          >
            Địa điểm đã lưu
          </Text>
        </View>

        <Ionicons
          name="bookmark-outline"
          size={29}
          color={colors.primary}
        />
      </View>

      {favoriteCount > 0 && (
        <Text
          style={[
            styles.listTitle,
            { color: colors.text },
          ]}
        >
          Bộ sưu tập của bạn
        </Text>
      )}
    </View>
  );

  // Khi chưa có địa điểm yêu thích
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyIcon,
          { backgroundColor: colors.card },
        ]}
      >
        <Ionicons
          name="heart-outline"
          size={55}
          color={colors.primary}
        />
      </View>

      <Text
        style={[
          styles.emptyTitle,
          { color: colors.text },
        ]}
      >
        Chưa có địa điểm yêu thích
      </Text>

      <Text
        style={[
          styles.emptyDescription,
          { color: colors.secondary },
        ]}
      >
        Hãy khám phá các địa điểm du lịch và nhấn
        trái tim để thêm vào bộ sưu tập của bạn.
      </Text>

      <Pressable
        style={[
          styles.exploreButton,
          { backgroundColor: colors.primary },
        ]}
        onPress={goHome}
      >
        <Ionicons
          name="compass-outline"
          size={23}
          color={colors.background}
        />

        <Text
          style={[
            styles.exploreText,
            { color: colors.background },
          ]}
        >
          Khám phá ngay
        </Text>
      </Pressable>
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
        data={favorites}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <FavoriteCard
            destination={item}
            onPress={() => openDetail(item)}
          />
        )}

        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty()}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 25,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    padding: 18,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brand: {
    flex: 1,
    alignItems: 'center',
  },

  brandTitle: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1,
  },

  brandSubtitle: {
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 5,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },

  title: {
    fontSize: 27,
    fontWeight: '900',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 9,
    lineHeight: 20,
  },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginTop: 22,
    gap: 16,
  },

  heartBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: 'rgba(255,82,119,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryContent: {
    flex: 1,
  },

  summaryNumber: {
    fontSize: 35,
    fontWeight: '900',
  },

  summaryLabel: {
    fontSize: 13,
    marginTop: 5,
  },

  listTitle: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 28,
    marginBottom: 5,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 45,
  },

  emptyIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },

  emptyDescription: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    marginTop: 12,
  },

  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 25,
    gap: 9,
  },

  exploreText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
