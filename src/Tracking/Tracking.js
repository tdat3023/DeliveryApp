import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch, useSelector } from "react-redux";
import orderApi from "../api/orderApi";
import CongratulationScreen from "../component/CongratulationScreen";
import { removeOneOrder } from "../redux/reducers/oneOrder";

export default function Tracking({ navigation }) {
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);
  const { oneOrder } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  // console.log(oneOrder);
  const location = useSelector((state) => state.locationCurrent.location);
  const [index, setIndex] = useState(1);
  const [moreProfile, setMoreProfile] = useState(true);

  const order = oneOrder;
  const mapViewRef = useRef();
  const [isFocus, setIsFocus] = useState(false);

  const handleTap = async (status) => {
    try {
      await orderApi.addHistoryOrder(shipperID, order._id);
      await orderApi.updateStatus(order._id, status);
      await orderApi.removeFromHeldOrder(shipperID, order._id);
      dispatch(removeOneOrder());
    } catch (error) {
      console.error(error);
    }
  };

  const handT = async (status) => {
    await orderApi.updateStatus(order._id, "tamgiu");
    navigation.navigate("CongratulationScreen");
    dispatch(removeOneOrder());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsFocus(true);
    });
    setIndex(1);
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setIsFocus(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!order && isFocus) {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhận đơn hoặc chọn đơn hàng để sử dụng.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Order");
            },
          },
        ]
      );
      return;
    }

    return () => {};
  }, [order, isFocus]);

  if (!order) {
    return <></>;
  }

  const lat = parseFloat(order.coords.lat);
  const lon = parseFloat(order.coords.lng);
  // lấy vị trí hiện tại

  const lat2 = location.latitude;
  const lon2 = location.longitude;

  const region = {
    latitude: (lat + lat2) / 2,
    longitude: (lon + lon2) / 2,
    latitudeDelta: Math.abs(lat - lat2) * 2,
    longitudeDelta: Math.abs(lon - lon2) * 2,
  };

  function getStatus(index) {
    return index === 1 ? (
      <TouchableOpacity style={styles.btn} onPress={() => setIndex(index + 1)}>
        <Text style={{ color: "white", fontSize: 15 }}>Bắt Đầu</Text>
      </TouchableOpacity>
    ) : index === 2 ? (
      <TouchableOpacity style={styles.btn} onPress={() => setIndex(index + 1)}>
        <Text style={{ color: "white", fontSize: 15 }}>Hoàn Thành</Text>
      </TouchableOpacity>
    ) : index === 3 ? (
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={[styles.btn01, { backgroundColor: "green" }]}
          onPress={() => {
            setIndex(index + 1);
            handleTap("thanhcong");
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Thành công</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }}></View>
        <TouchableOpacity
          style={[styles.btn01, { backgroundColor: "red" }]}
          onPress={() => {
            setIndex(index + 1);
            handleTap("thatbai");
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Thất bại</Text>
        </TouchableOpacity>
      </View>
    ) : index === 4 ? (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          // Xử lý khi lựa chọn đơn hàng khác
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>
          Lựa chọn đơn hàng khác
        </Text>
      </TouchableOpacity>
    ) : null;
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.map}>
          <MapView style={styles.map} region={region} ref={mapViewRef}>
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lon,
              }}
              title="Nơi Giao"
            />

            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Ionicons name="play" size={30} color="red" />
            </Marker>

            {/* <MapViewDirections
                origin={{
                  latitude: location?.coords?.latitude,
                  longitude: location?.coords?.longitude,
                }}
                destination={{
                  latitude: lat,
                  longitude: lon,
                }}
                strokeWidth={7}
                strokeColor="red"
                optimizeWaypoints={true}
                apikey="AIzaSyCz05MCIlmnpbQgr32Am783YW4muKdaiKQ"
              /> */}
          </MapView>
        </View>

        {/* nút */}
        <View style={styles.viewMore}>
          <View style={styles.viewMore1}>
            <TouchableOpacity
              style={styles.btnDefault}
              onPress={() => {
                {
                  handT("tamgiu");
                }
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}>Hủy</Text>
            </TouchableOpacity>
            <Text style={{ color: "#743f7e" }}>Tracking Number</Text>
            <TouchableOpacity
              style={styles.touchMore}
              onPress={() => {
                setMoreProfile(!moreProfile);
              }}
            >
              {!moreProfile ? (
                <MaterialIcons name="expand-less" size={24} color="#743f7e" />
              ) : (
                <MaterialIcons name="expand-more" size={24} color="743f7e" />
              )}
            </TouchableOpacity>
          </View>
          {moreProfile ? (
            <View style={styles.viewHidden}>
              <View>
                <View style={styles.trackingNumber}>
                  <View style={styles.trackingInfor}>
                    <MaterialCommunityIcons
                      name="package-variant-closed"
                      size={24}
                      color="black"
                    />
                    <Text style={{ marginLeft: 10 }}>
                      Mã đơn hàng: ... {order?._id.slice(-15)}
                      {/* {data.id} */}
                    </Text>
                  </View>
                </View>
                <View style={styles.wrap}>
                  <View style={styles.div}>
                    <View style={styles.status}>
                      <View
                        style={[styles.item, index >= 1 && styles.activeColor]}
                      >
                        <View
                          style={[
                            styles.circle,
                            index >= 1 && styles.activeColor,
                          ]}
                        >
                          <AntDesign
                            name="checkcircleo"
                            size={10}
                            color="white"
                          />
                        </View>
                      </View>

                      <View style={styles.statusText}>
                        <Text style={[index >= 1 && styles.textColor]}>
                          Nhận hàng
                        </Text>
                        <Text style={styles.timeText}>Thời gian</Text>
                      </View>
                    </View>

                    <View style={styles.status}>
                      <View
                        style={[styles.item, index >= 3 && styles.activeColor]}
                      >
                        <View
                          style={[
                            styles.circle,
                            index >= 2 && styles.activeColor,
                          ]}
                        >
                          <AntDesign
                            name="checkcircleo"
                            size={10}
                            color="white"
                          />
                        </View>
                      </View>

                      <View style={styles.statusText}>
                        <Text style={[index >= 2 && styles.textColor]}>
                          Đang giao
                        </Text>
                        <Text style={styles.timeText}>Thời gian</Text>
                      </View>
                    </View>

                    <View style={styles.status}>
                      <View
                        style={[styles.item, index >= 4 && styles.activeColor]}
                      >
                        <View
                          style={[
                            styles.circle,
                            index >= 3 && styles.activeColor,
                          ]}
                        >
                          <AntDesign
                            name="checkcircleo"
                            size={10}
                            color="white"
                          />
                        </View>
                      </View>

                      <View style={styles.statusText}>
                        <Text style={[index >= 3 && styles.textColor]}>
                          Đến nơi
                        </Text>
                        <Text style={styles.timeText}>Thời gian</Text>
                      </View>
                    </View>

                    <View style={styles.status}>
                      <View style={{ alignItems: "center", width: 2 }}>
                        <View
                          style={[
                            styles.circle,
                            index >= 4 && styles.activeColor,
                          ]}
                        >
                          <AntDesign
                            name="checkcircleo"
                            size={10}
                            color="white"
                          />
                        </View>
                      </View>

                      <View style={styles.statusText}>
                        <Text style={[index >= 4 && styles.textColor]}>
                          Trả hàng
                        </Text>
                        <Text style={styles.timeText}>Thời gian</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {getStatus(index)}
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
  underMap: {
    alignItems: "center",
  },

  item: {
    height: 50,
    width: 2,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: "#666",
  },
  activeColor: {
    backgroundColor: "#743f7e",
  },

  btn: {
    backgroundColor: "#743f7e",
    width: "90%",
    height: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  btn01: {
    backgroundColor: "#743f7e",
    width: 130,
    height: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  btnDefault: {
    backgroundColor: "#743f7e",
    width: 60,
    height: 30,
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },

  status: {
    flexDirection: "row",
  },

  statusText: {
    marginLeft: 20,
  },

  timeText: {
    fontSize: 10,
  },

  textColor: {
    color: "#743f7e",
  },

  trackingNumber: {
    width: "100%",
    marginVertical: 5,
  },
  trackingInfor: {
    marginVertical: 5,
    flexDirection: "row",
  },

  viewMore: {
    backgroundColor: "#fbf4ef",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  viewMore1: {
    backgroundColor: "#fbf4ef",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  viewHidden: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
