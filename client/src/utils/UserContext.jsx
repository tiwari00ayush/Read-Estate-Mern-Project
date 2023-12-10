// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserProfile = (userData) => {
    setUser(userData);
  };

  const clearUserProfile = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUserProfile, clearUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
