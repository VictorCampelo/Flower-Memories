import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvide = ({ children }) => {
  const [isTrueFalse, setIsTrueFalse] = useState(false);

  return (
    <AuthContext.Provider value={{ isTrueFalse, setIsTrueFalse }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
