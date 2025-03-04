import { TaskStatusEnum } from "@/enums/taskStatus";

export type Task = {
  id?: string;
  title: string;
  description: string;
  status?: TaskStatusEnum;
  expirationDate: string;
  userId?: string;
  completed?: boolean;
};

export type User = {
  id: string;
  email: string;
  name: string;
  usernameGitHub: string;
};

export type CreateUser = {
  email: string;
  name: string;
  password: string;
  usernameGitHub: string;
};

export type UserData = {
  userId: string;
  user: User;
  token: string;
  expiresIn: string;
};
