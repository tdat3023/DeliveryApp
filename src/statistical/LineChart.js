import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";

function LineChartView() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
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
        height={220}
        chartConfig={chartConfig}
      />

      <Text style={{ marginTop: 5 }}>Từ tháng 1 đến tháng 6</Text>
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
