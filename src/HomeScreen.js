import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Header from "./component/Header";
export default function HomeScreen() {
  // const [expanded, setExpanded] = useState(false);
  // const [expanded1, setExpanded1] = useState(false);
  // const toggleExpanded = () => {
  //   setExpanded(!expanded);
  // };
  // const toggleExpanded1 = () => {
  //   setExpanded1(!expanded1);
  // };

  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  //       strokeWidth: 2,
  //     },
  //     {
  //       data: [90, 72, 67, 50, 82, 30],
  //       color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
  //       strokeWidth: 2,
  //     },
  //   ],
  // };

  // const chartConfig = {
  //   backgroundGradientFrom: "#fff",
  //   backgroundGradientTo: "#fff",
  //   decimalPlaces: 0,
  //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   style: {
  //     borderRadius: 16,
  //   },
  // };
  const [moreProfile, setMoreProfile] = useState(false);
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
        {/* <View>
          <TouchableOpacity onPress={toggleExpanded}>
            <Text>Click to expand</Text>
          </TouchableOpacity>
          {expanded && (
            <View>
              <Text>Thông tin 1</Text>
              <Text>Thông tin 2</Text>
              <Text>Thông tin 3</Text>
            </View>
          )}
        </View> */}

        {/* <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={350}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Thống kê doanh thu</Text>
          <Text style={styles.subtitle}>Từ tháng 1 đến tháng 6</Text>
        </View> */}

        <View style={styles.viewMore}>
          <View style={styles.viewMore1}>
            <Text style={styles.text1}>Tracking Number</Text>
            <TouchableOpacity
              style={styles.touchMore}
              onPress={() => setMoreProfile(!moreProfile)}
            >
              {!moreProfile ? (
                <MaterialIcons name="expand-less" size={24} color="white" />
              ) : (
                <MaterialIcons name="expand-more" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {moreProfile ? (
            <View style={styles.viewHidden}>
              <View style={styles.underMap}>
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
                      <View
                        style={[styles.item, index >= 1 && styles.activeColor]}
                      >
                        <View
                          style={[
                            styles.circle,
                            index >= 1 && styles.activeColor,
                          ]}
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
                      <View
                        style={[styles.item, index >= 3 && styles.activeColor]}
                      >
                        <View
                          style={[
                            styles.circle,
                            index >= 2 && styles.activeColor,
                          ]}
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
                      <View
                        style={[styles.item, index >= 4 && styles.activeColor]}
                      >
                        <View
                          style={[
                            styles.circle,
                            index >= 3 && styles.activeColor,
                          ]}
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
                          style={[
                            styles.circle,
                            index >= 4 && styles.activeColor,
                          ]}
                        ></View>
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
    backgroundColor: "brown",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F9",
    alignItems: "center",
  },

  viewMore: {
    marginTop: 10,

    width: "100%",
    alignItems: "center",
  },

  viewMore1: {
    backgroundColor: "#743f7e",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#743f7e",
  },
  viewHidden: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
  },
  underMap: {
    flex: 1,
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
