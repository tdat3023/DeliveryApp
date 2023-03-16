import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
export default function About() {
  const info = useSelector((state) => state.shipperInfor);
  const [changePassword, setChangPassword] = useState(false);
  const [moreProfile, setMoreProfile] = useState(false);
  console.log("INFO", info);
  const hiddenInfo = [
    {
      name: "Nguyễn Văn A",
      age: 25,
      address: "Hà Nội",
      phone: "0123456789",
    },
  ];
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Thông tin cá nhân:
        </Text>

        {/* profile setting */}
        <View style={styles.viewMore}>
          <View style={styles.viewMore1}>
            <FontAwesome name="sliders" size={24} color="white" />
            <Text style={styles.text1}>Profile Setting</Text>
            <TouchableOpacity
              style={styles.touchMore}
              onPress={() => setMoreProfile(!moreProfile)}
            >
              {!moreProfile ? (
                <MaterialIcons name="expand-more" size={24} color="white" />
              ) : (
                <MaterialIcons name="expand-less" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {moreProfile ? (
            <View style={styles.viewHidden}>
              {hiddenInfo.map((info, index) => (
                <View
                  key={index}
                  style={{
                    width: "100%",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tên: {info.name}</Text>
                  <Text>Tuổi: {info.age}</Text>
                  <Text>Địa chỉ: {info.address}</Text>
                  <Text>Số điện thoại: {info.phone}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* change password */}
        <View style={styles.viewMore}>
          <View style={styles.viewMore1}>
            <FontAwesome name="sliders" size={24} color="white" />
            <Text style={styles.text1}>Change Password</Text>
            <TouchableOpacity
              style={styles.touchMore}
              onPress={() => setChangPassword(!changePassword)}
            >
              {!changePassword ? (
                <MaterialIcons name="expand-more" size={24} color="white" />
              ) : (
                <MaterialIcons name="expand-less" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {changePassword ? (
            <View style={styles.viewHidden}>
              {hiddenInfo.map((info, index) => (
                <View
                  key={index}
                  style={{
                    width: "100%",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tên: {info.name}</Text>
                  <Text>Tuổi: {info.age}</Text>
                  <Text>Địa chỉ: {info.address}</Text>
                  <Text>Số điện thoại: {info.phone}</Text>
                </View>
              ))}
            </View>
          ) : null}
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
    backgroundColor: "#fbf4ef",
    alignItems: "center",
  },

  card: {
    marginTop: 10,
    alignItems: "stretch",
  },

  viewMore: {
    marginTop: 10,

    width: "100%",
    alignItems: "center",
  },

  viewMore1: {
    backgroundColor: "#743f7e",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#743f7e",
  },
  viewHidden: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
  },

  text1: {
    paddingLeft: 10,
    fontSize: 20,
    color: "white",
  },

  touchMore: { marginLeft: "35%" },
});
