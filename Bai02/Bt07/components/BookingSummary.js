
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatPrice } from "../data/services";

export default function BookingSummary({ service, customerName, date, time }) {
  const rows = [
    ["Dịch vụ", service.name],
    ["Khách hàng", customerName || "Chưa nhập"],
    ["Ngày hẹn", date || "Chưa chọn"],
    ["Giờ hẹn", time || "Chưa chọn"],
    ["Thời lượng", `${service.duration} phút`]
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📋 THÔNG TIN ĐẶT LỊCH</Text>

      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}

      <View style={styles.total}>
        <Text style={styles.totalLabel}>TỔNG CỘNG</Text>
        <Text style={styles.price}>{formatPrice(service.price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#18223B",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#394A72"
  },
  title: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", marginBottom: 18 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15, gap: 10 },
  label: { color: "#9BAAC8" },
  value: { color: "#FFFFFF", fontWeight: "700", flexShrink: 1, textAlign: "right" },
  total: {
    borderTopWidth: 1,
    borderTopColor: "#3B4964",
    paddingTop: 17,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  totalLabel: { color: "#FFFFFF", fontWeight: "800" },
  price: { color: "#60E8C4", fontSize: 23, fontWeight: "900" }
});
