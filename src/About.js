import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";

export default function About() {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <Text>About</Text>
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
