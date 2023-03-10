import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import SearchBar from "../component/Sreach";
import OrderItem from "../component/OrderItem";

export default function Order({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("chuanhan");

  const orders = [
    { id: 1, product: "item1", status: "danhan" },
    { id: 2, product: "item2", status: "chuanhan" },
    { id: 3, product: "item3", status: "tamgiu" },
    { id: 4, product: "item4", status: "chuanhan" },
    { id: 5, product: "item5", status: "chuanhan" },
    { id: 6, product: "item1", status: "tamgiu" },
    { id: 7, product: "item2", status: "tamgiu" },
    { id: 8, product: "item3", status: "tamgiu" },
    { id: 9, product: "item4", status: "tamgiu" },
    { id: 10, product: "item5", status: "danhan" },
  ];

  const [term, setTerm] = useState("");

  const handleTermSubmit = (term) => {
    setTerm(term);
    alert(term);
  };

  // chua nhan
  function getCNOrders() {
    return orders.filter((orders) => orders.status === "chuanhan");
  }
  const cnOrders = getCNOrders();

  // đã nhận
  function getDNOrders() {
    return orders.filter((orders) => orders.status === "danhan");
  }
  const dnOrders = getDNOrders();

  // tạm giữ
  function getTGOrders() {
    return orders.filter((orders) => orders.status === "tamgiu");
  }
  const tGOrders = getTGOrders();

  let dataToRender;
  if (selectedTab === "chuanhan") {
    dataToRender = cnOrders;
  } else if (selectedTab === "tamgiu") {
    dataToRender = tGOrders;
  } else {
    dataToRender = dnOrders;
  }

  // Tìm
  const searchResult = orders.filter((item) => item.id === term);
  // function getFilteredOrders() {
  console.log(term);

  //   return orders.filter((item) => item.id === term);
  // }
  // const filteredOrders = getFilteredOrders();

  // const [filteredOrders, setFilteredOrders] = useState(orders);
  console.log(searchResult);

  // if (term.length != 0) {
  //   dataToRender = filteredOrders;
  // }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Đơn Hàng Trong Ngày</Text>
        </View>

        {/* Phân loại */}
        <View style={styles.orderStatus}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("chuanhan")}
          >
            <Text
              style={
                selectedTab === "chuanhan" ? styles.selectedText : styles.text
              }
            >
              Chưa Nhận
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("danhan")}
          >
            <Text
              style={
                selectedTab === "danhan" ? styles.selectedText : styles.text
              }
            >
              Đã Nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("tamgiu")}
          >
            <Text
              style={
                selectedTab === "tamgiu" ? styles.selectedText : styles.text
              }
            >
              Tạm Giữ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tìm kiếm */}
        <View style={{ width: "100%" }}>
          <SearchBar onTermSubmit={handleTermSubmit} />
        </View>

        {/* Danh sách */}

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
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
  },

  tab: {
    height: 40,
    padding: 5,
    width: 110,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
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
    width: "100%",
  },
});
