
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import { useTravel } from '../context/TravelContext';

import { destinations } from '../data/destinations';

const categoryNames = {
  beach: 'Du lịch biển',
  mountain: 'Du lịch vùng núi',
  culture: 'Văn hóa',
  nature: 'Thiên nhiên',
};

const formatMoney = (value) =>
  Number(value).toLocaleString('vi-VN') + ' đ';

export default function DestinationDetailScreen({
  navigation,
  route,
}) {
  const {
    colors,
    isFavorite,
    toggleFavorite,
  } = useTravel();

  const destination = route.params?.destination;

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [plannerPreview, setPlannerPreview] =
    useState(false);

  if (!destination) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Ionicons
          name="alert-circle-outline"
          size={60}
          color={colors.primary}
        />

        <Text
          style={{
            color: colors.text,
            marginVertical: 20,
          }}
        >
          Không tìm thấy địa điểm
        </Text>

        <Pressable
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: colors.primary }}>
            Quay lại
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite(destination.id);

  // Bộ ảnh minh họa cùng danh mục
  const gallery = [
    destination.image,
    ...destinations
      .filter(
        (item) =>
          item.category === destination.category &&
          item.id !== destination.id
      )
      .map((item) => item.image),
  ];

  const uniqueGallery =
    [...new Set(gallery)].slice(0, 4);

  const totalDays =
    parseInt(destination.duration, 10) || 3;

  const itinerary = Array.from(
    { length: totalDays },
    (_, index) => ({
      day: index + 1,
      activities: destination.highlights.filter(
        (_, activityIndex) =>
          activityIndex % totalDays === index
      ),
    })
  );

  const information = [
    {
      icon: 'time-outline',
      title: 'Thời gian',
      value: destination.duration,
    },
    {
      icon: 'sunny-outline',
      title: 'Mùa đẹp',
      value: destination.bestTime,
    },
    {
      icon: 'wallet-outline',
      title: 'Mỗi người/ngày',
      value: formatMoney(
        destination.dailyBudget
      ),
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
          onPress={() => navigation.goBack()}
          style={[
            styles.iconButton,
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
            DESTINATION DETAIL
          </Text>

          <Text
            style={[
              styles.headerSubtitle,
              { color: colors.secondary },
            ]}
          >
            TRAVELLING 2.0
          </Text>
        </View>

        <Pressable
          onPress={() =>
            toggleFavorite(destination)
          }
          style={[
            styles.iconButton,
            { backgroundColor: colors.card },
          ]}
        >
          <Ionicons
            name={
              favorite ? 'heart' : 'heart-outline'
            }
            size={26}
            color={
              favorite
                ? colors.danger
                : colors.primary
            }
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ảnh chính */}
        <ImageBackground
          source={{ uri: destination.image }}
          style={styles.hero}
          imageStyle={{ borderRadius: 24 }}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroTop}>
              <View style={styles.categoryBadge}>
                <Ionicons
                  name="compass-outline"
                  size={16}
                  color="#50E4C2"
                />

                <Text style={styles.categoryText}>
                  {categoryNames[destination.category]}
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  setSelectedImage(destination.image)
                }
                style={styles.expandButton}
              >
                <Ionicons
                  name="expand-outline"
                  size={23}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>

            <View>
              <Text style={styles.collection}>
                VIETNAM COLLECTION
              </Text>

              <Text style={styles.destinationName}>
                {destination.name}
              </Text>

              <View style={styles.heroBottom}>
                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={19}
                    color="#50E4C2"
                  />

                  <Text style={styles.location}>
                    {destination.location}
                  </Text>
                </View>

                <View style={styles.ratingBadge}>
                  <Ionicons
                    name="star"
                    size={17}
                    color="#FACC15"
                  />

                  <Text style={styles.ratingText}>
                    {destination.rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Thông tin nhanh */}
        <View style={styles.infoRow}>
          {information.map((item) => (
            <View
              key={item.title}
              style={[
                styles.infoCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name={item.icon}
                size={25}
                color={colors.primary}
              />

              <Text
                style={[
                  styles.infoValue,
                  { color: colors.text },
                ]}
              >
                {item.value}
              </Text>

              <Text
                style={[
                  styles.infoLabel,
                  { color: colors.secondary },
                ]}
              >
                {item.title}
              </Text>
            </View>
          ))}
        </View>

        {/* Bộ sưu tập ảnh */}
        <View style={styles.sectionHeader}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text },
            ]}
          >
            Bộ sưu tập ảnh
          </Text>

          <Text style={{ color: colors.primary }}>
            {uniqueGallery.length} ảnh
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryRow}
        >
          {uniqueGallery.map((image, index) => (
            <Pressable
              key={image}
              onPress={() =>
                setSelectedImage(image)
              }
            >
              <Image
                source={{ uri: image }}
                style={styles.galleryImage}
              />

              <View style={styles.imageNumber}>
                <Text style={styles.imageNumberText}>
                  0{index + 1}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={[
            styles.note,
            { color: colors.secondary },
          ]}
        >
          Ảnh minh họa phong cảnh cùng danh mục.
        </Text>

        {/* Giới thiệu */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Giới thiệu địa điểm
        </Text>

        <View
          style={[
            styles.contentCard,
            { backgroundColor: colors.card },
          ]}
        >
          <Text
            style={[
              styles.description,
              { color: colors.secondary },
            ]}
          >
            {destination.description}
          </Text>
        </View>

        {/* Hoạt động nổi bật */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Trải nghiệm nổi bật
        </Text>

        {destination.highlights.map(
          (activity, index) => (
            <View
              key={activity}
              style={[
                styles.activityCard,
                { backgroundColor: colors.card },
              ]}
            >
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: colors.surface },
                ]}
              >
                <Ionicons
                  name="compass-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.activityNumber,
                    { color: colors.primary },
                  ]}
                >
                  TRẢI NGHIỆM 0{index + 1}
                </Text>

                <Text
                  style={[
                    styles.activityTitle,
                    { color: colors.text },
                  ]}
                >
                  {activity}
                </Text>
              </View>

              <Ionicons
                name="checkmark-circle-outline"
                size={23}
                color={colors.primary}
              />
            </View>
          )
        )}

        {/* Lịch trình du lịch */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Lịch trình gợi ý
        </Text>

        <View
          style={[
            styles.contentCard,
            { backgroundColor: colors.card },
          ]}
        >
          {itinerary.map((item) => (
            <View
              key={item.day}
              style={styles.timelineRow}
            >
              <View
                style={[
                  styles.dayCircle,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dayNumber,
                    { color: colors.primary },
                  ]}
                >
                  0{item.day}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.dayLabel,
                    { color: colors.primary },
                  ]}
                >
                  NGÀY {item.day}
                </Text>

                {item.activities.length > 0
                  ? item.activities.map(
                      (activity) => (
                        <Text
                          key={activity}
                          style={[
                            styles.timelineText,
                            { color: colors.text },
                          ]}
                        >
                          • {activity}
                        </Text>
                      )
                    )
                  : (
                    <Text
                      style={[
                        styles.timelineText,
                        { color: colors.text },
                      ]}
                    >
                      Nghỉ ngơi và tự do khám phá
                    </Text>
                  )}
              </View>
            </View>
          ))}
        </View>

        {/* Chi phí */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.text },
          ]}
        >
          Ngân sách chuyến đi
        </Text>

        <View
          style={[
            styles.contentCard,
            { backgroundColor: colors.card },
          ]}
        >
          <Text style={{ color: colors.secondary }}>
            Chi phí tham khảo mỗi người/ngày
          </Text>

          <Text
            style={[
              styles.budgetValue,
              { color: colors.primary },
            ]}
          >
            {formatMoney(destination.dailyBudget)}
          </Text>

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border },
            ]}
          />

          <Text style={{ color: colors.secondary }}>
            Dự kiến {totalDays} ngày / 1 người
          </Text>

          <Text
            style={[
              styles.budgetValue,
              { color: colors.text },
            ]}
          >
            {formatMoney(
              destination.dailyBudget * totalDays
            )}
          </Text>

          <Text
            style={[
              styles.note,
              { color: colors.secondary },
            ]}
          >
            Giá, đánh giá và lịch trình là dữ liệu
            giả lập phục vụ bài thực hành.
          </Text>
        </View>
      </ScrollView>

      {/* Thanh chức năng dưới cùng */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.priceLabel,
              { color: colors.secondary },
            ]}
          >
            Giá tham khảo
          </Text>

          <Text
            style={[
              styles.price,
              { color: colors.primary },
            ]}
          >
            {destination.price}
          </Text>
        </View>

        <Pressable
          onPress={() =>
  navigation.navigate('TravelPlanner', {
    destination: destination,
  })
}
          style={[
            styles.planButton,
            { backgroundColor: colors.primary },
          ]}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#080F1C"
          />

          <Text style={styles.planButtonText}>
            Lập kế hoạch
          </Text>
        </Pressable>
      </View>

      {/* Xem ảnh toàn màn hình */}
      <Modal
        visible={!!selectedImage}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setSelectedImage(null)
        }
      >
        <View style={styles.imageModal}>
          <Pressable
            onPress={() =>
              setSelectedImage(null)
            }
            style={styles.closeImage}
          >
            <Ionicons
              name="close-circle"
              size={40}
              color="#FFFFFF"
            />
          </Pressable>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}

          <Text style={styles.imageCaption}>
            TRAVELLING • ẢNH MINH HỌA
          </Text>
        </View>
      </Modal>

      {/* Xem trước chức năng lập kế hoạch */}
      <Modal
        visible={plannerPreview}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setPlannerPreview(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.card },
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={50}
              color={colors.primary}
            />

            <Text
              style={[
                styles.modalTitle,
                { color: colors.text },
              ]}
            >
              Lập kế hoạch du lịch
            </Text>

            <Text
              style={[
                styles.modalText,
                { color: colors.secondary },
              ]}
            >
              Điểm đến: {destination.name}
            </Text>

            <Text
              style={[
                styles.modalText,
                { color: colors.secondary },
              ]}
            >
              Thời gian: {destination.duration}
            </Text>

            <Text
              style={[
                styles.budgetValue,
                { color: colors.primary },
              ]}
            >
              {formatMoney(
                destination.dailyBudget * totalDays
              )}
            </Text>

            <Text
              style={[
                styles.note,
                { color: colors.secondary },
              ]}
            >
              Bản xem trước chi phí cho một người.
            </Text>

            <Pressable
              onPress={() =>
                setPlannerPreview(false)
              }
              style={[
                styles.modalButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.planButtonText}>
                Đóng
              </Text>
            </Pressable>
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
    padding: 15,
    gap: 10,
  },

  iconButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },

  headerSubtitle: {
    fontSize: 9,
    marginTop: 6,
    letterSpacing: 2,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  hero: {
    height: 310,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#26384D',
  },

  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8,15,28,0.4)',
    padding: 18,
    justifyContent: 'space-between',
  },

  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(8,15,28,0.85)',
    padding: 10,
    borderRadius: 20,
  },

  categoryText: {
    color: '#50E4C2',
    fontSize: 11,
    fontWeight: 'bold',
  },

  expandButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(8,15,28,0.7)',
  },

  collection: {
    color: '#50E4C2',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  destinationName: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '900',
    marginTop: 10,
  },

  heroBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 8,
  },

  locationRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  location: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
  },

  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 9,
    backgroundColor: '#080F1C',
    borderRadius: 12,
  },

  ratingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 20,
  },

  infoCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
  },

  infoValue: {
    fontSize: 12,
    fontWeight: '900',
    marginTop: 10,
    textAlign: 'center',
  },

  infoLabel: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 12,
  },

  galleryRow: {
    gap: 10,
  },

  galleryImage: {
    width: 115,
    height: 115,
    borderRadius: 16,
    backgroundColor: '#26384D',
  },

  imageNumber: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#080F1C',
    borderRadius: 8,
    padding: 6,
  },

  imageNumberText: {
    color: '#50E4C2',
    fontSize: 10,
    fontWeight: 'bold',
  },

  contentCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  description: {
    fontSize: 14,
    lineHeight: 24,
  },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 12,
    gap: 12,
    marginBottom: 10,
  },

  activityIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activityNumber: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 15,
    paddingVertical: 14,
  },

  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dayNumber: {
    fontSize: 19,
    fontWeight: '900',
  },

  dayLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },

  timelineText: {
    fontSize: 14,
    lineHeight: 23,
  },

  budgetValue: {
    fontSize: 23,
    fontWeight: '900',
    marginTop: 10,
  },

  divider: {
    height: 1,
    marginVertical: 17,
  },

  note: {
    fontSize: 11,
    lineHeight: 18,
    marginTop: 12,
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    padding: 15,
    gap: 10,
  },

  priceLabel: {
    fontSize: 10,
  },

  price: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 5,
  },

  planButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 7,
  },

  planButtonText: {
    color: '#080F1C',
    fontSize: 13,
    fontWeight: '900',
  },

  imageModal: {
    flex: 1,
    backgroundColor: '#080F1C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeImage: {
    position: 'absolute',
    top: 35,
    right: 20,
    zIndex: 10,
  },

  fullImage: {
    width: '100%',
    height: '80%',
  },

  imageCaption: {
    color: '#50E4C2',
    fontSize: 11,
    letterSpacing: 2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  modalCard: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 15,
    marginBottom: 12,
  },

  modalText: {
    fontSize: 14,
    marginTop: 8,
  },

  modalButton: {
    width: '100%',
    padding: 15,
    borderRadius: 13,
    alignItems: 'center',
    marginTop: 20,
  },
});
