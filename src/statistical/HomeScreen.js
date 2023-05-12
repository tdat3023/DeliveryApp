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
// import MyDatePicker from "./Calendar";
import { Ionicons } from "@expo/vector-icons";
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
  const [selectedMonth, setSelectedMonth] = useState("1");
  const months = [
    { label: "Tháng 1", value: "1" },
    { label: "Tháng 2", value: "2" },
    { label: "Tháng 3", value: "3" },
    { label: "Tháng 4", value: "4" },
    { label: "Tháng 5", value: "5" },
    { label: "Tháng 6", value: "6" },
    { label: "Tháng 7", value: "7" },
    { label: "Tháng 8", value: "8" },
    { label: "Tháng 9", value: "9" },
    { label: "Tháng 10", value: "10" },
    { label: "Tháng 11", value: "11" },
    { label: "Tháng 12", value: "12" },
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
    const response = await orderApi.getSalarry(shipperID, "5");
    if (response) {
      setStatistical(response);
    }
  }
  useEffect(() => {
    getSalarry();
    return () => {};
  }, []);

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

        <View style={styles.viewCustomization}>
          <View style={styles}>
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue) => setSelectedMonth(itemValue)}
              style={{ height: 50, width: 150 }}
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
              <Text style={{ fontSize: 15 }}>Tiền thưởng theo đơn: </Text>
            </View>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fbf4ef",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F9",
    alignItems: "center",
  },

  textHeader: {
    fontSize: 25,
    color: "#743f7e",
    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  pickerView: {
    width: "100%",
    marginTop: 10,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    height: 50,
    width: "95%",
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
