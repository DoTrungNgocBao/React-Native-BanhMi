
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../context/TravelContext';

const categoryNames = {
  beach: 'BEACH COLLECTION',
  mountain: 'MOUNTAIN EXPLORER',
  culture: 'CULTURAL JOURNEY',
  nature: 'NATURE ESCAPE',
};

export default function FavoriteCard({
  destination,
  onPress,
}) {
  const { colors, removeFavorite } = useTravel();

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
      <Pressable onPress={onPress}>
        <View style={styles.imageBox}>
          <Image
            source={{ uri: destination.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.heartBadge}>
            <Ionicons
              name="heart"
              size={16}
              color="#FF5277"
            />
          </View>
        </View>
      </Pressable>

      {/* Thông tin địa điểm */}
      <View style={styles.content}>
        <Text
          style={[
            styles.category,
            { color: colors.primary },
          ]}
        >
          {categoryNames[destination.category]}
        </Text>

        <Pressable onPress={onPress}>
          <Text
            style={[
              styles.name,
              { color: colors.text },
            ]}
          >
            {destination.name}
          </Text>
        </Pressable>

        <View style={styles.row}>
          <Ionicons
            name="location-outline"
            size={15}
            color={colors.secondary}
          />

          <Text
            style={[
              styles.location,
              { color: colors.secondary },
            ]}
          >
            {destination.location}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="star"
            size={15}
            color={colors.star}
          />

          <Text
            style={[
              styles.rating,
              { color: colors.text },
            ]}
          >
            {destination.rating}
          </Text>

          <Ionicons
            name="time-outline"
            size={15}
            color={colors.secondary}
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

        <Text
          style={[
            styles.price,
            { color: colors.primary },
          ]}
        >
          {destination.price}
        </Text>

        {/* Các nút chức năng */}
        <View style={styles.actions}>
          <Pressable
            style={[
              styles.detailButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={onPress}
          >
            <Text
              style={[
                styles.detailText,
                { color: colors.background },
              ]}
            >
              Chi tiết
            </Text>

            <Ionicons
              name="arrow-forward"
              size={15}
              color={colors.background}
            />
          </Pressable>

          <Pressable
            accessibilityLabel="Xóa khỏi yêu thích"
            style={[
              styles.deleteButton,
              {
                backgroundColor:
                  'rgba(255,82,119,0.12)',
              },
            ]}
            onPress={() =>
              removeFavorite(destination.id)
            }
          >
            <Ionicons
              name="trash-outline"
              size={21}
              color={colors.danger}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 22,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 18,
    marginBottom: 15,
    gap: 13,
    alignItems: 'center',
  },

  imageBox: {
    width: 100,
    height: 155,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#26384D',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  heartBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(8,15,28,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
  },

  category: {
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },

  name: {
    fontSize: 21,
    fontWeight: '900',
    marginBottom: 7,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
    marginBottom: 7,
  },

  location: {
    fontSize: 12,
  },

  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },

  duration: {
    fontSize: 11,
  },

  price: {
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 12,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  detailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    gap: 5,
  },

  detailText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
