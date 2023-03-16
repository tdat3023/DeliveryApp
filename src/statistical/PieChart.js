import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";

function PieChartView() {
  const data = [
    {
      name: "Chưa giao",
      population: 21,
      color: "#FFC107",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Đã giao",
      population: 28,
      color: "#2196F3",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Đã hủy",
      population: 52,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={data}
        width={Dimensions.get("window").width - 20}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: "96%",
    marginVertical: 5,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
export default PieChartView;
