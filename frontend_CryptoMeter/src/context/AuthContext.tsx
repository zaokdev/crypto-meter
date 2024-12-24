import { createContext, useContext, ReactNode, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface ContextType {}

const AuthContext = createContext<ContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AppProviderProps) => {
  const [userData, setUserData] = useState({});

  /**
   * Decodes the JWT token and sets the user data in the context
   * @param {string} token
   */
  const decodeToken = (token: string) => {
    setUserData(jwtDecode(token));
  };

  return (
    <AuthContext.Provider value={{ userData, decodeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Crea un hook para consumir el contexto
export const useAuthContext = (): ContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un Provider");
  }
  return context;
};
