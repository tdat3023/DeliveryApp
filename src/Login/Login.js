import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { isValidUsername, isValidPassword } from "../utilies/Validations";
import { useDispatch } from "react-redux";
import { setShipper } from "../redux/reducers/inforShipper";
import orderApi from "../api/orderApi";
import { useGlobalContext } from "../redux/GlobalContext";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const { handleIo, socketIo } = useGlobalContext();
  const [getPassWordVisible, setPassWordVisible] = useState(false);
  const [username, setUsername] = useState("0123456789");
  const [password, setPassword] = useState("123456789");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);
  const isValidationOK = () => {
    username.length > 0 &&
      password.length > 0 &&
      isValidUsername(username) == true &&
      isValidPassword(password) == true;
  };

  const handleLogin = async (phoneNumber, password) => {
    setIsLoading(true);
    try {
      const res = await orderApi.login(phoneNumber, password);
      // console.log(shipper);
      const shipper = res.shipper;
      if (!shipper) {
        Alert.alert("Thông báo", "Mật khẩu hoặc tài khoản không chính xác", [
          { text: "OK" },
        ]);
      } else {
        setIsLoading(false);
        dispatch(setShipper(shipper));
        navigation.replace("HomeTabs");
      }
    } catch (error) {
      Alert.alert("Thông báo", "Lỗi sever", [{ text: "OK" }]);
      console.log(error);
    }
  };

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
        {/* top */}
        <View style={styles.topView}>
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn.ntlogistics.vn/images/NTX/new_images/danh-gia-shipper-giao-hang-nhanh-qua-viec-dam-bao-an-toan-hang-hoa.jpg",
            }}
          ></Image>
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
                value={username}
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
    backgroundColor: "#fbf4ef",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
    // backgroundColor: "red",
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
