
import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import BookingSummary from "../components/BookingSummary";

export default function ConfirmationScreen({ route, navigation }) {
  const { service, customerName, date, time } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.successCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.title}>Đặt lịch thành công!</Text>
      <Text style={styles.subtitle}>
        Lịch hẹn giả lập của bạn đã được xác nhận.
      </Text>

      <View style={styles.ticket}>
        <Text style={styles.ticketLabel}>BOOKING CONFIRMATION</Text>
        <Text style={styles.ticketTitle}>✦ YOUR APPOINTMENT</Text>
        <Text style={styles.ticketCode}>MÃ LỊCH: DEMO-{service.id}</Text>
      </View>

      <BookingSummary
        service={service}
        customerName={customerName}
        date={date}
        time={time}
      />

      <Text style={styles.note}>
        Đây là ứng dụng thực hành. Lịch hẹn chỉ được mô phỏng,
        chưa được gửi đến nhà cung cấp dịch vụ.
      </Text>

      <Pressable style={styles.editButton} onPress={() => navigation.goBack()}>
        <Text style={styles.editText}>✎ THAY ĐỔI LỊCH HẸN</Text>
      </Pressable>

      <Pressable
        style={styles.homeButton}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.homeText}>⌂ VỀ TRANG CHỦ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1020" },
  content: { padding: 22, paddingBottom: 45 },
  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#153F3B",
    borderWidth: 2,
    borderColor: "#65EBD0",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25
  },
  check: { color: "#65EBD0", fontSize: 52, fontWeight: "900" },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", textAlign: "center", marginTop: 22 },
  subtitle: { color: "#AAB9D6", textAlign: "center", marginTop: 10, marginBottom: 27 },
  ticket: {
    backgroundColor: "#45318F",
    padding: 24,
    borderRadius: 20,
    marginBottom: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#927BFF"
  },
  ticketLabel: { color: "#B9FFF0", fontSize: 11, letterSpacing: 2, fontWeight: "800" },
  ticketTitle: { color: "#FFFFFF", fontSize: 23, fontWeight: "900", marginTop: 12 },
  ticketCode: { color: "#D6CCFF", marginTop: 12 },
  note: { color: "#91A2C1", textAlign: "center", marginTop: 22, lineHeight: 22 },
  editButton: {
    borderWidth: 1,
    borderColor: "#7655EE",
    padding: 17,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 28
  },
  editText: { color: "#C3B7FF", fontWeight: "900" },
  homeButton: {
    backgroundColor: "#7655EE",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 13
  },
  homeText: { color: "#FFFFFF", fontWeight: "900" }
});
