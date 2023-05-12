import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeOneOrder } from "../redux/reducers/oneOrder";

const CongratulationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Chúc mừng bạn đã hoàn thành!</Text>
      <Button
        title="Quay lại"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default CongratulationScreen;
