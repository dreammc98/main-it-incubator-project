import { instance } from "app/instance/instance";
import axios from "axios";
import { BaseResponse } from "common/types/BaseResponse";
import { UpdateDomainTaskModelType } from "features/TodolistsList/tasks.reducer";

// api
export const todolistsAPI = {
  getTodolists() {
    const promise = instance.get<TodolistType[]>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title: title });
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = instance.delete<BaseResponse>(`todo-lists/${id}`);
    return promise;
  },
  updateTodolist(args: updateTodolistArgs) {
    const promise = instance.put<BaseResponse>(`todo-lists/${args.id}`, { title: args.title });
    return promise;
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(args: removeTaskArgs) {
    return instance.delete<BaseResponse>(`todo-lists/${args.todolistId}/tasks/${args.taskId}`);
  },
  createTask(args: addTaskArgs) {
    const { todolistId, title } = args;
    return instance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {
      title: title,
    });
  },
  updateTask(args: updateTaskArgs, model: UpdateTaskModelType) {
    return instance.put<BaseResponse<TaskType>>(`todo-lists/${args.todolistId}/tasks/${args.taskId}`, model);
  },
};

export type addTaskArgs = { title: string; todolistId: string };

export type updateTaskArgs = { taskId: string; domainModel: UpdateDomainTaskModelType; todolistId: string };

export type removeTaskArgs = { taskId: string; todolistId: string };

export type updateTodolistArgs = { id: string; title: string };

// types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
