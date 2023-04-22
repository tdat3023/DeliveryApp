import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../component/Sreach";
import OrderItem from "../component/OrderItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Order({ navigation }) {
  const shipper = useSelector((state) => state.shipperInfor.shipper);
  const location = useSelector((state) => state.locationCurrent.location);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersOfShipper, setOrdersOfShipper] = useState([]);
  const [reload, setReload] = useState(false);
  const [term, setTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("chuanhan");

  // api gọi các order của shipper
  const getOrderOfShipper = async () => {
    try {
      const response = await axios.get(
        `http://${process.env.SERVER_HOST}:${process.env.PORT}/holeOrder/getHeldOrdersByShipperId/${shipper._id}`
        // `http://192.168.1.63:${process.env.PORT}/holeOrder/getHeldOrdersByShipperId/${shipper._id}`
      );
      if (response.data) {
        setOrdersOfShipper(response.data.orders);
      }
      // console.log("order of shipper:", response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://${process.env.SERVER_HOST}:${process.env.PORT}/order/getListOrderByStorage/GoVap?status=chuanhan`
        // `http://192.168.1.63:${process.env.PORT}/order/getListOrderByStorage/quan 3?status=chuanhan`
      );
      if (response.data) {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);

        setOrders(response.data);
      }
      // console.log("order of storage:", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Api gọi các order theo kho và status
  useEffect(() => {
    getOrders();
    getOrderOfShipper();
  }, [reload, selectedTab]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      getOrders();
      getOrderOfShipper();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleTermSubmit = (term) => {
    setTerm(term);
    alert(term);
  };

  // // đã nhận
  function getDNOrders() {
    return ordersOfShipper.filter(
      (ordersOfShipper) => ordersOfShipper.status === "danhan"
    );
  }
  const dnOrders = getDNOrders();

  // tạm giữ
  function getTGOrders() {
    return ordersOfShipper.filter(
      (ordersOfShipper) => ordersOfShipper.status === "tamgiu"
    );
  }
  const tGOrders = getTGOrders();

  let dataToRender;
  if (selectedTab === "chuanhan") {
    dataToRender = orders;
  } else if (selectedTab === "tamgiu") {
    dataToRender = tGOrders;
  } else {
    dataToRender = dnOrders;
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Đơn Hàng Trong Ngày</Text>
        </View>

        {/* Phân loại */}
        <View style={styles.orderStatus}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setSelectedTab("chuanhan");
            }}
          >
            <Text
              style={
                selectedTab === "chuanhan" ? styles.selectedText : styles.text
              }
            >
              Chưa Nhận
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("danhan")}
          >
            <Text
              style={
                selectedTab === "danhan" ? styles.selectedText : styles.text
              }
            >
              Đã Nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setSelectedTab("tamgiu")}
          >
            <Text
              style={
                selectedTab === "tamgiu" ? styles.selectedText : styles.text
              }
            >
              Tạm Giữ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tìm kiếm */}
        <View style={{ width: "100%" }}>
          <SearchBar onTermSubmit={handleTermSubmit} />
        </View>

        {/* Danh sách */}

        {isLoading ? (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : null}
        <FlatList
          style={styles.list}
          data={dataToRender}
          renderItem={({ item }) => (
            <OrderItem
              item={item}
              navigation={navigation}
              reload={reload}
              setReload={setReload}
            />
          )}
          keyExtractor={(item) => item._id}
        />
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
    backgroundColor: "#fbf4ef",
    alignItems: "center",
  },

  textHeader: {
    fontSize: 25,
    color: "#743f7e",

    fontWeight: "bold",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
  text: {
    fontSize: 15,
    color: "#743f7e",
    marginHorizontal: "5%",
  },

  orderStatus: {
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fbf4ef",
    borderBottomColor: "#ddd",
  },

  tab: {
    height: 40,
    padding: 5,
    width: 110,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  textStatus: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },

  list: {
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
