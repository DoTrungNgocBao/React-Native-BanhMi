
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTravel } from '../context/TravelContext';

export default function SettingsScreen({ navigation }) {
  const {
    colors,
    isDark,
    toggleTheme,
    notifications,
    setNotifications,
    favoriteCount,
    clearFavorites,
  } = useTravel();

  const cardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
  };

  // Xác nhận xóa danh sách yêu thích
  const handleClear = () => {
    if (favoriteCount === 0) {
      if (Platform.OS === 'web') {
        window.alert('Danh sách yêu thích đang trống.');
      } else {
        Alert.alert(
          'Thông báo',
          'Danh sách yêu thích đang trống.'
        );
      }
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
      'Xóa dữ liệu',
      'Bạn có muốn xóa toàn bộ địa điểm yêu thích không?',
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

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Thanh điều hướng */}
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
            SETTINGS
          </Text>

          <Text
            style={[
              styles.brandSubtitle,
              { color: colors.secondary },
            ]}
          >
            PERSONALIZE YOUR JOURNEY
          </Text>
        </View>

        <Pressable
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
          onPress={() =>
            navigation.navigate('Main', {
              screen: 'HomeTab',
              params: { screen: 'Home' },
            })
          }
        >
          <Ionicons
            name="home-outline"
            size={24}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Banner cài đặt */}
        <View style={[styles.heroCard, cardStyle]}>
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons
              name="settings-outline"
              size={55}
              color={colors.primary}
            />
          </View>

          <Text
            style={[
              styles.heroTitle,
              { color: colors.text },
            ]}
          >
            Cài đặt ứng dụng
          </Text>

          <Text
            style={[
              styles.heroDescription,
              { color: colors.secondary },
            ]}
          >
            Tùy chỉnh trải nghiệm theo phong cách
            của riêng bạn.
          </Text>
        </View>

        {/* Cài đặt giao diện */}
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          APPEARANCE
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Giao diện
        </Text>

        <View style={[styles.settingCard, cardStyle]}>
          <View style={styles.settingRow}>
            <View
              style={[
                styles.settingIcon,
                { backgroundColor: colors.surface },
              ]}
            >
              <Ionicons
                name={isDark ? 'moon-outline' : 'sunny-outline'}
                size={26}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingContent}>
              <Text
                style={[
                  styles.settingTitle,
                  { color: colors.text },
                ]}
              >
                Chế độ tối
              </Text>

              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondary },
                ]}
              >
                {isDark
                  ? 'Midnight Explorer'
                  : 'Light Explorer'}
              </Text>
            </View>

            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{
                false: '#94A3B8',
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Chọn giao diện trực tiếp */}
          <View style={styles.themeGrid}>
            <Pressable
              onPress={() => {
                if (!isDark) toggleTheme();
              }}
              style={[
                styles.themeCard,
                {
                  backgroundColor: '#080F1C',
                  borderColor: isDark
                    ? colors.primary
                    : colors.border,
                },
              ]}
            >
              <Ionicons
                name="moon-outline"
                size={35}
                color="#50E4C2"
              />

              <Text style={styles.darkThemeText}>
                Midnight
              </Text>

              <Text style={styles.darkThemeDescription}>
                Giao diện tối
              </Text>

              <Ionicons
                name={
                  isDark
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={22}
                color="#50E4C2"
              />
            </Pressable>

            <Pressable
              onPress={() => {
                if (isDark) toggleTheme();
              }}
              style={[
                styles.themeCard,
                {
                  backgroundColor: '#F0F7F6',
                  borderColor: !isDark
                    ? colors.primary
                    : colors.border,
                },
              ]}
            >
              <Ionicons
                name="sunny-outline"
                size={35}
                color="#087F72"
              />

              <Text style={styles.lightThemeText}>
                Light
              </Text>

              <Text style={styles.lightThemeDescription}>
                Giao diện sáng
              </Text>

              <Ionicons
                name={
                  !isDark
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={22}
                color="#087F72"
              />
            </Pressable>
          </View>
        </View>

        {/* Cài đặt thông báo */}
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          NOTIFICATIONS
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Thông báo
        </Text>

        <View style={[styles.settingCard, cardStyle]}>
          <View style={styles.settingRow}>
            <View
              style={[
                styles.settingIcon,
                { backgroundColor: colors.surface },
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={26}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingContent}>
              <Text
                style={[
                  styles.settingTitle,
                  { color: colors.text },
                ]}
              >
                Thông báo du lịch
              </Text>

              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondary },
                ]}
              >
                {notifications ? 'Đang bật' : 'Đang tắt'}
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: '#94A3B8',
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <Text
            style={[
              styles.note,
              { color: colors.secondary },
            ]}
          >
            Đây là tùy chọn thông báo giả lập,
            phục vụ bài thực hành React Native.
          </Text>
        </View>

        {/* Quản lý dữ liệu */}
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          DATA MANAGEMENT
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Quản lý dữ liệu
        </Text>

        <View style={[styles.settingCard, cardStyle]}>
          <View style={styles.settingRow}>
            <View
              style={[
                styles.settingIcon,
                { backgroundColor: colors.surface },
              ]}
            >
              <Ionicons
                name="heart-outline"
                size={26}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingContent}>
              <Text
                style={[
                  styles.settingTitle,
                  { color: colors.text },
                ]}
              >
                Địa điểm đã lưu
              </Text>

              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondary },
                ]}
              >
                Bộ sưu tập yêu thích
              </Text>
            </View>

            <Text
              style={[
                styles.count,
                { color: colors.primary },
              ]}
            >
              {favoriteCount}
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border },
            ]}
          />

          <Pressable
            style={styles.settingRow}
            onPress={handleClear}
          >
            <View style={styles.deleteIcon}>
              <Ionicons
                name="trash-outline"
                size={25}
                color={colors.danger}
              />
            </View>

            <View style={styles.settingContent}>
              <Text
                style={[
                  styles.settingTitle,
                  { color: colors.danger },
                ]}
              >
                Xóa danh sách yêu thích
              </Text>

              <Text
                style={[
                  styles.settingDescription,
                  { color: colors.secondary },
                ]}
              >
                Xóa toàn bộ địa điểm đã lưu
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={colors.secondary}
            />
          </Pressable>
        </View>

        {/* Thông tin phiên bản */}
        <View style={[styles.footer, cardStyle]}>
          <Ionicons
            name="compass-outline"
            size={45}
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
            Version 1.0.0 • React Native BT08
          </Text>

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            Developed by Đỗ Trung Ngọc Bảo
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

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
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
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 2,
  },

  brandSubtitle: {
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 5,
  },

  content: {
    padding: 18,
    paddingBottom: 30,
  },

  heroCard: {
    borderWidth: 1,
    borderRadius: 26,
    padding: 25,
    alignItems: 'center',
    marginBottom: 28,
  },

  heroIcon: {
    width: 95,
    height: 95,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 15,
  },

  settingCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 15,
    marginBottom: 28,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },

  settingIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingContent: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: '800',
  },

  settingDescription: {
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  themeGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  themeCard: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
    gap: 10,
  },

  darkThemeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  darkThemeDescription: {
    color: '#94A3B8',
    fontSize: 11,
  },

  lightThemeText: {
    color: '#102A2A',
    fontSize: 16,
    fontWeight: '900',
  },

  lightThemeDescription: {
    color: '#64748B',
    fontSize: 11,
  },

  note: {
    fontSize: 11,
    lineHeight: 19,
    marginTop: 12,
  },

  count: {
    fontSize: 26,
    fontWeight: '900',
  },

  divider: {
    height: 1,
    marginVertical: 15,
  },

  deleteIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,82,119,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
  },

  footerTitle: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 12,
  },

  footerText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10,
  },
});
