import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import InfoProfil from "../components/InfoProfil";
import UserContext from "../UserContext";

export default function Profil() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Main pageName="Page2" />
      <Footer type="login" />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "green",
    margin: 10,
    flexDirection: "column",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "red",
    padding: 10,
  },
  text: {
    fontSize: 30,
  },
});
