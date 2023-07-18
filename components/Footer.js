import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserContext from "../UserContext";

export default function Footer() {
  const size = useContext(UserContext);
  const loged = size.isLoged;
  console.log(size.isLoged);
  const navigate = useNavigate();

  return (
    <View style={styles.footer}>
      {loged ? (
        <View style={styles.container}>
          <Link to="/home">
            <Ionicons name="home-outline" size={30} color="#C3A486" />
          </Link>
          <Link to="/mapView">
            <Ionicons name="map-outline" size={30} color="#686831" />
          </Link>
          <Link to="/QrCode" state={{ typeLog: "box" }}>
            <Ionicons name="scan-outline" size={30} color="black" />
          </Link>
          <Link to="/profil">
            <Ionicons name="person-outline" size={30} color="green" />
          </Link>
        </View>
      ) : (
        <View style={styles.container2}>
          <Link to="/home">
            <Ionicons name="home-outline" size={30} color="black" />
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  container2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container2Z: {
    backgroundColor: "transparent",
  },
});
