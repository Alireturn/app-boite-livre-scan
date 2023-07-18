import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
} from "react-native";
import { useNavigate } from "react-router-native";
import { InfoUserProvider } from "../InfoUserContext";
import UserContext from "../UserContext";
import InfoProfil from "./InfoProfil";
import Recherche from "./Recherche";
import Lottie from "lottie-react-native";
import AnimatedLottieView from "lottie-react-native";
import assets from "../assets";

export default function Main({ pageName, data }) {
  let content = null;
  const aaaa = "ee1eaced-7e0c-4b32-a669-fe3d1d940a";
  const [infoUser, setInfoUser] = useState(false);
  const [good, setGood] = useState(false);
  const [godd2, setGood2] = useState(false);
  const navigate = useNavigate();
  const size = useContext(UserContext);
  const loged = size.isLoged;
  const lottieRef = useRef();
  const scannezz = () => {
    setGood2(true);
  };
  const annuler = () => {
    setGood2(false);
  };
  const scannez = () => {
    navigate("/QrCode", { state: { typeLog: "login" } });
  };

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);

  if (pageName === "Page1") {
    content = (
      <View style={{ flex: 1 }}>
        {loged ? (
          <View style={styles.mainContent}>
            <Recherche />
          </View>
        ) : (
          <View style={styles.mainContent}>
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={{ marginTop: "13%" }}>
                <Text style={styles.textPrincipale}>Bienvenue sur BookApp</Text>
                <Text style={styles.text}>Commencer a vous connecter pour</Text>
                <Text style={styles.text}>
                  pour profiter plainement de l'application
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Pressable style={styles.buttonConnexion} onPress={scannez}>
                  <Text style={styles.textButton}>Connexion</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <AnimatedLottieView
                ref={lottieRef}
                source={require("../assets/arrival-bookjson.json")}
              />
            </View>
          </View>
        )}
      </View>
    );
  } else if (pageName === "Page2") {
    content = (
      <View style={{ flex: 1 }}>
        <InfoProfil />
      </View>
    );
  }

  return <View style={styles.main}>{content}</View>;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  textPrincipale: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  mainContent: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConnexion: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 20,
    backgroundColor: "black",
    width: "50%",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    marginBottom: 2,
    fontSize: 17,
    textAlign: "center",
  },
});
