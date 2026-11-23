
import React from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { formatPrice } from "../data/services";

export default function ServiceDetailScreen({ route, navigation }) {
  const { service } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: service.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{service.category}</Text>
        <Text style={styles.title}>{service.icon} {service.name}</Text>
        <Text style={styles.rating}>⭐ {service.rating}  •  DỊCH VỤ CAO CẤP</Text>

        <View style={styles.info}>
          <View>
            <Text style={styles.label}>THỜI LƯỢNG</Text>
            <Text style={styles.value}>⏱ {service.duration} phút</Text>
          </View>
          <View>
            <Text style={styles.label}>GIÁ DỊCH VỤ</Text>
            <Text style={styles.price}>{formatPrice(service.price)}</Text>
          </View>
        </View>

        <Text style={styles.heading}>Giới thiệu dịch vụ</Text>
        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>✦ Lựa chọn ngày giờ phù hợp với lịch trình của bạn.</Text>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("BookingScreen", { service })}
        >
          <Text style={styles.buttonText}>ĐẶT LỊCH NGAY  →</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1020" },
  image: { width: "100%", height: 255 },
  content: { padding: 22 },
  category: { color: "#65EBD0", fontWeight: "800", letterSpacing: 2, fontSize: 12 },
  title: { color: "#FFFFFF", fontSize: 29, fontWeight: "900", marginTop: 12 },
  rating: { color: "#C6D2EB", marginTop: 12 },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#18223B",
    borderRadius: 18,
    padding: 20,
    marginTop: 25
  },
  label: { color: "#92A3C7", fontSize: 11, marginBottom: 9 },
  value: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  price: { color: "#65EBD0", fontSize: 20, fontWeight: "900" },
  heading: { color: "#FFFFFF", fontSize: 21, fontWeight: "900", marginTop: 30 },
  description: { color: "#B7C5DF", lineHeight: 25, marginTop: 12 },
  notice: { backgroundColor: "#1B2D46", borderRadius: 15, padding: 17, marginTop: 25 },
  noticeText: { color: "#9DEDDC", lineHeight: 23 },
  button: { backgroundColor: "#7655EE", padding: 19, borderRadius: 16, marginTop: 30, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 }
});
