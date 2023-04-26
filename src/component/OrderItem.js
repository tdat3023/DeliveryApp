import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDistance } from "geolib";
import axios from "axios";
import { setLocation } from "../redux/reducers/CurentLocation";
import orderApi from "../api/orderApi";
import LoadingModal from "./LoadingModal";
function OrderItem({ navigation, item, reload, setReload }) {
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.locationCurrent.location);
  const [isLoading, setIsLoading] = useState(false);
  const lat1 = location?.latitude;
  const lon1 = location?.longitude;
  const lat2 = parseFloat(item.coords.lat);
  const lon2 = parseFloat(item.coords.lng);
  const calculateDistance = () => {
    if (lat1 && lon1) {
      const dis = getDistance(
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 }
      );
      return `${dis / 1000} km`;
    }
  };

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000 * 60 * 5,
        distanceInterval: 100,
      },
      // socket Tracking Location
      (location) => {
        const { latitude, longitude } = location.coords;
        socket.emit("track_location", { shipperID, latitude, longitude });
        dispatch(setLocation({ latitude, longitude }));
      }
    );
  }

  useEffect(() => {
    if (!location) {
      setIsLoading(true);
      getLocation();
    } else {
      setIsLoading(false);
    }
    return () => {};
  }, [location]);

  const handleReceive = async () => {
    const response = await orderApi.updateStatus(item._id, "danhan");
    if (response) {
      let res = await orderApi.addHeldOrder(shipperID, item._id);
      if (res.message) {
        Alert.alert("Thông báo", res.message);
        await orderApi.updateStatus(item._id, "chuanhan");
      } else {
        // add oke
        setReload(!reload);
      }
    }
  };

  function checkStatus(status) {
    if (status === "chuanhan") {
      return (
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              handleReceive();
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
      <LoadingModal
        visible={isLoading}
        text={"Đang lấy vị trí. . ."}
      ></LoadingModal>
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
