
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
  Animated,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTravel } from '../context/TravelContext';

import {
  destinations,
  categories,
} from '../data/destinations';

// Dữ liệu banner
const banners = [
  {
    destination: destinations[0],
    subtitle: 'Chạm vào biển xanh',
  },
  {
    destination: destinations[4],
    subtitle: 'Vẻ đẹp vùng cao',
  },
  {
    destination: destinations[1],
    subtitle: 'Thành phố ngàn hoa',
  },
  {
    destination: destinations[5],
    subtitle: 'Thiên đường đảo ngọc',
  },
];

export default function TravelHeader({
  navigation,
  search,
  setSearch,
}) {
  const { colors } = useTravel();

  const [activeBanner, setActiveBanner] =
    useState(0);

  const fadeAnim = useRef(
    new Animated.Value(1)
  ).current;

  const banner = banners[activeBanner];

  // Tự động chuyển ảnh sau 4 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveBanner(
        (previous) =>
          (previous + 1) % banners.length
      );
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeBanner]);

  // Hiệu ứng xuất hiện khi đổi ảnh
  useEffect(() => {
    fadeAnim.setValue(0.4);

    const animation = Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }
    );

    animation.start();

    return () => animation.stop();
  }, [activeBanner, fadeAnim]);

  // Chuyển ảnh tiếp theo
  const nextBanner = () => {
    setActiveBanner(
      (previous) =>
        (previous + 1) % banners.length
    );
  };

  // Quay lại ảnh trước
  const previousBanner = () => {
    setActiveBanner(
      (previous) =>
        (previous - 1 + banners.length) %
        banners.length
    );
  };

  const totalActivities = destinations.reduce(
    (total, item) =>
      total + item.highlights.length,
    0
  );

  const statistics = [
    {
      icon: 'location-outline',
      value: destinations.length,
      label: 'Điểm đến',
    },
    {
      icon: 'grid-outline',
      value: categories.length - 1,
      label: 'Danh mục',
    },
    {
      icon: 'compass-outline',
      value: totalActivities,
      label: 'Hoạt động',
    },
  ];

  return (
    <View style={styles.container}>

      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Mở menu"
          onPress={() =>
            navigation.openDrawer()
          }
          style={[
            styles.menuButton,
            { backgroundColor: colors.card },
          ]}
        >
          <Ionicons
            name="menu-outline"
            size={29}
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
            TRAVELLING.
          </Text>

          <Text
            style={[
              styles.brandSubtitle,
              { color: colors.secondary },
            ]}
          >
            EXPLORE VIETNAM 2.0
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Trang cá nhân"
          onPress={() =>
            navigation.navigate('Profile')
          }
          style={[
            styles.avatar,
            { backgroundColor: colors.surface },
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              { color: colors.primary },
            ]}
          >
            NB
          </Text>
        </Pressable>
      </View>

      {/* Lời chào */}
      <View style={styles.greeting}>
        <Text
          style={[
            styles.smallTitle,
            { color: colors.primary },
          ]}
        >
          HÀNH TRÌNH CỦA BẠN
        </Text>

        <Text
          style={[
            styles.greetingTitle,
            { color: colors.text },
          ]}
        >
          Xin chào, Ngọc Bảo! 👋
        </Text>

        <Text
          style={[
            styles.greetingDescription,
            { color: colors.secondary },
          ]}
        >
          Hôm nay bạn muốn đi đâu?
        </Text>
      </View>

      {/* Banner tự động */}
      <View
        style={[
          styles.bannerContainer,
          { backgroundColor: colors.card },
        ]}
      >
        <Animated.View
          style={{ opacity: fadeAnim }}
        >
          <ImageBackground
            source={{
              uri: banner.destination.image,
            }}
            style={styles.banner}
            resizeMode="cover"
          >
            <View style={styles.overlay}>

              <View style={styles.bannerTop}>
                <View style={styles.badge}>
                  <Ionicons
                    name="sparkles"
                    size={15}
                    color="#50E4C2"
                  />

                  <Text style={styles.badgeText}>
                    VIETNAM COLLECTION
                  </Text>
                </View>

                <View style={styles.counter}>
                  <Text style={styles.counterText}>
                    0{activeBanner + 1}/04
                  </Text>
                </View>
              </View>

              <View style={styles.bannerContent}>
                <Text style={styles.bannerTitle}>
                  {banner.destination.name}
                </Text>

                <Text style={styles.bannerSubtitle}>
                  {banner.subtitle}
                </Text>

                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color="#FFFFFF"
                  />

                  <Text style={styles.location}>
                    {banner.destination.location}
                  </Text>
                </View>

                <Pressable
                  onPress={() =>
                    navigation.navigate(
                      'DestinationDetail',
                      {
                        destination:
                          banner.destination,
                      }
                    )
                  }
                  style={styles.exploreButton}
                >
                  <Text style={styles.exploreText}>
                    Khám phá ngay
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#080F1C"
                  />
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Điều khiển banner */}
        <View style={styles.controls}>
          <Pressable
            accessibilityLabel="Ảnh trước"
            onPress={previousBanner}
            style={[
              styles.arrowButton,
              {
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={colors.primary}
            />
          </Pressable>

          <View style={styles.dots}>
            {banners.map((item, index) => (
              <Pressable
                key={item.destination.id}
                accessibilityLabel={
                  'Banner ' + (index + 1)
                }
                onPress={() =>
                  setActiveBanner(index)
                }
                style={styles.dotTouch}
              >
                <View
                  style={[
                    styles.dot,
                    {
                      width:
                        activeBanner === index
                          ? 25
                          : 8,

                      backgroundColor:
                        activeBanner === index
                          ? colors.primary
                          : colors.secondary,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>

          <Pressable
            accessibilityLabel="Ảnh tiếp theo"
            onPress={nextBanner}
            style={[
              styles.arrowButton,
              {
                backgroundColor: colors.surface,
              },
            ]}
          >
            <Ionicons
              name="chevron-forward"
              size={22}
              color={colors.primary}
            />
          </Pressable>
        </View>
      </View>

      {/* Thanh tìm kiếm */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={colors.primary}
        />

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Tìm kiếm địa điểm du lịch..."
          placeholderTextColor={colors.secondary}
          style={[
            styles.searchInput,
            { color: colors.text },
          ]}
        />

        {!!search && (
          <Pressable
            onPress={() => setSearch('')}
          >
            <Ionicons
              name="close-circle"
              size={22}
              color={colors.secondary}
            />
          </Pressable>
        )}
      </View>

      {/* Thống kê tự động */}
      <View style={styles.statsRow}>
        {statistics.map((item) => (
          <View
            key={item.label}
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.statIcon,
                {
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <Ionicons
                name={item.icon}
                size={23}
                color={colors.primary}
              />
            </View>

            <Text
              style={[
                styles.statNumber,
                { color: colors.text },
              ]}
            >
              {item.value}
            </Text>

            <Text
              style={[
                styles.statLabel,
                { color: colors.secondary },
              ]}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brand: {
    flex: 1,
    alignItems: 'center',
  },

  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },

  brandSubtitle: {
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 6,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 18,
    fontWeight: '900',
  },

  greeting: {
    marginTop: 30,
    marginBottom: 22,
  },

  smallTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },

  greetingTitle: {
    fontSize: 27,
    fontWeight: '900',
  },

  greetingDescription: {
    fontSize: 14,
    marginTop: 9,
  },

  bannerContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },

  banner: {
    height: 280,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(8,15,28,0.48)',
    padding: 20,
    justifyContent: 'space-between',
  },

  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(8,15,28,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 20,
    gap: 6,
  },

  badgeText: {
    color: '#50E4C2',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  counter: {
    backgroundColor: 'rgba(8,15,28,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
  },

  counterText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

  bannerContent: {
    alignItems: 'flex-start',
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },

  bannerSubtitle: {
    color: '#50E4C2',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },

  location: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#50E4C2',
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 17,
    gap: 12,
  },

  exploreText: {
    color: '#080F1C',
    fontSize: 13,
    fontWeight: '900',
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },

  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dotTouch: {
    paddingHorizontal: 4,
    paddingVertical: 12,
  },

  dot: {
    height: 8,
    borderRadius: 5,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    minHeight: 56,
    gap: 10,
    marginTop: 20,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 12,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    marginBottom: 25,
  },

  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 17,
    alignItems: 'center',
    paddingVertical: 15,
  },

  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statNumber: {
    fontSize: 25,
    fontWeight: '900',
    marginTop: 10,
  },

  statLabel: {
    fontSize: 11,
    marginTop: 5,
  },
});
