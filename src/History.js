import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";

export default function History() {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <Text>History</Text>
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
