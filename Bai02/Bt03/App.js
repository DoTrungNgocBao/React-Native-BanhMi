
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  Alert,
  Platform
} from 'react-native';

import Header from './components/Header';
import ProductList from './components/ProductList';
import CartPanel from './components/CartPanel';
import OrderHistory from './components/OrderHistory';
import products from './components/products';

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tất cả');

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  const categories = [
    'Tất cả',
    'Laptop',
    'Âm thanh',
    'Đồng hồ',
    'Camera',
    'Phụ kiện',
    'Điện thoại'
  ];

  const money = (value) =>
    Number(value || 0).toLocaleString('vi-VN') + 'đ';

  // Tìm kiếm và lọc sản phẩm
  const filteredProducts = products.filter((item) => {
    const keyword = search.trim().toLowerCase();

    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);

    const matchCategory =
      category === 'Tất cả' ||
      item.category === category;

    return matchSearch && matchCategory;
  });

  // Tổng số lượng sản phẩm trong giỏ
  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Thêm sản phẩm
  const addToCart = (product) => {
    setCart((current) => {
      const exists = current.find(
        (item) => item.id === product.id
      );

      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };

  // Tăng số lượng
  const increaseQuantity = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  };

  // Giảm số lượng
  const decreaseQuantity = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Mở giỏ hàng
  const openCart = () => {
    Keyboard.dismiss();
    setShowOrders(false);
    setShowCart(true);
  };

  // Mở danh sách đơn hàng
  const openOrders = () => {
    Keyboard.dismiss();
    setShowCart(false);
    setShowOrders(true);
  };

  // Xác nhận đặt hàng
  const handleOrderSuccess = (orderData) => {
    if (
      !orderData ||
      !orderData.name ||
      !orderData.phone ||
      !orderData.address ||
      !Array.isArray(orderData.items) ||
      orderData.items.length === 0
    ) {
      if (Platform.OS === 'web') {
        window.alert('Thông tin đơn hàng chưa đầy đủ.');
      } else {
        Alert.alert(
          'Thông báo',
          'Thông tin đơn hàng chưa đầy đủ.'
        );
      }
      return;
    }

    const orderItems = orderData.items.map((item) => ({
      ...item
    }));

    const total = orderItems.reduce(
      (sum, item) =>
        sum + Number(item.price) * item.quantity,
      0
    );

    const newOrder = {
      id:
        'PT' +
        Date.now() +
        Math.floor(Math.random() * 1000),

      date: new Date().toLocaleString('vi-VN'),

      name: orderData.name.trim(),
      phone: orderData.phone.trim(),
      address: orderData.address.trim(),

      items: orderItems,
      total: total,

      status: 'Chờ xác nhận',
      paymentMethod: 'Thanh toán khi nhận hàng (COD)'
    };

    // Lưu đơn hàng
    setOrders((current) => [
      newOrder,
      ...current
    ]);

    // Làm trống giỏ hàng
    setCart([]);

    // Đóng giỏ và mở lịch sử đơn hàng
    setShowCart(false);
    setShowOrders(true);
  };

  const pageHeader = (
    <View>
      <Header
        cartCount={cartCount}
        onCartPress={openCart}
      />

      {/* Nút xem đơn hàng đã đặt */}
      <TouchableOpacity
        style={styles.orderHistoryButton}
        onPress={openOrders}
        activeOpacity={0.8}
      >
        <View style={styles.orderHistoryLeft}>
          <Text style={styles.orderHistoryIcon}>
            📦
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.orderHistoryTitle}>
              Đơn hàng của tôi
            </Text>

            <Text style={styles.orderHistorySubtitle}>
              Xem thông tin người mua và đơn đã đặt
            </Text>
          </View>
        </View>

        <View style={styles.orderCountBox}>
          <Text style={styles.orderCountText}>
            {orders.length}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Giới thiệu cửa hàng */}
      <View style={styles.intro}>
        <Text style={styles.heading}>
          Khám phá thế giới
          {'\n'}
          <Text style={styles.accent}>
            công nghệ ✨
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Thiết bị hiện đại. Phong cách khác biệt.
        </Text>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTag}>
            ✦ EXCLUSIVE COLLECTION
          </Text>

          <Text style={styles.bannerTitle}>
            LEVEL UP
            {'\n'}
            YOUR TECH.
          </Text>

          <Text style={styles.bannerDesc}>
            {products.length} sản phẩm công nghệ dành cho bạn
          </Text>

          <View style={styles.bannerPill}>
            <Text style={styles.bannerPillText}>
              PURPLE TECH PRO ↗
            </Text>
          </View>
        </View>

        {/* Tìm kiếm */}
        <TextInput
          style={styles.search}
          placeholder="🔍 Tìm sản phẩm yêu thích..."
          placeholderTextColor="#9B8CB1"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />

        <Text style={styles.categoryTitle}>
          Danh mục sản phẩm
        </Text>
      </View>

      {/* Danh mục sản phẩm */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              setCategory(item);
              Keyboard.dismiss();
            }}
            style={[
              styles.chip,
              category === item && styles.chipActive
            ]}
          >
            <Text
              style={[
                styles.chipText,
                category === item &&
                  styles.chipTextActive
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tiêu đề danh sách */}
      <View style={styles.section}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>
            Sản phẩm nổi bật
          </Text>

          <Text style={styles.sectionSubtitle}>
            Được chọn dành riêng cho bạn
          </Text>
        </View>

        <View style={styles.countBox}>
          <Text style={styles.count}>
            {filteredProducts.length} sản phẩm
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Danh sách sản phẩm */}
      <ProductList
        products={filteredProducts}
        onAdd={addToCart}
        header={pageHeader}
      />

      {/* Giỏ hàng */}
      {showCart && (
        <CartPanel
          cart={cart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onClose={() => setShowCart(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Lịch sử đơn hàng */}
      {showOrders && (
        <OrderHistory
          orders={orders}
          onClose={() => setShowOrders(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7FF'
  },

  orderHistoryButton: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 18,
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E9DDFB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  orderHistoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },

  orderHistoryIcon: {
    fontSize: 27,
    marginRight: 12
  },

  orderHistoryTitle: {
    fontSize: 14,
    color: '#34145F',
    fontWeight: '900'
  },

  orderHistorySubtitle: {
    color: '#9B8CB1',
    fontSize: 10,
    marginTop: 4
  },

  orderCountBox: {
    backgroundColor: '#7C3AED',
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },

  orderCountText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13
  },

  intro: {
    paddingHorizontal: 20,
    paddingTop: 26
  },

  heading: {
    fontSize: 29,
    fontWeight: '900',
    color: '#24143D',
    lineHeight: 38
  },

  accent: {
    color: '#7C3AED'
  },

  subtitle: {
    color: '#8B809D',
    fontSize: 13,
    marginTop: 10
  },

  banner: {
    backgroundColor: '#7C3AED',
    borderRadius: 24,
    padding: 24,
    marginTop: 25
  },

  bannerTag: {
    color: '#E9D5FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '900',
    marginTop: 13,
    lineHeight: 36
  },

  bannerDesc: {
    color: '#F3E8FF',
    fontSize: 12,
    marginTop: 10
  },

  bannerPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 18
  },

  bannerPillText: {
    color: '#6D28D9',
    fontSize: 10,
    fontWeight: '900'
  },

  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E9DDFB',
    color: '#24143D',
    height: 54,
    paddingHorizontal: 17,
    marginTop: 23,
    fontSize: 14
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#24143D',
    marginTop: 26
  },

  categoryContent: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    alignItems: 'center'
  },

  chip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 17,
    paddingVertical: 12,
    marginRight: 9,
    borderWidth: 1,
    borderColor: '#E9DDFB'
  },

  chipActive: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED'
  },

  chipText: {
    color: '#776A8F',
    fontSize: 12,
    fontWeight: 'bold'
  },

  chipTextActive: {
    color: '#FFFFFF'
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14
  },

  sectionTitle: {
    color: '#24143D',
    fontSize: 19,
    fontWeight: '900'
  },

  sectionSubtitle: {
    color: '#9B8CB1',
    fontSize: 11,
    marginTop: 5
  },

  countBox: {
    backgroundColor: '#EDE9FE',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8
  },

  count: {
    color: '#6D28D9',
    fontSize: 11,
    fontWeight: 'bold'
  }
});
