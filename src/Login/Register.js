import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Register({ navigation }) {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        {/* btn back */}
        <View style={styles.header}>
          <View
            style={{
              width: 40,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.headerBack}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              font: "urbanist",
            }}
          >
            Sign Up
          </Text>
        </View>

        {/* input info */}
        <View style={styles.body}>
          {/* Name */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Name"
            ></TextInput>
          </View>

          {/* Country */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Country"
            ></TextInput>
          </View>

          {/* Country */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Country"
            ></TextInput>
          </View>

          {/* Country */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Country"
            ></TextInput>
          </View>

          {/* Email */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Email"
            ></TextInput>
          </View>

          {/* Password */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Password"
            ></TextInput>
          </View>

          {/* Password */}
          <View style={styles.viewInput}>
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Password"
            ></TextInput>
          </View>

          {/* btn login */}
          <View style={styles.btnView}>
            <TouchableOpacity style={styles.btn}>
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F9",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    marginBottom: 20,
  },

  body: {
    width: "90%",
    justifyContent: "center",
  },

  viewInput: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    borderRadius: 5,
  },

  btnView: {
    justifyContent: "center",
  },

  btn: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "#FFD658",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
