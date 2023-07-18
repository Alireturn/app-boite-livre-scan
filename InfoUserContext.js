import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import requets from "./Requet";

export const InfoUser = createContext();

export const InfoUserProvider = ({ children, uuid }) => {
  const [dataInfoUser, setDataInfoUser] = useState(null);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(requets.fetchLogin, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: uuid,
          }),
        });
        const data = await response.json();
        setDataInfoUser(data);
      } catch (error) {
        alert(error);
      }
    };
    login();
  }, []);

  return (
    <InfoUser.Provider value={{ dataInfoUser, setDataInfoUser }}>
      {children}
    </InfoUser.Provider>
  );
};
