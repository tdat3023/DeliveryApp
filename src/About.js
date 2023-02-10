import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

export default function About() {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Personal Information
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Name: </Text>
          <Text>John Doe</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Email: </Text>
          <Text>johndoe@example.com</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Phone: </Text>
          <Text>555-555-5555</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Order Statistics
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Total Orders: </Text>
            <Text>20</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Pending Orders: </Text>
            <Text>5</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Completed Orders: </Text>
            <Text>15</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Redeemed Rewards: </Text>
          <Text>10</Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Cài Đặt</Text>
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Text style={{ color: "blue" }}>Chỉnh Sửa Hồ Sơ</Text>
          </TouchableOpacity>
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
});
