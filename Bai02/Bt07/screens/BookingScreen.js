
import React, { useState } from "react";
import {
  View, Text, ScrollView, TextInput,
  Pressable, Alert, StyleSheet
} from "react-native";
import DateSelector from "../components/DateSelector";
import TimeSlot from "../components/TimeSlot";
import BookingSummary from "../components/BookingSummary";

export default function BookingScreen({ route, navigation }) {
  const { service } = route.params;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");

  function confirmBooking() {
    const name = customerName.trim();

    if (!name) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập họ tên khách hàng.");
      return;
    }

    if (!selectedDate) {
      Alert.alert("Chưa chọn ngày", "Vui lòng chọn ngày hẹn.");
      return;
    }

    if (!selectedTime) {
      Alert.alert("Chưa chọn giờ", "Vui lòng chọn giờ hẹn.");
      return;
    }

    navigation.navigate("ConfirmationScreen", {
      service,
      customerName: name,
      date: selectedDate,
      time: selectedTime
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.tag}>STEP 03 / BOOKING</Text>
      <Text style={styles.title}>Đặt lịch hẹn ✦</Text>
      <Text style={styles.subtitle}>{service.name} • {service.duration} phút</Text>

      <Text style={styles.heading}>📅 Chọn ngày</Text>
      <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />

      <Text style={styles.heading}>🕒 Chọn khung giờ</Text>
      <TimeSlot selectedTime={selectedTime} onSelect={setSelectedTime} />

      <Text style={styles.heading}>👤 Thông tin khách hàng</Text>
      <TextInput
        style={styles.input}
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Nhập họ và tên của bạn"
        placeholderTextColor="#7485A6"
        autoCapitalize="words"
        maxLength={80}
      />

      <Text style={styles.heading}>🧾 Xem lại lịch hẹn</Text>
      <BookingSummary
        service={service}
        customerName={customerName}
        date={selectedDate}
        time={selectedTime}
      />

      <Pressable style={styles.button} onPress={confirmBooking}>
        <Text style={styles.buttonText}>XÁC NHẬN ĐẶT LỊCH  →</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Quay lại chi tiết dịch vụ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1020" },
  content: { padding: 20, paddingBottom: 45 },
  tag: { color: "#65EBD0", fontWeight: "900", letterSpacing: 2, fontSize: 11 },
  title: { color: "#FFFFFF", fontSize: 31, fontWeight: "900", marginTop: 12 },
  subtitle: { color: "#9CAED0", marginTop: 8 },
  heading: { color: "#FFFFFF", fontSize: 19, fontWeight: "900", marginTop: 32, marginBottom: 16 },
  input: {
    backgroundColor: "#18223B",
    color: "#FFFFFF",
    padding: 17,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#405173",
    fontSize: 16
  },
  button: {
    backgroundColor: "#7655EE",
    borderRadius: 16,
    padding: 19,
    marginTop: 27,
    alignItems: "center"
  },
  buttonText: { color: "#FFFFFF", fontWeight: "900", fontSize: 15 },
  backButton: { padding: 20, alignItems: "center" },
  backText: { color: "#9DAFD0", fontWeight: "700" }
});
