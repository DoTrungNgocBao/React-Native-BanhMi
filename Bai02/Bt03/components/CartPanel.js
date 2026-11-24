
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet
} from 'react-native';

const money = (value) =>
  Number(value || 0).toLocaleString('vi-VN') + 'đ';

export default function CartPanel({
  cart = [],
  onIncrease,
  onDecrease,
  onClose,
  onOrderSuccess
}) {
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const placeOrder = () => {
    if (submitting) return;

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin người mua.');
      return;
    }

    if (!/^0[0-9]{9}$/.test(phone.trim())) {
      setError('Số điện thoại phải gồm 10 số và bắt đầu bằng 0.');
      return;
    }

    if (cart.length === 0) {
      setError('Giỏ hàng đang trống.');
      return;
    }

    if (typeof onOrderSuccess !== 'function') {
      setError('Chưa kết nối chức năng lưu đơn hàng trong App.js.');
      return;
    }

    setError('');
    setSubmitting(true);

    const orderData = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      total,
      items: cart.map(item => ({
        ...item,
        quantity: item.quantity
      }))
    };

    try {
      onOrderSuccess(orderData);
    } catch (err) {
      setSubmitting(false);
      setError('Không thể tạo đơn hàng. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.overlay}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <View style={styles.panel}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>
                {checkout ? '📦 Thanh toán' : '🛍️ Giỏ hàng'}
              </Text>
              <Text style={styles.subtitle}>
                {checkout
                  ? 'Điền thông tin để xác nhận đơn'
                  : `${totalQuantity} sản phẩm trong giỏ`}
              </Text>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
          >
            {!checkout ? (
              cart.length === 0 ? (
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyIcon}>🛒</Text>
                  <Text style={styles.empty}>
                    Giỏ hàng của bạn đang trống
                  </Text>
                </View>
              ) : (
                cart.map(item => (
                  <View key={item.id} style={styles.item}>
                    <Text style={styles.itemName}>
                      {item.name}
                    </Text>

                    <Text style={styles.price}>
                      {money(item.price)}
                    </Text>

                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => onDecrease(item.id)}
                      >
                        <Text style={styles.qtyText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantity}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => onIncrease(item.id)}
                      >
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>

                      <Text style={styles.subtotal}>
                        {money(item.price * item.quantity)}
                      </Text>
                    </View>
                  </View>
                ))
              )
            ) : (
              <View>
                <Text style={styles.sectionTitle}>
                  👤 THÔNG TIN NGƯỜI MUA
                </Text>

                <Text style={styles.label}>Họ và tên *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  placeholderTextColor="#A99CB8"
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>Số điện thoại *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ví dụ: 0912345678"
                  placeholderTextColor="#A99CB8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                />

                <Text style={styles.label}>
                  Địa chỉ nhận hàng *
                </Text>
                <TextInput
                  style={[styles.input, styles.addressInput]}
                  placeholder="Nhập địa chỉ nhận hàng"
                  placeholderTextColor="#A99CB8"
                  multiline
                  value={address}
                  onChangeText={setAddress}
                />

                <Text style={styles.sectionTitle}>
                  📋 TÓM TẮT ĐƠN HÀNG
                </Text>

                {cart.map(item => (
                  <View key={item.id} style={styles.summaryRow}>
                    <Text style={styles.summaryName}>
                      {item.name} × {item.quantity}
                    </Text>
                    <Text style={styles.summaryPrice}>
                      {money(item.price * item.quantity)}
                    </Text>
                  </View>
                ))}

                <View style={styles.paymentBox}>
                  <Text style={styles.paymentTitle}>
                    💵 Phương thức thanh toán
                  </Text>
                  <Text style={styles.paymentText}>
                    Thanh toán khi nhận hàng (COD)
                  </Text>
                </View>

                <Text style={styles.demoNote}>
                  Đây là đơn hàng mô phỏng phục vụ bài thực hành.
                </Text>
              </View>
            )}
          </ScrollView>

          {error !== '' && (
            <Text style={styles.error}>{error}</Text>
          )}

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
            <Text style={styles.total}>{money(total)}</Text>
          </View>

          {cart.length > 0 && (
            <TouchableOpacity
              disabled={submitting}
              style={[
                styles.orderButton,
                submitting && styles.disabledButton
              ]}
              onPress={() => {
                if (checkout) {
                  placeOrder();
                } else {
                  setError('');
                  setCheckout(true);
                }
              }}
            >
              <Text style={styles.orderText}>
                {submitting
                  ? 'Đang xử lý...'
                  : checkout
                    ? '✓ XÁC NHẬN ĐẶT HÀNG'
                    : 'TIẾN HÀNH ĐẶT HÀNG →'}
              </Text>
            </TouchableOpacity>
          )}

          {checkout && !submitting && (
            <TouchableOpacity
              onPress={() => {
                setCheckout(false);
                setError('');
              }}
            >
              <Text style={styles.back}>
                ← Quay lại giỏ hàng
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 15, 55, 0.65)',
    zIndex: 20,
    elevation: 20,
    justifyContent: 'flex-end'
  },
  wrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    maxHeight: '95%'
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    maxHeight: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE7FF'
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#34145F'
  },
  subtitle: {
    fontSize: 11,
    color: '#9787AC',
    marginTop: 5
  },
  close: {
    color: '#6D28D9',
    fontSize: 23,
    fontWeight: 'bold',
    padding: 5
  },
  scroll: {
    flexGrow: 0,
    flexShrink: 1,
    marginTop: 12
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 35
  },
  emptyIcon: {
    fontSize: 40
  },
  empty: {
    color: '#8B809D',
    marginTop: 10
  },
  item: {
    backgroundColor: '#FAF7FF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12
  },
  itemName: {
    color: '#24143D',
    fontWeight: '800',
    fontSize: 15
  },
  price: {
    color: '#7C3AED',
    marginTop: 7,
    fontWeight: 'bold'
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  qtyButton: {
    backgroundColor: '#EDE9FE',
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyText: {
    color: '#6D28D9',
    fontSize: 20,
    fontWeight: 'bold'
  },
  quantity: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    color: '#24143D'
  },
  subtotal: {
    flex: 1,
    textAlign: 'right',
    color: '#6D28D9',
    fontWeight: '800',
    fontSize: 12
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#6D28D9',
    marginTop: 20,
    marginBottom: 12
  },
  label: {
    color: '#34145F',
    fontWeight: '700',
    marginBottom: 7,
    fontSize: 12
  },
  input: {
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#E9DDFB',
    borderRadius: 12,
    padding: 13,
    color: '#24143D',
    marginBottom: 14,
    fontSize: 14
  },
  addressInput: {
    minHeight: 75,
    textAlignVertical: 'top'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10
  },
  summaryName: {
    flex: 1,
    color: '#594B70',
    fontSize: 12
  },
  summaryPrice: {
    color: '#6D28D9',
    fontWeight: '800',
    fontSize: 12
  },
  paymentBox: {
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 15,
    marginTop: 10
  },
  paymentTitle: {
    color: '#34145F',
    fontWeight: '800'
  },
  paymentText: {
    color: '#7C3AED',
    fontSize: 12,
    marginTop: 6
  },
  demoNote: {
    color: '#9787AC',
    fontSize: 11,
    marginTop: 14,
    marginBottom: 12,
    textAlign: 'center'
  },
  error: {
    color: '#DC2626',
    fontSize: 12,
    marginVertical: 10,
    textAlign: 'center'
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE7FF'
  },
  totalLabel: {
    color: '#594B70',
    fontWeight: '700'
  },
  total: {
    color: '#6D28D9',
    fontWeight: '900',
    fontSize: 19
  },
  orderButton: {
    backgroundColor: '#7C3AED',
    padding: 17,
    borderRadius: 14,
    alignItems: 'center'
  },
  disabledButton: {
    opacity: 0.6
  },
  orderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900'
  },
  back: {
    color: '#7C3AED',
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '700'
  }
});
