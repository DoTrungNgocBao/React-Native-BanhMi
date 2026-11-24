
import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import MainTabs from './MainTabs';

import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContactScreen from '../screens/ContactScreen';

import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';

const Drawer = createDrawerNavigator();

// Giao diện menu tùy chỉnh
function CustomDrawerContent(props) {
  const {
    colors,
    favoriteCount,
    isDark,
  } = useTravel();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card },
      ]}
    >
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 15,
        }}
      >
        {/* Logo ứng dụng */}
        <View style={styles.brandRow}>
          <View
            style={[
              styles.logo,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons
              name="compass-outline"
              size={35}
              color={colors.primary}
            />
          </View>

          <View style={{ flex: 1 }}>
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
              MIDNIGHT EXPLORER
            </Text>
          </View>

          <Pressable
            onPress={() =>
              props.navigation.closeDrawer()
            }
          >
            <Ionicons
              name="close-outline"
              size={27}
              color={colors.secondary}
            />
          </Pressable>
        </View>

        {/* Banner thông tin cá nhân */}
        <View style={styles.profileCard}>
          <ImageBackground
            source={{
              uri: destinations[4].image,
            }}
            style={styles.profileBanner}
          >
            <View style={styles.overlay}>
              <Text style={styles.bannerText}>
                EXPLORE VIETNAM
              </Text>

              <Text style={styles.bannerTitle}>
                Your next adventure.
              </Text>
            </View>
          </ImageBackground>

          <View
            style={[
              styles.profileContent,
              { backgroundColor: colors.surface },
            ]}
          >
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.primary,
                },
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
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.profileName,
                  { color: colors.text },
                ]}
              >
                Đỗ Trung Ngọc Bảo
              </Text>

              <Text
                style={[
                  styles.studentCode,
                  { color: colors.secondary },
                ]}
              >
                CD-CNTT18A05
              </Text>

              <Text
                style={[
                  styles.studentCode,
                  { color: colors.primary },
                ]}
              >
                CD-CNTT18A
              </Text>
            </View>
          </View>
        </View>

        {/* Thống kê */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons
              name="location-outline"
              size={24}
              color={colors.primary}
            />

            <Text
              style={[
                styles.statNumber,
                { color: colors.text },
              ]}
            >
              {destinations.length}
            </Text>

            <Text
              style={[
                styles.statLabel,
                { color: colors.secondary },
              ]}
            >
              Địa điểm
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons
              name="heart-outline"
              size={24}
              color={colors.danger}
            />

            <Text
              style={[
                styles.statNumber,
                { color: colors.text },
              ]}
            >
              {favoriteCount}
            </Text>

            <Text
              style={[
                styles.statLabel,
                { color: colors.secondary },
              ]}
            >
              Yêu thích
            </Text>
          </View>
        </View>

        {/* Danh sách menu */}
        <Text
          style={[
            styles.menuLabel,
            { color: colors.secondary },
          ]}
        >
          MAIN MENU
        </Text>

        <DrawerItemList {...props} />

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Chế độ giao diện */}
        <View style={styles.themeRow}>
          <Ionicons
            name={
              isDark
                ? 'moon-outline'
                : 'sunny-outline'
            }
            size={24}
            color={colors.primary}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.themeTitle,
                { color: colors.text },
              ]}
            >
              {isDark
                ? 'Midnight Explorer'
                : 'Light Explorer'}
            </Text>

            <Text
              style={[
                styles.themeDescription,
                { color: colors.secondary },
              ]}
            >
              Giao diện hiện tại
            </Text>
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          { borderTopColor: colors.border },
        ]}
      >
        <View style={styles.footerRow}>
          <Ionicons
            name="heart"
            size={18}
            color={colors.danger}
          />

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            Developed by Ngọc Bảo
          </Text>
        </View>

        <Text
          style={[
            styles.version,
            { color: colors.primary },
          ]}
        >
          VERSION 1.0.0 • BT08
        </Text>
      </View>
    </View>
  );
}

// Khai báo Drawer Navigation
export default function AppDrawer() {
  const { colors } = useTravel();

  return (
    <Drawer.Navigator
      initialRouteName="Main"

      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}

      screenOptions={{
        headerShown: false,

        drawerPosition: 'left',

        drawerType: 'front',

        drawerStyle: {
          backgroundColor: colors.card,
          width: 310,
        },

        drawerActiveTintColor: colors.primary,

        drawerInactiveTintColor: colors.secondary,

        drawerActiveBackgroundColor: colors.surface,

        drawerInactiveBackgroundColor: 'transparent',

        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
        },

        drawerItemStyle: {
          borderRadius: 14,
          marginHorizontal: 12,
          marginVertical: 5,
        },

        overlayColor: 'rgba(0,0,0,0.65)',
      }}
    >
      {/* Trang chủ */}
      <Drawer.Screen
        name="Main"
        component={MainTabs}
        options={{
          title: 'Trang chủ',

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Giới thiệu */}
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'Giới thiệu',

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Cài đặt */}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Liên hệ */}
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: 'Liên hệ',

          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="mail-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 22,
    gap: 10,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandTitle: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1,
  },

  brandSubtitle: {
    fontSize: 8,
    letterSpacing: 1,
    marginTop: 5,
  },

  profileCard: {
    marginHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
  },

  profileBanner: {
    height: 125,
    backgroundColor: '#26384D',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: 'rgba(8,15,28,0.45)',
  },

  bannerText: {
    color: '#50E4C2',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
    marginTop: 7,
  },

  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    gap: 12,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 22,
    fontWeight: '900',
  },

  profileName: {
    fontSize: 14,
    fontWeight: '900',
  },

  studentCode: {
    fontSize: 11,
    marginTop: 5,
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    gap: 10,
    marginBottom: 25,
  },

  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 7,
  },

  statLabel: {
    fontSize: 11,
    marginTop: 5,
  },

  menuLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: 20,
    marginBottom: 12,
  },

  divider: {
    height: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },

  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },

  themeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  themeDescription: {
    fontSize: 11,
    marginTop: 5,
  },

  footer: {
    borderTopWidth: 1,
    padding: 20,
    paddingBottom: 25,
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  footerText: {
    fontSize: 12,
  },

  version: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 12,
  },
});
