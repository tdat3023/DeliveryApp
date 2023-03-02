import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import SearchBar from "./component/Sreach";
import OrderItem from "./component/OrderItem";

export default function Order({ navigation }) {
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

  const [term, setTerm] = useState("");

  const handleTermSubmit = (term) => {
    setTerm(term);
  };

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

  // ngày
  const currentDate = moment().format("DD/MM/YYYY");
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Đơn Hàng Trong Ngày</Text>
        </View>
        <View>
          <Text>{currentDate}</Text>
        </View>

        {/* Tìm kiếm */}
        <View style={{ width: "100%" }}>
          <SearchBar onTermSubmit={handleTermSubmit} />
          {/* <Text>{term}</Text> */}
        </View>

        {/* Danh sách */}

        <FlatList
          style={styles.list}
          data={orders}
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

  list: {
    flex: 1,
    width: "100%",
  },
});
