import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  AppState,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import PieChartView from "./PieChart";
import LineChartView from "./LineChart";
import { Picker } from "@react-native-picker/picker";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { socket } from "../socket";
import * as Location from "expo-location";
import { setLocation } from "../redux/reducers/CurentLocation";
import LoadingModal from "../component/LoadingModal";
import orderApi from "../api/orderApi";
import { useGlobalContext } from "../redux/GlobalContext";

export default function HomeScreen() {
  const { handleIo, socketIo } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [statistical, setStatistical] = useState();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.locationCurrent.location);
  const shipper = useSelector((state) => state.shipperInfor.shipper);

  const shipperID = shipper._id;
  const [selectedValue, setSelectedValue] = useState("Don");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [selectedMonth, setSelectedMonth] = useState("5");
  const { oneOrder } = useSelector((state) => state.order);
  const order = oneOrder;
  const months = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];

  // lấy location
  useEffect(() => {
    let id = setTimeout(() => {
      getLocation();
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [location]);

  // Có đang hoạt động
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      // appState.current = nextAppState;
      appState.current = nextAppState;
      setAppStateVisible(appState.current);

      console.log("AppState", appState.current, shipperID);

      if (appState.current === "background") {
        socket.emit("foregroundMode", shipperID);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!location) {
      setIsLoading(true);
    } else setIsLoading(false);

    return () => {};
  }, [location]);

  // lấy vị trí
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    while (true) {
      try {
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000 * 60 * 5,
            distanceInterval: 100,
          },

          (location) => {
            const { latitude, longitude } = location.coords;
            socket.emit("track_location", { shipperID, latitude, longitude });
            dispatch(setLocation({ latitude, longitude }));
          }
        );
        break;
      } catch (err) {}
    }
  }

  // hàm lấy lương
  async function getSalarry() {
    const response = await orderApi.getSalarry(shipperID, selectedMonth);
    if (response) {
      setStatistical(response);
    }
  }

  useEffect(() => {
    getSalarry();
    return () => {};
  }, [selectedMonth, order]);

  useEffect(() => {
    if (socketIo) {
      socketIo.emit("join_room", shipper);
    }

    return () => {};
  }, [socketIo]);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Thống Kê</Text>
        </View>
        <View style={styles.statisticalView}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 17 }}>Thống kê đơn hàng tháng:</Text>
          </View>

          <View
            style={{
              width: 90,
            }}
          >
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              style={{
                height: 50,
                width: "100%",
                color: "",
              }}
              mode="dropdown"
            >
              {months.map((month) => (
                <Picker.Item
                  key={month.value}
                  label={month.label}
                  value={month.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.viewCustomization}>
          <View style={styles.viewItem}>
            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15 }}>
                Đơn hàng nhỏ hơn 5kg: {statistical?.minWeight}
              </Text>
            </View>
          </View>

          <View style={styles.viewItem}>
            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15 }}>
                Đơn hàng lớn từ 5kg đến 10kg: {statistical?.mediumWeight}
              </Text>
            </View>
          </View>

          <View style={styles.viewItem}>
            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15 }}>
                Đơn hàng lớn hơn 10kg: {statistical?.maxWeight}
              </Text>
            </View>
          </View>

          <View style={styles.viewItem}>
            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15 }}>
                Tổng khối lượng đơn hàng đã giao trong tháng:
                {statistical?.sumWeight} kg
              </Text>
            </View>
          </View>
          <View style={styles.viewItem}>
            <View style={styles.viewCustomItem}>
              <Text style={{ fontSize: 15 }}>
                Tiền thưởng theo đơn: {statistical?.salarry} VND
              </Text>
            </View>
          </View>

          {/* biểu đồ  */}
          <View style={styles.pickerView}>
            <Picker
              style={styles.picker}
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              mode="dropdown"
              itemStyle={{ color: "blue" }} // thay đổi màu chữ của các item
            >
              <Picker.Item
                // style={{ borderRadius: 4 }}
                label="Thống kê theo đơn hàng"
                value="Don"
              />
              <Picker.Item
                // style={{ borderRadius: 4 }}
                label="Thống kê theo doanh thu"
                value="Tien"
              />
            </Picker>

            {selectedValue === "Don" ? (
              <>
                {statistical && statistical.message == null ? (
                  <PieChartView statistical={statistical} />
                ) : (
                  <PieChartView
                    statistical={{
                      salarry: 0,
                      maxWeight: 0,
                      minWeight: 0,
                      mediumWeight: 0,
                      numOfFailure: 0,
                    }}
                  />
                )}
              </>
            ) : selectedValue === "Tien" ? (
              <LineChartView />
            ) : null}
          </View>
        </View>
      </View>

      <LoadingModal
        visible={isLoading}
        text={"Đang lấy vị trí ..."}
      ></LoadingModal>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    backgroundColor: "#fbf4ef",
  },
  container: {
    flex: 1,
    backgroundColor: "#fbf4ef",
    alignItems: "center",
  },

  textHeader: {
    fontSize: 25,
    color: "#743f7e",
    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  statisticalView: {
    flexDirection: "row",
    width: "90%",
  },

  pickerView: {
    width: "100%",
    marginTop: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  selectedItem: {
    color: "red",
  },

  viewCustomization: {
    flex: 1,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  viewItem: {
    width: "90%",
    alignItems: "flex-start",
    marginTop: 2,
  },
  viewCustomItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    padding: 10,
    borderBottomColor: "#E4E6EB",
    alignItems: "center",
  },
});
