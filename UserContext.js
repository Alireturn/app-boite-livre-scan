import { createContext } from "react";
const UserContext = createContext({
  dataUser: null,
  isLoged: false,
});

export default UserContext;
