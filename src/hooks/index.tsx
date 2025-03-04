"use client";

import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";
import { TasksProvider } from "./TaskContext";

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
