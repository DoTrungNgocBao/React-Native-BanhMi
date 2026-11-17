
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DAYS = [
  { id: 2, short: 'T2', name: 'Thứ Hai' },
  { id: 3, short: 'T3', name: 'Thứ Ba' },
  { id: 4, short: 'T4', name: 'Thứ Tư' },
  { id: 5, short: 'T5', name: 'Thứ Năm' },
  { id: 6, short: 'T6', name: 'Thứ Sáu' },
  { id: 7, short: 'T7', name: 'Thứ Bảy' },
  { id: 8, short: 'CN', name: 'Chủ Nhật' },
];

export default function WeekCalendar({
  selectedDay,
  onSelectDay,
}) {
  const currentDay = DAYS.find(
    (day) => day.id === selectedDay
  );

  return (
    <View style={styles.container}>

      {/* Tiêu đề lịch tuần */}
      <View style={styles.heading}>
        <View>
          <Text style={styles.label}>
            WEEKLY SCHEDULE
          </Text>

          <Text style={styles.title}>
            Lịch học trong tuần
          </Text>
        </View>

        <Text style={styles.calendarIcon}>
          📅
        </Text>
      </View>

      {/* Danh sách 7 ngày */}
      <View style={styles.weekRow}>
        {DAYS.map((day) => {
          const active = selectedDay === day.id;

          return (
            <TouchableOpacity
              key={day.id}
              activeOpacity={0.75}
              onPress={() => onSelectDay(day.id)}
              style={[
                styles.dayButton,
                active && styles.activeButton,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  active && styles.activeText,
                ]}
              >
                {day.short}
              </Text>

              <View
                style={[
                  styles.dot,
                  active && styles.activeDot,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Ngày đang được chọn */}
      <View style={styles.selectedBox}>
        <Text style={styles.checkIcon}>
          ✓
        </Text>

        <Text style={styles.selectedText}>
          Đang chọn: {currentDay?.name || 'Thứ Hai'}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 22,
  },

  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  label: {
    color: '#22D3EE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 7,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },

  calendarIcon: {
    fontSize: 25,
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },

  dayButton: {
    flex: 1,
    height: 66,
    borderRadius: 15,
    backgroundColor: '#151F34',
    borderWidth: 1,
    borderColor: '#26334C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeButton: {
    backgroundColor: '#4F46E5',
    borderColor: '#A78BFA',
    elevation: 7,
    shadowColor: '#818CF8',
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },

  dayText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '800',
  },

  activeText: {
    color: '#FFFFFF',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#475569',
    marginTop: 9,
  },

  activeDot: {
    backgroundColor: '#22D3EE',
  },

  selectedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151F34',
    padding: 14,
    borderRadius: 14,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#26334C',
  },

  checkIcon: {
    color: '#22D3EE',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 10,
  },

  selectedText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
