import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Modal, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import orderApi from "../api/orderApi";

const Qrcode = ({ visible, setOpenQr, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    if (data) {
      const response = await orderApi.getOneById(data);

      if (response.message) {
        Alert.alert("Thông báo", "Không tìm thấy đơn hàng");
      } else {
        setOpenQr(false);
        navigation.navigate("OrderDetail", {
          data: response,
        });
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleClose = () => {
    setOpenQr(false);
  };

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
      <Button title={"Close"} onPress={handleClose} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Qrcode;
