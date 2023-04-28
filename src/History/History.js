import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import SearchBar from "../component/Sreach";
import OrderHisItem from "./OrderHisItem";
import OrderItem from "../component/OrderItem";
import { useSelector } from "react-redux";
import orderApi from "../api/orderApi";
export default function History({ navigation }) {
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);
  const [selectedTab, setSelectedTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistoryOfShipper, setOrderHistoryOfShipper] = useState([]);

  const getOrderOfShipper = async () => {
    try {
      const response = await orderApi.getHistoryOrderByShipperId(shipperID);
      if (response) {
        setOrderHistoryOfShipper(response.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Api gọi các order đã giao
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action

      getOrderOfShipper();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // Filter function to get only delivered orders
  function getDeliveredOrders() {
    return orderHistoryOfShipper.filter(
      (orderHistoryOfShipper) => orderHistoryOfShipper.status === "thanhcong"
    );
  }
  const deliveredOrders = getDeliveredOrders();

  // Filter function to get only cancelled orders
  function getCancelledOrders() {
    return orderHistoryOfShipper.filter(
      (orderHistoryOfShipper) => orderHistoryOfShipper.status === "thatbai"
    );
  }
  const cancelledOrders = getCancelledOrders();

  let dataToRender;
  if (selectedTab === "All") {
    dataToRender = orderHistoryOfShipper;
  } else if (selectedTab === "Cancelled") {
    dataToRender = cancelledOrders;
  } else {
    dataToRender = deliveredOrders;
  }

  const [term, setTerm] = useState("");

  const handleTermSubmit = (term) => {
    setTerm(term);
  };

  // Tìm
  const searchResult = orderHistoryOfShipper.filter((item) => item.id === term);

  // ngày
  const currentDate = moment().format("DD/MM/YYYY");
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Lịch sử đơn hàng</Text>
        </View>
        {/* Ngày tháng */}
        <View>
          <Text>{currentDate}</Text>
        </View>
        {/* Phân loại */}
        <View style={styles.orderStatus}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("All")}
          >
            <Text
              style={selectedTab === "All" ? styles.selectedText : styles.text}
            >
              Tất Cả
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("Delivered")}
          >
            <Text
              style={
                selectedTab === "Delivered" ? styles.selectedText : styles.text
              }
            >
              Đã Giao
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("Cancelled")}
          >
            <Text
              style={
                selectedTab === "Cancelled" ? styles.selectedText : styles.text
              }
            >
              Đã Hủy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tìm kiếm */}
        <View style={{ width: "100%" }}>
          <SearchBar onTermSubmit={handleTermSubmit} />
        </View>

        {/* Danh sách */}
        {isLoading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
        <FlatList
          style={styles.list}
          data={dataToRender}
          renderItem={({ item }) => (
            <OrderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fbf4ef",
  },
  container: {
    flex: 1,
    backgroundColor: "#fbf4ef",
    alignItems: "center",
  },

  textHeader: {
    fontSize: 25,
    color: "#743f7e",
    // fontFamily: "Arial",
    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  text: {
    fontSize: 15,
    color: "#743f7e",
    // fontFamily: "Arial",
    marginHorizontal: "5%",
  },

  orderStatus: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    padding: 5,
    width: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textStatus: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },

  list: {
    flex: 1,
    width: "100%",
  },
});
