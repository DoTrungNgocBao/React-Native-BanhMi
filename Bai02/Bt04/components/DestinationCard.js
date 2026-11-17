
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function DestinationCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.body}>
        <Text style={styles.category}>
          🌟 {item.category}
        </Text>

        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.location}>
          📍 {item.location}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.button}>
          Xem chi tiết →
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 170,
  },
  body: {
    padding: 17,
  },
  category: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0F172A',
    marginTop: 7,
  },
  location: {
    color: '#64748B',
    marginTop: 6,
  },
  description: {
    color: '#475569',
    marginTop: 9,
    lineHeight: 21,
  },
  button: {
    color: '#2563EB',
    fontWeight: 'bold',
    marginTop: 14,
  },
});
