import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === "ios" ? 80 : 60,
    backgroundColor: "#f4511e",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  wrap: {
    height: 200,
    width: 200,
    borderWidth: 1,
    padding: 20,
  },
  div: {
    alignItems: "center",
  },
  item: {
    height: 30,
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
    width: 32,
    height: 32,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
});

export default Header;
