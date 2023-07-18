import { StyleSheet, Text, View, Button } from "react-native";
import {
  NativeRouter,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-native";

import Home from "./pages/Home";
import React, { useEffect, useState } from "react"; // correction ici
import AsyncStorage from "@react-native-async-storage/async-storage";
import About from "./pages/About";
import Profil from "./pages/Profil";
import Qrcode from "./components/Qrcode";
import BookInfo from "./pages/BookInfo";
import MapMarker from "./components/MapMarker";
import Acceuil from "./components/Acceuil";
import { DataProvider } from "./DataContext";
import { InfoUserProvider } from "./InfoUserContext";

export default function App() {
  const [uuid, setUuid] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem("uuid")
      .then((uuid) => {
        setUuid(uuid);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Chargement</Text>
      </View>
    );
  }
  return (
    <InfoUserProvider uuid={uuid}>
      <DataProvider>
        <NativeRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="/" element={<Acceuil uuid={uuid} />} />
            <Route path="/about" element={<About />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/QrCode" element={<Qrcode />} />
            <Route path="/BookInfo" element={<BookInfo />} />
            <Route path="/mapView" element={<MapMarker />} />
          </Routes>
        </NativeRouter>
      </DataProvider>
    </InfoUserProvider>
  );
}
