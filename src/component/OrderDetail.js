import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import orderApi from "../api/orderApi";
import { useSelector, useDispatch } from "react-redux";
import { removeOneOrder, setOrder } from "../redux/reducers/oneOrder";
import { getDistance } from "geolib";

function OrderDetail({ navigation, route }) {
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);
  const location = useSelector((state) => state.locationCurrent.location);
  const data = route.params.data;
  let kc = calculateDistance();
  // const status = data.status;
  const dispatch = useDispatch();

  // tính khaonrg cách
  function calculateDistance() {
    const lat1 = location?.latitude;
    const lon1 = location?.longitude;
    const lat2 = parseFloat(data.coords.lat);
    const lon2 = parseFloat(data.coords.lng);
    if (lat1 && lon1) {
      const dis = getDistance(
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 }
      );
      return `${dis / 1000} km`;
    }
  }

  const handleReceive = async () => {
    const response = await orderApi.updateStatus(data._id, "danhan");
    if (response) {
      let res = await orderApi.addHeldOrder(shipperID, data._id);
      if (res.shipperId == null) {
        Alert.alert("Thông báo", "Bạn đã nhận 10 đơn trong ca này!");
        await orderApi.updateStatus(data._id, "chuanhan");
        await orderApi.removeFromHeldOrder(shipperID, data._id);
      } else {
        setReload(!reload);
      }
    }
  };

  function checkStatus(status) {
    const now = new Date();
    // const currentHour = now.getHours;
    const currentHour = 7;
    const isBetween6to8 = currentHour >= 6 && currentHour < 8;
    const isBetween12to2 = currentHour >= 12 && currentHour < 14;
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
      <View>
        {showButton ? (
          <View style={styles.endContainer}>
            <View style={styles.button}>
              <TouchableOpacity onPress={buttonConfig.onPress}>
                <Text style={styles.buttonText}>{buttonConfig.text}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
        {status == "danhan" || status == "tamgiu" ? (
          <View style={styles.endContainer}>
            <View style={styles.button}>
              <TouchableOpacity onPress={buttonConfig.onPress}>
                <Text style={styles.buttonText}>{buttonConfig.text}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    ) : null;
  }

  function renderStatus(status) {
    if (status == "chuanhan") {
      return "Chưa nhận";
    } else if (status == "danhan") {
      return "Đã nhận";
    } else if (status == "tamgiu") {
      return "Tạm giữ";
    } else if (status == "thanhcong") {
      return "Đã giao thành công";
    } else if (status == "thatbai") {
      return "Đã giao thất bại";
    }
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
          <Text style={styles.statusText}>
            Trạng thái: {renderStatus(data.status)}
          </Text>
          <Text style={styles.statusText}>Khoảng các hiện tại: {kc}</Text>
        </View>

        {/* thông tin đơn hàng */}
        <View style={styles.viewOne}>
          <View style={styles.titleView}>
            <MaterialCommunityIcons
              name="truck-outline"
              size={28}
              color="black"
            />
            <Text style={styles.timeText}>Thông tin đơn hàng</Text>
          </View>
          <View style={styles.customerView}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 40,
                  backgroundColor: "red",
                }}
                source={{
                  uri: "https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-vector-package-icon-png-image_319707.jpg",
                }}
              />
            </View>
            <Text style={styles.customerText}>Thời gian: {data.dateAdded}</Text>
            <Text style={styles.customerText}>
              Tên đơn hàng: {data.orderName}
            </Text>
            <Text style={styles.customerText}>
              Địa chỉ: {data.deliveryAddress}
            </Text>
            <Text style={styles.customerText}>Kho: {data.storage}</Text>
            <Text style={styles.customerText}>
              Trọng lượng: {data.weight} kg
            </Text>
          </View>
        </View>
        {/* thông tin người nhận */}

        {/* thông tin đơn hàng */}
        <View style={styles.viewOne}>
          <View style={styles.titleView}>
            <Ionicons name="person-circle-outline" size={28} color="black" />
            <Text style={styles.timeText}>Thông tin người nhận</Text>
          </View>
          <View style={styles.customerView}>
            <Text style={styles.customerText}>
              Tên người nhận: {data.orderName}
            </Text>
            <Text style={styles.customerText}>
              Số điện thoại: {data.phoneReceive}
            </Text>
          </View>
        </View>
      </View>
      {checkStatus(data.status)}
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
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
    // backgroundColor: "red",
    marginTop: 5,
    marginHorizontal: 10,
    flexDirection: "row",
  },

  viewOne: {
    marginVertical: 5,
    // paddingHorizontal: 10,
    paddingBottom: 10,

    marginHorizontal: 10,
    borderRadius: 10,
  },
  timeText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  customerView: {
    marginHorizontal: 10,
  },
  customerText: {
    marginTop: 5,
    fontSize: 17,
  },

  orderText: {
    marginTop: 5,
    fontSize: 16,
  },

  endContainer: {
    width: "100%",
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
