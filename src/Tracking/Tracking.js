import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function Tracking() {
  const [index, setIndex] = useState(1);
  function getStatus(index) {
    if (index === 1) {
      return "Bắt đầu";
    } else if (index === 2) {
      return "Hoàn thành";
    } else if (index === 3) {
      return "Khách trả hàng";
    } else if (index === 4) {
      return "Tiếp tục với đơn hàng khác";
    }
  }
  const [moreProfile, setMoreProfile] = useState(false);

  // lấy vị trí hiện tại
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10,
          distanceInterval: 10,
        },
        (location) => setLocation(location)
      );
    })();
  }, []);

  // điểm bắt đầu
  const [pickupCords, setPickupCords] = useState({
    latitude: 10.822024,
    // location.latitude,
    longitude: 106.687569,
    //  location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // diểm giao hàng
  const [droplocationCords, setDropLocation] = useState({
    latitude: 10.631142,
    // location.latitude,
    longitude: 107.052875,
    //  location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const batDau = () => {
    const { latitudeDelta, longitudeDelta } = pickupCords;
    setPickupCords({
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.map}>
          {location && (
            <MapView
              style={styles.map}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: pickupCords.latitude,
                  // location.coords.latitude,
                  longitude: pickupCords.longitude,
                  // location.coords.longitude,
                }}
                title="Xuất Phát"
              ></Marker>

              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                <Ionicons name="play" size={30} color="red" />
              </Marker>

              <MapViewDirections
                origin={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                destination={droplocationCords}
                strokeWidth={4}
                strokeColor="red"
                optimizeWaypoints={true}
                apikey="AIzaSyCz05MCIlmnpbQgr32Am783YW4muKdaiKQ"
              />

              <MapViewDirections
                origin={pickupCords}
                destination={droplocationCords}
                strokeWidth={7}
                strokeColor="#5061ff"
                optimizeWaypoints={true}
                apikey="AIzaSyCz05MCIlmnpbQgr32Am783YW4muKdaiKQ"
              />

              <Marker coordinate={droplocationCords} title="Nơi Giao" />
            </MapView>
          )}
          {/* {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>} */}
        </View>

        {/* nút */}
        <View style={styles.viewMore}>
          <View style={styles.viewMore1}>
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
                    <Text>#123456789</Text>
                    <Feather name="copy" size={24} color="black" />
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
                          Hoàn thành
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
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      {
                        if (index < 4) setIndex(index + 1);
                        batDau();
                      }
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 15 }}>
                      {getStatus(index)}
                    </Text>
                  </TouchableOpacity>
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

  div: {},

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

  chartContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
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
    justifyContent: "space-around",
  },

  viewMore: {
    backgroundColor: "#fbf4ef",

    alignItems: "center",
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
