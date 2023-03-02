import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MapViewComponent from "./MapScreen";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.map}>
          <MapViewComponent />
        </View>

        {/* <View style={styles.underMap}>
          <View style={styles.trackingNumber}>
            <Text>Tracking Number</Text>
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
                <View style={[styles.item, index >= 1 && styles.activeColor]}>
                  <View
                    style={[styles.circle, index >= 1 && styles.activeColor]}
                  ></View>
                </View>

                <View style={styles.statusText}>
                  <Text style={[index >= 1 && styles.textColor]}>
                    Nhận hàng
                  </Text>
                  <Text style={styles.timeText}>Thời gian</Text>
                </View>
              </View>

              <View style={styles.status}>
                <View style={[styles.item, index >= 3 && styles.activeColor]}>
                  <View
                    style={[styles.circle, index >= 2 && styles.activeColor]}
                  ></View>
                </View>

                <View style={styles.statusText}>
                  <Text style={[index >= 2 && styles.textColor]}>
                    Đang giao
                  </Text>
                  <Text style={styles.timeText}>Thời gian</Text>
                </View>
              </View>

              <View style={styles.status}>
                <View style={[styles.item, index >= 4 && styles.activeColor]}>
                  <View
                    style={[styles.circle, index >= 3 && styles.activeColor]}
                  ></View>
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
                    style={[styles.circle, index >= 4 && styles.activeColor]}
                  ></View>
                </View>

                <View style={styles.statusText}>
                  <Text style={[index >= 4 && styles.textColor]}>Trả hàng</Text>
                  <Text style={styles.timeText}>Thời gian</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (index < 4) setIndex(index + 1);
              }}
            >
              <Text>{getStatus(index)}</Text>
            </TouchableOpacity>
          </View>
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
  },

  map: {
    backgroundColor: "yellow",
    flex: 1,
  },
  // underMap: {
  //   flex: 1,
  //   alignItems: "center",
  // },

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
    backgroundColor: "yellow",
  },
  btn: {
    backgroundColor: "green",
    width: "80%",
    height: 40,
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
    color: "yellow",
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
});
