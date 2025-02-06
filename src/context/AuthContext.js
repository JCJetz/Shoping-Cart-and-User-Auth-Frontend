import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Proveedor del contexto que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//para gestionar el estado de autenticación
  const login = (username) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  // Proveer el estado y las funciones a toda la aplicación
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);