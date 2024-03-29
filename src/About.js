import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutShipper } from "./redux/reducers/inforShipper";
import orderApi from "./api/orderApi";
import Login from "./Login/Login";
// import VerifyOTPModal from "./component/VerifyOTPModal";
export default function About({ navigation }) {
  const [changePassword, setChangPassword] = useState(false);
  const [moreProfile, setMoreProfile] = useState(false);

  const shipper = useSelector((state) => state.shipperInfor.shipper);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutShipper());
    // Chuyển hướng đến trang đăng nhập
    navigation.replace("Login");
    console.log("Đăng xuất thành công");
  };

  const handleClik = async () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn trả hết đơn hàng không?", [
      {
        text: "OK",
        onPress: async () => {
          const response = await orderApi.updateAll(shipper._id, "chuanhan");
          if (response) {
            // socket.emit("tra_het_don_hang", { shipperID: shipper._id });
            Alert.alert("Thông báo", "Trả đơn hàng thành công", [
              { text: "OK" },
            ]);
          } else {
            Alert.alert("Thông báo", "Trả đơn hàng thất bại", [{ text: "OK" }]);
          }
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };

  // useEffect(() => {
  //   if (socketIo) {
  //     socketIo.on("update_order_list", () => {
  //       setReload(!reload);
  //     });
  //   }

  //   return () => {};
  // }, [socketIo]);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.viewCustomization}>
          <View style={styles.viewItem}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 40 }}
              source={{
                uri: shipper.avatarURL,
              }}
            />
            <View style={styles.viewCustomItem}>
              <View style={{ flexDirection: "column", padding: 10 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  {shipper.fullName}
                </Text>
                <Text style={{ fontSize: 17, color: "gray" }}>
                  ...{shipper._id.slice(-15)}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
            <View style={styles.viewItem}>
              <Ionicons name="sync" size={23} color={"orange"} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Đổi mật khẩu</Text>
                <Ionicons
                  // style={{}}
                  color={"#694fad"}
                  name="chevron-forward-outline"
                  size={20}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* profile setting */}
        <View style={styles.viewMore}>
          <View style={styles.viewMore1}>
            <FontAwesome name="sliders" size={24} color="white" />
            <Text style={styles.text1}>Thông tin chi tiết</Text>
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
              <View
                style={{
                  width: "100%",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Tên: {shipper.fullName}
                </Text>
                <Text>Tuổi: 20</Text>
                <Text>Địa chỉ: {shipper.address}</Text>
                <Text>Số điện thoại: {shipper.phoneNumber}</Text>
                <Text>Biển số xe: {shipper.license}</Text>
                <Text>Kho: {shipper.storage}</Text>
              </View>
            </View>
          ) : null}
        </View>
        {/*  */}
        <View
          style={{
            display: "flex",
            width: "85%",
            justifyContent: "flex-start",
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              color: "gray",
            }}
          >
            Private
          </Text>
        </View>

        <View style={styles.viewCustomization}>
          <TouchableOpacity onPress={handleClik}>
            <View style={styles.viewItem}>
              <FontAwesome name="remove" size={24} color="black" />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Trả đơn hàng</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={handleClik}
          >
            <View style={styles.viewItem}>
              <Ionicons name="remove-circle" size={23} color={"#8F4607"} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Xóa Tài Khoản</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.viewItem}>
              <Ionicons name="log-out" size={23} color={"#694fad"} />
              <View style={styles.viewCustomItem}>
                <Text style={{ fontSize: 15 }}>Đăng Xuất</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", height: 20 }}></View>
      </View>
      {/* <VerifyOTPModal
        visible={verifyModal}
        setVisible={setVerifyModal}
        phone={sdtOrEmail}
        setResult={setResult}
      /> */}
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
    backgroundColor: "#fbf4ef",
    alignItems: "center",
  },

  card: {
    marginTop: 10,
    alignItems: "stretch",
  },

  viewMore: {
    marginTop: 15,

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

  touchMore: { marginLeft: "22%" },

  viewAvatar: {
    height: 110,
    width: 110,
    borderRadius: 60,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "white",
  },
  ViewTop: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  viewListOpstion: {
    display: "flex",
    // padding: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  viewIcon: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#E4E6EB",
    alignItems: "center",
    alignContent: "center",
  },
  viewListIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  viewCustomization: {
    // height: 200,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  viewItem: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 2,
  },
  viewCustomItem: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    borderBottomWidth: 0.5,
    padding: 10,
    borderBottomColor: "#E4E6EB",
    alignItems: "center",
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 100,
    width: "100%",
    backgroundColor: "#694fad",
    marginBottom: 10,
  },
});
