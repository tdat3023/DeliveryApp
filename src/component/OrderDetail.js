import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

function OrderDetail({ props, navigation }) {
  // const { route } = props.navigation.state;
  const route = useRoute();
  const { data } = route.params;
  console.log(data.id);
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              style={{ marginHorizontal: 10 }}
              name="left"
              size={27}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Chi tiết đơn hàng</Text>
        </View>
        {/* Trạng thái vận chuyển */}
        <View style={styles.statusView}>
          <Text style={styles.statusText}>Đang giao hàng</Text>
          <Text style={styles.statusText}>Đang giao hàng</Text>
          <Text style={styles.statusText}>Đang giao hàng</Text>
        </View>

        {/* thông tin vận chuyển */}
        <View style={styles.titleView}>
          <MaterialCommunityIcons
            name="truck-outline"
            size={24}
            color="black"
          />
          <Text style={styles.timeText}>Thông tin vận chuyển</Text>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.timeText}>Thời gian: 15:30 ngày 25/02/2023</Text>
          <Text style={styles.customerText}>Khách hàng: Nguyễn Văn A</Text>
          <Text style={styles.customerText}>
            Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM
          </Text>
          <Text style={styles.customerText}>Số điện thoại: 0123456789</Text>
        </View>
        <View style={styles.orderView}>
          <Text style={styles.orderText}>Tên sản phẩm: Iphone 13 Pro Max</Text>
          <Text style={styles.orderText}>Số lượng: 1</Text>
          <Text style={styles.orderText}>Giá: 35,000,000 đ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "brown",
  },
  container: {
    flex: 1,

    backgroundColor: "#F8F8F9",
  },

  headerContainer: {
    height: Platform.OS === "ios" ? 80 : 60,
    backgroundColor: "#f4511e",
    alignItems: "center",
    flexDirection: "row",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  statusView: {
    backgroundColor: "#F5A623",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  statusText: {
    fontWeight: "bold",
    color: "#fff",
  },
  titleView: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: "row",
  },
  timeText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  customerView: {
    marginHorizontal: 10,
  },
  customerText: {
    marginTop: 5,
    fontSize: 16,
  },
  orderView: {
    marginTop: 20,
  },
  orderText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default OrderDetail;
