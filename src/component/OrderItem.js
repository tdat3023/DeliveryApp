import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function OrderItem({ navigation, item }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OrderDetail");
      }}
    >
      <View style={styles.oneOrderView}>
        <View style={styles.imageView}>
          <Image
            // source={require("../../assets/image.jpg")}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.inforView}>
          <Text>Mã đơn hàng: {item.id}</Text>
          <Text>Tên đơn: {item.product}</Text>
          <Text>Trạng thái: {item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  oneOrderView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
  },

  imageView: {
    margin: 10,
    width: 70,
    height: 70,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {},

  inforView: {
    marginLeft: 10,
  },
});
export default OrderItem;
