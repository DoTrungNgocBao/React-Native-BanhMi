
import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Animated,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import {
  destinations,
  categories,
} from '../data/destinations';

export default function SplashScreen({ onStart }) {
  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  const slideAnim = useRef(
    new Animated.Value(45)
  ).current;

  const { height } = useWindowDimensions();

  const totalActivities = destinations.reduce(
    (total, item) =>
      total + item.highlights.length,
    0
  );

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [fadeAnim, slideAnim]);

  const statistics = [
    {
      value: destinations.length,
      label: 'Điểm đến',
      icon: 'location-outline',
    },
    {
      value: categories.length - 1,
      label: 'Danh mục',
      icon: 'grid-outline',
    },
    {
      value: totalActivities,
      label: 'Hoạt động',
      icon: 'compass-outline',
    },
  ];

  return (
    <ImageBackground
      source={{
        uri: destinations[4].image,
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              minHeight: height * 0.88,
              padding: 24,
            }}
          >
            {/* Logo */}
            <Animated.View
              style={[
                styles.brand,
                { opacity: fadeAnim },
              ]}
            >
              <View style={styles.logo}>
                <Ionicons
                  name="compass-outline"
                  size={58}
                  color="#50E4C2"
                />
              </View>

              <Text style={styles.brandTitle}>
                TRAVELLING.
              </Text>

              <Text style={styles.brandSubtitle}>
                MIDNIGHT EXPLORER
              </Text>

              <View style={styles.versionBadge}>
                <Ionicons
                  name="sparkles"
                  size={15}
                  color="#50E4C2"
                />

                <Text style={styles.versionText}>
                  VERSION 2.0
                </Text>
              </View>
            </Animated.View>

            <View style={styles.spacer} />

            {/* Nội dung chào mừng */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                ],
              }}
            >
              <Text style={styles.smallTitle}>
                THE BEAUTY OF VIETNAM
              </Text>

              <Text style={styles.title}>
                Thế giới rộng lớn.
              </Text>

              <Text style={styles.greenTitle}>
                Hãy bắt đầu hành trình.
              </Text>

              <Text style={styles.description}>
                Khám phá những vùng đất tuyệt đẹp,
                lưu giữ điểm đến yêu thích và tạo
                hành trình của riêng bạn.
              </Text>

              {/* Thống kê */}
              <View style={styles.statsRow}>
                {statistics.map((item) => (
                  <View
                    key={item.label}
                    style={styles.statCard}
                  >
                    <Ionicons
                      name={item.icon}
                      size={23}
                      color="#50E4C2"
                    />

                    <Text style={styles.statNumber}>
                      {item.value}
                    </Text>

                    <Text style={styles.statLabel}>
                      {item.label}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Nút bắt đầu */}
              <Pressable
                accessibilityRole="button"
                onPress={onStart}
                style={({ pressed }) => [
                  styles.startButton,
                  {
                    opacity: pressed ? 0.8 : 1,
                    transform: [
                      {
                        scale: pressed ? 0.98 : 1,
                      },
                    ],
                  },
                ]}
              >
                <Ionicons
                  name="compass"
                  size={24}
                  color="#080F1C"
                />

                <Text style={styles.buttonText}>
                  BẮT ĐẦU KHÁM PHÁ
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={23}
                  color="#080F1C"
                />
              </Pressable>

              {/* Thông tin sinh viên */}
              <View style={styles.footer}>
                <Text style={styles.author}>
                  Đỗ Trung Ngọc Bảo
                </Text>

                <Text style={styles.studentCode}>
                  CD-CNTT18A05 • CD-CNTT18A
                </Text>

                <Text style={styles.school}>
                  REACT NATIVE • BÀI TẬP 08
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#080F1C',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(8,15,28,0.68)',
  },

  safeArea: {
    flex: 1,
  },

  brand: {
    alignItems: 'center',
    paddingTop: 25,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: 'rgba(80,228,194,0.12)',
    borderWidth: 1,
    borderColor: '#50E4C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  brandTitle: {
    color: '#50E4C2',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
  },

  brandSubtitle: {
    color: '#CBD5E1',
    fontSize: 10,
    letterSpacing: 4,
    marginTop: 8,
  },

  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(80,228,194,0.15)',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 25,
    gap: 7,
    marginTop: 18,
  },

  versionText: {
    color: '#50E4C2',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  spacer: {
    flex: 1,
    minHeight: 35,
  },

  smallTitle: {
    color: '#50E4C2',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 15,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: '900',
    lineHeight: 43,
  },

  greenTitle: {
    color: '#50E4C2',
    fontSize: 35,
    fontWeight: '900',
    lineHeight: 43,
  },

  description: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 16,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: 'rgba(20,33,50,0.9)',
    borderRadius: 17,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#26384D',
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 8,
  },

  statLabel: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 5,
  },

  startButton: {
    backgroundColor: '#50E4C2',
    borderRadius: 17,
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },

  buttonText: {
    flexShrink: 1,
    color: '#080F1C',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  footer: {
    alignItems: 'center',
    marginTop: 25,
    paddingBottom: 10,
  },

  author: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  studentCode: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 7,
  },

  school: {
    color: '#50E4C2',
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 12,
  },
});
