import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useState } from "react";
import Header from "./component/Header";
export default function HomeScreen() {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%", backgroundColor: "yellow" }}>
          <Header title="Home"></Header>
          <Text style={styles.textHeader}>Find the packages</Text>
          <Text style={styles.text}>
            Enter your tracking number and see details about your packages.
          </Text>
        </View>

        <View style={{ width: "100%", backgroundColor: "red" }}>
          <Text>body</Text>
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

  textHeader: {
    fontSize: 25,
    color: "#743f7e",
    fontFamily: "Arial",
    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  text: {
    fontSize: 15,
    color: "#743f7e",
    fontFamily: "Arial",
    marginHorizontal: "5%",
  },
});
