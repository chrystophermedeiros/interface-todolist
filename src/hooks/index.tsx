"use client";

import { ReactNode } from "react";

import { TasksProvider } from "./TaskContext";
import { ThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => (
  <UserProvider>
    <TasksProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </TasksProvider>
  </UserProvider>
);
