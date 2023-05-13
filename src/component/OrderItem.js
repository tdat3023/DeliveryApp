import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDistance } from "geolib";
import { setLocation } from "../redux/reducers/CurentLocation";
import orderApi from "../api/orderApi";
import { setOrder } from "../redux/reducers/oneOrder";
import { useGlobalContext } from "../redux/GlobalContext";
function OrderItem({ navigation, item, reload, setReload }) {
  const { socketIo } = useGlobalContext();
  // const [hour, setHour] = useState(new Date().getHours());
  const [hour, setHour] = useState(7);
  const shipper = useSelector((state) => state.shipperInfor.shipper);
  const shipperID = shipper._id;
  const storage = shipper.storage;

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

  useEffect(() => {
    let id = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      if (currentHour != hour) {
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

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
      const res = await orderApi.addHeldOrder(shipperID, item._id);
      if (res.data.message) {
        Alert.alert("Thông báo", "Bạn đã nhận 10 đơn trong ca này!");
        console.log(res);
        await orderApi.updateStatus(item._id, "chuanhan");
      } else {
        setReload(!reload);
        socketIo.emit("change_order_list", storage);
      }
    }
  };

  const handleCancel = async () => {
    const response = await orderApi.updateStatus(item._id, "chuanhan");
    const res = await orderApi.removeFromHeldOrder(shipperID, item._id);

    setReload(!reload);
    socketIo.emit("change_order_list", storage);
  };

  function checkStatus(status) {
    const isBetween6to8 = hour >= 6 && hour < 8;
    const isBetween12to2 = hour >= 12 && hour < 14;
    const showCancelButton =
      status == "danhan" && (isBetween6to8 || isBetween12to2);
    const showButton =
      status == "chuanhan" && (isBetween6to8 || isBetween12to2);
    const buttons = {
      chuanhan: { text: "Nhận", onPress: handleReceive },
      danhan: {
        text: "Bắt đầu",
        onPress: () => {
          navigation.navigate("Tracking");
          dispatch(setOrder(item));
        },
      },
      tamgiu: {
        text: "Giao lại",
        onPress: () => {
          navigation.navigate("Tracking");
          dispatch(setOrder(item));
        },
      },
    };
    const buttonConfig = buttons[status];

    return buttonConfig ? (
      <View>
        {showButton ? (
          <View style={styles.button}>
            <TouchableOpacity onPress={buttonConfig.onPress}>
              <Text style={styles.text}>{buttonConfig.text}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        {status == "danhan" || status == "tamgiu" ? (
          <View style={styles.button}>
            <TouchableOpacity onPress={buttonConfig.onPress}>
              <Text style={styles.text}>{buttonConfig.text}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}

        {showCancelButton ? (
          <View
            style={[styles.button, { backgroundColor: "red", marginTop: 10 }]}
          >
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.text}>Hủy</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    ) : null;
  }

  function checkHistory(status) {
    const text = {
      thanhcong: { text: "Thành công" },
      thatbai: { text: "Thất bại" },
    };
    const textConfig = text[status];
    return textConfig ? <Text>{textConfig.text}</Text> : null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        let kc = calculateDistance();
        navigation.navigate("OrderDetail", {
          data: item,
          kc,
        });
      }}
    >
      <View style={styles.oneOrderView}>
        <View style={styles.inforView}>
          <Text>Mã đơn hàng: ...{item._id.slice(-10)}</Text>
          <Text>Tên đơn hàng: {item.orderName}</Text>
          <Text>Địa chỉ: {item.deliveryAddress}</Text>
          {checkHistory(item.status) == null ? (
            <Text>Khoảng cách: {calculateDistance()}</Text>
          ) : (
            checkHistory(item.status)
          )}
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
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "#52006A",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 10,
    shadowRadius: 16.0,
  },

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
    backgroundColor: "#743f7e",
    padding: 5,
    borderRadius: 10,
  },

  text: {
    color: "white",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
export default OrderItem;
