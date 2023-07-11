import React, { createContext, useEffect, useState } from "react";
import { LOCALSTORAGE_KEY } from "../api/baseURL";

export const AuthContext = createContext(null);

export default function AuthContextComponent({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useState(() => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY);
    const userLocalStorage = localStorage.getItem('user');
    setIsLoggedIn(!!token);

    if (userLocalStorage) {
        setUser(JSON.parse(userLocalStorage));
    }
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
};

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}