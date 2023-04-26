import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import PieChartView from "./PieChart";
import LineChartView from "./LineChart";
import { Picker } from "@react-native-picker/picker";
// import MyDatePicker from "./Calendar";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { socket } from "../socket";
import * as Location from "expo-location";
import { setLocation } from "../redux/reducers/CurentLocation";
import LoadingModal from "../component/LoadingModal";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.locationCurrent.location);
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);

  // lấy location
  useEffect(() => {
    let id = setTimeout(() => {
      getLocation();
    }, 1000);
    return () => {
      clearTimeout(id);
    };
  }, [location]);

  useEffect(() => {
    if (!location) {
      setIsLoading(true);
    } else setIsLoading(false);

    return () => {};
  }, [location]);

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
          // socket Tracking Location
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
  const [selectedValue, setSelectedValue] = useState("Don");

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Thống Kê</Text>
        </View>

        {/* biểu đồ  */}
        <View style={styles.pickerView}>
          <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            mode="dropdown"
            itemStyle={{ color: "blue" }} // thay đổi màu chữ của các item
          >
            <Picker.Item label="Thống kê theo đơn hàng" value="Don" />
            <Picker.Item label="Thống kê theo doanh thu" value="Tien" />
          </Picker>

          {selectedValue === "Don" ? (
            <PieChartView />
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
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    height: 50,
    width: 300,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  selectedItem: {
    color: "red",
  },
});
