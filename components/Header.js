import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Header() {
  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.nav}>
        <Ionicons name="book" size={30} color="black" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nav: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 2,
  },
  area: {},
  book: {
    height: 50,
    width: 50,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
