
import React from "react";
import { ScrollView, Pressable, Text, StyleSheet } from "react-native";

export default function DateSelector({ selectedDate, onSelect }) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);

    return {
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      day: date.getDate(),
      week: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][date.getDay()],
      month: date.getMonth() + 1
    };
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {days.map((item) => {
        const active = selectedDate === item.key;

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            style={[styles.day, active && styles.active]}
          >
            <Text style={[styles.week, active && styles.activeText]}>{item.week}</Text>
            <Text style={[styles.number, active && styles.activeText]}>{item.day}</Text>
            <Text style={[styles.week, active && styles.activeText]}>Th {item.month}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  day: {
    width: 69,
    paddingVertical: 13,
    marginRight: 10,
    borderRadius: 17,
    backgroundColor: "#18223B",
    borderWidth: 1,
    borderColor: "#34415F",
    alignItems: "center"
  },
  active: { backgroundColor: "#7255E9", borderColor: "#A99BFF" },
  week: { color: "#AAB7D1", fontSize: 12 },
  number: { color: "#FFFFFF", fontSize: 23, fontWeight: "900", marginVertical: 5 },
  activeText: { color: "#FFFFFF" }
});
