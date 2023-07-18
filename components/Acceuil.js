import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../UserContext";

import AnimatedLottieView from "lottie-react-native";

export default function Acceuil(props) {
  const size = useContext(UserContext);
  const [uuid, setUiid] = useState(null);
  const navigate = useNavigate();
  const animation = useRef(null);
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
    const checkUUID = () => {
      try {
        if (props.uuid !== null) {
          size.isLoged = true;
          navigate("/home");
        } else {
          size.isLoged = false;
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setTimeout(() => {
      checkUUID();
    }, 4000);
    return () => clearTimeout(timer);
  }, [lottieRef.current]);

  return (
    <View
      style={{
        backgroundColor: "beige",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedLottieView
        ref={lottieRef}
        source={require("../assets/animation-book.json")}
        style={{ backgroundColor: "beige" }}
        speed={1}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
