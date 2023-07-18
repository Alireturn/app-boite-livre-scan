import { Button, Image, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-native";
import UserContext from "../UserContext";
import requets from "../Requet";
import moment from "moment";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InfoUser } from "../InfoUserContext";

export default function InfoProfil() {
  const [good, setGood] = useState(false);
  const size = useContext(UserContext);
  const userData = size.dataUser;

  const [data, setData] = useState(null);
  const [dataBorrow, setDataBorrow] = useState(null);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const { dataInfoUser, setDataInfoUser } = useContext(InfoUser);
  // console.log(dataInfoUser);

  const scannezz2 = () => {
    setModalVisible(false);
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("uuid");
      size.isLoged = false;
      setDataInfoUser(null);
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  const annuler2 = () => {
    fetch(requets.getBorrowUser + dataInfoUser.id)
      .then((response) => response.json())
      .then((jsondata) => setDataBorrow(jsondata));
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* information utilsateur */}
      <View style={styles.topLog}>
        <View style={styles.infoUser}>
          <Text style={{ fontWeight: "600", fontSize: 20 }}>
            {dataInfoUser?.name}
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: `${requets.getAvatar + dataInfoUser?.avatar}`,
            }}
            style={styles.bookImage}
          />
        </View>
      </View>
      <View style={styles.historiqueContainer}>
        <View>
          <View
            style={{
              height: 80,
              width: 110,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              backgroundColor: "#DCD7D7",
            }}
            onPress={annuler2}
          >
            <Ionicons
              name="reader"
              size={50}
              color="black"
              onPress={annuler2}
            />
            <Text>Historique</Text>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <SafeAreaView
                  style={{
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <Pressable onPress={scannezz2}>
                      <Ionicons name="close-outline" size={30} color="black" />
                    </Pressable>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "600",

                        flex: 1,
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      Historique
                    </Text>
                  </View>
                </SafeAreaView>
                <View style={{ padding: 10 }}>
                  {dataBorrow?.map((book) => {
                    const status = book.date_return
                      ? book.date_return
                      : book.date_borrow;
                    const formattedDate = moment
                      .utc(status, "YYYY-MM-DDTHH:mm:ssZ")
                      .format("DD/MM/YYYY");
                    return (
                      <View
                        key={book.id}
                        style={{
                          backgroundColor: book.date_return ? "red" : "green",
                          padding: 7,
                          margin: 3,
                          borderRadius: 5,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.textPressed}>
                            {book.bookTitle}
                          </Text>
                          <Text style={styles.textPressed}>
                            {book.date_return ? " rendu le" : " emprunté le"}
                          </Text>
                          <Text style={styles.textPressed}>
                            {" "}
                            {formattedDate}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </View>

      <View
        style={{ backgroundColor: "#ECE6E6", width: "50%", borderRadius: 12 }}
      >
        <Text style={styles.buttonConnexion} onPress={handleLogout}>
          Deconnexion
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  borrowContainer: {
    backgroundColor: "green",
    margin: 10,
  },
  bookImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#2F4F32",
  },
  bookContainer: {
    backgroundColor: "lightgray",
    margin: 10,
  },
  buttonConnexion: {
    fontSize: 16,
    fontWeight: "800",
    padding: 10,
    alignItems: "center",
    textAlign: "center",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  topLog: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    padding: 6,
    alignItems: "center",
  },
  textPressed: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  infoUser: {
    flexDirection: "row",
  },
  historiqueContainer: {
    marginTop: 6,
    flex: 1,
  },
  textEmprun: {
    marginTop: 4,
    fontSize: 23,
    marginBottom: 10,
    fontWeight: "600",
  },
  textInfoBorrow: {
    fontSize: 17,
  },
});
