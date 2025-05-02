import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, setupAuthListener } from "./auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    loadUser();

    //auth listener
    const authListener = setupAuthListener((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      if (authListener && authListener.data) {
        authListener.data.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used in an AuthProvider");
  }
  return context;
};
