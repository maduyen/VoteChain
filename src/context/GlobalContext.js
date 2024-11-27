import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        publicKey,
        setPublicKey,
        // other state and methods...
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
