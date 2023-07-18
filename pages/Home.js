import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import Api from "../components/Api";
import { json, Navigate, useNavigate, useRoutes } from "react-router-native";
import Qrcode from "../components/Qrcode";
import Map from "../components/Map";
import UserContext from "../UserContext";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { InfoUserProvider } from "../InfoUserContext";

export default function Home() {
  const uuid = "1234";
  const [good, setGood] = useState(false);
  const navigate = useNavigate();
  return (
    <View style={styles.home}>
      <Header />
      <Main pageName="Page1" />
      {good ? <Api uuid={uuid} type="login" /> : null}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});
