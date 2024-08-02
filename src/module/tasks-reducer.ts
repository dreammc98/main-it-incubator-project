import { v1 } from "uuid";
import { TasksStateType, TasksType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

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

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | DeleteAllTasksActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.payload.todolistId];
      const newTasks = tasks.filter((t) => t.id != action.payload.taskId);
      stateCopy[action.payload.todolistId] = newTasks;
      return stateCopy;
    }
    case "DELETE-ALL-TASKS": {
      const copyState = { ...state };
      delete copyState[action.payload.todolistId];
      return copyState;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const newTask: TasksType = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      const tasks = stateCopy[action.payload.todolistId];
      const newTasks = [newTask, ...tasks];
      stateCopy[action.payload.todolistId] = newTasks;
      return stateCopy;
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
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.newId]: [],
      };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
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
