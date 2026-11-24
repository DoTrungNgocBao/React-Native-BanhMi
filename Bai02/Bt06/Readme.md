# 📅 BT06 – ỨNG DỤNG QUẢN LÝ THỜI KHÓA BIỂU CÁ NHÂN

## 1. Thông tin sinh viên

| Thông tin | Nội dung |
|---|---|
| Họ và tên | Đỗ Trung Ngọc Bảo |
| Mã sinh viên | CD-CNTT18A05 |
| Lớp | CD-CNTT18A |
| Môn học | Lập trình React Native |
| Bài học | Bài 02 |
| Bài tập | BT06 |
| Tên ứng dụng | ScheduleApp |
| Nền tảng | React Native – Expo Snack |

**🔗 Link ứng dụng Expo Snack:**

https://snack.expo.dev/@dotrungngocbao/scheduleapp

---

## 2. Giới thiệu ứng dụng

**ScheduleApp** là ứng dụng quản lý thời khóa biểu cá nhân được xây dựng bằng React Native, giúp sinh viên theo dõi lịch học hằng tuần một cách thuận tiện và trực quan.

Ứng dụng cho phép người dùng chọn từng ngày trong tuần để xem danh sách môn học, giờ học, phòng học và tên giảng viên.

Ngoài ra, ứng dụng còn cung cấp thông tin thống kê tổng quan về số buổi học, số môn học và số ngày nghỉ trong tuần.

Giao diện được thiết kế theo phong cách **Dark Neon**, sử dụng nền xanh đen kết hợp màu tím và xanh cyan, tạo cảm giác hiện đại, rõ ràng và dễ sử dụng.

## 3. Mục tiêu bài tập

- Làm quen với việc xây dựng ứng dụng React Native.
- Biết cách tổ chức dự án thành các component riêng biệt.
- Sử dụng các thành phần giao diện như `View`, `Text`, `ScrollView`, `TouchableOpacity`.
- Sử dụng `StyleSheet` để thiết kế giao diện.
- Sử dụng `useState` để quản lý ngày được chọn.
- Sử dụng `props` để truyền dữ liệu giữa các component.
- Sử dụng `map()` và `filter()` để hiển thị, lọc danh sách lịch học.
- Sử dụng điều kiện để hiển thị thông báo khi không có lịch học.
- Xây dựng giao diện có thể tương tác với người dùng.

---

## 4. Các chức năng chính

### 4.1. Hiển thị thông tin ứng dụng

- Hiển thị tên ứng dụng **ScheduleApp**.
- Hiển thị tên sinh viên Đỗ Trung Ngọc Bảo.
- Hiển thị mã sinh viên và lớp.
- Hiển thị giao diện chào mừng người dùng.

### 4.2. Hiển thị lịch học trong tuần

- Hiển thị đầy đủ 7 ngày từ Thứ Hai đến Chủ Nhật.
- Cho phép nhấn vào từng ngày.
- Ngày đang được chọn có màu tím nổi bật.
- Hiển thị tên ngày được chọn.

### 4.3. Hiển thị danh sách môn học

Mỗi thẻ môn học cung cấp các thông tin:

- Tên môn học.
- Thời gian bắt đầu và kết thúc.
- Phòng học.
- Tên giảng viên.
- Biểu tượng đại diện.
- Màu sắc riêng của môn học.

### 4.4. Thay đổi lịch học theo ngày

Khi người dùng chọn một ngày khác:

1. Ứng dụng cập nhật ngày được chọn.
2. Lọc danh sách môn học theo ngày.
3. Hiển thị các môn học tương ứng.
4. Cập nhật số lượng buổi học của ngày đó.

### 4.5. Thông báo ngày không có lịch học

Khi chọn Chủ Nhật, ứng dụng hiển thị:

**🌙 Hôm nay không có lịch học!**

Chức năng này được xây dựng bằng component `EmptySchedule`.

### 4.6. Thống kê học tập

Ứng dụng hiển thị:

| Thống kê | Số lượng |
|---|---:|
| Tổng số buổi học | 07 |
| Số tên môn học khác nhau | 06 |
| Số ngày không có lịch học | 01 |

---

## 5. Cấu trúc thư mục dự án

```text
React-Native/
└── Bai02/
    └── Bt06/
        ├── App.js
        ├── package.json
        ├── Readme.md
        │
        ├── components/
        │   ├── Header.js
        │   ├── WeekCalendar.js
        │   ├── ScheduleCard.js
        │   ├── EmptySchedule.js
        │   └── StatsCard.js
        │
        └── images/
            ├── 01_GiaoDien.png
            ├── 02_Header.png
            ├── 03_StatsCard.png
            ├── 04_WeekCalendar.png
            ├── 05_ScheduleCard.png
            └── 06_EmptySchedule.png
```

## 6. Giới thiệu các component

### 6.1. App.js – Component chính

**Chức năng:**

- Chứa dữ liệu thời khóa biểu.
- Quản lý ngày được chọn bằng `useState`.
- Lọc danh sách lịch học theo ngày.
- Kết hợp các component để tạo giao diện hoàn chỉnh.
- Truyền dữ liệu qua `props`.

### 6.2. Header.js – Thông tin ứng dụng

**Chức năng:**

- Hiển thị tên ScheduleApp.
- Hiển thị thông tin sinh viên.
- Tạo phần đầu giao diện với phong cách Dark Neon.

### 6.3. WeekCalendar.js – Lịch học trong tuần

**Chức năng:**

- Hiển thị 7 ngày trong tuần.
- Cho phép người dùng chọn ngày.
- Làm nổi bật ngày được chọn.
- Gửi thông tin ngày được chọn về `App.js`.

**Props sử dụng:**

- `selectedDay`: Ngày đang được chọn.
- `onSelectDay`: Hàm xử lý khi chọn ngày.

### 6.4. ScheduleCard.js – Thẻ thông tin môn học

**Chức năng:**

- Hiển thị tên môn học.
- Hiển thị giờ học.
- Hiển thị phòng học.
- Hiển thị tên giảng viên.
- Hiển thị màu sắc và biểu tượng môn học.

**Props sử dụng:**

- `subject`: Đối tượng chứa thông tin buổi học.

### 6.5. EmptySchedule.js – Thông báo lịch trống

**Chức năng:**

- Hiển thị thông báo khi không có môn học.
- Sử dụng biểu tượng mặt trăng.
- Tạo giao diện thông báo thân thiện.

### 6.6. StatsCard.js – Thống kê học tập

**Chức năng:**

- Đếm tổng số buổi học.
- Đếm số môn học khác nhau.
- Đếm số ngày nghỉ.
- Hiển thị dữ liệu thống kê dưới dạng các ô thông tin.

**Props sử dụng:**

- `schedules`: Danh sách toàn bộ buổi học.

---

## 7. Dữ liệu thời khóa biểu

| Ngày | Môn học | Giờ học | Phòng | Giảng viên |
|---|---|---|---|---|
| Thứ Hai | Lập trình React Native | 07:00–09:30 | A203 | Nguyễn Văn An |
| Thứ Hai | Cơ sở dữ liệu | 13:00–15:30 | B102 | Trần Thị Lan |
| Thứ Ba | Lập trình Node.js | 07:00–09:30 | LAB01 | Lê Minh Tuấn |
| Thứ Tư | Thiết kế giao diện | 08:00–10:30 | A205 | Phạm Thị Hoa |
| Thứ Năm | Tiếng Anh chuyên ngành | 13:00–15:30 | C301 | Nguyễn Thị Mai |
| Thứ Sáu | Lập trình React Native | 07:00–09:30 | A203 | Nguyễn Văn An |
| Thứ Bảy | Thực hành Node.js | 08:00–11:00 | LAB02 | Lê Minh Tuấn |
| Chủ Nhật | Không có lịch học | — | — | — |

**Tổng kết:** 7 buổi học, 6 tên môn học khác nhau và 1 ngày nghỉ.

---

## 8. Kiến thức React Native được áp dụng

### 8.1. Functional Component

Các thành phần giao diện được tổ chức dưới dạng function component, giúp mã nguồn dễ đọc và tái sử dụng.

### 8.2. React Hooks – useState

`useState` được sử dụng để lưu trữ ngày được chọn và cập nhật giao diện khi người dùng thay đổi ngày.

### 8.3. Props

Dữ liệu được truyền từ `App.js` xuống các component con thông qua props.

### 8.4. Render danh sách

Sử dụng `map()` để tạo danh sách các ngày trong tuần và danh sách thẻ môn học.

### 8.5. Lọc dữ liệu

Sử dụng `filter()` để lấy những buổi học thuộc ngày được chọn.

### 8.6. Conditional Rendering

Sử dụng điều kiện để quyết định hiển thị `ScheduleCard` hoặc `EmptySchedule`.

### 8.7. StyleSheet

Sử dụng `StyleSheet.create()` để tổ chức các thuộc tính giao diện, bao gồm màu sắc, khoảng cách, căn chỉnh và bo góc.

---

## 9. Thiết kế giao diện

Ứng dụng sử dụng phong cách **Dark Neon** với các màu chủ đạo:

| Màu sắc | Mã màu | Công dụng |
|---|---|---|
| Xanh đen | `#090E1C` | Màu nền chính |
| Tím đậm | `#312E81` | Các vùng nhấn |
| Xanh cyan | `#22D3EE` | Tiêu đề và điểm nhấn |
| Tím | `#8B5CF6` | Màu môn React Native |
| Xanh cyan đậm | `#06B6D4` | Màu môn Cơ sở dữ liệu |
| Cam | `#F59E0B` | Màu môn Node.js |
| Hồng | `#EC4899` | Màu môn Thiết kế giao diện |
| Xanh lá | `#10B981` | Màu môn Tiếng Anh chuyên ngành |

---

## 10. Hình ảnh minh họa ứng dụng

### 10.1. Giao diện chính – ScheduleApp

Hiển thị phần đầu ứng dụng, thông tin sinh viên và tổng quan học tập.

![Giao diện chính ScheduleApp](images/01_GiaoDien.png)

### 10.2. Component Header

Hiển thị tên ứng dụng và thông tin sinh viên.

![Component Header](images/02_Header.png)

### 10.3. Component StatsCard

Hiển thị thống kê 7 buổi học, 6 môn học và 1 ngày nghỉ.

![Component StatsCard](images/03_StatsCard.png)

### 10.4. Component WeekCalendar

Hiển thị lịch 7 ngày và làm nổi bật ngày được chọn.

![Component WeekCalendar](images/04_WeekCalendar.png)

### 10.5. Component ScheduleCard

Hiển thị thông tin môn học, giờ học, phòng học và giảng viên.

![Component ScheduleCard](images/05_ScheduleCard.png)

### 10.6. Component EmptySchedule

Hiển thị thông báo khi chọn Chủ Nhật không có lịch học.

![Component EmptySchedule](images/06_EmptySchedule.png)

---

## 11. Hướng dẫn chạy ứng dụng

### Cách 1: Chạy trực tiếp bằng Expo Snack

**Bước 1:** Truy cập:

https://snack.expo.dev/@dotrungngocbao/scheduleapp

**Bước 2:** Đợi Expo Snack tải mã nguồn.

**Bước 3:** Chọn **Web** ở phần xem trước để chạy trên trình duyệt.

**Bước 4:** Quan sát giao diện ScheduleApp.

**Bước 5:** Nhấn các nút từ T2 đến CN để kiểm tra lịch học tương ứng.

**Bước 6:** Nhấn CN để xem thông báo không có lịch học.

### Cách 2: Xem mã nguồn trên GitHub

1. Mở Repository chứa bài tập React Native.
2. Truy cập thư mục `Bai02/Bt06`.
3. Mở `App.js` để xem component chính.
4. Mở thư mục `components` để xem các component con.
5. Mở thư mục `images` để xem hình ảnh minh họa.
6. Sử dụng link Expo Snack để chạy thử ứng dụng.

---

## 12. Kiểm thử chức năng

| STT | Thao tác kiểm thử | Kết quả mong đợi |
|---|---|---|
| 1 | Mở ứng dụng | Hiển thị ScheduleApp |
| 2 | Chọn Thứ Hai | Hiển thị 2 buổi học |
| 3 | Chọn Thứ Ba | Hiển thị môn Lập trình Node.js |
| 4 | Chọn Thứ Tư | Hiển thị môn Thiết kế giao diện |
| 5 | Chọn Thứ Năm | Hiển thị môn Tiếng Anh chuyên ngành |
| 6 | Chọn Thứ Sáu | Hiển thị môn Lập trình React Native |
| 7 | Chọn Thứ Bảy | Hiển thị môn Thực hành Node.js |
| 8 | Chọn Chủ Nhật | Hiển thị thông báo không có lịch học |
| 9 | Quan sát phần thống kê | Hiển thị 07 buổi học, 06 môn học, 01 ngày nghỉ |

---

## 13. Kết quả thực hiện

Ứng dụng ScheduleApp được xây dựng với các chức năng chính:

- Tổ chức mã nguồn thành các component riêng biệt.
- Hiển thị thông tin sinh viên và tên ứng dụng.
- Hiển thị lịch học đầy đủ 7 ngày trong tuần.
- Cho phép chọn ngày để thay đổi lịch học.
- Hiển thị thông tin môn học rõ ràng.
- Phân biệt các môn học bằng màu sắc.
- Hiển thị thông báo khi không có lịch học.
- Hiển thị thống kê tổng quan.
- Có giao diện Dark Neon và hỗ trợ cuộn nội dung.

## 14. Hướng phát triển

Trong tương lai, ứng dụng có thể được mở rộng với các chức năng:

- Thêm môn học mới.
- Chỉnh sửa và xóa lịch học.
- Lưu lịch học bằng AsyncStorage hoặc cơ sở dữ liệu.
- Tìm kiếm môn học.
- Thông báo nhắc nhở trước giờ học.
- Chuyển đổi giữa giao diện sáng và tối.
- Đồng bộ lịch học với tài khoản người dùng.

Các chức năng trên là **định hướng phát triển**, chưa thuộc phiên bản hiện tại.

---

## 15. Liên kết bài tập

**Tên ứng dụng:** ScheduleApp

**Link chạy trực tiếp:**

https://snack.expo.dev/@dotrungngocbao/scheduleapp

**Vị trí bài nộp trên GitHub:**

`React-Native/Bai02/Bt06`

---

**Sinh viên thực hiện:** Đỗ Trung Ngọc Bảo

**Mã sinh viên:** CD-CNTT18A05

**Lớp:** CD-CNTT18A

**Bài tập:** BT06 – Ứng dụng quản lý thời khóa biểu cá nhân

**Công nghệ:** React Native – Expo Snack
