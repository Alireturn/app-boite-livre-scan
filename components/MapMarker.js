import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps/lib/MapView";
import { Marker } from "react-native-maps";
import Footer from "./Footer";
import Header from "./Header";
import * as Location from "expo-location";
import requets from "../Requet";
export default function MapMarker() {
  const [data, setData] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 45.1810309,
    longitude: 5.7497118,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    fetch(requets.getBox)
      .then((response) => response.json())
      .then((jsondata) => setData(jsondata));
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

  const markers = data.map((item) => {
    const coords = item.geo_loc["1"].split(",");
    return {
      coordinate: {
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1]),
      },
      title: item.street,
      description: `${item.zipcode} ${item.city}`,
      id: item.id,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <MapView style={styles.map} initialRegion={mapRegion}>
        {markers.map((marker, key) => (
          <Marker
            key={key}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
