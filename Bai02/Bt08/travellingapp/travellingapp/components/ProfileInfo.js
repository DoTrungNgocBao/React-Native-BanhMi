
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';

export default function ProfileInfo() {
  const {
    colors,
    profile,
    updateProfile,
    favoriteCount,
    planCount,
    isLoaded,
    storageError,
  } = useTravel();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({});
  const [message, setMessage] = useState('');

  const [imageError, setImageError] =
    useState(false);

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();

  const openEditor = () => {
    setDraft({ ...profile });
    setMessage('');
    setEditing(true);
  };

  const saveProfile = () => {
    if (!isLoaded) {
      setMessage('Dữ liệu chưa sẵn sàng.');
      return;
    }

    if (!draft.name?.trim()) {
      setMessage('Vui lòng nhập họ và tên.');
      return;
    }

    const avatar = (draft.avatar || '').trim();

    if (avatar && !/^https?:\/\/\S+$/i.test(avatar)) {
      setMessage('Link ảnh phải bắt đầu bằng http hoặc https.');
      return;
    }

    updateProfile({
      name: draft.name.trim(),
      studentId: (draft.studentId || '').trim(),
      className: (draft.className || '').trim(),
      bio: (draft.bio || '').trim(),
      avatar,
    });

    setImageError(false);
    setEditing(false);
    setMessage('');
  };

  const fields = [
    {
      key: 'name',
      label: 'Họ và tên',
      icon: 'person-outline',
      placeholder: 'Nhập họ và tên',
      max: 80,
    },
    {
      key: 'studentId',
      label: 'Mã sinh viên',
      icon: 'card-outline',
      placeholder: 'Nhập mã sinh viên',
      max: 30,
    },
    {
      key: 'className',
      label: 'Lớp',
      icon: 'school-outline',
      placeholder: 'Nhập tên lớp',
      max: 30,
    },
    {
      key: 'avatar',
      label: 'Link ảnh đại diện',
      icon: 'image-outline',
      placeholder: 'https://...',
      max: 1000,
    },
    {
      key: 'bio',
      label: 'Tiểu sử',
      icon: 'document-text-outline',
      placeholder: 'Giới thiệu bản thân',
      max: 200,
    },
  ];

  const statistics = [
    {
      icon: 'location-outline',
      value: destinations.length,
      label: 'Điểm đến',
    },
    {
      icon: 'heart-outline',
      value: favoriteCount,
      label: 'Yêu thích',
    },
    {
      icon: 'calendar-outline',
      value: planCount,
      label: 'Kế hoạch',
    },
  ];

  return (
    <View style={styles.container}>

      {/* Thông tin cá nhân */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: colors.surface,
              borderColor: colors.primary,
            },
          ]}
        >
          {!!profile.avatar && !imageError ? (
            <Image
              source={{ uri: profile.avatar }}
              style={styles.avatarImage}
              onError={() => setImageError(true)}
            />
          ) : (
            <Text
              style={[
                styles.initials,
                { color: colors.primary },
              ]}
            >
              {initials || 'NB'}
            </Text>
          )}
        </View>

        <Text
          style={[
            styles.name,
            { color: colors.text },
          ]}
        >
          {profile.name}
        </Text>

        <Text
          style={[
            styles.member,
            { color: colors.primary },
          ]}
        >
          VIETNAM EXPLORER
        </Text>

        <View style={styles.studentRow}>
          <Ionicons
            name="school-outline"
            size={18}
            color={colors.primary}
          />

          <Text
            style={[
              styles.studentText,
              { color: colors.secondary },
            ]}
          >
            {profile.studentId}
          </Text>
        </View>

        <Text
          style={[
            styles.studentText,
            { color: colors.secondary },
          ]}
        >
          Lớp: {profile.className}
        </Text>

        <Text
          style={[
            styles.bio,
            { color: colors.secondary },
          ]}
        >
          {profile.bio}
        </Text>

        <Pressable
          disabled={!isLoaded}
          onPress={openEditor}
          style={[
            styles.editButton,
            {
              backgroundColor: colors.primary,
              opacity: isLoaded ? 1 : 0.5,
            },
          ]}
        >
          <Ionicons
            name="create-outline"
            size={22}
            color="#080F1C"
          />

          <Text style={styles.buttonText}>
            CHỈNH SỬA HỒ SƠ
          </Text>
        </Pressable>

        {!!storageError && (
          <Text
            style={{
              color: colors.danger,
              marginTop: 12,
            }}
          >
            {storageError}
          </Text>
        )}
      </View>

      {/* Thống kê */}
      <Text
        style={[
          styles.sectionTitle,
          { color: colors.text },
        ]}
      >
        Hành trình của tôi
      </Text>

      <View style={styles.statisticsRow}>
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
            <Ionicons
              name={item.icon}
              size={26}
              color={colors.primary}
            />

            <Text
              style={[
                styles.statValue,
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

      {/* Hộp thoại chỉnh sửa hồ sơ */}
      <Modal
        visible={editing}
        transparent
        animationType="slide"
        onRequestClose={() => setEditing(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.card },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.text,
                    flex: 1,
                    marginVertical: 0,
                  },
                ]}
              >
                Chỉnh sửa hồ sơ
              </Text>

              <Pressable
                onPress={() => setEditing(false)}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={30}
                  color={colors.primary}
                />
              </Pressable>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {fields.map((field) => (
                <View
                  key={field.key}
                  style={styles.field}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: colors.primary },
                    ]}
                  >
                    {field.label}
                  </Text>

                  <View
                    style={[
                      styles.inputRow,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name={field.icon}
                      size={22}
                      color={colors.primary}
                    />

                    <TextInput
                      value={draft[field.key] || ''}
                      onChangeText={(value) =>
                        setDraft((previous) => ({
                          ...previous,
                          [field.key]: value,
                        }))
                      }
                      placeholder={field.placeholder}
                      placeholderTextColor={colors.secondary}
                      multiline={field.key === 'bio'}
                      maxLength={field.max}
                      autoCapitalize={
                        field.key === 'avatar'
                          ? 'none'
                          : 'sentences'
                      }
                      style={[
                        styles.input,
                        { color: colors.text },
                        field.key === 'bio' && {
                          minHeight: 70,
                          textAlignVertical: 'top',
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}

              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 11,
                  lineHeight: 18,
                }}
              >
                Bạn có thể để trống link ảnh để
                sử dụng ảnh đại diện chữ cái.
                Thông tin được lưu cục bộ.
              </Text>

              {!!message && (
                <Text
                  style={{
                    color: colors.danger,
                    marginTop: 15,
                  }}
                >
                  {message}
                </Text>
              )}

              <Pressable
                onPress={saveProfile}
                style={[
                  styles.editButton,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons
                  name="save-outline"
                  size={22}
                  color="#080F1C"
                />

                <Text style={styles.buttonText}>
                  LƯU THÔNG TIN
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setEditing(false)}
                style={styles.cancelButton}
              >
                <Text
                  style={{
                    color: colors.secondary,
                    fontWeight: 'bold',
                  }}
                >
                  Hủy thay đổi
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  profileCard: {
    padding: 24,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  initials: {
    fontSize: 35,
    fontWeight: '900',
  },

  name: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center',
  },

  member: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 10,
  },

  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 15,
  },

  studentText: {
    fontSize: 13,
    marginTop: 5,
  },

  bio: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: 18,
  },

  editButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 14,
    marginTop: 15,
  },

  buttonText: {
    color: '#080F1C',
    fontWeight: '900',
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 18,
  },

  statisticsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  statCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 18,
    alignItems: 'center',
  },

  statValue: {
    fontSize: 27,
    fontWeight: '900',
    marginTop: 10,
  },

  statLabel: {
    fontSize: 11,
    marginTop: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    maxHeight: '90%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  field: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 9,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 13,
    padding: 13,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  cancelButton: {
    alignItems: 'center',
    padding: 18,
  },
});
