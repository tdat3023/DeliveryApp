import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function Tracking() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("Location", location);
    })();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }
  if (location) {
    return (
      <Text>
        Latitude: {location.coords.latitude}
        Longitude: {location.coords.longitude}
      </Text>
    );
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <Text>Waiting for location...</Text>
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
    backgroundColor: "#F8F8F9",
    alignItems: "center",
  },
});
