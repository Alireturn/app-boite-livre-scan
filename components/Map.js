import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView from "react-native-maps/lib/MapView";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Footer from "./Footer";
import requets from "../Requet";
import { Button } from "react-native";

export default function Map({ geoLoc, infoBox }) {
  const [data, setData] = useState([]);
  const coordonne = geoLoc["1"].split(",");

  const [mapRegion, setMapRegion] = useState({
    latitude: 45.1810309,
    longitude: 5.7497118,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const fetchBox = async () => {
      try {
        const reponse = await fetch(requets.fetchBox, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const infoBook = await reponse.json();
        setData(infoBook);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBox();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const marker2 = {
    coordinate: {
      latitude: parseFloat(coordonne[0]),
      longitude: parseFloat(coordonne[1]),
    },
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker
            coordinate={marker2.coordinate}
            title={infoBox.street}
            description={infoBox.city}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "95%",
    height: "95%",
    borderRadius: 20,
  },
});
