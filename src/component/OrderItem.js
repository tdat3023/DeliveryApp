import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderItem = ({ item }) => (
  <View style={styles.oneOrderView}>
    <Text>Mã đơn hàng: {item.id}</Text>
    <Text>Tên đơn: {item.product}</Text>
    <Text>Trạng thái: {item.status}</Text>
  </View>
);

const styles = StyleSheet.create({
  oneOrderView: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
export default OrderItem;
