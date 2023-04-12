import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { Entypo, Ionicons, Feather } from "@expo/vector-icons";
import { isValidUsername, isValidPassword } from "../utilies/Validations";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import * as Permissions from "expo-permissions";

import { setLocation } from "../redux/reducers/CurentLocation";
import { setShipper } from "../redux/reducers/inforShipper";

import { socket } from "../socket";
import { AsyncStorage } from "react-native";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [getPassWordVisible, setPassWordVisible] = useState(false);
  const [username, setUsername] = useState("0123456789");
  const [password, setPassword] = useState("123456789");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const isValidationOK = () => {
    username.length > 0 &&
      password.length > 0 &&
      isValidUsername(username) == true &&
      isValidPassword(password) == true;
  };

  const handleLogin = async (phoneNumber, password) => {
    try {
      const { data: response } = await axios.post(
        `http://${process.env.SERVER_HOST}:${process.env.PORT}/shipper/login`,
        { phoneNumber, password }
      );

      const shipper = response.shipper;
      dispatch(setShipper(shipper));
      navigation.replace("HomeTabs");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleConnect = () => {
    console.log("A new connect has just been established!");
  };

  const shipperId = useSelector((state) => state.shipperInfor.shipper);
  const location = useSelector((state) => state.locationCurrent.location);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        {/* top */}
        <View style={styles.topView}>
          <Image resizeMode="center" style={styles.image}></Image>
        </View>

        {/* down */}
        <View style={styles.downView}>
          {/* input login*/}
          <View style={styles.input}>
            {/* email */}
            <Text
              style={{
                fontSize: 30,
                marginBottom: 10,
                font: "urbanist",
                color: "#ff8800",
              }}
            >
              Đăng Nhập
            </Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{ paddingLeft: 10 }}
                onChangeText={(text) => {
                  setErrorUsername(
                    isValidUsername(text) == true
                      ? "ok"
                      : "Số điện thoại không chính xác "
                  );
                  setUsername(text);
                }}
                placeholder="Số điện thoại"
              ></TextInput>
            </View>

            {/* password */}
            <View style={styles.viewInputPass}>
              <TextInput
                style={{ paddingLeft: 10, flex: 1 }}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                placeholder="Nhập mật khẩu"
                secureTextEntry={getPassWordVisible ? false : true}
              ></TextInput>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "5%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setPassWordVisible(!getPassWordVisible);
                  }}
                >
                  {getPassWordVisible ? (
                    <Ionicons
                      style={styles.imageEye}
                      name="eye"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <Ionicons
                      style={styles.imageEye}
                      name="eye-off"
                      size={24}
                      color="black"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* btn login */}
            <View>
              <TouchableOpacity
                style={styles.btn}
                disabled={isValidationOK() == false}
                onPress={() => {
                  handleLogin(username, password);
                }}
              >
                <Text style={{ color: "white" }}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "flex-end", marginRight: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Recover");
                }}
              >
                <Text>Quên mật khẩu</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#fbf4ef",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F9",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: "red",
  },
  downView: {
    flex: 2,
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

  viewInputPass: {
    flexDirection: "row",
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
});
