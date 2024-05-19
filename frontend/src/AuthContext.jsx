import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to simulate login (you'll replace this with real authentication logic)
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to simulate logout
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Check authentication status on mount
  useEffect(() => {
    // This is just a placeholder for actual authentication check
    // For example, you could check a token in local storage here
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  // Provide the authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
