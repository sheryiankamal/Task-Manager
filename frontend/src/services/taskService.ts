import { CreateTaskType } from "@/types/createTaskType";
import api from "./api";

export const getAssignedTasks = (userId: string) =>
  api.get(`/users/${userId}/assigned-tasks`);

export const getCreatedTasks = (userId: string) =>
  api.get(`/users/${userId}/created-tasks`);

export const createTask = (payload: CreateTaskType) => api.post("/tasks", payload);
