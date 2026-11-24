
import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet
} from 'react-native';

import ProductCard from './ProductCard';

export default function ProductList({
  products,
  onAdd,
  header
}) {
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onAdd={onAdd}
        />
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Text style={styles.empty}>
          Không tìm thấy sản phẩm phù hợp.
        </Text>
      }
      ListFooterComponent={
        <Text style={styles.footer}>
          ✦ PURPLE TECH PRO ✦
          {'\n'}
          NGỌC BẢO PREMIUM STORE
          {'\n'}
          © 2026
        </Text>
      }
      style={styles.list}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  content: {
    paddingBottom: 30
  },
  empty: {
    color: '#7C7290',
    textAlign: 'center',
    padding: 30
  },
  footer: {
    color: '#9B8CB1',
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 24,
    marginTop: 30,
    marginBottom: 20,
    letterSpacing: 1
  }
});
