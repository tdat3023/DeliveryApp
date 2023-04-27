import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  AppState,
} from "react-native";
import React, { useState, useRef } from "react";
import PieChartView from "./PieChart";
import LineChartView from "./LineChart";
import { Picker } from "@react-native-picker/picker";
// import MyDatePicker from "./Calendar";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { socket } from "../socket";
import * as Location from "expo-location";
import { setLocation } from "../redux/reducers/CurentLocation";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.locationCurrent.location);
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);

  const [currrentLocation, setCurrentLocation] = useState({});

  // set curentLoaction
  useEffect(() => {
    let locationSubscription;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 100,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          // setCurrentLocation({ longitude, latitude });
          socket.emit("track_location", { shipperID, latitude, longitude });
          dispatch(setLocation({ latitude, longitude }));
        }
      );
    })();

    console.log(shipperID);
    return () => {
      locationSubscription?.remove();
    };
  }, []);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
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
    // justifyContent: "flex-end",
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

    // alignSelf: "flex-end",
  },
  selectedItem: {
    color: "red",
  },
});
