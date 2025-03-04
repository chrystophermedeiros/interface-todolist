"use client";
import { UserData } from "@/types";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UserContextType {
  userData: UserData | null;
  putUserData: (userInfo: UserData) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const putUserData = async (userInfo: UserData) => {
    setUserData(userInfo);
    Cookies.set("userData", JSON.stringify(userInfo));
  };

  const logout = async () => {
    Cookies.remove("tasksData");
    Cookies.remove("userData");
    setUserData(null);
    setTimeout(() => {
      window.location.href = "/login";
    }, 300);
  };

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = Cookies.get("userData");
      if (clientInfo) {
        setUserData(JSON.parse(clientInfo));
      }
    };
    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ putUserData, userData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
};
