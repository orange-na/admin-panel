import { createContext, useState } from "react";

export const userContext = createContext();

export const userContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
};
