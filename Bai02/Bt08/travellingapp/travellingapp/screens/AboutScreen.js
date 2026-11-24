
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';

export default function AboutScreen({ navigation }) {
  const { colors } = useTravel();

  const features = [
    {
      icon: 'location-outline',
      title: 'Khám phá 8 địa điểm du lịch',
    },
    {
      icon: 'search-outline',
      title: 'Tìm kiếm và lọc danh mục',
    },
    {
      icon: 'heart-outline',
      title: 'Lưu địa điểm yêu thích',
    },
    {
      icon: 'moon-outline',
      title: 'Giao diện sáng và tối',
    },
    {
      icon: 'person-outline',
      title: 'Thông tin cá nhân',
    },
    {
      icon: 'layers-outline',
      title: 'Điều hướng nhiều màn hình',
    },
  ];

  const technologies = [
    'React Native',
    'Expo Snack',
    'Stack Navigation',
    'Tab Navigation',
    'Drawer Navigation',
    'FlatList',
    'Flexbox',
    'React Context',
  ];

  const cardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
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
            ABOUT US
          </Text>

          <Text
            style={[
              styles.brandSubtitle,
              { color: colors.secondary },
            ]}
          >
            THE STORY BEHIND THE APP
          </Text>
        </View>

        <Pressable
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
          onPress={() => navigation.navigate('Main')}
        >
          <Ionicons
            name="home-outline"
            size={23}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Logo ứng dụng */}
        <View style={[styles.logoCard, cardStyle]}>
          <View
            style={[
              styles.logoCircle,
              {
                backgroundColor: colors.surface,
                borderColor: colors.primary,
              },
            ]}
          >
            <Ionicons
              name="compass-outline"
              size={65}
              color={colors.primary}
            />
          </View>

          <Text
            style={[
              styles.appName,
              { color: colors.primary },
            ]}
          >
            TRAVELLING.
          </Text>

          <Text
            style={[
              styles.edition,
              { color: colors.primary },
            ]}
          >
            MIDNIGHT EXPLORER EDITION
          </Text>

          <Text
            style={[
              styles.version,
              { color: colors.secondary },
            ]}
          >
            Version 1.0.0
          </Text>

          <Text
            style={[
              styles.slogan,
              { color: colors.text },
            ]}
          >
            Khám phá Việt Nam theo cách của bạn.
          </Text>
        </View>

        {/* Giới thiệu ứng dụng */}
        <View style={[styles.storyCard, cardStyle]}>
          <Image
            source={{
              uri: destinations.find(
                (item) => item.id === '7'
              )?.image || destinations[0].image,
            }}
            style={styles.storyImage}
            resizeMode="cover"
          />

          <View style={styles.storyContent}>
            <Text
              style={[
                styles.eyebrow,
                { color: colors.primary },
              ]}
            >
              OUR STORY
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text },
              ]}
            >
              Hành trình khám phá Việt Nam
            </Text>

            <Text
              style={[
                styles.description,
                { color: colors.secondary },
              ]}
            >
              TravellingApp là ứng dụng khám phá
              địa điểm du lịch được xây dựng bằng
              React Native và Expo Snack.
              Ứng dụng giúp người dùng tìm hiểu
              những địa điểm nổi tiếng tại Việt Nam,
              tìm kiếm theo danh mục và lưu lại
              những điểm đến yêu thích.
            </Text>
          </View>
        </View>

        {/* Mục tiêu bài tập */}
        <View style={[styles.goalCard, cardStyle]}>
          <Ionicons
            name="school-outline"
            size={35}
            color={colors.primary}
          />

          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
                marginTop: 15,
              },
            ]}
          >
            Mục tiêu bài tập
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.secondary },
            ]}
          >
            Bài tập 8 thuộc Bài 2: Xây dựng giao
            diện ứng dụng với React Native.
            Mục tiêu là xây dựng ứng dụng nhiều
            màn hình, tổ chức component hợp lý
            và vận dụng Stack Navigation,
            Tab Navigation, Drawer Navigation,
            FlatList và Flexbox.
          </Text>
        </View>

        {/* Tính năng */}
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          APP FEATURES
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Tính năng nổi bật
        </Text>

        {features.map((item) => (
          <View
            key={item.title}
            style={[styles.featureCard, cardStyle]}
          >
            <View
              style={[
                styles.featureIcon,
                { backgroundColor: colors.surface },
              ]}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={colors.primary}
              />
            </View>

            <Text
              style={[
                styles.featureTitle,
                { color: colors.text },
              ]}
            >
              {item.title}
            </Text>

            <Ionicons
              name="checkmark-circle-outline"
              size={23}
              color={colors.primary}
            />
          </View>
        ))}

        {/* Công nghệ sử dụng */}
        <Text
          style={[
            styles.eyebrow,
            {
              color: colors.primary,
              marginTop: 25,
            },
          ]}
        >
          TECHNOLOGY STACK
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Công nghệ sử dụng
        </Text>

        <View style={styles.techGrid}>
          {technologies.map((item) => (
            <View
              key={item}
              style={[styles.techCard, cardStyle]}
            >
              <Ionicons
                name="code-slash-outline"
                size={28}
                color={colors.primary}
              />

              <Text
                style={[
                  styles.techText,
                  { color: colors.text },
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Thông tin tác giả */}
        <View style={[styles.authorCard, cardStyle]}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.surface,
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

          <Text
            style={[
              styles.edition,
              { color: colors.primary },
            ]}
          >
            DEVELOPED BY
          </Text>

          <Text
            style={[
              styles.authorName,
              { color: colors.text },
            ]}
          >
            Đỗ Trung Ngọc Bảo
          </Text>

          <Text
            style={[
              styles.authorInfo,
              { color: colors.secondary },
            ]}
          >
            Mã sinh viên: CD-CNTT18A05
          </Text>

          <Text
            style={[
              styles.authorInfo,
              { color: colors.secondary },
            ]}
          >
            Lớp: CD-CNTT18A
          </Text>

          <Text
            style={[
              styles.authorInfo,
              { color: colors.secondary },
            ]}
          >
            Chuyên ngành: Công nghệ thông tin
          </Text>

          <Text
            style={[
              styles.authorInfo,
              { color: colors.secondary },
            ]}
          >
            Cao đẳng Kỹ thuật Công nghệ Nha Trang
          </Text>

          <View
            style={[
              styles.projectBadge,
              { backgroundColor: colors.surface },
            ]}
          >
            <Text
              style={[
                styles.projectText,
                { color: colors.primary },
              ]}
            >
              REACT NATIVE — BT08
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons
            name="globe-outline"
            size={32}
            color={colors.primary}
          />

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            Dự án học tập — TravellingApp
          </Text>

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            Hình ảnh, chi phí và đánh giá
            mang tính minh họa.
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
    fontSize: 20,
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

  logoCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
    marginBottom: 22,
  },

  logoCircle: {
    width: 115,
    height: 115,
    borderRadius: 58,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  appName: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
  },

  edition: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 10,
    textAlign: 'center',
  },

  version: {
    fontSize: 12,
    marginTop: 12,
  },

  slogan: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 15,
  },

  storyCard: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 22,
  },

  storyImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#26384D',
  },

  storyContent: {
    padding: 20,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 15,
  },

  description: {
    fontSize: 14,
    lineHeight: 24,
  },

  goalCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 25,
  },

  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },

  featureIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  featureTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
  },

  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },

  techCard: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },

  techText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },

  authorCard: {
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
    padding: 25,
    marginTop: 25,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  avatarText: {
    fontSize: 30,
    fontWeight: '900',
  },

  authorName: {
    fontSize: 23,
    fontWeight: '900',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },

  authorInfo: {
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 5,
  },

  projectBadge: {
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginTop: 20,
  },

  projectText: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 25,
  },

  footerText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
  },
});
