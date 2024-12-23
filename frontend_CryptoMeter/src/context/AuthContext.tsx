import React, { createContext, useContext, ReactNode, useState } from "react";

// 1. Define el tipo de datos del contexto

interface ContextType {
  // Define aquí las propiedades que necesitas
}

// 2. Crea el contexto inicializándolo como undefined
const AuthContext = createContext<ContextType | undefined>(undefined);

// 3. Crea el proveedor del contexto
interface AppProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AppProviderProps) => {
  // Agrega aquí el estado o funciones que necesites
  const [userData, setUserData] = useState({});

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

// 4. Crea un hook para consumir el contexto
export const useAuthContext = (): ContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un Provider");
  }
  return context;
};
