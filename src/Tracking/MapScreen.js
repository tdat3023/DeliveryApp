import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { GOOGLE_MAP_KEY } from "../constants/googleMapKey";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

const MapViewComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // const [state, setState] = useState({
  //   pickupCords: {
  //     latitude: 10.822207117860238,
  //     longitude: 106.68685789875855,
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   },
  //   droplocationCords: {
  //     latitude: 10.781678723421116,
  //     longitude: 106.75992266639746,
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   },
  // });

  // const [pickupCords, droplocationCords] = state;

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => setLocation(location),
        (error) => setErrorMsg(error)
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {/* <MapView style={styles.map} region={pickupCords}>
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAP_API_KEY}
        />

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: "red",
  },
});
export default MapViewComponent;
