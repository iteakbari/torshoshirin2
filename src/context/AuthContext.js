"use client";
import useAuth from "@/hooks/useAuth";
import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
