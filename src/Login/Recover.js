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
import { Entypo } from "@expo/vector-icons";

export default function Recover({ navigation }) {
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        {/* top */}
        <View style={styles.topView}>
          <Text style={{ fontSize: 30, marginBottom: 10, fontWeight: "bold" }}>
            Lấy lại mật khẩu
          </Text>
          <Text style={{ fontSize: 16, width: "90%" }}>
            Nhập số điện thoại để lấy mã OTP gửi về.
          </Text>
        </View>

        {/* down */}

        <View style={styles.downView}>
          {/* input login*/}
          <View style={styles.input}>
            {/* email */}

            <View style={styles.viewInput}>
              <TextInput
                style={{ paddingLeft: 10 }}
                placeholder="Số điện thoại"
              ></TextInput>
            </View>

            {/* btn login */}
            <View>
              <TouchableOpacity style={styles.btn}>
                <Text style={{ color: "white" }}>Lấy mã </Text>
              </TouchableOpacity>
            </View>

            {/* Sign in */}
            <View style={styles.recoverPassword}>
              <Text>Do you have account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={{ color: "#743f7e", marginLeft: 10 }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* more */}
          <View style={styles.downMore}>
            <Text style={{ marginBottom: 10 }}>You can login with help</Text>
            <View style={styles.downMoreHelp}>
              <TouchableOpacity>
                <Entypo name="google--with-circle" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Entypo name="facebook-with-circle" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={{ color: "#743f7e" }}>Register?</Text>
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
  },
  topView: {
    height: 250,
    display: "flex",
    paddingLeft: 40,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  downView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "80%",
    justifyContent: "center",
  },
  viewInput: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "gray",
    justifyContent: "center",
    borderRadius: 5,
  },

  btn: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "#743f7e",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
  },
  recoverPassword: {
    flexDirection: "row",
  },

  downMore: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  downMoreHelp: {
    flexDirection: "row",
    width: 70,
    justifyContent: "space-around",
    marginBottom: 10,
  },
});
