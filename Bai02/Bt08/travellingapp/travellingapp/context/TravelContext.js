
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from
  '@react-native-async-storage/async-storage';

const TravelContext = createContext(null);

const STORAGE_KEY = '@TravellingApp_v2';

// Giao diện tối
const darkColors = {
  background: '#080F1C',
  card: '#142132',
  surface: '#1C2B3D',
  primary: '#50E4C2',
  text: '#FFFFFF',
  secondary: '#94A3B8',
  border: '#26384D',
  danger: '#FF5277',
  star: '#FACC15',
};

// Giao diện sáng
const lightColors = {
  background: '#F0F7F6',
  card: '#FFFFFF',
  surface: '#E2EFED',
  primary: '#087F72',
  text: '#102A2A',
  secondary: '#64748B',
  border: '#D1E2DF',
  danger: '#E11D48',
  star: '#D97706',
};

export function TravelProvider({ children }) {
  const [favorites, setFavorites] =
    useState([]);

  const [plans, setPlans] =
    useState([]);

  const [isDark, setIsDark] =
    useState(true);

  const [notifications, setNotifications] =
    useState(true);

  const [isLoaded, setIsLoaded] =
    useState(false);

  const [storageError, setStorageError] =
    useState('');

  const [profile, setProfile] = useState({
    name: 'Đỗ Trung Ngọc Bảo',
    studentId: 'CD-CNTT18A05',
    className: 'CD-CNTT18A',
    avatar: '',
    bio: 'Yêu thích khám phá vẻ đẹp Việt Nam.',
  });

  const colors = isDark
    ? darkColors
    : lightColors;

  // Đọc dữ liệu khi khởi động ứng dụng
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData =
          await AsyncStorage.getItem(
            STORAGE_KEY
          );

        if (savedData) {
          const data = JSON.parse(savedData);

          if (Array.isArray(data.favorites)) {
            setFavorites(data.favorites);
          }

          if (Array.isArray(data.plans)) {
            setPlans(data.plans);
          }

          if (typeof data.isDark === 'boolean') {
            setIsDark(data.isDark);
          }

          if (
            typeof data.notifications === 'boolean'
          ) {
            setNotifications(data.notifications);
          }

          if (data.profile) {
            setProfile((previous) => ({
              ...previous,
              ...data.profile,
            }));
          }
        }

        setIsLoaded(true);
      } catch (error) {
        console.log('Lỗi đọc dữ liệu:', error);

        setStorageError(
          'Không thể đọc dữ liệu đã lưu.'
        );
      }
    };

    loadData();
  }, []);

  // Tự động lưu khi dữ liệu thay đổi
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        const data = {
          favorites,
          plans,
          isDark,
          notifications,
          profile,
        };

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );

        setStorageError('');
      } catch (error) {
        console.log('Lỗi lưu dữ liệu:', error);

        setStorageError(
          'Không thể lưu dữ liệu trên thiết bị.'
        );
      }
    };

    saveData();
  }, [
    favorites,
    plans,
    isDark,
    notifications,
    profile,
    isLoaded,
  ]);

  // Kiểm tra địa điểm yêu thích
  const isFavorite = (id) =>
    favorites.some(
      (item) => item.id === id
    );

  // Thêm hoặc bỏ yêu thích
  const toggleFavorite = (destination) => {
    setFavorites((previous) => {
      const exists = previous.some(
        (item) =>
          item.id === destination.id
      );

      if (exists) {
        return previous.filter(
          (item) =>
            item.id !== destination.id
        );
      }

      return [...previous, destination];
    });
  };

  // Xóa một địa điểm yêu thích
  const removeFavorite = (id) => {
    setFavorites((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  // Xóa tất cả yêu thích
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Chuyển đổi sáng tối
  const toggleTheme = () => {
    setIsDark((previous) => !previous);
  };

  // Thêm kế hoạch du lịch
  const addPlan = (plan) => {
    setPlans((previous) => [
      plan,
      ...previous,
    ]);
  };

  // Xóa kế hoạch du lịch
  const removePlan = (id) => {
    setPlans((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  // Xóa tất cả kế hoạch
  const clearPlans = () => {
    setPlans([]);
  };

  // Cập nhật thông tin cá nhân
  const updateProfile = (newProfile) => {
    setProfile((previous) => ({
      ...previous,
      ...newProfile,
    }));
  };

  return (
    <TravelContext.Provider
      value={{
        favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,

        plans,
        planCount: plans.length,
        addPlan,
        removePlan,
        clearPlans,

        isDark,
        toggleTheme,
        colors,

        notifications,
        setNotifications,

        profile,
        updateProfile,

        isLoaded,
        storageError,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  return useContext(TravelContext);
}

export default TravelContext;
