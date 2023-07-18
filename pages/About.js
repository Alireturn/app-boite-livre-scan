import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-native";
import { Image } from "react-native";
import AnimatedLottieView from "lottie-react-native";

export default function About() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const lottieRef = useRef();
  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }

    const redirectTimer = setTimeout(() => {
      navigate("/profil");
    }, 3800);

    return () => clearTimeout(redirectTimer);
  }, [lottieRef.current]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5F7F6",
        flexDirection: "column",
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: "beige",
      }}
    >
      <Text
        style={
          state.dataBook.Message == "Livre rendu"
            ? styles.text
            : styles.textPink
        }
      >
        {state.dataBook.Message}
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedLottieView
          ref={lottieRef}
          source={require("../assets/arrival-bookjson.json")}
          style={{ height: 300, width: 300 }}
        />
      </View>

      <Text style={styles.textProfil}>
        Vous allez etre rediriger vers votre page profil
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "800",
    color: "red",
    textAlign: "center",
  },
  textProfil: {
    fontSize: 17,
    fontWeight: "500",
  },
  textPink: {
    fontSize: 30,
    fontWeight: "700",
    color: "green",
    textAlign: "center",
    fontWeight: "800",
  },
});
