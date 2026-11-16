
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function Header({ cartCount, onCartPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>WELCOME TO</Text>
          <Text style={styles.logo}>
            PURPLE <Text style={styles.logoAccent}>TECH.</Text>
          </Text>
          <Text style={styles.subtitle}>
            NGỌC BẢO PREMIUM STORE
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={onCartPress}
        >
          <Text style={styles.cartIcon}>🛍️</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>
              {cartCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcome}>
        Xin chào, Ngọc Bảo! 👋
      </Text>

      <Text style={styles.description}>
        Khám phá công nghệ theo phong cách của bạn.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4C1D95',
    paddingHorizontal: 22,
    paddingTop: 42,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: '#DDD6FE',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '700'
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
    marginTop: 6
  },
  logoAccent: {
    color: '#F0ABFC'
  },
  subtitle: {
    color: '#DDD6FE',
    fontSize: 10,
    marginTop: 5,
    letterSpacing: 1
  },
  cartButton: {
    backgroundColor: '#6D28D9',
    width: 53,
    height: 53,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartIcon: {
    fontSize: 24
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F472B6',
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartCount: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold'
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 32
  },
  description: {
    color: '#E9D5FF',
    fontSize: 13,
    marginTop: 8
  }
});
