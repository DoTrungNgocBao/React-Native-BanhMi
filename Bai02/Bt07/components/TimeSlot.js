
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const TIMES = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export default function TimeSlot({ selectedTime, onSelect }) {
  return (
    <View style={styles.grid}>
      {TIMES.map((time) => {
        const active = selectedTime === time;

        return (
          <Pressable
            key={time}
            onPress={() => onSelect(time)}
            style={[styles.slot, active && styles.active]}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {time}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  slot: {
    width: "30%",
    flexGrow: 1,
    paddingVertical: 15,
    backgroundColor: "#18223B",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#34415F",
    alignItems: "center"
  },
  active: { backgroundColor: "#7255E9", borderColor: "#A99BFF" },
  text: { color: "#CAD5ED", fontWeight: "700" },
  activeText: { color: "#FFFFFF" }
});
