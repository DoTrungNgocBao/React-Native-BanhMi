
import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTravel } from '../context/TravelContext';

export default function ContactScreen({ navigation }) {
  const { colors } = useTravel();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Góp ý giao diện');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState(false);

  const topics = [
    'Góp ý giao diện',
    'Báo lỗi',
    'Đề xuất tính năng',
    'Khác',
  ];

  const cardStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
  };

  const inputStyle = [
    styles.input,
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.text,
    },
  ];

  // Kiểm tra và gửi góp ý giả lập
  const handleSubmit = () => {
    setSuccess(false);

    if (
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      setStatus('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setStatus('Địa chỉ email không hợp lệ.');
      return;
    }

    setSuccess(true);

    setStatus(
      'Gửi góp ý giả lập thành công! Cảm ơn bạn.'
    );

    setName('');
    setEmail('');
    setMessage('');
    setTopic('Góp ý giao diện');
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
            CONTACT US
          </Text>

          <Text
            style={[
              styles.brandSubtitle,
              { color: colors.secondary },
            ]}
          >
            LET'S CONNECT
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Banner liên hệ */}
        <View style={[styles.heroCard, cardStyle]}>
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons
              name="chatbubbles-outline"
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
            Kết nối với chúng tôi
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.secondary },
            ]}
          >
            Ý kiến của bạn giúp TravellingApp
            ngày càng hoàn thiện hơn.
          </Text>
        </View>

        {/* Thông tin tác giả */}
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          DEVELOPER INFORMATION
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Nhà phát triển
        </Text>

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

          <View style={{ flex: 1 }}>
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
                styles.authorRole,
                { color: colors.secondary },
              ]}
            >
              React Native Developer
            </Text>

            <Text
              style={[
                styles.studentCode,
                { color: colors.primary },
              ]}
            >
              CD-CNTT18A05
            </Text>
          </View>
        </View>

        <View style={[styles.schoolCard, cardStyle]}>
          <Ionicons
            name="school-outline"
            size={28}
            color={colors.primary}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.authorName,
                { color: colors.text },
              ]}
            >
              Cao đẳng Kỹ thuật Công nghệ Nha Trang
            </Text>

            <Text
              style={[
                styles.authorRole,
                { color: colors.secondary },
              ]}
            >
              Công nghệ thông tin • CD-CNTT18A
            </Text>
          </View>
        </View>

        {/* Biểu mẫu góp ý */}
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          SEND YOUR FEEDBACK
        </Text>

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Gửi ý kiến đóng góp
        </Text>

        <View style={[styles.formCard, cardStyle]}>
          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            Họ và tên
          </Text>

          <TextInput
            style={inputStyle}
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ và tên mẫu"
            placeholderTextColor={colors.secondary}
          />

          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            Email
          </Text>

          <TextInput
            style={inputStyle}
            value={email}
            onChangeText={setEmail}
            placeholder="demo@example.com"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            Chủ đề
          </Text>

          <View style={styles.topicGrid}>
            {topics.map((item) => (
              <Pressable
                key={item}
                onPress={() => setTopic(item)}
                style={[
                  styles.topicButton,
                  {
                    backgroundColor:
                      topic === item
                        ? colors.primary
                        : colors.surface,

                    borderColor:
                      topic === item
                        ? colors.primary
                        : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.topicText,
                    {
                      color:
                        topic === item
                          ? colors.background
                          : colors.text,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            Nội dung góp ý
          </Text>

          <TextInput
            style={[
              ...inputStyle,
              styles.messageInput,
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Nhập nội dung góp ý..."
            placeholderTextColor={colors.secondary}
            multiline
            numberOfLines={5}
            maxLength={500}
            textAlignVertical="top"
          />

          <Text
            style={[
              styles.characterCount,
              { color: colors.secondary },
            ]}
          >
            {message.length}/500 ký tự
          </Text>

          <Pressable
            style={[
              styles.submitButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleSubmit}
          >
            <Ionicons
              name="send-outline"
              size={22}
              color={colors.background}
            />

            <Text
              style={[
                styles.submitText,
                { color: colors.background },
              ]}
            >
              GỬI GÓP Ý
            </Text>
          </Pressable>

          {status !== '' && (
            <View
              style={[
                styles.statusBox,
                { backgroundColor: colors.surface },
              ]}
            >
              <Ionicons
                name={
                  success
                    ? 'checkmark-circle-outline'
                    : 'alert-circle-outline'
                }
                size={24}
                color={
                  success
                    ? colors.primary
                    : colors.danger
                }
              />

              <Text
                style={[
                  styles.statusText,
                  {
                    color: success
                      ? colors.primary
                      : colors.danger,
                  },
                ]}
              >
                {status}
              </Text>
            </View>
          )}

          <Text
            style={[
              styles.note,
              { color: colors.secondary },
            ]}
          >
            Đây là biểu mẫu giả lập phục vụ bài tập.
            Không gửi dữ liệu đến máy chủ.
            Bạn có thể sử dụng thông tin mẫu.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
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
            EXPLORE • DISCOVER • EXPERIENCE
          </Text>

          <Text
            style={[
              styles.footerText,
              { color: colors.secondary },
            ]}
          >
            React Native • Bài tập 08
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
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 5,
  },

  content: {
    padding: 18,
    paddingBottom: 30,
  },

  heroCard: {
    borderRadius: 26,
    borderWidth: 1,
    padding: 25,
    alignItems: 'center',
    marginBottom: 28,
  },

  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
  },

  description: {
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 15,
  },

  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    gap: 15,
    marginBottom: 12,
  },

  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 25,
    fontWeight: '900',
  },

  authorName: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },

  authorRole: {
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  studentCode: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 7,
  },

  schoolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    gap: 14,
    marginBottom: 28,
  },

  formCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderRadius: 13,
    padding: 14,
    fontSize: 14,
    marginBottom: 20,
  },

  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 22,
  },

  topicButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  topicText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  messageInput: {
    minHeight: 130,
    marginBottom: 5,
  },

  characterCount: {
    fontSize: 11,
    textAlign: 'right',
    marginBottom: 20,
  },

  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 15,
    gap: 10,
  },

  submitText: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 13,
    marginTop: 15,
    gap: 10,
  },

  statusText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },

  note: {
    fontSize: 11,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 15,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  footerTitle: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 12,
  },

  footerText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
});
