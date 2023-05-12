import { View, Text, StyleSheet, Dimensions, useEffect } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import orderApi from "../api/orderApi";

function LineChartView() {
  const shipperID = useSelector((state) => state.shipperInfor.shipper._id);
  const getSalarry = async () => {
    const response = await orderApi.getSalarry(shipperID, "5");
    if (response) {
      console.log(response.salarry);
    }
  };
  // getSalarry();
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     // The screen is focused
  //     // Call any action

  //     getSalarry();
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Đặt màu cho đường biểu đồ
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#F8F8F9",
    backgroundGradientFrom: "#F8F8F9",
    backgroundGradientTo: "#F8F8F9",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={280}
        chartConfig={chartConfig}
      />
      <Text style={{ marginTop: 5 }}>Từ tháng 1 đến tháng 6</Text>

      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
    marginTop: 5,
  },
});
export default LineChartView;
