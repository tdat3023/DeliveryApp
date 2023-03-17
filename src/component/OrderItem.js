import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function OrderItem({ navigation, item }) {
  const sendData = (item) => {
    navigation.navigate("OrderDetail", { data: JSON.stringify(item) });
  };
  function checkStatus(status) {
    if (status === "chuanhan") {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              console.log(item.id);
            }}
          >
            <Text>Nhận</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (status === "danhan") {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              console.log(item.id);
            }}
          >
            <Text>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }
  return (
    <TouchableOpacity onPress={sendData}>
      <View style={styles.oneOrderView}>
        <View style={styles.imageView}>
          <Image
            // source={require("../../assets/image.jpg")}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.inforView}>
          <Text>Mã đơn hàng: {item.id}</Text>
          <Text>Tên đơn: {item.diachiNN}</Text>
          <Text>Trạng thái: {item.status}</Text>
        </View>
        {checkStatus(item.status)}
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
    marginHorizontal: 10,
    flex: 1,
  },

  button: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    backgroundColor: "yellow",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
export default OrderItem;
