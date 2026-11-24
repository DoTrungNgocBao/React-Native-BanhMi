
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../context/TravelContext';
import {
  categories,
  destinations,
} from '../data/destinations';

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const { colors } = useTravel();

  const getCount = (id) => {
    if (id === 'all') {
      return destinations.length;
    }

    return destinations.filter(
      (item) => item.category === id
    ).length;
  };

  const renderCategory = ({ item }) => {
    const active = selectedCategory === item.id;

    return (
      <Pressable
        onPress={() => setSelectedCategory(item.id)}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        style={[
          styles.categoryCard,
          {
            backgroundColor: active
              ? colors.primary
              : colors.card,

            borderColor: active
              ? colors.primary
              : colors.border,
          },
        ]}
      >
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: active
                ? 'rgba(8,15,28,0.12)'
                : colors.surface,
            },
          ]}
        >
          <Ionicons
            name={item.icon}
            size={28}
            color={
              active
                ? colors.background
                : colors.primary
            }
          />
        </View>

        <Text
          style={[
            styles.categoryName,
            {
              color: active
                ? colors.background
                : colors.text,
            },
          ]}
        >
          {item.name}
        </Text>

        <Text
          style={[
            styles.categoryCount,
            {
              color: active
                ? colors.background
                : colors.secondary,
            },
          ]}
        >
          {getCount(item.id)} điểm đến
        </Text>

        {active && (
          <View
            style={[
              styles.activeDot,
              {
                backgroundColor: colors.background,
              },
            ]}
          />
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text
          style={[
            styles.eyebrow,
            { color: colors.primary },
          ]}
        >
          EXPLORE YOUR WAY
        </Text>

        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          Bạn thích khám phá gì?
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.secondary },
          ]}
        >
          Lựa chọn phong cách du lịch của bạn.
        </Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        extraData={selectedCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },

  heading: {
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    fontSize: 23,
    fontWeight: '900',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 7,
  },

  list: {
    paddingHorizontal: 18,
    gap: 12,
  },

  categoryCard: {
    width: 108,
    minHeight: 135,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  categoryName: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },

  categoryCount: {
    fontSize: 10,
    marginTop: 5,
  },

  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 8,
  },
});
