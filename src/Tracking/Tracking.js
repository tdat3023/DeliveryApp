import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import MapViewComponent from "./MapScreen";

export default function Tracking() {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%", flex: 1 }}>
          <MapViewComponent />
        </View>
        <Text>Waiting for location...</Text>
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
  map: {
    backgroundColor: "black",
    flex: 1,
  },
});
