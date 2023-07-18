import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import requets from "../Requet";
import { useNavigate } from "react-router-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import Map from "./Map";
import { TouchableOpacity } from "react-native";
import { DataContext } from "../DataContext";

export default function Recherche() {
  const { userSearch, setUserSearch } = useContext(DataContext);

  const navigate = useNavigate();
  const [erreur, setErreur] = useState("");
  const [data, setData] = useState(null);
  const [textValueUser, setTextValueUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const pageBook = () => {
    navigate("/QrCode", { state: { typeLog: "book" } });
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleStartModal = () => {
    setModalVisible(true);
  };
  const fetchApi = async () => {
    setUserSearch(null);
    try {
      const reponse = await fetch(requets.fetchBookName + textValueUser, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const infoBook = await reponse.json();
      console.log(infoBook);
      if (reponse.status === 201) {
        setErreur(infoBook.error);
      } else if (reponse.status === 200) {
        setErreur("");
        // setAvaible(infoBook.isAvailable);
        setUserSearch(infoBook);
        setData(infoBook);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerInput}>
        <View style={{ width: "90%" }}>
          <TextInput
            style={styles.input}
            onChangeText={setTextValueUser}
            value={textValueUser}
            placeholder="Rechercher un livre"
          />
        </View>
        <View>
          <Pressable onPress={fetchApi} style={{ alignItems: "center" }}>
            <Ionicons name="search-outline" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      {erreur === "" ? null : <Text>{erreur}</Text>}

      <View style={{ flex: 1 }}>
        {userSearch && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: requets.getImage + userSearch?.cover }}
              style={styles.image}
            />
          </View>
        )}

        <View>
          <View
            style={{
              flexDirection: "colum",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "600", margin: 4 }}>
              {userSearch?.title}
            </Text>
            <Text>{userSearch?.author}</Text>
            {userSearch?.category && <Text>{userSearch?.category.name}</Text>}
          </View>
          {userSearch?.isAvailable ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text style={styles.textAvailible}>Disponible</Text>
                <TouchableOpacity onPress={handleStartModal}>
                  <Text>voir sur la carte</Text>
                </TouchableOpacity>
                {/* <Pressable onPress={handleStartModal}>
                    <Text>Voir sur la carte</Text>
                  </Pressable> */}
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >
                <View style={styles.containerModal}>
                  <SafeAreaView
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Pressable onPress={handleCloseModal}>
                      <Ionicons name="close-outline" size={30} color="black" />
                    </Pressable>
                    <Text
                      style={{
                        marginLeft: 124,
                        fontSize: 27,
                        fontWeight: "600",
                      }}
                    >
                      Carte
                    </Text>
                  </SafeAreaView>
                  <Map
                    geoLoc={userSearch.box.geo_loc}
                    infoBox={userSearch?.box}
                  />
                </View>
              </Modal>
            </View>
          ) : (
            userSearch && (
              <Text style={{ color: "red", padding: 3 }}>Indisponible</Text>
            )
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    width: "90%",
  },
  containerModal: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  textAvailible: {
    color: "green",
  },
  image: {
    height: "95%",
    width: "90%",
    borderRadius: 10,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
