import { Animated, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-native";
import { useContext } from "react";
import UserContext from "../UserContext";
import requets from "../Requet";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import Api from "../components/Api";

export default function BookInfo() {
  const { state } = useLocation();
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();
  const size = useContext(UserContext);
  const infoData = size.dataUser;

  const handle = () => {
    navigate(-1);
  };
  const handleBorrow = () => {
    setOk(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, padding: 10 }}>
        <Button title="retour" onPress={handle} />
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontSize: 23,
          }}
        >
          Recapitulatif de votre emprun
        </Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "40%",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              alignItems: "center",
            }}
          >
            <View>
              <Text>{infoData.name}</Text>
              <Text>{infoData.mail}</Text>
            </View>
            <Image
              source={{ uri: requets.getAvatar + infoData.avatar }}
              style={{
                height: "40%",
                width: "40%",
                borderRadius: "50%",
                borderWidth: 2,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <Text>{state.author}</Text>
              <Text>{state.title}</Text>
              <Text>{state.isbn}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: requets.getImage + state.cover }}
                style={{ height: "60%", width: "60%" }}
              />
            </View>
          </View>
          <Button title="emprunter" onPress={handleBorrow} />
          {ok ? <Api type="borrow" uuid={state.id} /> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
