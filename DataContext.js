import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userSearch, setUserSearch] = useState(null);

  return (
    <DataContext.Provider value={{ userSearch, setUserSearch }}>
      {children}
    </DataContext.Provider>
  );
};
