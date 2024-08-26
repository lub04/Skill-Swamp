/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from "react";

const SkillSwampContext = createContext();

export function SkillSwampProvider({ children }) {
  const [connectedUser, setConnectedUser] = useState("");

  return (
    <SkillSwampContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </SkillSwampContext.Provider>
  );
}

export const useSkillSwamp = () => useContext(SkillSwampContext);
