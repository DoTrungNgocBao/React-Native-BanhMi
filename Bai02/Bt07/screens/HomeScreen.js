
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar
} from "react-native";

import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0B1020"
      />

      {/* LOGO ỨNG DỤNG */}
      <View style={styles.header}>
        <Text style={styles.brand}>
          ✦ BOOKING
          <Text style={styles.brandAccent}>APP</Text>
        </Text>

        <Text style={styles.subtitle}>
          ĐẶT LỊCH DỊCH VỤ THÔNG MINH
        </Text>
      </View>

      {/* BANNER TRANG CHỦ */}
      <View style={styles.banner}>
        <Text style={styles.bannerSmall}>
          ✦ PREMIUM EXPERIENCE
        </Text>

        <Text style={styles.bannerTitle}>
          Thời gian của bạn{"\n"}
          xứng đáng được trân trọng.
        </Text>

        <Text style={styles.bannerText}>
          Khám phá dịch vụ yêu thích và đặt lịch
          chỉ trong vài bước đơn giản.
        </Text>

        <Text style={styles.bannerIcon}>
          ✦  ✧  ✦
        </Text>
      </View>

      {/* THÔNG TIN SINH VIÊN */}
      <View style={styles.studentCard}>
        <View style={styles.studentHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>NB</Text>
          </View>

          <View style={styles.studentHeaderText}>
            <Text style={styles.studentLabel}>
              ✦ STUDENT PROJECT
            </Text>

            <Text style={styles.studentName}>
              Đỗ Trung Ngọc Bảo
            </Text>

            <Text style={styles.studentRole}>
              Sinh viên Công nghệ thông tin
            </Text>
          </View>
        </View>

        <View style={styles.studentDivider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Mã sinh viên
          </Text>

          <Text style={styles.infoValue}>
            CD-CNTT18A05
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Lớp
          </Text>

          <Text style={styles.infoValue}>
            CD-CNTT18A
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Môn học
          </Text>

          <Text style={styles.infoValue}>
            React Native
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            Bài thực hành
          </Text>

          <Text style={styles.infoValue}>
            Bài 2 - BT07
          </Text>
        </View>

        <View style={styles.projectTag}>
          <Text style={styles.projectTagText}>
            BOOKINGAPP • ỨNG DỤNG ĐẶT LỊCH DỊCH VỤ
          </Text>
        </View>
      </View>

      {/* DANH SÁCH DỊCH VỤ */}
      <View style={styles.heading}>
        <View>
          <Text style={styles.sectionSmall}>
            ✦ OUR SERVICES
          </Text>

          <Text style={styles.title}>
            Khám phá dịch vụ
          </Text>
        </View>

        <Text style={styles.count}>
          {services.length} dịch vụ
        </Text>
      </View>

      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onPress={() =>
            navigation.navigate(
              "ServiceDetailScreen",
              { service }
            )
          }
        />
      ))}

      {/* FOOTER */}
      <View style={styles.footerBox}>
        <Text style={styles.footerBrand}>
          ✦ BOOKINGAPP
        </Text>

        <Text style={styles.footer}>
          Thiết kế và thực hiện bởi
        </Text>

        <Text style={styles.footerName}>
          Đỗ Trung Ngọc Bảo
        </Text>

        <Text style={styles.footer}>
          CD-CNTT18A05 • CD-CNTT18A
        </Text>

        <Text style={styles.footerBottom}>
          REACT NATIVE • BÀI 2 • BT07
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1020"
  },

  content: {
    padding: 20,
    paddingBottom: 45
  },

  header: {
    marginBottom: 4
  },

  brand: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 1
  },

  brandAccent: {
    color: "#65EBD0"
  },

  subtitle: {
    color: "#8999BE",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5
  },

  // BANNER
  banner: {
    marginTop: 25,
    marginBottom: 22,
    padding: 26,
    borderRadius: 25,
    backgroundColor: "#45318F",
    borderWidth: 1,
    borderColor: "#846AF3",
    overflow: "hidden"
  },

  bannerSmall: {
    color: "#B6FCE9",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2
  },

  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 14,
    lineHeight: 35
  },

  bannerText: {
    color: "#E3DBFF",
    marginTop: 13,
    lineHeight: 22
  },

  bannerIcon: {
    color: "#82F7DD",
    fontSize: 32,
    marginTop: 14,
    textAlign: "right"
  },

  // THẺ THÔNG TIN SINH VIÊN
  studentCard: {
    backgroundColor: "#17223B",
    borderRadius: 22,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#7655EE"
  },

  studentHeader: {
    flexDirection: "row",
    alignItems: "center"
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: "#6042B8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A18BFF"
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900"
  },

  studentHeaderText: {
    flex: 1,
    marginLeft: 13
  },

  studentLabel: {
    color: "#65EBD0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1
  },

  studentName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 5
  },

  studentRole: {
    color: "#A8B9D9",
    fontSize: 12,
    marginTop: 4
  },

  studentDivider: {
    height: 1,
    backgroundColor: "#344360",
    marginVertical: 18
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 13,
    gap: 10
  },

  infoLabel: {
    color: "#9EAFD0",
    fontSize: 12,
    flex: 1
  },

  infoValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "right",
    flex: 1.4
  },

  projectTag: {
    marginTop: 8,
    backgroundColor: "#28345A",
    borderRadius: 10,
    padding: 12,
    alignItems: "center"
  },

  projectTagText: {
    color: "#65EBD0",
    fontSize: 10,
    fontWeight: "800",
    textAlign: "center"
  },

  // DANH SÁCH DỊCH VỤ
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 17,
    gap: 8
  },

  sectionSmall: {
    color: "#65EBD0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 7
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900"
  },

  count: {
    color: "#8C9FC6",
    fontSize: 12,
    marginBottom: 3
  },

  // FOOTER
  footerBox: {
    marginTop: 30,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#263451",
    alignItems: "center"
  },

  footerBrand: {
    color: "#65EBD0",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10
  },

  footer: {
    color: "#8D9DBD",
    fontSize: 12,
    marginBottom: 5
  },

  footerName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6
  },

  footerBottom: {
    color: "#7655EE",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 12,
    letterSpacing: 1
  }
});
