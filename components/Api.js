import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import UserContext from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import requets from "../Requet";
import { InfoUser } from "../InfoUserContext";
export default function Api(props) {
  const navigate = useNavigate();
  let endpoint = props.type;
  const [idUser, setIdUser] = useState(null);
  const size = useContext(UserContext);
  const { dataInfoUser, setDataInfoUser } = useContext(InfoUser);

  useEffect(() => {
    AsyncStorage.getItem("id")
      .then((id) => {
        setIdUser(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const borrow = async () => {
    try {
      const response = await fetch(
        requets.fetchBorrow + `${props.uuid}/borrowBook`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idUser,
            idBox: props.idBox,
          }),
        }
      );
      const data = await response.json();
      if (response.status == 201) {
        alert(data.error);
        navigate(-2);
      } else if (response.status == 200) {
        navigate("/about", { state: { dataBook: data } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const response = await fetch(requets.fetchLogin, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid: props.uuid,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        await AsyncStorage.setItem("uuid", data.uuid);
        await AsyncStorage.setItem("id", data.id.toString());
        size.isLoged = true;
        setDataInfoUser(data);
        navigate("/profil");
      } else if (response.status === 201) {
        alert("erreur");
        navigate(-1);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (endpoint === "login") {
      login();
    } else if (endpoint === "borrow") {
      borrow();
    } else if (endpoint === "book") {
      borrow();
    }
  }, [idUser]);

  return null;
}
