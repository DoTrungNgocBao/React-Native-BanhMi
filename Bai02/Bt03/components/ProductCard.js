
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ProductCard({ product, onAdd }) {
  const formatPrice = (price) =>
    price.toLocaleString('vi-VN') + 'đ';

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {product.tag}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.category}>
          {product.category.toUpperCase()}
        </Text>

        <Text
          style={styles.name}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={3}
        >
          {product.description}
        </Text>

        <Text style={styles.price}>
          {formatPrice(product.price)}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onAdd(product)}
        >
          <Text style={styles.buttonText}>
            + Thêm vào giỏ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 6,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEE7FF',
    elevation: 3,
    shadowColor: '#6D28D9',
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }
  },
  imageBox: {
    backgroundColor: '#F5F3FF',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  badge: {
    position: 'absolute',
    top: 9,
    left: 9,
    backgroundColor: '#7C3AED',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900'
  },
  body: {
    padding: 12
  },
  category: {
    color: '#8B5CF6',
    fontSize: 10,
    fontWeight: '800'
  },
  name: {
    color: '#24143D',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 6,
    minHeight: 39
  },
  description: {
    color: '#7C7290',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
    minHeight: 48
  },
  price: {
    color: '#6D28D9',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 12
  },
  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11
  }
});
