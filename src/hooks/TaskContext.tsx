"use client";

import { TaskStatusEnum } from "@/enums/taskStatus";
import { Task } from "@/types";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface TasksContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  putTask: (updatedTask: Task) => Promise<void>;
  putTaskStatus: (id: string) => Promise<void>;
  deleteTask: (id: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async (task: Task) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, task];
      Cookies.set("tasksData", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const putTask = async (updatedTask: Task) => {
    if (!updatedTask.id) {
      toast.error("ID da tarefa não encontrado");
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      );
      Cookies.set("tasksData", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const putTaskStatus = async (id: string) => {
    if (!id) {
      toast.error("ID da tarefa não encontrado");
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === TaskStatusEnum.PENDING
                  ? TaskStatusEnum.DONE
                  : TaskStatusEnum.PENDING,
            }
          : task,
      ),
    );

    Cookies.set("tasksData", JSON.stringify(tasks));
  };

  const deleteTask = async (taskId: string) => {
    if (!taskId) {
      return;
    }
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== taskId);
      Cookies.set("tasksData", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  useEffect(() => {
    const storedTasks = Cookies.get("tasksData");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        throw new Error("Erro ao processar as tasks armazenadas");
      }
    }
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, addTask, putTask, putTaskStatus, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de um TasksProvider");
  }
  return context;
};
