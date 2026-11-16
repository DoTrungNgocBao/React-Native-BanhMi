
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({
  icon,
  number,
  label,
  color
}) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: color + '15' }
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={[styles.number, { color: color }]}>
        {number}
      </Text>

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: {
    fontSize: 23,
  },

  number: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  label: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
});
