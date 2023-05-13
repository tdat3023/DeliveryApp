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
import { useDispatch, useSelector } from "react-redux";
import orderApi from "../api/orderApi";
import LoadingModal from "../component/LoadingModal";
import { useGlobalContext } from "../redux/GlobalContext";

export default function Order({ navigation }) {
  const { socketIo } = useGlobalContext();
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
      const response = await orderApi.getOrderOfShipper(shipper._id);
      if (response && response.orders) {
        setOrdersOfShipper(response.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderApi.getOrder(shipper.storage, "chuanhan");
      if (response) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setOrders(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Api gọi các order theo kho và status
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

  useEffect(() => {
    getOrders();
    getOrderOfShipper();

    return () => {};
  }, [reload, selectedTab]);

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

  useEffect(() => {
    if (socketIo) {
      socketIo.on("update_order_list", () => {
        setReload(!reload);
      });
    }

    return () => {};
  }, [socketIo]);

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>Đơn Hàng Trong Ngày</Text>
        </View>

        {/* Phân loại */}
        <View style={styles.orderStatus}>
          <TouchableOpacity
            style={selectedTab === "chuanhan" ? styles.selected : styles.tab}
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
            style={selectedTab === "danhan" ? styles.selected : styles.tab}
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
            style={selectedTab === "tamgiu" ? styles.selected : styles.tab}
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
          keyExtractor={(item, index) => index}
        />
      </View>
      <LoadingModal visible={isLoading} />
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
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 18,
    // },
    // shadowOpacity:  0.25,
    // shadowRadius: 20.00,
    // elevation: 24
  },
  textStatus: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },

  selected: {
    backgroundColor: "#743f7e",
    paddingVertical: 5,
    width: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
