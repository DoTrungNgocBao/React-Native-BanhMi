
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Modal,
  FlatList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../context/TravelContext';
import { destinations } from '../data/destinations';

// Định dạng tiền Việt Nam
const formatMoney = (value) =>
  Number(value).toLocaleString('vi-VN') + ' VNĐ';

// Kiểm tra ngày khởi hành
const validDate = (value) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return false;
  }

  const [day, month, year] =
    value.split('/').map(Number);

  const date = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date >= today
  );
};

export default function TravelPlannerScreen({
  navigation,
  route,
}) {
  // Lấy dữ liệu từ TravelContext
  const {
    colors,
    plans,
    addPlan,
    removePlan,
    storageError,
    isLoaded,
  } = useTravel();

  const [destination, setDestination] =
    useState(
      route.params?.destination ||
      destinations[0]
    );

  const [days, setDays] = useState(
    parseInt(
      route.params?.destination?.duration,
      10
    ) || 3
  );

  const [people, setPeople] = useState(2);

  const [departure, setDeparture] =
    useState('');

  const [note, setNote] = useState('');

  const [showPlaces, setShowPlaces] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [success, setSuccess] =
    useState(false);

  // Tự động tính tổng chi phí
  const total =
    destination.dailyBudget * days * people;

  // Lưu kế hoạch thông qua TravelContext
  const savePlan = () => {
    if (!isLoaded) {
      setSuccess(false);
      setMessage('Dữ liệu lưu trữ chưa sẵn sàng.');
      return;
    }

    if (!validDate(departure.trim())) {
      setSuccess(false);

      setMessage(
        'Vui lòng nhập ngày hợp lệ, không ở quá khứ (DD/MM/YYYY).'
      );

      return;
    }

    const newPlan = {
      id: Date.now().toString(),
      destination,
      days,
      people,
      departure: departure.trim(),
      note: note.trim(),
      total,
    };

    addPlan(newPlan);

    setSuccess(true);

    setMessage(
      'Đã thêm kế hoạch chuyến đi thành công!'
    );
  };

  // Xóa kế hoạch
  const handleRemovePlan = (id) => {
    removePlan(id);
    setSuccess(true);
    setMessage('Đã xóa kế hoạch du lịch.');
  };

  // Nút tăng giảm số người và số ngày
  const renderCounter = (
    title,
    icon,
    value,
    setValue,
    max,
    unit
  ) => (
    <View style={styles.counterRow}>
      <View
        style={[
          styles.smallIcon,
          { backgroundColor: colors.surface },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={colors.primary}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.label,
            { color: colors.text },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.secondary },
          ]}
        >
          {value} {unit}
        </Text>
      </View>

      <Pressable
        disabled={value <= 1}
        onPress={() =>
          setValue((v) => Math.max(1, v - 1))
        }
        style={[
          styles.counterButton,
          {
            backgroundColor: colors.surface,
            opacity: value <= 1 ? 0.4 : 1,
          },
        ]}
      >
        <Ionicons
          name="remove"
          size={22}
          color={colors.primary}
        />
      </Pressable>

      <Text
        style={[
          styles.counterValue,
          { color: colors.text },
        ]}
      >
        {value}
      </Text>

      <Pressable
        disabled={value >= max}
        onPress={() =>
          setValue((v) => Math.min(max, v + 1))
        }
        style={[
          styles.counterButton,
          {
            backgroundColor: colors.primary,
            opacity: value >= max ? 0.4 : 1,
          },
        ]}
      >
        <Ionicons
          name="add"
          size={22}
          color="#080F1C"
        />
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
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[
            styles.smallIcon,
            { backgroundColor: colors.card },
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={25}
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
            TRAVEL PLANNER
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondary },
            ]}
          >
            MIDNIGHT EXPLORER 2.0
          </Text>
        </View>

        <Ionicons
          name="calendar-outline"
          size={29}
          color={colors.primary}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Banner địa điểm */}
        <ImageBackground
          source={{ uri: destination.image }}
          style={styles.banner}
        >
          <View style={styles.overlay}>
            <Text style={styles.bannerLabel}>
              YOUR NEXT ADVENTURE
            </Text>

            <Text style={styles.bannerTitle}>
              {destination.name}
            </Text>

            <Text style={styles.bannerSubtitle}>
              {destination.location}
            </Text>
          </View>
        </ImageBackground>

        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          Lên kế hoạch chuyến đi
        </Text>

        <Text
          style={[
            styles.description,
            { color: colors.secondary },
          ]}
        >
          Tạo hành trình và dự tính ngân sách
          theo cách của riêng bạn.
        </Text>

        {/* Form nhập thông tin */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card },
          ]}
        >
          <Text
            style={[
              styles.label,
              { color: colors.primary },
            ]}
          >
            Địa điểm du lịch
          </Text>

          <Pressable
            onPress={() => setShowPlaces(true)}
            style={[
              styles.inputRow,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name="location-outline"
              size={24}
              color={colors.primary}
            />

            <Text
              style={{
                flex: 1,
                color: colors.text,
                fontWeight: 'bold',
              }}
            >
              {destination.name}
            </Text>

            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.primary}
            />
          </Pressable>

          {/* Ngày khởi hành */}
          <Text
            style={[
              styles.label,
              {
                color: colors.primary,
                marginTop: 20,
              },
            ]}
          >
            Ngày khởi hành
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
              name="calendar-outline"
              size={23}
              color={colors.primary}
            />

            <TextInput
              value={departure}
              onChangeText={setDeparture}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={colors.secondary}
              maxLength={10}
              style={[
                styles.input,
                { color: colors.text },
              ]}
            />
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border },
            ]}
          />

          {renderCounter(
            'Số người',
            'people-outline',
            people,
            setPeople,
            20,
            'người'
          )}

          {renderCounter(
            'Số ngày',
            'time-outline',
            days,
            setDays,
            30,
            'ngày'
          )}

          {/* Ghi chú */}
          <Text
            style={[
              styles.label,
              {
                color: colors.primary,
                marginTop: 20,
              },
            ]}
          >
            Ghi chú chuyến đi
          </Text>

          <TextInput
            multiline
            value={note}
            onChangeText={setNote}
            placeholder="Nhập ghi chú của bạn..."
            placeholderTextColor={colors.secondary}
            maxLength={500}
            style={[
              styles.noteInput,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          />

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.secondary,
                textAlign: 'right',
              },
            ]}
          >
            {note.length}/500
          </Text>
        </View>

        {/* Tính chi phí */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card },
          ]}
        >
          <View style={styles.sectionRow}>
            <Ionicons
              name="wallet-outline"
              size={27}
              color={colors.primary}
            />

            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text },
              ]}
            >
              Chi phí dự kiến
            </Text>
          </View>

          {[
            [
              'Mỗi người/ngày',
              formatMoney(destination.dailyBudget),
            ],
            ['Số người', people + ' người'],
            ['Thời gian', days + ' ngày'],
          ].map(([label, value]) => (
            <View
              key={label}
              style={styles.costRow}
            >
              <Text
                style={{ color: colors.secondary }}
              >
                {label}
              </Text>

              <Text
                style={{
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                {value}
              </Text>
            </View>
          ))}

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border },
            ]}
          />

          <Text
            style={[
              styles.totalLabel,
              { color: colors.secondary },
            ]}
          >
            TỔNG NGÂN SÁCH
          </Text>

          <Text
            style={[
              styles.total,
              { color: colors.primary },
            ]}
          >
            {formatMoney(total)}
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.secondary },
            ]}
          >
            Chi phí giả lập, không phải báo giá
            hoặc đặt dịch vụ thực tế.
          </Text>

          {/* Nút lưu kế hoạch */}
          <Pressable
            onPress={savePlan}
            disabled={!isLoaded}
            style={[
              styles.saveButton,
              {
                backgroundColor: colors.primary,
                opacity: isLoaded ? 1 : 0.5,
              },
            ]}
          >
            <Ionicons
              name="bookmark-outline"
              size={23}
              color="#080F1C"
            />

            <Text style={styles.saveText}>
              {isLoaded
                ? 'LƯU KẾ HOẠCH'
                : 'ĐANG TẢI DỮ LIỆU...'}
            </Text>
          </Pressable>

          {/* Hiển thị lỗi lưu trữ */}
          {!!storageError && (
            <Text
              style={[
                styles.message,
                { color: colors.danger },
              ]}
            >
              {storageError}
            </Text>
          )}

          {/* Thông báo kết quả */}
          {!!message && !storageError && (
            <Text
              style={[
                styles.message,
                {
                  color: success
                    ? colors.primary
                    : colors.danger,
                },
              ]}
            >
              {message}
            </Text>
          )}
        </View>

        {/* Danh sách kế hoạch đã lưu */}
        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          Kế hoạch của tôi ({plans.length})
        </Text>

        {!isLoaded && (
          <Text style={{ color: colors.secondary }}>
            Đang tải kế hoạch đã lưu...
          </Text>
        )}

        {isLoaded && plans.length === 0 && (
          <View
            style={[
              styles.emptyCard,
              { backgroundColor: colors.card },
            ]}
          >
            <Ionicons
              name="airplane-outline"
              size={45}
              color={colors.primary}
            />

            <Text
              style={[
                styles.description,
                { color: colors.secondary },
              ]}
            >
              Bạn chưa có kế hoạch du lịch.
            </Text>
          </View>
        )}

        {plans.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              { backgroundColor: colors.card },
            ]}
          >
            <ImageBackground
              source={{
                uri: item.destination.image,
              }}
              style={styles.planImage}
            >
              <View style={styles.planOverlay}>
                <Text style={styles.planImageTitle}>
                  {item.destination.name}
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.sectionRow}>
              <Ionicons
                name="airplane-outline"
                size={25}
                color={colors.primary}
              />

              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.text,
                    flex: 1,
                  },
                ]}
              >
                {item.destination.name}
              </Text>

              <Pressable
                disabled={!isLoaded}
                onPress={() =>
                  handleRemovePlan(item.id)
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color={colors.danger}
                />
              </Pressable>
            </View>

            <Text
              style={[
                styles.description,
                { color: colors.secondary },
              ]}
            >
              Khởi hành: {item.departure}
            </Text>

            <Text
              style={[
                styles.description,
                { color: colors.secondary },
              ]}
            >
              {item.people} người • {item.days} ngày
            </Text>

            {!!item.note && (
              <Text
                style={[
                  styles.description,
                  { color: colors.secondary },
                ]}
              >
                Ghi chú: {item.note}
              </Text>
            )}

            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border },
              ]}
            />

            <Text
              style={[
                styles.subtitle,
                { color: colors.secondary },
              ]}
            >
              Tổng chi phí dự kiến
            </Text>

            <Text
              style={[
                styles.planPrice,
                { color: colors.primary },
              ]}
            >
              {formatMoney(item.total)}
            </Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footerContainer}>
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
              styles.footer,
              { color: colors.secondary },
            ]}
          >
            MIDNIGHT EXPLORER 2.0
          </Text>

          <Text
            style={[
              styles.footer,
              { color: colors.secondary },
            ]}
          >
            Đỗ Trung Ngọc Bảo
          </Text>

          <Text
            style={[
              styles.footer,
              { color: colors.secondary },
            ]}
          >
            CD-CNTT18A05
          </Text>
        </View>
      </ScrollView>

      {/* Hộp thoại chọn địa điểm */}
      <Modal
        visible={showPlaces}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setShowPlaces(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.card },
            ]}
          >
            <View style={styles.sectionRow}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.text,
                    flex: 1,
                  },
                ]}
              >
                Chọn địa điểm
              </Text>

              <Pressable
                onPress={() =>
                  setShowPlaces(false)
                }
              >
                <Ionicons
                  name="close-circle-outline"
                  size={29}
                  color={colors.primary}
                />
              </Pressable>
            </View>

            <FlatList
              data={destinations}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setDestination(item);

                    setDays(
                      parseInt(item.duration, 10) || 3
                    );

                    setShowPlaces(false);
                    setMessage('');
                  }}
                  style={[
                    styles.placeRow,
                    {
                      borderBottomColor: colors.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={23}
                    color={colors.primary}
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.label,
                        { color: colors.text },
                      ]}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={[
                        styles.subtitle,
                        { color: colors.secondary },
                      ]}
                    >
                      {formatMoney(item.dailyBudget)}
                      / ngày
                    </Text>
                  </View>

                  {destination.id === item.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={25}
                      color={colors.primary}
                    />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
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
    gap: 12,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 35,
  },

  smallIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  banner: {
    height: 210,
    borderRadius: 23,
    overflow: 'hidden',
    backgroundColor: '#26384D',
  },

  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(8,15,28,0.5)',
  },

  bannerLabel: {
    color: '#50E4C2',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 10,
  },

  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 7,
  },

  title: {
    fontSize: 23,
    fontWeight: '900',
    marginTop: 24,
    marginBottom: 10,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 7,
  },

  card: {
    borderRadius: 20,
    padding: 17,
    marginTop: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 11,
    marginTop: 5,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 1,
    padding: 13,
    gap: 10,
    marginTop: 10,
    minHeight: 55,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  divider: {
    height: 1,
    marginVertical: 20,
  },

  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginVertical: 10,
  },

  counterButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterValue: {
    fontSize: 19,
    fontWeight: '900',
    minWidth: 25,
    textAlign: 'center',
  },

  noteInput: {
    minHeight: 100,
    borderRadius: 13,
    borderWidth: 1,
    padding: 13,
    marginTop: 10,
    textAlignVertical: 'top',
    fontSize: 14,
  },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '900',
  },

  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 9,
  },

  totalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  total: {
    fontSize: 29,
    fontWeight: '900',
    marginVertical: 10,
  },

  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    padding: 17,
    gap: 10,
    marginTop: 20,
  },

  saveText: {
    color: '#080F1C',
    fontSize: 14,
    fontWeight: '900',
  },

  message: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 15,
    textAlign: 'center',
  },

  emptyCard: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },

  planImage: {
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 17,
    backgroundColor: '#26384D',
  },

  planOverlay: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(8,15,28,0.35)',
  },

  planImageTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  planPrice: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 10,
  },

  footerContainer: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  footerTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 10,
  },

  footer: {
    fontSize: 11,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },

  modalCard: {
    height: '75%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
});
