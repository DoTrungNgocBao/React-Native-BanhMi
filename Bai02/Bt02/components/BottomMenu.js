
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const menuItems = [
  {
    id: 'home',
    icon: '🏠',
    label: 'Trang chủ',
  },
  {
    id: 'courses',
    icon: '📚',
    label: 'Khóa học',
  },
  {
    id: 'profile',
    icon: '👤',
    label: 'Cá nhân',
  },
];

export default function BottomMenu({ activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => onTabChange(item.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconBox,
                isActive && styles.activeIconBox,
              ]}
            >
              <Text style={styles.icon}>
                {item.icon}
              </Text>
            </View>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBox: {
    width: 46,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeIconBox: {
    backgroundColor: '#EEF2FF',
  },

  icon: {
    fontSize: 22,
  },

  label: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },

  activeLabel: {
    color: '#4F46E5',
    fontWeight: 'bold',
  },
});
