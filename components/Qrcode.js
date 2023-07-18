import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocation, useNavigate } from "react-router-native";
import Api from "./Api";
import UserContext from "../UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Qrcode(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [donnes, setDonnes] = useState(null);
  const size = useContext(UserContext);
  const userData = size.dataUser;

  const handleReturn = () => {
    navigate(-1);
  };
  const handleScan = () => {
    setScanned(false);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    setScanned(false);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (state.typeLog == "box") {
      navigate("/QrCode", { state: { idBox: data, typeLog: "book" } });
    } else if (state.typeLog == "book") {
      setDonnes(data);
    } else if (state.typeLog == "login") {
      setDonnes(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.absoluteFillObject}
      />
      <Text style={styles.indicatorText}>
        Scanner{" "}
        {state.typeLog == "login" ? (
          <Text>votre carte </Text>
        ) : (
          <Text>
            {" "}
            {state.typeLog == "box" ? "la" : "le"} {state.typeLog}
          </Text>
        )}
      </Text>
      <Ionicons
        name="arrow-back-circle-outline"
        size={50}
        color="white"
        onPress={handleReturn}
        style={styles.indicator}
      />
      {scanned && (
        <Text onPress={handleScan} style={styles.indicatorButton}>
          Scanner de nouveau
        </Text>
      )}

      {donnes && (
        <Api
          uuid={donnes}
          idBox={state.idBox ? state.idBox : null}
          idUser={userData ? userData.id : null}
          type={state.typeLog}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFillObject: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
  },
  indicator: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 300,
    textAlign: "center",
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 40,
  },
  indicatorText: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    textAlign: "center",
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 35,
    fontWeight: "700",
    marginTop: 20,
  },
  indicatorButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    textAlign: "center",
    color: "white",
    fontSize: 40,
  },
});
