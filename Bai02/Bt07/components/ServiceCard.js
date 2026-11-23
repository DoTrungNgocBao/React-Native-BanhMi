
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { formatPrice } from "../data/services";

export default function ServiceCard({ service, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: service.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{service.category}</Text>
        <Text style={styles.name}>{service.icon} {service.name}</Text>
        <Text style={styles.info}>⏱ {service.duration} phút  •  ⭐ {service.rating}</Text>

        <View style={styles.bottom}>
          <Text style={styles.price}>{formatPrice(service.price)}</Text>
          <Text style={styles.arrow}>Đặt lịch  →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#18223B",
    borderRadius: 22,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#34415F"
  },
  image: { width: "100%", height: 175 },
  content: { padding: 18 },
  category: { color: "#6EE7D4", fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  name: { color: "#FFFFFF", fontSize: 21, fontWeight: "800", marginTop: 7 },
  info: { color: "#AAB7D1", marginTop: 10 },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17
  },
  price: { color: "#60E8C4", fontSize: 20, fontWeight: "900" },
  arrow: { color: "#A99BFF", fontWeight: "700" }
});
