import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../component/Sreach";
import OrderItem from "../component/OrderItem";
import axios from "axios";
import { setData } from "../redux/reducers/orderData";
import { setOrderOfShipper } from "../redux/reducers/orderOfShipper";
import { useDispatch, useSelector } from "react-redux";

export default function Order({ navigation }) {
  const shipper = useSelector((state) => state.shipperInfor.shipper);
  // console.log(shipper.storage);
  const dispatch = useDispatch();

  // Api gọi các order theo kho và status
  useEffect(() => {
    dispatch(async (dispatch) => {
      try {
        const response = await axios.get(
          // `http://192.168.88.111:4940/order/getListOrderByStorage/${shipper.storage}?status=chuanhan`
          "http://192.168.88.111:4940/order/getListOrderByStorage/quan 3?status=chuanhan"
        );
        dispatch(setData(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, [dispatch]);

  // // api gọi các order của shipper
  // axios
  //   .get(
  //     `http://192.168.88.111:4940/holeOrder/getHeldOrdersByShipperId/${shipper._id}`
  //   )
  //   .then((response) => {
  //     // console.log(response.data.orders);
  //     dispatch(setOrderOfShipper(response.data.orders));
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // // const changeStatus = useSelector((state) => state.updateStatus);
  // // const orderOfShipper = useSelector((state) => state.orderOfShipper);
  // // console.log(orderOfShipper);
  const orders = useSelector((state) => state.orderInfor.data);

  const [term, setTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("chuanhan");
  const handleTermSubmit = (term) => {
    setTerm(term);
    alert(term);
  };

  // // chua nhan
  // function getCNOrders() {
  //   return orders.filter((orders) => orders.status === "chuanhan");
  // }
  // const cnOrders = getCNOrders();

  // // đã nhận
  // function getDNOrders() {
  //   return orders.filter((orders) => orders.status === "danhan");
  // }
  // const dnOrders = getDNOrders();

  // // tạm giữ
  // function getTGOrders() {
  //   return orders.filter((orders) => orders.status === "tamgiu");
  // }
  // const tGOrders = getTGOrders();

  // let dataToRender;
  // if (selectedTab === "chuanhan") {
  //   dataToRender = cnOrders;
  // } else if (selectedTab === "tamgiu") {
  //   dataToRender = tGOrders;
  // } else {
  //   dataToRender = dnOrders;
  // }

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
            onPress={() => setSelectedTab("chuanhan")}
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

        <FlatList
          style={styles.list}
          data={orders}
          renderItem={({ item }) => (
            <OrderItem item={item} navigation={navigation} />
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
});
