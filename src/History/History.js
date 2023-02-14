import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import SearchBar from "../component/Sreach";
import OrderItem from "../component/OrderItem";
export default function History() {
  const [term, setTerm] = useState("");

  const handleTermSubmit = (newTerm) => {
    setTerm(newTerm);
  };

  const [selectedTab, setSelectedTab] = useState("All");

  const orders = [
    { id: 1, product: "item1", status: "delivered" },
    { id: 2, product: "item2", status: "pending" },
    { id: 3, product: "item3", status: "delivered" },
    { id: 4, product: "item4", status: "cancelled" },
    { id: 5, product: "item5", status: "delivered" },
    { id: 6, product: "item1", status: "delivered" },
    { id: 7, product: "item2", status: "pending" },
    { id: 8, product: "item3", status: "delivered" },
    { id: 9, product: "item4", status: "cancelled" },
    { id: 10, product: "item5", status: "delivered" },
    { id: 11, product: "item1", status: "delivered" },
    { id: 12, product: "item2", status: "pending" },
    { id: 13, product: "item3", status: "delivered" },
    { id: 14, product: "item4", status: "cancelled" },
    { id: 15, product: "item5", status: "delivered" },
  ];

  // Filter function to get only delivered orders
  function getDeliveredOrders() {
    return orders.filter((order) => order.status === "delivered");
  }
  const deliveredOrders = getDeliveredOrders();

  // Filter function to get only cancelled orders
  function getCancelledOrders() {
    return orders.filter((order) => order.status === "cancelled");
  }
  const cancelledOrders = getCancelledOrders();

  let dataToRender;
  if (selectedTab === "All") {
    dataToRender = orders;
  } else if (selectedTab === "Cancelled") {
    dataToRender = cancelledOrders;
  } else {
    dataToRender = deliveredOrders;
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Lịch sử đơn hàng</Text>
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
          {/* <Text>{term}</Text> */}
        </View>

        {/* Danh sách */}

        <FlatList
          style={styles.list}
          data={dataToRender}
          renderItem={({ item }) => <OrderItem item={item} />}
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
    backgroundColor: "brown",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F9",
    alignItems: "center",
  },

  textHeader: {
    fontSize: 25,
    color: "#743f7e",
    fontFamily: "Arial",
    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  text: {
    fontSize: 15,
    color: "#743f7e",
    fontFamily: "Arial",
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

  list: { width: "100%" },
});
