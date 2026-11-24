
import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTravel } from '../context/TravelContext';

const categoryNames = {
  beach: 'Biển',
  mountain: 'Núi',
  culture: 'Văn hóa',
  nature: 'Thiên nhiên',
};

export default function DestinationCard({
  destination,
  onPress,
  compact = false,
}) {
  const {
    colors,
    isFavorite,
    toggleFavorite,
  } = useTravel();

  const favorite = isFavorite(destination.id);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      {/* Hình ảnh địa điểm */}
      <ImageBackground
        source={{ uri: destination.image }}
        style={[
          styles.image,
          { height: compact ? 150 : 220 },
        ]}
        resizeMode="cover"
      >
        <View style={styles.overlay}>

          <View style={styles.topRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {categoryNames[destination.category]}
              </Text>
            </View>

            <Pressable
              accessibilityLabel="Yêu thích"
              onPress={() =>
                toggleFavorite(destination)
              }
              style={styles.favoriteButton}
            >
              <Ionicons
                name={
                  favorite
                    ? 'heart'
                    : 'heart-outline'
                }
                size={24}
                color={
                  favorite
                    ? colors.danger
                    : '#FFFFFF'
                }
              />
            </Pressable>
          </View>

          <View style={styles.ratingBadge}>
            <Ionicons
              name="star"
              size={15}
              color="#FACC15"
            />

            <Text style={styles.ratingText}>
              {destination.rating}
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Nội dung địa điểm */}
      <View
        style={[
          styles.content,
          { padding: compact ? 11 : 16 },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.name,
            {
              color: colors.text,
              fontSize: compact ? 19 : 25,
            },
          ]}
        >
          {destination.name}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={15}
            color={colors.primary}
          />

          <Text
            numberOfLines={1}
            style={[
              styles.location,
              { color: colors.secondary },
            ]}
          >
            {destination.location}
          </Text>
        </View>

        {!compact && (
          <Text
            numberOfLines={2}
            style={[
              styles.description,
              { color: colors.secondary },
            ]}
          >
            {destination.description}
          </Text>
        )}

        <View style={styles.durationRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color={colors.primary}
          />

          <Text
            style={[
              styles.duration,
              { color: colors.secondary },
            ]}
          >
            {destination.duration}
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        <Text
          style={[
            styles.priceLabel,
            { color: colors.secondary },
          ]}
        >
          Chi phí tham khảo
        </Text>

        <Text
          style={[
            styles.price,
            {
              color: colors.primary,
              fontSize: compact ? 14 : 20,
            },
          ]}
        >
          {destination.price}
        </Text>

        {/* Nút mở chi tiết */}
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.detailButton,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.detailText,
              { fontSize: compact ? 11 : 14 },
            ]}
          >
            Khám phá ngay
          </Text>

          <Ionicons
            name="arrow-forward"
            size={compact ? 16 : 21}
            color="#080F1C"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },

  image: {
    backgroundColor: '#26384D',
  },

  overlay: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(8,15,28,0.18)',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryBadge: {
    backgroundColor: 'rgba(8,15,28,0.85)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  categoryText: {
    color: '#50E4C2',
    fontSize: 10,
    fontWeight: 'bold',
  },

  favoriteButton: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: 'rgba(8,15,28,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ratingBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(8,15,28,0.85)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
  },

  name: {
    fontWeight: '900',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
  },

  location: {
    flex: 1,
    fontSize: 11,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
  },

  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
  },

  duration: {
    fontSize: 11,
  },

  divider: {
    height: 1,
    marginVertical: 13,
  },

  priceLabel: {
    fontSize: 10,
  },

  price: {
    fontWeight: '900',
    marginTop: 5,
  },

  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 6,
    marginTop: 14,
    gap: 5,
  },

  detailText: {
    color: '#080F1C',
    fontWeight: '900',
    flexShrink: 1,
  },
});
