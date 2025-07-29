import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

const getRole = (pathname) => {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/farmer")) return "farmer";
  return "user";
};

const getTokenKey = (role) => `${role}Token`;
const getUserKey = (role) => `${role}User`;

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const role = getRole(location.pathname);

  const tokenKey = getTokenKey(role);
  const userKey = getUserKey(role);

  const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || null);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(userKey);
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const login = (userData, token, role) => {
    const tokenKey = `${role}Token`;
    const userKey = `${role}User`;
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(userData));
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(tokenKey);
    const storedUser = localStorage.getItem(userKey);

    try {
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setToken(null);
      setUser(null);
    }
  }, [tokenKey, userKey]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
