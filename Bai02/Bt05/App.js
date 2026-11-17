
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  StatusBar,
  Modal,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ProgressCard from './components/ProgressCard';
import ActionButton from './components/ActionButton';
import AnimatedMessage from './components/AnimatedMessage';

const STORAGE_KEY = '@AnimateApp_Goals';

const initialGoals = [
  {
    id: '1',
    icon: '📱',
    title: 'Học React Native',
    subtitle: 'Hoàn thành bài tập BT05',
    progress: 0,
    status: 'new',
  },
  {
    id: '2',
    icon: '💻',
    title: 'Luyện JavaScript',
    subtitle: 'Ôn tập biến, hàm và mảng',
    progress: 0,
    status: 'new',
  },
  {
    id: '3',
    icon: '📚',
    title: 'Đọc tài liệu',
    subtitle: 'Học 30 phút mỗi ngày',
    progress: 0,
    status: 'new',
  },
  {
    id: '4',
    icon: '🧠',
    title: 'Ôn tập kiến thức',
    subtitle: 'Tổng hợp nội dung đã học',
    progress: 0,
    status: 'new',
  },
];

export default function App() {
  const [goals, setGoals] = useState(initialGoals);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [addVisible, setAddVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [formError, setFormError] = useState('');

  const [confirmAction, setConfirmAction] = useState(null);

  const [message, setMessage] = useState('');
  const [messageId, setMessageId] = useState(0);

  const totalAnimation = useRef(
    new Animated.Value(0)
  ).current;

  // TẢI DỮ LIỆU ĐÃ LƯU
  useEffect(() => {
    async function loadData() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved !== null) {
          const data = JSON.parse(saved);

          if (Array.isArray(data)) {
            setGoals(data);
          }
        }
      } catch (error) {
        console.log('Lỗi tải dữ liệu:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadData();
  }, []);

  // TỰ ĐỘNG LƯU DỮ LIỆU
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(goals)
    ).catch(error => {
      console.log('Lỗi lưu dữ liệu:', error);
    });
  }, [goals, loaded]);

  // THỐNG KÊ
  const total = goals.length;

  const completed = goals.filter(
    goal => goal.progress === 100
  ).length;

  const active = goals.filter(
    goal => goal.status === 'active'
  ).length;

  const percent = total > 0
    ? Math.round((completed / total) * 100)
    : 0;

  // HIỆU ỨNG THANH TIẾN ĐỘ TỔNG
  useEffect(() => {
    Animated.timing(totalAnimation, {
      toValue: percent,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  const totalWidth = totalAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  // CẬP NHẬT MỤC TIÊU
  const updateGoal = (id, changes) => {
    setGoals(current =>
      current.map(goal =>
        goal.id === id
          ? { ...goal, ...changes }
          : goal
      )
    );
  };

  // THÔNG BÁO CÓ HIỆU ỨNG
  const showMessage = text => {
    setMessage(text);
    setMessageId(id => id + 1);
  };

  // BẮT ĐẦU HOẶC TIẾP TỤC
  const startGoal = id => {
    updateGoal(id, { status: 'active' });
    setMessage('');
  };

  // TẠM DỪNG
  const pauseGoal = id => {
    updateGoal(id, { status: 'paused' });
  };

  // TĂNG 25% TIẾN ĐỘ
  const increaseGoal = id => {
    const goal = goals.find(item => item.id === id);

    if (!goal) return;

    const next = Math.min(goal.progress + 25, 100);

    updateGoal(id, {
      progress: next,
      status: next === 100 ? 'done' : 'active',
    });

    if (next === 100) {
      showMessage(
        `Bạn đã hoàn thành "${goal.title}"!`
      );
    }
  };

  // HOÀN THÀNH
  const completeGoal = id => {
    const goal = goals.find(item => item.id === id);

    if (!goal) return;

    updateGoal(id, {
      progress: 100,
      status: 'done',
    });

    showMessage(
      `Bạn đã hoàn thành "${goal.title}"!`
    );
  };

  // LÀM LẠI MỘT MỤC TIÊU
  const resetGoal = id => {
    updateGoal(id, {
      progress: 0,
      status: 'new',
    });

    setMessage('');
  };

  // MỞ XÁC NHẬN XÓA
  const deleteGoal = id => {
    const goal = goals.find(item => item.id === id);

    if (!goal) return;

    setConfirmAction({
      type: 'delete',
      id,
      title: 'Xóa mục tiêu?',
      description: `Bạn muốn xóa "${goal.title}"?`,
    });
  };

  // MỞ XÁC NHẬN ĐẶT LẠI
  const resetAll = () => {
    setConfirmAction({
      type: 'reset',
      title: 'Đặt lại tất cả?',
      description: 'Toàn bộ tiến độ sẽ trở về 0%.',
    });
  };

  // XÁC NHẬN THAO TÁC
  const executeConfirmedAction = () => {
    if (!confirmAction) return;

    if (confirmAction.type === 'delete') {
      const id = confirmAction.id;

      setGoals(current =>
        current.filter(goal => goal.id !== id)
      );
    }

    if (confirmAction.type === 'reset') {
      setGoals(current =>
        current.map(goal => ({
          ...goal,
          progress: 0,
          status: 'new',
        }))
      );
    }

    setMessage('');
    setConfirmAction(null);
  };

  // THÊM MỤC TIÊU MỚI
  const addGoal = () => {
    if (!newTitle.trim()) {
      setFormError('Vui lòng nhập tên mục tiêu!');
      return;
    }

    const goal = {
      id:
        Date.now().toString() +
        Math.random().toString(36).slice(2),
      icon: '🎯',
      title: newTitle.trim(),
      subtitle:
        newDescription.trim() ||
        'Mục tiêu học tập cá nhân',
      progress: 0,
      status: 'new',
    };

    setGoals(current => [...current, goal]);

    setNewTitle('');
    setNewDescription('');
    setFormError('');
    setAddVisible(false);
    setFilter('all');
    setSearch('');
  };

  // TÌM KIẾM VÀ LỌC
  const filteredGoals = goals.filter(goal => {
    const keyword = search.trim().toLowerCase();

    const matchSearch =
      goal.title.toLowerCase().includes(keyword) ||
      goal.subtitle.toLowerCase().includes(keyword);

    const matchFilter =
      filter === 'all' ||
      (filter === 'done' && goal.progress === 100) ||
      (filter === 'active' && goal.status === 'active') ||
      (
        filter === 'pending' &&
        goal.progress < 100 &&
        goal.status !== 'active'
      );

    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.brand}>
              ✦ ANIMATEAPP
            </Text>

            <Text style={styles.greeting}>
              Xin chào, Ngọc Bảo 👋
            </Text>

            <Text style={styles.subtitle}>
              Hôm nay bạn muốn chinh phục điều gì?
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NB</Text>
          </View>
        </View>

        {/* THẺ TIẾN ĐỘ TỔNG */}
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>
            🎯 TIẾN ĐỘ HỌC TẬP
          </Text>

          <Text style={styles.heroNumber}>
            {completed} / {total}
          </Text>

          <Text style={styles.heroDescription}>
            Mục tiêu đã hoàn thành
          </Text>

          <View style={styles.heroTrack}>
            <Animated.View
              style={[
                styles.heroFill,
                { width: totalWidth },
              ]}
            />
          </View>

          <View style={styles.heroBottom}>
            <Text style={styles.heroHint}>
              ✨ Cố gắng mỗi ngày!
            </Text>

            <Text style={styles.heroPercent}>
              {percent}%
            </Text>
          </View>
        </View>

        {/* THỐNG KÊ */}
        <View style={styles.stats}>
          {[
            {
              icon: '🎯',
              value: total,
              label: 'Tổng mục tiêu',
            },
            {
              icon: '🏆',
              value: completed,
              label: 'Hoàn thành',
            },
            {
              icon: '📖',
              value: active,
              label: 'Đang học',
            },
          ].map(item => (
            <View
              key={item.label}
              style={styles.statCard}
            >
              <Text style={styles.statIcon}>
                {item.icon}
              </Text>

              <Text style={styles.statValue}>
                {item.value}
              </Text>

              <Text style={styles.statLabel}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* THÔNG BÁO ĐỘNG */}
        <AnimatedMessage
          key={messageId}
          message={message}
        />

        {/* TÌM KIẾM */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm mục tiêu..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* BỘ LỌC */}
        <View style={styles.filterRow}>
          {[
            ['all', 'Tất cả'],
            ['active', 'Đang học'],
            ['done', 'Hoàn thành'],
            ['pending', 'Chưa xong'],
          ].map(([value, label]) => (
            <Pressable
              key={value}
              onPress={() => setFilter(value)}
              style={[
                styles.filterButton,
                filter === value &&
                  styles.filterSelected,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === value &&
                    styles.filterTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* TIÊU ĐỀ DANH SÁCH */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            📚 Mục tiêu của tôi
          </Text>

          <Pressable
            onPress={() => setAddVisible(true)}
            style={styles.addButton}
          >
            <Text style={styles.addText}>
              + Thêm mới
            </Text>
          </Pressable>
        </View>

        {/* DANH SÁCH MỤC TIÊU */}
        {filteredGoals.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>📭</Text>

            <Text style={styles.emptyText}>
              Chưa có mục tiêu phù hợp.
            </Text>
          </View>
        )}

        {filteredGoals.map(goal => (
          <ProgressCard
            key={goal.id}
            goal={goal}
            onStart={() => startGoal(goal.id)}
            onPause={() => pauseGoal(goal.id)}
            onIncrease={() => increaseGoal(goal.id)}
            onComplete={() => completeGoal(goal.id)}
            onReset={() => resetGoal(goal.id)}
            onDelete={() => deleteGoal(goal.id)}
          />
        ))}

        {/* HOÀN THÀNH TẤT CẢ */}
        {total > 0 && completed === total && (
          <View style={styles.allDone}>
            <Text style={styles.allDoneTitle}>
              🏆 Xuất sắc!
            </Text>

            <Text style={styles.allDoneText}>
              Bạn đã hoàn thành tất cả mục tiêu!
            </Text>
          </View>
        )}

        {/* ĐẶT LẠI TẤT CẢ */}
        {total > 0 && (
          <ActionButton
            title="↻ Đặt lại tất cả tiến độ"
            onPress={resetAll}
            secondary
          />
        )}

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Đỗ Trung Ngọc Bảo
          </Text>

          <Text style={styles.footerText}>
            MSSV: CD-CNTT18A05
          </Text>

          <Text style={styles.footerText}>
            Lớp: CD-CNTT18A
          </Text>

          <Text style={styles.footerSmall}>
            BT05 – React Native Animation
          </Text>
        </View>
      </ScrollView>

      {/* FORM THÊM MỤC TIÊU */}
      <Modal
        visible={addVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              🎯 Thêm mục tiêu mới
            </Text>

            <Text style={styles.fieldLabel}>
              Tên mục tiêu *
            </Text>

            <TextInput
              style={styles.field}
              value={newTitle}
              onChangeText={text => {
                setNewTitle(text);
                setFormError('');
              }}
              placeholder="Ví dụ: Học TypeScript"
              maxLength={60}
            />

            <Text style={styles.fieldLabel}>
              Mô tả
            </Text>

            <TextInput
              style={styles.field}
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Nội dung cần thực hiện"
              maxLength={100}
            />

            {!!formError && (
              <Text style={styles.errorText}>
                {formError}
              </Text>
            )}

            <ActionButton
              title="✓ Lưu mục tiêu"
              onPress={addGoal}
            />

            <Pressable
              onPress={() => {
                setAddVisible(false);
                setFormError('');
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>
                Hủy
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* HỘP THOẠI XÁC NHẬN */}
      <Modal
        visible={confirmAction !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmAction(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {confirmAction?.title}
            </Text>

            <Text style={styles.confirmDescription}>
              {confirmAction?.description}
            </Text>

            <ActionButton
              title="✓ Xác nhận"
              onPress={executeConfirmedAction}
              danger
            />

            <Pressable
              onPress={() => setConfirmAction(null)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>
                Hủy
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  content: {
    padding: 17,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerInfo: {
    flex: 1,
  },
  brand: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  greeting: {
    color: '#1E1B4B',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#DDD6FE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#6D28D9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hero: {
    backgroundColor: '#6D28D9',
    borderRadius: 24,
    padding: 23,
    marginBottom: 15,
  },
  heroLabel: {
    color: '#EDE9FE',
    fontWeight: 'bold',
    fontSize: 13,
  },
  heroNumber: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 13,
  },
  heroDescription: {
    color: '#DDD6FE',
    fontSize: 13,
  },
  heroTrack: {
    height: 10,
    backgroundColor: '#A78BFA',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  heroFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  heroBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 11,
  },
  heroHint: {
    color: '#DDD6FE',
    fontSize: 12,
  },
  heroPercent: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#6D28D9',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 13,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  searchIcon: {
    fontSize: 17,
  },
  searchInput: {
    flex: 1,
    padding: 13,
    color: '#1E1B4B',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 20,
  },
  filterSelected: {
    backgroundColor: '#7C3AED',
  },
  filterText: {
    color: '#64748B',
    fontSize: 12,
  },
  filterTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#1E1B4B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#EDE9FE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  addText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginBottom: 18,
  },
  emptyIcon: {
    fontSize: 35,
  },
  emptyText: {
    color: '#64748B',
    marginTop: 10,
    textAlign: 'center',
  },
  allDone: {
    backgroundColor: '#DCFCE7',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  allDoneTitle: {
    color: '#166534',
    fontSize: 21,
    fontWeight: 'bold',
  },
  allDoneText: {
    color: '#166534',
    marginTop: 7,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 28,
  },
  footerText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
  },
  footerSmall: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 9,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 23,
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
  },
  modalTitle: {
    color: '#1E1B4B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldLabel: {
    color: '#475569',
    fontWeight: '600',
    marginBottom: 7,
  },
  field: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 13,
    marginBottom: 15,
    color: '#1E1B4B',
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 12,
    fontSize: 12,
  },
  cancelButton: {
    padding: 13,
    marginTop: 5,
  },
  cancelText: {
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '600',
  },
  confirmDescription: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
});
