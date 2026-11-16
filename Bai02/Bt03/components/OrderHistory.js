
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const money = (value) =>
  Number(value || 0).toLocaleString('vi-VN') + 'đ';

export default function OrderHistory({
  orders = [],
  onClose
}) {
  const [expandedId, setExpandedId] = useState(
    orders.length > 0 ? orders[0].id : null
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.panel}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              📦 Đơn hàng của tôi
            </Text>
            <Text style={styles.subtitle}>
              {orders.length} đơn hàng đã tạo
            </Text>
          </View>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator
        >
          {orders.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyTitle}>
                Chưa có đơn hàng
              </Text>
              <Text style={styles.emptyText}>
                Hãy thêm sản phẩm vào giỏ và đặt hàng.
              </Text>
            </View>
          ) : (
            orders.map((order) => {
              const expanded = expandedId === order.id;
              const items = order.items || [];

              return (
                <View key={order.id} style={styles.card}>
                  <View style={styles.topRow}>
                    <Text style={styles.orderId}>
                      #{order.id}
                    </Text>

                    <Text style={styles.status}>
                      {order.status || 'Chờ xác nhận'}
                    </Text>
                  </View>

                  <Text style={styles.date}>
                    🕒 {order.date || 'Vừa đặt'}
                  </Text>

                  <Text style={styles.buyerPreview}>
                    👤 {order.name || 'Chưa có tên'}
                  </Text>

                  <Text style={styles.total}>
                    {money(order.total)}
                  </Text>

                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() =>
                      setExpandedId(
                        expanded ? null : order.id
                      )
                    }
                  >
                    <Text style={styles.detailText}>
                      {expanded
                        ? 'Thu gọn chi tiết ▲'
                        : 'Xem chi tiết đơn hàng ▼'}
                    </Text>
                  </TouchableOpacity>

                  {expanded && (
                    <View style={styles.details}>
                      <Text style={styles.heading}>
                        👤 THÔNG TIN NGƯỜI MUA
                      </Text>

                      <View style={styles.infoBox}>
                        <Text style={styles.info}>
                          Họ tên: {order.name || 'Chưa có'}
                        </Text>
                        <Text style={styles.info}>
                          Số điện thoại: {order.phone || 'Chưa có'}
                        </Text>
                        <Text style={styles.info}>
                          Địa chỉ: {order.address || 'Chưa có'}
                        </Text>
                      </View>

                      <Text style={styles.heading}>
                        🛍️ SẢN PHẨM ĐÃ ĐẶT
                      </Text>

                      {items.map((item) => (
                        <View
                          key={item.id}
                          style={styles.productRow}
                        >
                          <View style={styles.productInfo}>
                            <Text style={styles.productName}>
                              {item.name}
                            </Text>
                            <Text style={styles.productQty}>
                              {money(item.price)} × {item.quantity}
                            </Text>
                          </View>

                          <Text style={styles.productPrice}>
                            {money(
                              item.price * item.quantity
                            )}
                          </Text>
                        </View>
                      ))}

                      <View style={styles.divider} />

                      <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>
                          Tổng thanh toán
                        </Text>
                        <Text style={styles.total}>
                          {money(order.total)}
                        </Text>
                      </View>

                      <View style={styles.paymentBox}>
                        <Text style={styles.paymentText}>
                          💵 Thanh toán khi nhận hàng (COD)
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={onClose}
        >
          <Text style={styles.doneText}>
            Tiếp tục mua sắm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(25,10,50,0.65)',
    justifyContent: 'flex-end',
    zIndex: 30,
    elevation: 30
  },
  panel: {
    backgroundColor: '#FAF7FF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    height: '88%'
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EDE9FE'
  },
  title: {
    fontSize: 21,
    fontWeight: '900',
    color: '#34145F'
  },
  subtitle: {
    color: '#9787AC',
    fontSize: 12,
    marginTop: 5
  },
  close: {
    color: '#7C3AED',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 5
  },
  scroll: {
    flex: 1
  },
  content: {
    padding: 16,
    paddingBottom: 30
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 55
  },
  emptyIcon: {
    fontSize: 45
  },
  emptyTitle: {
    color: '#34145F',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 15
  },
  emptyText: {
    color: '#9787AC',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 17,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EDE9FE'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8
  },
  orderId: {
    color: '#34145F',
    fontWeight: '900',
    fontSize: 13
  },
  status: {
    color: '#A16207',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    fontSize: 10,
    fontWeight: 'bold'
  },
  date: {
    color: '#9787AC',
    fontSize: 11,
    marginTop: 12
  },
  buyerPreview: {
    color: '#594B70',
    fontSize: 13,
    marginTop: 13
  },
  total: {
    color: '#6D28D9',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 9
  },
  detailButton: {
    backgroundColor: '#EDE9FE',
    padding: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15
  },
  detailText: {
    color: '#6D28D9',
    fontSize: 12,
    fontWeight: '900'
  },
  details: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#EEE7FF',
    paddingTop: 8
  },
  heading: {
    color: '#6D28D9',
    fontWeight: '900',
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10
  },
  infoBox: {
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 13
  },
  info: {
    color: '#594B70',
    fontSize: 12,
    lineHeight: 23
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1ECFA',
    gap: 10
  },
  productInfo: {
    flex: 1
  },
  productName: {
    color: '#24143D',
    fontSize: 13,
    fontWeight: '800'
  },
  productQty: {
    color: '#9787AC',
    fontSize: 11,
    marginTop: 5
  },
  productPrice: {
    color: '#6D28D9',
    fontWeight: '800',
    fontSize: 12
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE7FF',
    marginVertical: 14
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    color: '#594B70',
    fontWeight: '700'
  },
  paymentBox: {
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    padding: 13,
    marginTop: 16
  },
  paymentText: {
    color: '#6D28D9',
    fontSize: 12,
    fontWeight: '700'
  },
  doneButton: {
    backgroundColor: '#7C3AED',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  doneText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14
  }
});
