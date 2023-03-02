import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function HomeScreen() {
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

        {/* <View>
          <PieChart style={{ height: 200 }} data={data} />
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
    backgroundColor: "#F8F8F9",
    alignItems: "center",
  },
});
