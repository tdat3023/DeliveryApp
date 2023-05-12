import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import orderApi from "../api/orderApi";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeOneOrder, setOrder } from "../redux/reducers/oneOrder";

function OrderDetail({ navigation, route }) {
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);
  const data = route.params.data;
  const status = data.status;
  const dispatch = useDispatch();

  const handleReceive = async () => {
    const response = await orderApi.updateStatus(data._id, "danhan");
    if (response) {
      let res = await orderApi.addHeldOrder(shipperID, data._id);
      if (res.message) {
        Alert.alert("Thông báo", res.message);
        await orderApi.updateStatus(data._id, "chuanhan");
        await orderApi.removeFromHeldOrder(shipperID, data._id);
      } else {
        setReload(!reload);
      }
    }
  };

  function checkStatus(status) {
    const now = new Date();
    const currentHour = now.getHours;
    const isBetween6to8 = currentHour >= 6 && currentHour <= 8;
    const isBetween12to2 = currentHour >= 12 && currentHour <= 14;
    const showButton =
      status == "chuanhan" && (isBetween6to8 || isBetween12to2);
    const buttons = {
      chuanhan: { text: "Nhận", onPress: handleReceive },
      danhan: {
        text: "Bắt đầu",
        onPress: () => {
          navigation.navigate("Tracking");
          dispatch(setOrder(data));
        },
      },
      tamgiu: {
        text: "Giao lại",
        onPress: () => {
          navigation.navigate("Tracking");
          dispatch(setOrder(data));
        },
      },
    };
    const buttonConfig = buttons[status];

    return buttonConfig ? (
      <View style={styles.endContainer}>
        {showButton ? (
          <View style={styles.button}>
            <TouchableOpacity onPress={buttonConfig.onPress}>
              <Text style={styles.buttonText}>{buttonConfig.text}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        {status == "danhan" || status == "tamgiu" ? (
          <View style={styles.button}>
            <TouchableOpacity onPress={buttonConfig.onPress}>
              <Text style={styles.buttonText}>{buttonConfig.text}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    ) : null;
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              dispatch(removeOneOrder());
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
          <Text style={styles.statusText}>Trạng thái: {data.status}</Text>
          <Text style={styles.statusText}>Khoảng các hiện tại: 10Km</Text>
        </View>

        {/* thông tin vận chuyển */}
        <View style={styles.titleView}>
          <MaterialCommunityIcons
            name="truck-outline"
            size={24}
            color="black"
          />
          <Text style={styles.timeText}>Thông tin đơn hàng</Text>
        </View>
        <View style={styles.customerView}>
          <Text style={styles.timeText}>Thời gian: 15:30 ngày 25/02/2023</Text>
          <Text style={styles.customerText}>Khách hàng: Nguyễn Văn A</Text>
          <Text style={styles.customerText}>Địa chỉ: {data.diachiNN}</Text>
          <Text style={styles.customerText}>Số điện thoại: {data.sdtNN}</Text>
        </View>

        <View style={styles.orderView}>
          <Text style={styles.orderText}>Tên sản phẩm: Iphone 13 Pro Max</Text>
          <Text style={styles.orderText}>Số lượng: 1</Text>
          <Text style={styles.orderText}>Giá: 35,000,000 đ</Text>
        </View>
        {checkStatus(data.status)}
        {/* <View style={styles.endContainer}>
          <TouchableOpacity style={styles.button} onPress={receiveOrder}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        </View> */}
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
    marginHorizontal: 10,
    marginTop: 20,
  },

  orderText: {
    marginTop: 5,
    fontSize: 16,
  },

  endContainer: {
    backgroundColor: "#f4511e",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "red",
    height: 80,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#743f7e",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default OrderDetail;
