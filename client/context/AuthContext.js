"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const restoreSession = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null") {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/users/me");
      setUser(data.user);
    } catch (err) {
      console.error("Session restore failed:", err);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  setTimeout(restoreSession, 100); // small delay prevents race
}, []);


  // 🔐 Handle login
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData.user);
  };

  // 🚪 Handle logout
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
