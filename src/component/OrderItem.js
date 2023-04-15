import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/reducers/oneOrder";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { getDistance } from "geolib";

function OrderItem({ navigation, item }) {
  const location = useSelector((state) => state.locationCurrent.location);
  // console.log(location);

  const lat1 = location?.latitude;
  const lon1 = location?.longitude;
  // console.log("pick", lat1, lon1);
  const lat2 = parseFloat(item.coords.lat);
  const lon2 = parseFloat(item.coords.lng);
  // console.log("drop", lat2, lon2);
  const calculateDistance = () => {
    const dis = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );
    return `${dis / 1000} km`;
  };
  // console.log(calculateDistance());

  // API change status
  // const dispatch = useDispatch();
  // const buttonUpdate = (newStatus) => {
  //   dispatch(setStatus(newStatus));
  // };

  function checkStatus(status) {
    if (status === "chuanhan") {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              console.log(item);
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
              console.log(item);
            }}
          >
            <Text>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              console.log(item);
            }}
          >
            <Text>Giao lại</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("OrderDetail", {
          data: item,
        });
      }}
    >
      <View style={styles.oneOrderView}>
        <View style={styles.inforView}>
          <Text>Mã đơn hàng: ...{item._id.slice(-10)}</Text>
          <Text>Địa chỉ: {item.deliveryAddress.substring(0, 20)}...</Text>
          <Text>Khoảng cách: {calculateDistance()}</Text>
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
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 1,
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
    paddingVertical: 5,
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
