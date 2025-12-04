"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      const userID = localStorage.getItem("CustomerID");
      if (userID) {
        try {
          const response = await fetch(
            `/api/bookings/login?CustomerID=${userID}`
          );
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
