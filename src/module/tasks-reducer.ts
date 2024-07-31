import { v1 } from "uuid";
import { TasksStateType } from "../App";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  payload: { taskId: string; todolistId: string };
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  payload: { todolistId: string; title: string };
};

export type DeleteAllTasksActionType = {
  type: "DELETE-ALL-TASKS";
  payload: { todolistId: string };
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  payload: { todolistId: string; taskId: string; taskStatus: boolean };
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  payload: { todolistId: string; taskId: string; newTitle: string };
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | DeleteAllTasksActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    }
    case "DELETE-ALL-TASKS": {
      const copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    }
    case "ADD-TASK": {
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      if (action.payload.title === "") {
        return {
          ...state,
          [action.payload.todolistId]: [],
        };
      } else {
        return {
          ...state,
          [action.payload.todolistId]: [...state[action.payload.todolistId], newTask],
        };
      }
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, isDone: action.payload.taskStatus } : t
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, title: action.payload.newTitle } : t
        ),
      };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: "REMOVE-TASK",
    payload: {
      taskId,
      todolistId,
    },
  } as const;
};

export const deleteAllTasks = (todolistId: string): DeleteAllTasksActionType => {
  return {
    type: "DELETE-ALL-TASKS",
    payload: { todolistId },
  } as const;
};

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
  return {
    type: "ADD-TASK",
    payload: { todolistId, title },
  } as const;
};

export const changeTaskStatusAC = (
  taskStatus: boolean,
  taskId: string,
  todolistId: string
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { todolistId, taskId, taskStatus },
  } as const;
};

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  newTitle: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { todolistId, taskId, newTitle },
  } as const;
};
