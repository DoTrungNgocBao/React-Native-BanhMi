
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ProfileInfo from '../components/ProfileInfo';

import { useTravel } from '../context/TravelContext';

export default function ProfileScreen({
  navigation,
}) {
  const {
    colors,
    favoriteCount,
    planCount,
    isDark,
  } = useTravel();

  const menuItems = [
    {
      title: 'Kế hoạch du lịch',
      subtitle: `${planCount} kế hoạch đã tạo`,
      icon: 'calendar-outline',
      action: () =>
        navigation.navigate('HomeTab', {
          screen: 'TravelPlanner',
        }),
    },
    {
      title: 'Địa điểm yêu thích',
      subtitle: `${favoriteCount} địa điểm đã lưu`,
      icon: 'heart-outline',
      action: () =>
        navigation.navigate('Favorites'),
    },
    {
      title: 'Cài đặt ứng dụng',
      subtitle: isDark
        ? 'Đang sử dụng giao diện tối'
        : 'Đang sử dụng giao diện sáng',
      icon: 'settings-outline',
      action: () =>
        navigation.navigate('Settings'),
    },
    {
      title: 'Giới thiệu ứng dụng',
      subtitle: 'Tìm hiểu TravellingApp',
      icon: 'information-circle-outline',
      action: () =>
        navigation.navigate('About'),
    },
    {
      title: 'Liên hệ',
      subtitle: 'Gửi ý kiến và phản hồi',
      icon: 'mail-outline',
      action: () =>
        navigation.navigate('Contact'),
    },
  ];

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
        >
          <Ionicons
            name="menu-outline"
            size={27}
            color={colors.primary}
          />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text
            style={[
              styles.headerTitle,
              { color: colors.primary },
            ]}
          >
            MY PROFILE
          </Text>

          <Text
            style={[
              styles.headerSubtitle,
              { color: colors.secondary },
            ]}
          >
            MIDNIGHT EXPLORER 2.0
          </Text>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate('Settings')
          }
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
        >
          <Ionicons
            name="settings-outline"
            size={25}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* Component thông tin cá nhân */}
        <ProfileInfo />

        {/* Menu quản lý */}
        <View style={styles.menuContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Quản lý tài khoản
          </Text>

          {menuItems.map((item) => (
            <Pressable
              key={item.title}
              onPress={item.action}
              style={[
                styles.menuItem,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.menuIcon,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={25}
                  color={colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.menuTitle,
                    { color: colors.text },
                  ]}
                >
                  {item.title}
                </Text>

                <Text
                  style={[
                    styles.menuSubtitle,
                    { color: colors.secondary },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.secondary}
              />
            </Pressable>
          ))}
        </View>

        {/* Thông tin phiên bản */}
        <View style={styles.footer}>
          <Ionicons
            name="compass-outline"
            size={45}
            color={colors.primary}
          />

          <Text
            style={[
              styles.brand,
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
            MIDNIGHT EXPLORER
          </Text>

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            VERSION 2.0.0
          </Text>

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            React Native • Expo Snack
          </Text>

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            Bài tập 08 - Khám phá địa điểm du lịch
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },

  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },

  headerSubtitle: {
    fontSize: 9,
    marginTop: 6,
    letterSpacing: 1,
  },

  menuContainer: {
    paddingHorizontal: 18,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 18,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 14,
    borderRadius: 17,
    borderWidth: 1,
    marginBottom: 12,
  },

  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  menuSubtitle: {
    fontSize: 11,
    marginTop: 6,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },

  brand: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 3,
    marginTop: 12,
  },

  footerText: {
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 9,
    textAlign: 'center',
  },
});
