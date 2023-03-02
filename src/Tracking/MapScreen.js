import React, { Component, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
// import Geolocation from "react-native-geolocation-service";

const MapViewComponent = () => {
  const [region, setRegion] = useState({
    latitude: 37.78855,
    longitude: -122.4524,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (newRegion) => {
    console.log(newRegion);
  };

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      onRegionChange={onRegionChange}
      onRegionChangeComplete={onRegionChange}
    >
      <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        title="Current Location"
        description="This is your current location"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewComponent;
